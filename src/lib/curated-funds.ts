/** AMFI scheme codes shown under Curated Mutual Funds (must match `LiveMutualFunds.tsx`). */
export const CURATED_FUND_SCHEME_CODES = [
  122639, 119835, 118955, 120586, 147704, 120828, 118778, 127042,
] as const;

export type CuratedFundSchemeCode = (typeof CURATED_FUND_SCHEME_CODES)[number];

export function isCuratedFundCode(code: number): code is CuratedFundSchemeCode {
  return (CURATED_FUND_SCHEME_CODES as readonly number[]).includes(code);
}
