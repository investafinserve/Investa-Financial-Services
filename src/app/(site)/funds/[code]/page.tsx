import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FundNavHistory from "@/components/FundNavHistory";
import { SITE_KEYWORDS } from "@/lib/seo";
import { isCuratedFundCode } from "@/lib/curated-funds";
import { getCuratedFundMfapiCached } from "@/lib/funds/get-curated-fund-mfapi";
import type { MfapiTimeframe } from "@/lib/mfapi/compute";

export const revalidate = 3600;

type Props = { params: Promise<{ code: string }> };

const TIMEFRAMES: MfapiTimeframe[] = ["1Y", "3Y", "5Y", "10Y"];

function Row({ label, value }: { label: string; value?: string | number | null }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-3 border-b border-slate-100 last:border-0">
      <dt className="text-xs font-bold uppercase tracking-widest text-slate-500 sm:w-52 shrink-0">{label}</dt>
      <dd className="text-sm text-slate-800 font-medium flex-1 break-words">{value}</dd>
    </div>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const n = Number.parseInt(code, 10);
  const fundKeywords = ["mutual fund NAV", "MF scheme", "fund performance", ...SITE_KEYWORDS];
  if (!isCuratedFundCode(n)) return { title: "Fund", keywords: fundKeywords };
  try {
    const r = await fetch(`https://api.mfapi.in/mf/${n}`, { next: { revalidate: 3600 } });
    if (!r.ok) return { title: "Fund", keywords: fundKeywords };
    const j = (await r.json()) as { meta?: { scheme_name?: string; scheme_category?: string } };
    const name = j.meta?.scheme_name ?? "Fund";
    const cat = j.meta?.scheme_category;
    const desc = cat ? `${name} — ${cat}. Live NAV and performance snapshot on Investa Finserve.` : `${name} — live NAV and performance snapshot.`;
    return {
      title: name,
      description: desc,
      keywords: Array.from(new Set([...(cat ? [cat] : []), ...fundKeywords])),
    };
  } catch {
    return { title: "Fund", keywords: fundKeywords };
  }
}

function fmtPct(v: number | null) {
  if (v === null || !Number.isFinite(v)) return "—";
  const sign = v >= 0 ? "+" : "";
  return `${sign}${v.toFixed(2)}%`;
}

function fmtNav(n: number) {
  return `₹ ${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 4 })}`;
}

