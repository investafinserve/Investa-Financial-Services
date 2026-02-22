"use client";

import { useState, useEffect } from "react";

// Curated Lists of Funds
const POPULAR_FUNDS = [
    { id: 122639, name: "Parag Parikh Flexi Cap", category: "Flexi Cap Fund" },
    { id: 119835, name: "SBI Contra Fund", category: "Contra Fund" },
    { id: 118955, name: "HDFC Flexi Cap Fund", category: "Flexi Cap Fund" },
    { id: 120586, name: "ICICI Pru Large Cap", category: "Large Cap Fund" },
    { id: 147704, name: "Motilal Oswal Large & Mid", category: "Large & Mid Cap" },
];

const TOP_PERFORMING_FUNDS = [
    { id: 120828, name: "Quant Small Cap", category: "Small Cap Fund" },
    { id: 118778, name: "Nippon India Small Cap", category: "Small Cap Fund" },
    { id: 127042, name: "Motilal Oswal Midcap", category: "Mid Cap Fund" },
    { id: 119835, name: "SBI Contra Fund", category: "Contra Fund" },
    { id: 122639, name: "Parag Parikh Flexi Cap", category: "Flexi Cap Fund" },
];

const ALL_DISTINCT_FUNDS = Array.from(
    new Set([...POPULAR_FUNDS, ...TOP_PERFORMING_FUNDS].map((f) => f.id))
).map((id) => [...POPULAR_FUNDS, ...TOP_PERFORMING_FUNDS].find((f) => f.id === id)!);

type Timeframe = "1Y" | "3Y" | "5Y" | "10Y";
type FundListType = "Popular" | "Top Performing";

interface FundData {
    id: number;
    name: string;
    category: string;
    currentNav: number | null;
    returns: Record<Timeframe, number | null>;
    isLoading: boolean;
    error: boolean;
}

