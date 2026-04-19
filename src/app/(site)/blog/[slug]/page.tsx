import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArticleShare from "@/components/ArticleShare";
import { ArticleToc } from "@/components/ArticleToc";
import { BlogBackToTop, BlogReadingProgress } from "@/components/BlogArticleChrome";
import BlogCard from "@/components/BlogCard";
import PortableBody from "@/components/PortableBody";
import { getMetadataBase } from "@/lib/site";
import { SITE_KEYWORDS } from "@/lib/seo";
import { extractTocFromPortableText } from "@/lib/portable-toc";
import { getPostBySlug, getRelatedPosts } from "@/sanity/lib/fetch";
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

async function resolveArticleUrl(slug: string): Promise<string> {
  const envBase = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const headersList = await headers();
  const host = headersList.get("x-forwarded-host") ?? headersList.get("host") ?? "";
  const proto = headersList.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const runtimeBase = host ? `${proto}://${host}` : "";
  const base = envBase || runtimeBase;
  if (base) return `${base}/blog/${slug}`;
  return new URL(`/blog/${slug}`, getMetadataBase()).href;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: "Article not found" };
  }

  const canonical = new URL(`/blog/${slug}`, getMetadataBase()).toString();
  const ogImageUrl = post.mainImage ? urlForImage(post.mainImage)?.width(1200).height(630).fit("crop").url() : null;
  const ogAlt =
    post.mainImage && typeof post.mainImage === "object" && "alt" in post.mainImage && post.mainImage.alt
      ? String(post.mainImage.alt)
      : post.title;

  const keywords = Array.from(
    new Set([...(post.category ? [post.category] : []), ...SITE_KEYWORDS, "investment article"])
  );

  return {
    title: post.title,
    description: post.excerpt,
    keywords,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      url: canonical,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630, alt: ogAlt }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ogImageUrl ? [ogImageUrl] : undefined,
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

  const related = await getRelatedPosts(slug, post.category, 3);
  const articleUrl = await resolveArticleUrl(slug);
  const toc = extractTocFromPortableText(post.body);

  const cover = post.mainImage ? urlForImage(post.mainImage)?.width(1600).height(900).url() : null;
  const coverAlt =
    post.mainImage && typeof post.mainImage === "object" && "alt" in post.mainImage && post.mainImage.alt
      ? String(post.mainImage.alt)
      : post.title;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author?.trim() || "Investa Finserve",
    },
    image: cover ? [cover] : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  };

  return (
    <div className="flex flex-col flex-1">
      <BlogReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="flex-1 mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 md:py-14">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 mb-8"
        >
          ← All articles
        </Link>

        <header className="mb-8 max-w-3xl">
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
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-slate-100 shadow-lg mb-8 sm:mb-10">
            <Image src={cover} alt={coverAlt} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 768px" />
          </div>
        ) : null}

        <ArticleToc items={toc} />

        <div className="prose prose-slate max-w-none">
          {post.body?.length ? (
            <PortableBody value={post.body} />
          ) : (
            <p className="text-slate-600 leading-relaxed">{post.excerpt}</p>
          )}
        </div>
      </article>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 border-t border-slate-100 pt-10 md:pt-12 pb-14 md:pb-16 space-y-10 md:space-y-14">
        <ArticleShare url={articleUrl} title={post.title} />

        {related.length > 0 ? (
          <section aria-labelledby="related-posts-heading">
            <h2 id="related-posts-heading" className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
              Related articles
            </h2>
            <p className="text-sm text-slate-600 mb-8 max-w-2xl">
              {post.category ? (
                <>
                  More in{" "}
                  <span className="font-semibold text-slate-800">{post.category}</span>, plus other recent articles.
                </>
              ) : (
                <>Other recent articles you might like.</>
              )}
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p._id} post={p} />
              ))}
            </div>
          </section>
        ) : null}
      </div>

      <BlogBackToTop />
    </div>
  );
}
