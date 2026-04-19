import type { Metadata } from "next";
import { getMetadataBase } from "./site";

export const SITE_NAME = "Investa Finserve";

/** Primary and supporting phrases for `<meta name="keywords">` and copy consistency. */
export const SITE_KEYWORDS = [
  SITE_NAME,
  "Investa",
  "Who is Investa",
  "Samir Shah",
  "mutual funds",
  "mutual fund investment",
  "SIP",
  "SIP investment",
  "investment in SIP",
  "systematic investment plan",
  "financial plan",
  "financial planning",
  "financial growth",
  "wealth planning",
  "wealth management",
  "goal-based investing",
  "retirement planning",
  "tax planning",
  "asset allocation",
  "equity mutual funds",
  "debt mutual funds",
  "portfolio planning",
  "Indian markets",
  "stock market India",
  "market outlook",
  "MF investment",
  "NAV",
  "AMFI",
  "long-term investing",
  "rupee cost averaging",
];

export const SITE_DESCRIPTION =
  "Investa Finserve (Investa) offers mutual fund and SIP guidance, financial planning, and wealth growth strategies for Indian investors. Explore systematic investment plans, goal-based planning, and market-smart investing with Samir Shah and the Investa team.";

export const BLOG_LIST_DESCRIPTION = `Mutual funds, SIP, financial planning, and market insights — articles and resources from ${SITE_NAME}.`;

/** Default + Open Graph + Twitter for the whole site (pages can override). */
export function getRootMetadata(): Metadata {
  const base = getMetadataBase();
  const defaultTitle = `${SITE_NAME} | Mutual Funds, SIP & Financial Planning`;

  return {
    metadataBase: base,
    title: {
      default: defaultTitle,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    keywords: SITE_KEYWORDS,
    authors: [{ name: "Samir Shah" }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: base,
      siteName: SITE_NAME,
      title: defaultTitle,
      description: SITE_DESCRIPTION,
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: SITE_DESCRIPTION,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    category: "finance",
    alternates: {
      canonical: "/",
    },
  };
}
