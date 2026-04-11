import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import type { PostListItem } from "@/sanity/types";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function BlogCard({ post, priority }: { post: PostListItem; priority?: boolean }) {
  const img = post.mainImage ? urlForImage(post.mainImage) : null;
  const url = img?.width(800).height(450).url() ?? null;

  return (
    <article className="group glass-card rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(37,99,235,0.2)] flex flex-col h-full">
      <Link href={`/blog/${post.slug}`} className="flex flex-col flex-1">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
          {url ? (
            <Image
              src={url}
              alt={(post.mainImage as { alt?: string } | undefined)?.alt?.trim() || post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={priority}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 flex items-center justify-center text-4xl">
              📰
            </div>
          )}
        </div>
        <div className="p-5 sm:p-6 flex-1 flex flex-col">
          <div className="flex flex-wrap items-center gap-2 text-[0.65rem] sm:text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
            {post.category ? (
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                {post.category}
              </span>
            ) : null}
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            {post.readTimeMinutes ? <span>{post.readTimeMinutes} min read</span> : null}
          </div>
          <h3 className="font-bold text-base sm:text-lg text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
            {post.title}
          </h3>
          <p className="text-sm text-slate-600 line-clamp-3 flex-1">{post.excerpt}</p>
          <span className="mt-4 inline-flex items-center text-sm font-bold text-blue-600">
            Read article
            <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
