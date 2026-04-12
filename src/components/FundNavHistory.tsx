"use client";

import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type FundNavRow = { date: string; nav: string };

function parseDdMmYyyy(dateStr: string): number {
  const parts = dateStr.split("-");
  if (parts.length !== 3) return NaN;
  const d = Number.parseInt(parts[0], 10);
  const m = Number.parseInt(parts[1], 10) - 1;
  const y = Number.parseInt(parts[2], 10);
  return new Date(y, m, d).getTime();
}

type ChartPoint = { date: string; nav: number; ts: number };

export default function FundNavHistory({ rows }: { rows: FundNavRow[] }) {
  const [mode, setMode] = useState<"chart" | "table">("chart");

  const chartData = useMemo(() => {
    return [...rows]
      .reverse()
      .map((r) => ({
        date: r.date,
        nav: Number.parseFloat(r.nav),
        ts: parseDdMmYyyy(r.date),
      }))
      .filter((d) => Number.isFinite(d.nav) && Number.isFinite(d.ts)) as ChartPoint[];
  }, [rows]);

  const navMin = useMemo(() => {
    if (!chartData.length) return 0;
    return Math.min(...chartData.map((d) => d.nav));
  }, [chartData]);

  const navMax = useMemo(() => {
    if (!chartData.length) return 0;
    return Math.max(...chartData.map((d) => d.nav));
  }, [chartData]);

  const yPad = navMax > navMin ? (navMax - navMin) * 0.08 : navMin * 0.002 || 0.01;

  if (!rows.length) {
    return (
      <section className="mt-8 glass-card rounded-2xl p-6 border border-white/80">
        <h2 className="text-lg font-extrabold text-slate-900 mb-2">Recent NAV</h2>
        <p className="text-sm text-slate-500">No NAV history available.</p>
      </section>
    );
  }

  return (
    <section className="mt-8 glass-card rounded-2xl p-6 border border-white/80 overflow-hidden">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-lg font-extrabold text-slate-900">Recent NAV</h2>
        <div
          className="inline-flex self-start sm:self-auto bg-white/60 backdrop-blur-md border border-slate-200 rounded-xl p-1 shadow-sm"
          role="tablist"
          aria-label="NAV display mode"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === "chart"}
            onClick={() => setMode("chart")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              mode === "chart"
                ? "bg-slate-800 text-white shadow-md"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/80"
            }`}
          >
            Chart
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "table"}
            onClick={() => setMode("table")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              mode === "table"
                ? "bg-slate-800 text-white shadow-md"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/80"
            }`}
          >
            Table
          </button>
        </div>
      </div>

      {mode === "chart" ? (
        <div className="w-full -mx-1 sm:mx-0">
          <p className="text-xs text-slate-500 mb-3">
            Oldest to newest (left → right). Hover points for exact values.
          </p>
          <div className="h-[260px] sm:h-[300px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: "#64748b" }}
                  tickMargin={8}
                  interval="preserveStartEnd"
                  angle={chartData.length > 10 ? -35 : 0}
                  textAnchor={chartData.length > 10 ? "end" : "middle"}
                  height={chartData.length > 10 ? 52 : 32}
                />
                <YAxis
                  domain={[navMin - yPad, navMax + yPad]}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  tickFormatter={(v) =>
                    Number(v).toLocaleString("en-IN", { maximumFractionDigits: 2, notation: "compact" })
                  }
                  width={48}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 10px 25px -12px rgba(37,99,235,0.2)",
                    fontSize: "13px",
                  }}
                  labelStyle={{ fontWeight: 700, color: "#0f172a" }}
                  formatter={(value) => {
                    const n = typeof value === "number" ? value : Number(value);
                    const text = Number.isFinite(n)
                      ? n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 4 })
                      : "—";
                    return [text, "NAV"];
                  }}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="nav"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: "#2563eb", stroke: "#fff", strokeWidth: 1.5 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto -mx-2 px-2 sm:mx-0 sm:px-0">
          <table className="w-full text-sm text-left min-w-[280px]">
            <thead>
              <tr className="text-xs uppercase tracking-widest text-slate-500 border-b border-slate-200">
                <th className="py-2 pr-4 font-bold">Date</th>
                <th className="py-2 font-bold">NAV</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={`${row.date}-${row.nav}`} className="border-b border-slate-100 last:border-0">
                  <td className="py-2 pr-4 text-slate-700">{row.date}</td>
                  <td className="py-2 font-semibold text-slate-900 tabular-nums">{row.nav}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
