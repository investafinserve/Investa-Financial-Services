import { unstable_cache } from "next/cache";
import { isCuratedFundCode } from "@/lib/curated-funds";
import {
  computeExtendedNavMetrics,
  computeReturnsFromNavSeries,
  type ExtendedNavMetrics,
  type MfapiFundMeta,
  type MfapiNavRow,
} from "@/lib/mfapi/compute";

export type CuratedFundMfapiBundle = {
  meta: MfapiFundMeta;
  latestNav: number;
  latestDateStr: string;
  returns: ReturnType<typeof computeReturnsFromNavSeries>["returns"];
  extended: ExtendedNavMetrics | null;
  /** Newest-first NAV samples for a small table */
  recentNavRows: MfapiNavRow[];
  totalNavPoints: number;
};

async function fetchMfapiScheme(schemeCode: number): Promise<CuratedFundMfapiBundle> {
  const r = await fetch(`https://api.mfapi.in/mf/${schemeCode}`, {
    next: { revalidate: 3600 },
  });
  if (!r.ok) throw new Error(`mfapi.in HTTP ${r.status}`);
  const j = (await r.json()) as { meta?: MfapiFundMeta; data?: MfapiNavRow[] };
  if (!j.meta || !j.data?.length) throw new Error("mfapi.in: missing meta or data");
  const { latestNav, latestDateStr, returns } = computeReturnsFromNavSeries(j.data);
  if (!Number.isFinite(latestNav)) throw new Error("mfapi.in: invalid NAV");
  return {
    meta: j.meta,
    latestNav,
    latestDateStr,
    returns,
    extended: computeExtendedNavMetrics(j.data),
    recentNavRows: j.data.slice(0, 36),
    totalNavPoints: j.data.length,
  };
}

/** Cached mfapi.in payload for curated scheme codes (1h revalidate). */
export function getCuratedFundMfapiCached(schemeCode: number) {
  if (!isCuratedFundCode(schemeCode)) {
    return Promise.reject(new Error("Invalid curated fund scheme code"));
  }
  return unstable_cache(
    () => fetchMfapiScheme(schemeCode),
    ["curated-fund-mfapi", String(schemeCode)],
    { revalidate: 3600 }
  )();
}
