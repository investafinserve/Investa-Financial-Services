/** Canonical site URL for metadata, sitemap, and RSS. Set NEXT_PUBLIC_SITE_URL in production. */
export function getMetadataBase(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    try {
      const normalized = raw.replace(/\/$/, "");
      return new URL(normalized);
    } catch {
      /* fall through */
    }
  }
  return new URL("http://localhost:3000");
}

export function getSiteOrigin(): string {
  return getMetadataBase().origin;
}