export default function LiveMutualFunds() {
    const [activeList, setActiveList] = useState<FundListType>("Top Performing");
    const [activeTimeframe, setActiveTimeframe] = useState<Timeframe>("3Y"); // Default to 3Y to show annualized strength
    const [refreshCountdown, setRefreshCountdown] = useState(60);

    const [fundsData, setFundsData] = useState<FundData[]>(
        ALL_DISTINCT_FUNDS.map((f) => ({
            ...f,
            currentNav: null,
            returns: { "1Y": null, "3Y": null, "5Y": null, "10Y": null },
            isLoading: true,
            error: false
        }))
    );

    useEffect(() => {
        const fetchFundData = async (fundId: number) => {
            try {
                const res = await fetch(`https://api.mfapi.in/mf/${fundId}`);
                if (!res.ok) throw new Error("Network response was not ok");
                const json = await res.json();

                const data = json.data;
                if (!data || data.length === 0) throw new Error("No data returned");

                // Today's NAV is the first item
                const latestNav = parseFloat(data[0].nav);
                const latestDateStr = data[0].date; // "DD-MM-YYYY"

                const parts = latestDateStr.split("-");
                const latestDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));

                const calculateReturnForYears = (years: number) => {
                    const targetDate = new Date(latestDate.getFullYear() - years, latestDate.getMonth(), latestDate.getDate());
                    let oldNavRaw = null;
                    let smallestDiff = Infinity;

                    for (const entry of data) {
                        const eParts = entry.date.split("-");
                        const eDate = new Date(parseInt(eParts[2]), parseInt(eParts[1]) - 1, parseInt(eParts[0]));

                        const diffDays = Math.abs((eDate.getTime() - targetDate.getTime()) / (1000 * 3600 * 24));

                        if (diffDays < smallestDiff && diffDays <= 12) { // 12-day window for long weekends/holidays
                            smallestDiff = diffDays;
                            oldNavRaw = parseFloat(entry.nav);
                        }
                    }

                    if (oldNavRaw) {
                        if (years === 1) {
                            return ((latestNav - oldNavRaw) / oldNavRaw) * 100; // Absolute return for 1 year
                        } else {
                            return (Math.pow(latestNav / oldNavRaw, 1 / years) - 1) * 100; // CAGR for >1 year
                        }
                    }
                    return null; // Fund might not be old enough for this timeframe
                };

                const computedReturns = {
                    "1Y": calculateReturnForYears(1),
                    "3Y": calculateReturnForYears(3),
                    "5Y": calculateReturnForYears(5),
                    "10Y": calculateReturnForYears(10),
                };

                setFundsData((prev) =>
                    prev.map((f) =>
                        f.id === fundId
                            ? { ...f, currentNav: latestNav, returns: computedReturns, isLoading: false }
                            : f
                    )
                );

            } catch (error) {
                console.error(`Failed to fetch fund ${fundId}:`, error);
                setFundsData((prev) =>
                    prev.map((f) =>
                        f.id === fundId ? { ...f, isLoading: false, error: true } : f
                    )
                );
            }
        };

        const fetchAllFunds = () => {
            ALL_DISTINCT_FUNDS.forEach((fund) => {
                fetchFundData(fund.id);
            });
        };

        // Initial fetch
        fetchAllFunds();

        // Auto-refresh timer logic
        const timerInterval = setInterval(() => {
            setRefreshCountdown((prev) => {
                if (prev <= 1) {
                    fetchAllFunds();
                    return 60; // Reset timer
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerInterval);
    }, []);

    const activeFundList = activeList === "Popular" ? POPULAR_FUNDS : TOP_PERFORMING_FUNDS;
    // Map the selected list to their loaded data state
    const displayedFunds = activeFundList.map((fundRef) => fundsData.find((f) => f.id === fundRef.id)!);

    return (
        <section className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 mt-8">
            <div className="text-center space-y-4 mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold tracking-widest uppercase mb-2 shadow-sm border border-emerald-200">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Live Market Data • Updates in {refreshCountdown}s
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                    Curated <span className="text-gradient">Mutual Funds</span>
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base font-medium">
                    Track the live Net Asset Value (NAV) and historical annualized returns of India's flagship mutual funds, updated daily.
                </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10 w-full">
                {/* Category List Segmented Control */}
                <div className="inline-flex bg-white/50 backdrop-blur-md border border-slate-200 rounded-xl p-1.5 shadow-sm">
                    {(["Popular", "Top Performing"] as FundListType[]).map((listName) => (
                        <button
                            key={listName}
                            onClick={() => setActiveList(listName)}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeList === listName
                                ? "bg-slate-800 text-white shadow-md scale-100"
                                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/80 scale-95"
                                }`}
                        >
                            {listName}
                        </button>
                    ))}
                </div>

                {/* Separator for Desktop / Spacer for Mobile */}
                <div className="hidden md:block w-px h-8 bg-slate-200"></div>

                {/* Timeframe Segmented Control */}
                <div className="inline-flex bg-white/50 backdrop-blur-md border border-slate-200 rounded-xl p-1.5 shadow-sm">
                    {(["1Y", "3Y", "5Y", "10Y"] as Timeframe[]).map((tf) => (
                        <button
                            key={tf}
                            onClick={() => setActiveTimeframe(tf)}
                            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${activeTimeframe === tf
                                ? "bg-indigo-500 text-white shadow-md scale-100"
                                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/80 scale-95"
                                }`}
                        >
                            {tf}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {displayedFunds.map((fund) => {
                    const currentReturn = fund.returns[activeTimeframe];

                    return (
                        <div
                            key={fund.id}
                            className="glass rounded-2xl p-5 border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group flex-shrink-0"
                        >
                            {/* Soft background glow based on positive return pattern */}
                            <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-100 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>

                            <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{fund.category}</p>
                                    <h3 className="font-extrabold text-slate-800 text-base leading-snug line-clamp-2">{fund.name}</h3>
                                </div>

                                {fund.isLoading ? (
                                    <div className="flex flex-col gap-2 mt-2">
                                        <div className="h-6 w-16 bg-slate-200 rounded animate-pulse"></div>
                                        <div className="h-4 w-24 bg-slate-200 rounded animate-pulse"></div>
                                    </div>
                                ) : fund.error ? (
                                    <div className="text-xs text-red-500 font-bold mt-2 bg-red-50 px-3 py-2 rounded-lg border border-red-100">
                                        Data temporarily unavailable.
                                    </div>
                                ) : (
                                    <div className="mt-2 space-y-1">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-xs font-semibold text-slate-500">₹</span>
                                            <span className="text-2xl font-black text-slate-900">{fund.currentNav?.toFixed(2)}</span>
                                            <span className="text-[10px] text-slate-400 font-medium ml-1">NAV</span>
                                        </div>

                                        {currentReturn !== null ? (
                                            <div className="flex items-center gap-1.5 mt-1">
                                                <div className={`flex items-center px-2 py-0.5 rounded-md text-xs font-bold ${currentReturn >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                                    {currentReturn >= 0 ? (
                                                        <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                                                    ) : (
                                                        <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                                                    )}
                                                    {Math.abs(currentReturn).toFixed(2)}%
                                                </div>
                                                <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">{activeTimeframe} Return</span>
                                            </div>
                                        ) : (
                                            <div className="mt-1 pt-1 border-t border-slate-100">
                                                <span className="text-[10px] text-amber-600 italic font-medium">Fund younger than {activeTimeframe}</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
