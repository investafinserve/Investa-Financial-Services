import type { PortableTextBlock } from "@portabletext/types";
import type { Image } from "sanity";

export type PostListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  mainImage?: Image;
  author?: string;
  category?: string;
  readTimeMinutes?: number;
};

export type PostDetail = PostListItem & {
  body?: PortableTextBlock[];
};
