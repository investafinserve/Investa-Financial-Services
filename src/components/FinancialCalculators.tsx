"use client";

import { useState, useMemo } from "react";

type CalcType = "SIP" | "Lumpsum" | "SWP" | "Step-up" | "Retirement" | "STP";

const formatCur = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(val);
};

export default function FinancialCalculators() {
    const [activeTab, setActiveTab] = useState<CalcType>("SIP");

    // Unified state for all inputs to preserve values when switching tabs implicitly (or just clear)
    const [monthlyInv, setMonthlyInv] = useState(5000);
    const [totalInv, setTotalInv] = useState(100000);
    const [duration, setDuration] = useState(10);
    const [expReturn, setExpReturn] = useState(12);

    // SWP
    const [withdrawal, setWithdrawal] = useState(5000);

    // Step Up
    const [stepUpPerc, setStepUpPerc] = useState(10);

    // Retirement
    const [currentAge, setCurrentAge] = useState(30);
    const [retireAge, setRetireAge] = useState(60);
    const [currentExpenses, setCurrentExpenses] = useState(50000);
    const [inflation, setInflation] = useState(6);

    // STP
    const [stpTransfer, setStpTransfer] = useState(5000);
    const [debtReturn, setDebtReturn] = useState(6);
    const [equityReturn, setEquityReturn] = useState(12);

    // --- Math Calculations ---
    const results = useMemo(() => {
        if (activeTab === "SIP") {
            const monthlyRate = expReturn / 12 / 100;
            const months = duration * 12;
            const invested = monthlyInv * months;
            const futureValue = monthlyInv * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
            const estReturns = futureValue - invested;
            return {
                labels: ["Invested Amount", "Est. Returns"],
                values: [invested, estReturns],
                total: futureValue
            };
        }
        else if (activeTab === "Lumpsum") {
            const invested = totalInv;
            const futureValue = totalInv * Math.pow(1 + expReturn / 100, duration);
            const estReturns = futureValue - invested;
            return {
                labels: ["Invested Amount", "Est. Returns"],
                values: [invested, estReturns],
                total: futureValue
            };
        }
        else if (activeTab === "SWP") {
            let balance = totalInv;
            const monthlyRate = expReturn / 12 / 100;
            const months = duration * 12;
            let totalWithdrawn = 0;

            for (let i = 0; i < months; i++) {
                balance = balance * (1 + monthlyRate) - withdrawal;
                totalWithdrawn += withdrawal;
                if (balance < 0) {
                    balance = 0;
                    break;
                }
            }
            return {
                labels: ["Total Investment", "Total Withdrawn", "Final Balance"],
                values: [totalInv, totalWithdrawn, balance],
                isSWP: true
            };
        }
        else if (activeTab === "Step-up") {
            const monthlyRate = expReturn / 12 / 100;
            let currentSip = monthlyInv;
            let invested = 0;
            let futureValue = 0;

            for (let y = 0; y < duration; y++) {
                let startValue = futureValue;
                // Value of this year's SIPs at end of year
                let yearSipFV = currentSip * ((Math.pow(1 + monthlyRate, 12) - 1) / monthlyRate) * (1 + monthlyRate);
                // Last year's balance grows for 1 year
                futureValue = startValue * Math.pow(1 + expReturn / 100, 1) + yearSipFV;
                invested += currentSip * 12;
                currentSip += currentSip * (stepUpPerc / 100);
            }
            const estReturns = futureValue - invested;
            return {
                labels: ["Invested Amount", "Est. Returns"],
                values: [invested, estReturns],
                total: futureValue
            };
        }
        else if (activeTab === "Retirement") {
            const yearsToRetire = Math.max(1, retireAge - currentAge);
            const monthlyExpensesAtRetire = currentExpenses * Math.pow(1 + inflation / 100, yearsToRetire);
            // 4% Safe Withdrawal Rate Assumption for corpus sizing
            const targetCorpus = (monthlyExpensesAtRetire * 12) / 0.04;
            return {
                labels: ["Target Corpus"],
                values: [targetCorpus],
                isRetirement: true,
                monthlyExpensesAtRetire
            };
        }
        else if (activeTab === "STP") {
            let debtBalance = totalInv;
            let equityBalance = 0;
            const debtMonthlyRate = debtReturn / 12 / 100;
            const equityMonthlyRate = equityReturn / 12 / 100;
            const months = duration * 12;

            for (let i = 0; i < months; i++) {
                debtBalance *= (1 + debtMonthlyRate);
                equityBalance *= (1 + equityMonthlyRate);

                let transfer = Math.min(stpTransfer, debtBalance);
                debtBalance -= transfer;
                equityBalance += transfer;
            }
            const finalValue = debtBalance + equityBalance;
            const estReturns = finalValue - totalInv;

            return {
                labels: ["Initial Investment", "Est. Returns"],
                values: [totalInv, estReturns],
                total: finalValue
            };
        }

        return { labels: [], values: [], total: 0 };
    }, [activeTab, monthlyInv, totalInv, duration, expReturn, withdrawal, stepUpPerc, currentAge, retireAge, currentExpenses, inflation, stpTransfer, debtReturn, equityReturn]);

    // Slider UI Helper
    const renderSlider = (
        label: string,
        value: number,
        setter: (v: number) => void,
        min: number,
        max: number,
        step: number,
        prefix: string = "",
        suffix: string = ""
    ) => (
        <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center group">
                <label className="text-sm font-bold text-slate-700">{label}</label>
                <div className="bg-blue-50/80 px-4 py-2 rounded-lg font-bold text-blue-800 text-sm border border-blue-100 shadow-sm transition-all group-hover:bg-blue-100/50">
                    {prefix}{prefix === "₹" ? new Intl.NumberFormat('en-IN').format(value) : value}{suffix}
                </div>
            </div>
            <div className="relative pt-1">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => setter(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-indigo-600 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
            </div>
        </div>
    );

    return (
        <section id="calculators" className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
            <div className="text-center space-y-4 mb-10">
                <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-widest uppercase mb-2 shadow-sm border border-blue-200">
                    Financial Planning
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                    Smart <span className="text-gradient">Calculators</span>
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base font-medium">
                    Plan your investments, withdrawals, and retirement with mathematically precise, industry-standard mutual fund calculators.
                </p>
            </div>

            <div className="bg-white/80 backdrop-blur-xl border border-white scroll-mt-24 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] rounded-3xl overflow-hidden glass p-1">

                {/* Scrollable Tabs for Mobile */}
                <div className="w-full overflow-x-auto no-scrollbar border-b border-slate-200/60 bg-slate-50/50 rounded-t-3xl">
                    <div className="flex w-max min-w-full">
                        {(["SIP", "Lumpsum", "SWP", "Step-up", "STP", "Retirement"] as CalcType[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 min-w-[120px] px-4 py-4 text-sm font-bold transition-all relative ${activeTab === tab
                                        ? "text-blue-700 bg-white"
                                        : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
                                    }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-full"></span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-6 md:p-10 flex flex-col lg:flex-row gap-12 lg:gap-20 bg-white/40">

                    {/* LEFT SIDE: Inputs */}
                    <div className="w-full lg:w-[55%] space-y-2">
                        {activeTab === "SIP" && (
                            <>
                                {renderSlider("Monthly Investment", monthlyInv, setMonthlyInv, 500, 1000000, 500, "₹")}
                                {renderSlider("Expected Return Rate (p.a)", expReturn, setExpReturn, 1, 30, 0.5, "", "%")}
                                {renderSlider("Time Period", duration, setDuration, 1, 40, 1, "", " Yr")}
                            </>
                        )}

                        {activeTab === "Lumpsum" && (
                            <>
                                {renderSlider("Total Investment", totalInv, setTotalInv, 5000, 10000000, 5000, "₹")}
                                {renderSlider("Expected Return Rate (p.a)", expReturn, setExpReturn, 1, 30, 0.5, "", "%")}
                                {renderSlider("Time Period", duration, setDuration, 1, 40, 1, "", " Yr")}
                            </>
                        )}

                        {activeTab === "SWP" && (
                            <>
                                {renderSlider("Total Investment", totalInv, setTotalInv, 100000, 50000000, 50000, "₹")}
                                {renderSlider("Withdrawal per month", withdrawal, setWithdrawal, 500, 500000, 500, "₹")}
                                {renderSlider("Expected Return Rate (p.a)", expReturn, setExpReturn, 1, 30, 0.5, "", "%")}
                                {renderSlider("Time Period", duration, setDuration, 1, 40, 1, "", " Yr")}
                            </>
                        )}

                        {activeTab === "Step-up" && (
                            <>
                                {renderSlider("Initial Monthly Investment", monthlyInv, setMonthlyInv, 500, 500000, 500, "₹")}
                                {renderSlider("Annual Step-up Rate", stepUpPerc, setStepUpPerc, 1, 50, 1, "", "%")}
                                {renderSlider("Expected Return Rate (p.a)", expReturn, setExpReturn, 1, 30, 0.5, "", "%")}
                                {renderSlider("Time Period", duration, setDuration, 1, 40, 1, "", " Yr")}
                            </>
                        )}

                        {activeTab === "Retirement" && (
                            <>
                                {renderSlider("Current Age", currentAge, setCurrentAge, 18, 65, 1, "", " Yr")}
                                {renderSlider("Retirement Age", retireAge, setRetireAge, 40, 75, 1, "", " Yr")}
                                {renderSlider("Current Monthly Expenses", currentExpenses, setCurrentExpenses, 10000, 1000000, 5000, "₹")}
                                {renderSlider("Expected Inflation", inflation, setInflation, 1, 15, 0.5, "", "%")}
                            </>
                        )}

                        {activeTab === "STP" && (
                            <>
                                {renderSlider("Initial Debt Investment", totalInv, setTotalInv, 50000, 50000000, 10000, "₹")}
                                {renderSlider("Monthly Transfer Amount", stpTransfer, setStpTransfer, 1000, 500000, 1000, "₹")}
                                {renderSlider("Debt Return Rate (p.a)", debtReturn, setDebtReturn, 1, 15, 0.5, "", "%")}
                                {renderSlider("Equity Return Rate (p.a)", equityReturn, setEquityReturn, 1, 30, 0.5, "", "%")}
                                {renderSlider("Time Period", duration, setDuration, 1, 15, 1, "", " Yr")}
                            </>
                        )}
                    </div>

                    {/* RIGHT SIDE: Visualizer & Results */}
                    <div className="w-full lg:w-[45%] flex flex-col justify-center bg-slate-50/80 rounded-3xl p-8 border border-slate-100 shadow-inner">
                        <div className="flex flex-col items-center mb-8">
                            <h3 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-2">
                                {activeTab === "Retirement" ? "Target Retirement Corpus" : activeTab === "SWP" ? "Final Balance" : "Total Value"}
                            </h3>
                            <div className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
                                {activeTab === "Retirement"
                                    ? formatCur(results.values[0] || 0)
                                    : activeTab === "SWP"
                                        ? formatCur(results.values[2] || 0)
                                        : formatCur(results.total || 0)}
                            </div>
                        </div>

                        {/* Breakdown Data rows */}
                        <div className="space-y-4 w-full">
                            {results.isRetirement ? (
                                <>
                                    <div className="flex justify-between items-center py-3 border-b border-slate-200">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                                            <span className="text-sm font-semibold text-slate-600">Post-Retire Monthly Expense</span>
                                        </div>
                                        <span className="font-bold text-slate-800">{formatCur(results.monthlyExpensesAtRetire || 0)}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                            <span className="text-sm font-semibold text-slate-600">Years to Accumulate</span>
                                        </div>
                                        <span className="font-bold text-slate-800">{Math.max(1, retireAge - currentAge)} Yrs</span>
                                    </div>
                                </>
                            ) : results.isSWP ? (
                                <>
                                    <div className="flex justify-between items-center py-3 border-b border-slate-200">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                                            <span className="text-sm font-semibold text-slate-600">Total Investment</span>
                                        </div>
                                        <span className="font-bold text-slate-800">{formatCur(results.values[0] || 0)}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-slate-200">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                                            <span className="text-sm font-semibold text-slate-600">Total Withdrawn</span>
                                        </div>
                                        <span className="font-bold text-slate-800">{formatCur(results.values[1] || 0)}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                            <span className="text-sm font-semibold text-slate-600">Final Balance</span>
                                        </div>
                                        <span className="font-bold text-slate-800">{formatCur(results.values[2] || 0)}</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex justify-between items-center py-3 border-b border-slate-200">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                                            <span className="text-sm font-semibold text-slate-600">Invested Amount</span>
                                        </div>
                                        <span className="font-bold text-slate-800">{formatCur(results.values[0] || 0)}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                                            <span className="text-sm font-semibold text-slate-600">Est. Returns</span>
                                        </div>
                                        <span className="font-bold text-emerald-600">+{formatCur(results.values[1] || 0)}</span>
                                    </div>

                                    {/* Visual Stacked Bar representing Principal vs Returns */}
                                    <div className="pt-6 relative w-full h-4 mt-2 rounded-full overflow-hidden flex bg-slate-200">
                                        {(() => {
                                            const total = results.total || 1;
                                            const investedP = Math.min(((results.values[0] || 0) / total) * 100, 100);
                                            const returnsP = 100 - investedP;
                                            return (
                                                <>
                                                    <div className="h-full bg-slate-300 transition-all duration-700 ease-out" style={{ width: `${investedP}%` }}></div>
                                                    <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-700 ease-out" style={{ width: `${returnsP}%` }}></div>
                                                </>
                                            );
                                        })()}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* Disclaimer */}
            <p className="text-center mt-6 text-[10px] sm:text-xs text-slate-400 font-medium max-w-3xl mx-auto">
                Disclaimer: Mutual fund investments are subject to market risks. These calculators are for illustration purposes only and do not guarantee future returns. Actual returns may vary depending on market performance and prevailing taxation laws.
            </p>
        </section>
    );
}
