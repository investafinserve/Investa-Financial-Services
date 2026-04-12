export type MfapiNavRow = { date: string; nav: string };

export type MfapiTimeframe = "1Y" | "3Y" | "5Y" | "10Y";

export type MfapiFundMeta = {
  scheme_code: number;
  scheme_name: string;
  fund_house: string;
  scheme_type: string;
  scheme_category: string;
  isin_growth?: string | null;
  isin_div_reinvestment?: string | null;
};

export function parseNavDate(dateStr: string): Date {
  const parts = dateStr.split("-");
  return new Date(Number.parseInt(parts[2], 10), Number.parseInt(parts[1], 10) - 1, Number.parseInt(parts[0], 10));
}

/** Find NAV on the history point closest to `target` (± `maxDaySlack` calendar days). */
function findNavNearDate(
  data: MfapiNavRow[],
  latestDate: Date,
  target: Date,
  maxDaySlack = 18
): number | null {
  let bestDiff = Infinity;
  let bestNav: number | null = null;
  for (const row of data) {
    const e = parseNavDate(row.date);
    if (e.getTime() > latestDate.getTime()) continue;
    const diffDays = Math.abs((e.getTime() - target.getTime()) / (1000 * 3600 * 24));
    if (diffDays < bestDiff && diffDays <= maxDaySlack) {
      bestDiff = diffDays;
      bestNav = Number.parseFloat(row.nav);
    }
  }
  if (bestNav == null || !Number.isFinite(bestNav) || bestNav === 0) return null;
  return bestNav;
}

export type ExtendedNavMetrics = {
  previousNav: number | null;
  previousDateStr: string | null;
  dayChangeAbs: number | null;
  dayChangePct: number | null;
  mtdReturnPct: number | null;
  ytdReturnPct: number | null;
  oldestDateStr: string;
  oldestNav: number;
  historyCalendarDays: number;
  high52Week: number | null;
  low52Week: number | null;
  high52WeekDate: string | null;
  low52WeekDate: string | null;
  allTimeHigh: number;
  allTimeLow: number;
  allTimeHighDate: string;
  allTimeLowDate: string;
};

/** Extra stats derived entirely from the NAV series (same feed as returns). */
export function computeExtendedNavMetrics(data: MfapiNavRow[]): ExtendedNavMetrics | null {
  if (!data?.length) return null;

  const latestNav = Number.parseFloat(data[0].nav);
  const latestDateStr = data[0].date;
  const latestDate = parseNavDate(latestDateStr);
  if (!Number.isFinite(latestNav)) return null;

  const last = data[data.length - 1];
  const oldestNav = Number.parseFloat(last.nav);
  const oldestDate = parseNavDate(last.date);
  const historyCalendarDays = Math.max(
    0,
    Math.round((latestDate.getTime() - oldestDate.getTime()) / (1000 * 3600 * 24))
  );

  let prevNav: number | null = null;
  let prevDate: string | null = null;
  if (data.length >= 2) {
    prevNav = Number.parseFloat(data[1].nav);
    prevDate = data[1].date;
    if (!Number.isFinite(prevNav)) {
      prevNav = null;
      prevDate = null;
    }
  }

  let dayChangeAbs: number | null = null;
  let dayChangePct: number | null = null;
  if (prevNav != null && prevNav !== 0) {
    dayChangeAbs = latestNav - prevNav;
    dayChangePct = (dayChangeAbs / prevNav) * 100;
  }

  const monthStart = new Date(latestDate.getFullYear(), latestDate.getMonth(), 1);
  const yearStart = new Date(latestDate.getFullYear(), 0, 1);
  const navMtd = findNavNearDate(data, latestDate, monthStart);
  const navYtd = findNavNearDate(data, latestDate, yearStart);
  const mtdReturnPct =
    navMtd != null && navMtd !== 0 ? ((latestNav - navMtd) / navMtd) * 100 : null;
  const ytdReturnPct =
    navYtd != null && navYtd !== 0 ? ((latestNav - navYtd) / navYtd) * 100 : null;

  const cutoff52w = new Date(latestDate);
  cutoff52w.setDate(cutoff52w.getDate() - 365);

  let high52: number | null = null;
  let low52: number | null = null;
  let high52Date: string | null = null;
  let low52Date: string | null = null;

  let ath = -Infinity;
  let atl = Infinity;
  let athDate = "";
  let atlDate = "";

  for (const row of data) {
    const d = parseNavDate(row.date);
    if (d.getTime() > latestDate.getTime()) continue;
    const n = Number.parseFloat(row.nav);
    if (!Number.isFinite(n)) continue;

    if (n > ath) {
      ath = n;
      athDate = row.date;
    }
    if (n < atl) {
      atl = n;
      atlDate = row.date;
    }

    if (d.getTime() >= cutoff52w.getTime()) {
      if (high52 == null || n > high52) {
        high52 = n;
        high52Date = row.date;
      }
      if (low52 == null || n < low52) {
        low52 = n;
        low52Date = row.date;
      }
    }
  }

  return {
    previousNav: prevNav,
    previousDateStr: prevDate,
    dayChangeAbs,
    dayChangePct,
    mtdReturnPct,
    ytdReturnPct,
    oldestDateStr: last.date,
    oldestNav,
    historyCalendarDays,
    high52Week: high52,
    low52Week: low52,
    high52WeekDate: high52Date,
    low52WeekDate: low52Date,
    allTimeHigh: ath,
    allTimeLow: atl,
    allTimeHighDate: athDate,
    allTimeLowDate: atlDate,
  };
}

/** mfapi returns newest NAV first (`data[0]`). */
export function computeReturnsFromNavSeries(data: MfapiNavRow[]): {
  latestNav: number;
  latestDateStr: string;
  returns: Record<MfapiTimeframe, number | null>;
} {
  if (!data?.length) {
    return {
      latestNav: NaN,
      latestDateStr: "",
      returns: { "1Y": null, "3Y": null, "5Y": null, "10Y": null },
    };
  }

  const latestNav = Number.parseFloat(data[0].nav);
  const latestDateStr = data[0].date;
  const latestDate = parseNavDate(latestDateStr);

  const calculateReturnForYears = (years: number): number | null => {
    const targetDate = new Date(
      latestDate.getFullYear() - years,
      latestDate.getMonth(),
      latestDate.getDate()
    );
    let oldNavRaw: number | null = null;
    let smallestDiff = Infinity;

    for (const entry of data) {
      const eDate = parseNavDate(entry.date);
      const diffDays = Math.abs((eDate.getTime() - targetDate.getTime()) / (1000 * 3600 * 24));
      if (diffDays < smallestDiff && diffDays <= 12) {
        smallestDiff = diffDays;
        oldNavRaw = Number.parseFloat(entry.nav);
      }
    }

    if (oldNavRaw == null || !Number.isFinite(oldNavRaw) || oldNavRaw === 0) return null;
    if (years === 1) {
      return ((latestNav - oldNavRaw) / oldNavRaw) * 100;
    }
    return (Math.pow(latestNav / oldNavRaw, 1 / years) - 1) * 100;
  };

  return {
    latestNav,
    latestDateStr,
    returns: {
      "1Y": calculateReturnForYears(1),
      "3Y": calculateReturnForYears(3),
      "5Y": calculateReturnForYears(5),
      "10Y": calculateReturnForYears(10),
    },
  };
}
