import { getSiteOrigin } from "@/lib/site";
import { getPostsForRss } from "@/sanity/lib/fetch";
import { sanityConfigured } from "@/sanity/lib/client";

export const revalidate = 60;

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const origin = getSiteOrigin();
  const posts = sanityConfigured ? await getPostsForRss() : [];

  const items = posts
    .map((p) => {
      const link = `${origin}/blog/${p.slug}`;
      const pub = new Date(p.publishedAt).toUTCString();
      return `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${pub}</pubDate>
      <description>${escapeXml(p.excerpt)}</description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Investa Finserve — Blog</title>
    <link>${escapeXml(`${origin}/blog`)}</link>
    <description>Articles on investing, mutual funds, and long-term wealth.</description>
    <language>en</language>
    <atom:link href="${escapeXml(`${origin}/blog/rss.xml`)}" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
