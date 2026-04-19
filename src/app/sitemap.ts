import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/site";
import { getAllPostSlugsForSitemap } from "@/sanity/lib/fetch";
import { sanityConfigured } from "@/sanity/lib/client";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = getSiteOrigin();
  const last = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: origin, lastModified: last, changeFrequency: "weekly", priority: 1 },
    { url: `${origin}/blog`, lastModified: last, changeFrequency: "weekly", priority: 0.85 },
  ];

  if (!sanityConfigured) {
    return staticRoutes;
  }

  const posts = await getAllPostSlugsForSitemap();
  const blogEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${origin}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [...staticRoutes, ...blogEntries];
}
