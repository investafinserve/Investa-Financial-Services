import { client, sanityConfigured } from "./client";
import {
  postBySlugQuery,
  postsForHomeQuery,
  postsPaginatedQuery,
} from "./queries";
import type { PostDetail, PostListItem } from "../types";

export async function getPostsForHome(): Promise<PostListItem[]> {
  if (!sanityConfigured) return [];
  return client.fetch(postsForHomeQuery);
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
