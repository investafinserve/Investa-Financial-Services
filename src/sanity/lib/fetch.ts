import { client, sanityConfigured } from "./client";
import {
  allPostSlugsQuery,
  postBySlugQuery,
  postsForHomeWithTotalQuery,
  postsForRssQuery,
  postsPaginatedQuery,
  relatedPostsBundleQuery,
} from "./queries";
import type { PostDetail, PostListItem } from "../types";

export async function getPostsForHomeWithTotal(): Promise<{
  posts: PostListItem[];
  total: number;
}> {
  if (!sanityConfigured) return { posts: [], total: 0 };
  return client.fetch(postsForHomeWithTotalQuery);
}

export async function getPostsPaginated(
  page: number,
  pageSize: number,
  rawQuery: string
): Promise<{ posts: PostListItem[]; total: number }> {
  if (!sanityConfigured) return { posts: [], total: 0 };
  const q = rawQuery.trim();
  const safe = q.replace(/[*"]/g, "");
  const search = safe === "" ? "" : `*${safe}*`;
  const start = Math.max(0, (page - 1) * pageSize);
  const end = start + pageSize;
  const query = postsPaginatedQuery(start, end);
  return client.fetch(query, { search });
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  if (!sanityConfigured) return null;
  return client.fetch(postBySlugQuery, { slug });
}

export async function getAllPostSlugsForSitemap(): Promise<{ slug: string; publishedAt: string }[]> {
  if (!sanityConfigured) return [];
  return client.fetch(allPostSlugsQuery);
}

export async function getPostsForRss(): Promise<
  { title: string; slug: string; excerpt: string; publishedAt: string }[]
> {
  if (!sanityConfigured) return [];
  return client.fetch(postsForRssQuery);
}

function mergeRelatedPosts(
  byCategory: PostListItem[],
  recent: PostListItem[],
  limit: number
): PostListItem[] {
  const seen = new Set<string>();
  const out: PostListItem[] = [];
  for (const p of byCategory) {
    if (out.length >= limit) break;
    if (!seen.has(p._id)) {
      seen.add(p._id);
      out.push(p);
    }
  }
  for (const p of recent) {
    if (out.length >= limit) break;
    if (!seen.has(p._id)) {
      seen.add(p._id);
      out.push(p);
    }
  }
  return out;
}

/** Related = same category (newest) first, then other recent posts. Never random. */
export async function getRelatedPosts(
  slug: string,
  category: string | undefined,
  limit = 3
): Promise<PostListItem[]> {
  if (!sanityConfigured) return [];
  const cat = category?.trim() || null;
  const bundle = await client.fetch<{ byCategory: PostListItem[]; recent: PostListItem[] }>(
    relatedPostsBundleQuery,
    { slug, category: cat }
  );
  return mergeRelatedPosts(bundle.byCategory ?? [], bundle.recent ?? [], limit);
}