export default async function CuratedFundPage({ params }: Props) {
  const { code } = await params;
  const n = Number.parseInt(code, 10);
  if (!Number.isFinite(n) || !isCuratedFundCode(n)) {
    notFound();
  }

  let bundle: Awaited<ReturnType<typeof getCuratedFundMfapiCached>>;
  try {
    bundle = await getCuratedFundMfapiCached(n);
  } catch {
    notFound();
  }

  const { meta, latestNav, latestDateStr, returns, extended, recentNavRows, totalNavPoints } = bundle;
  const histYears =
    extended && extended.historyCalendarDays > 0
      ? (extended.historyCalendarDays / 365.25).toFixed(1)
      : null;

  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 md:py-14">
        <Link
          href="/#curated"
          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 mb-8"
        >
          ← Curated mutual funds
        </Link>

        <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-emerald-700 mb-2">AMFI scheme {n}</p>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {meta.scheme_name}
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          {meta.fund_house} · {meta.scheme_category}
        </p>

        <p className="mt-4 text-xs text-slate-500 leading-relaxed max-w-2xl">
          Trailing returns below are calculated automatically from the published NAV series (1 year absolute change;
          longer periods as annualised CAGR). Figures are indicative and not investment advice.
        </p>

        <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-card rounded-2xl p-6 border border-white/80">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Latest NAV</p>
            <p className="text-3xl font-black text-slate-900">{fmtNav(latestNav)}</p>
            <p className="text-xs text-slate-500 mt-1">As on {latestDateStr}</p>
            {extended?.dayChangePct != null && extended.previousNav != null ? (
              <p
                className={`mt-3 text-sm font-bold ${
                  extended.dayChangePct >= 0 ? "text-emerald-700" : "text-red-600"
                }`}
              >
                {extended.dayChangePct >= 0 ? "▲" : "▼"}{" "}
                {extended.dayChangeAbs != null
                  ? `${extended.dayChangeAbs >= 0 ? "+" : ""}${extended.dayChangeAbs.toFixed(4)}`
                  : ""}{" "}
                ({fmtPct(extended.dayChangePct)} vs prior{" "}
                {extended.previousDateStr ? `close ${extended.previousDateStr}` : "close"})
              </p>
            ) : null}
          </div>
          <div className="glass-card rounded-2xl p-6 border border-white/80">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Trailing returns</p>
            <ul className="space-y-2 text-sm">
              {TIMEFRAMES.map((tf) => (
                <li key={tf} className="flex justify-between gap-4">
                  <span className="text-slate-600 font-semibold">{tf}</span>
                  <span
                    className={`font-bold tabular-nums ${
                      returns[tf] == null
                        ? "text-slate-400"
                        : returns[tf]! >= 0
                          ? "text-emerald-700"
                          : "text-red-600"
                    }`}
                  >
                    {fmtPct(returns[tf])}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {extended ? (
          <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-6 border border-white/80">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Calendar returns</p>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between gap-4">
                  <span className="text-slate-600 font-semibold">MTD</span>
                  <span
                    className={`font-bold tabular-nums ${
                      extended.mtdReturnPct == null
                        ? "text-slate-400"
                        : extended.mtdReturnPct >= 0
                          ? "text-emerald-700"
                          : "text-red-600"
                    }`}
                  >
                    {fmtPct(extended.mtdReturnPct)}
                  </span>
                </li>
                <li className="flex justify-between gap-4">
                  <span className="text-slate-600 font-semibold">YTD</span>
                  <span
                    className={`font-bold tabular-nums ${
                      extended.ytdReturnPct == null
                        ? "text-slate-400"
                        : extended.ytdReturnPct >= 0
                          ? "text-emerald-700"
                          : "text-red-600"
                    }`}
                  >
                    {fmtPct(extended.ytdReturnPct)}
                  </span>
                </li>
              </ul>
            </div>
            <div className="glass-card rounded-2xl p-6 border border-white/80">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">NAV range</p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                <li className="flex flex-col gap-0.5">
                  <span className="font-semibold text-slate-800">52-week high</span>
                  <span className="tabular-nums">
                    {extended.high52Week != null ? fmtNav(extended.high52Week) : "—"}
                    {extended.high52WeekDate ? (
                      <span className="text-slate-500 font-normal"> · {extended.high52WeekDate}</span>
                    ) : null}
                  </span>
                </li>
                <li className="flex flex-col gap-0.5">
                  <span className="font-semibold text-slate-800">52-week low</span>
                  <span className="tabular-nums">
                    {extended.low52Week != null ? fmtNav(extended.low52Week) : "—"}
                    {extended.low52WeekDate ? (
                      <span className="text-slate-500 font-normal"> · {extended.low52WeekDate}</span>
                    ) : null}
                  </span>
                </li>
                <li className="flex flex-col gap-0.5 pt-1 border-t border-slate-100">
                  <span className="font-semibold text-slate-800">All-time high (in series)</span>
                  <span className="tabular-nums">
                    {fmtNav(extended.allTimeHigh)}
                    <span className="text-slate-500 font-normal"> · {extended.allTimeHighDate}</span>
                  </span>
                </li>
                <li className="flex flex-col gap-0.5">
                  <span className="font-semibold text-slate-800">All-time low (in series)</span>
                  <span className="tabular-nums">
                    {fmtNav(extended.allTimeLow)}
                    <span className="text-slate-500 font-normal"> · {extended.allTimeLowDate}</span>
                  </span>
                </li>
              </ul>
            </div>
          </section>
        ) : null}

        <section className="mt-8 glass-card rounded-2xl p-6 border border-white/80">
          <h2 className="text-lg font-extrabold text-slate-900 mb-4">Scheme details</h2>
          <dl>
            <Row label="Fund house" value={meta.fund_house} />
            <Row label="Category" value={meta.scheme_category} />
            <Row label="Scheme type" value={meta.scheme_type} />
            <Row label="ISIN (growth)" value={meta.isin_growth ?? undefined} />
            <Row label="ISIN (div. reinvestment)" value={meta.isin_div_reinvestment ?? undefined} />
            <Row label="Published NAV data points" value={totalNavPoints} />
            {extended ? (
              <>
                <Row label="Oldest NAV in series" value={`${fmtNav(extended.oldestNav)} · ${extended.oldestDateStr}`} />
                <Row
                  label="History span"
                  value={
                    histYears
                      ? `~${histYears} years (${extended.historyCalendarDays.toLocaleString("en-IN")} days)`
                      : undefined
                  }
                />
              </>
            ) : null}
          </dl>
        </section>

        <FundNavHistory rows={recentNavRows} />
      </main>
    </div>
  );
}
