import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PortableBody from "@/components/PortableBody";
import { getPostBySlug } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/image";
import { sanityConfigured } from "@/sanity/lib/client";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: "Article not found | Investa Finserve" };
  }
  return {
    title: `${post.title} | Investa Finserve`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  if (!sanityConfigured) {
    return (
      <div className="flex flex-col flex-1">
        <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-14 sm:px-6">
          <p className="text-slate-700 text-center">
            Configure Sanity environment variables to load this article.{" "}
            <Link href="/blog" className="text-blue-600 font-semibold">
              Back to blog
            </Link>
          </p>
        </main>
      </div>
    );
  }

  const post = await getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const cover = post.mainImage ? urlForImage(post.mainImage)?.width(1600).height(900).url() : null;
  const coverAlt =
    post.mainImage && typeof post.mainImage === "object" && "alt" in post.mainImage && post.mainImage.alt
      ? String(post.mainImage.alt)
      : post.title;

  return (
    <div className="flex flex-col flex-1">
      <article className="flex-1 mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 md:py-14">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 mb-8"
        >
          ← All articles
        </Link>

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
            {post.category ? (
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                {post.category}
              </span>
            ) : null}
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            {post.readTimeMinutes ? <span>{post.readTimeMinutes} min read</span> : null}
            {post.author ? <span>By {post.author}</span> : null}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">{post.excerpt}</p>
        </header>

        {cover ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-slate-100 shadow-lg mb-10">
            <Image src={cover} alt={coverAlt} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 768px" />
          </div>
        ) : null}

        <div className="prose prose-slate max-w-none">
          {post.body?.length ? (
            <PortableBody value={post.body} />
          ) : (
            <p className="text-slate-600 leading-relaxed">{post.excerpt}</p>
          )}
        </div>
      </article>
    </div>
  );
}
