import type { Metadata } from "next";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import { BLOG_LIST_DESCRIPTION, SITE_KEYWORDS, SITE_NAME } from "@/lib/seo";
import { getPostsPaginated } from "@/sanity/lib/fetch";
import { sanityConfigured } from "@/sanity/lib/client";

const PAGE_SIZE = 10;

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Insights & Resources",
  description: BLOG_LIST_DESCRIPTION,
  keywords: [...SITE_KEYWORDS, "investment blog", "mutual fund articles", "SIP guide"],
  openGraph: {
    title: `Blog | ${SITE_NAME}`,
    description: BLOG_LIST_DESCRIPTION,
    url: "/blog",
    type: "website",
  },
  twitter: {
    title: `Blog | ${SITE_NAME}`,
    description: BLOG_LIST_DESCRIPTION,
  },
  alternates: { canonical: "/blog" },
};

type Props = {
  searchParams: Promise<{ page?: string; q?: string }>;
};

/** Page numbers with ellipses when there are many pages. */
function getPaginationItems(current: number, totalPages: number): (number | "ellipsis")[] {
  if (totalPages <= 9) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const s = new Set<number>();
  s.add(1);
  s.add(totalPages);
  for (let d = -2; d <= 2; d++) {
    const p = current + d;
    if (p >= 1 && p <= totalPages) s.add(p);
  }
  const sorted = [...s].sort((a, b) => a - b);
  const out: (number | "ellipsis")[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) out.push("ellipsis");
    out.push(sorted[i]);
  }
  return out;
}

export default async function BlogIndexPage({ searchParams }: Props) {
  const sp = await searchParams;
  const requestedPage = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);
  const q = typeof sp.q === "string" ? sp.q : "";
  const { posts: initialPosts, total } = await getPostsPaginated(requestedPage, PAGE_SIZE, q);
  let posts = initialPosts;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(requestedPage, totalPages);
  if (page !== requestedPage && total > 0) {
    const corrected = await getPostsPaginated(page, PAGE_SIZE, q);
    posts = corrected.posts;
  }
  const startIdx = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const endIdx = total === 0 ? 0 : Math.min(page * PAGE_SIZE, total);
  const remainingArticles = Math.max(0, total - endIdx);
  const remainingPages = Math.max(0, totalPages - page);
  const paginationItems = getPaginationItems(page, totalPages);

  const buildHref = (p: number) => {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (p > 1) params.set("page", String(p));
    const s = params.toString();
    return s ? `/blog?${s}` : "/blog";
  };

  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 md:py-14">
        <div className="text-center space-y-3 mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Blog</p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Insights & <span className="text-gradient">Resources</span>
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base font-medium">
            Articles on investing, mutual funds, and building long-term wealth—search by title or excerpt.
          </p>
          <p className="text-center">
            <a
              href="/blog/rss.xml"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 underline-offset-2 hover:underline"
            >
              RSS feed
            </a>
          </p>
        </div>

        {!sanityConfigured ? (
          <div className="glass-card rounded-3xl p-8 text-center text-slate-700 max-w-xl mx-auto">
            <p className="font-semibold text-slate-900 mb-2">Sanity is not configured yet</p>
            <p className="text-sm leading-relaxed">
              Add <code className="text-blue-700 bg-blue-50 px-1 rounded">NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{" "}
              <code className="text-blue-700 bg-blue-50 px-1 rounded">NEXT_PUBLIC_SANITY_DATASET</code> to your
              environment (see <code className="text-blue-700 bg-blue-50 px-1 rounded">.env.example</code>), then open{" "}
              <Link href="/studio" className="text-blue-600 font-semibold underline underline-offset-2">
                /studio
              </Link>{" "}
              to create posts.
            </p>
          </div>
        ) : (
          <>
            <form
              method="get"
              action="/blog"
              className="mb-8 flex flex-col sm:flex-row gap-3 sm:items-center justify-center max-w-2xl mx-auto"
              role="search"
            >
              <label className="sr-only" htmlFor="blog-search">
                Search articles
              </label>
              <input
                id="blog-search"
                name="q"
                type="search"
                defaultValue={q}
                placeholder="Search by title or description…"
                className="flex-1 min-w-0 rounded-full border border-slate-200 bg-white/90 px-5 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-300"
              />
              <div className="flex gap-2 justify-center">
                <button
                  type="submit"
                  className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-md hover:opacity-95 transition-opacity"
                >
                  Search
                </button>
                {q.trim() ? (
                  <Link
                    href="/blog"
                    className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Clear
                  </Link>
                ) : null}
              </div>
            </form>

            {total > 0 && posts.length > 0 ? (
              <div className="mb-8 rounded-2xl border border-slate-200/80 bg-white/60 px-4 py-3 text-center text-sm text-slate-700 sm:px-6">
                <p className="font-semibold text-slate-900">
                  Showing <span className="tabular-nums">{startIdx}</span>–
                  <span className="tabular-nums">{endIdx}</span> of{" "}
                  <span className="tabular-nums">{total}</span> article{total === 1 ? "" : "s"}
                </p>
                <p className="mt-1 text-slate-600">
                  Page <span className="font-bold text-slate-800 tabular-nums">{page}</span> of{" "}
                  <span className="font-bold text-slate-800 tabular-nums">{totalPages}</span>
                  {page < totalPages ? (
                    <>
                      {" "}
                      · <span className="tabular-nums font-semibold text-slate-800">{remainingArticles}</span> more
                      article{remainingArticles === 1 ? "" : "s"} across{" "}
                      <span className="tabular-nums font-semibold text-slate-800">{remainingPages}</span> further page
                      {remainingPages === 1 ? "" : "s"}
                    </>
                  ) : (
                    <> · You&apos;re on the last page</>
                  )}
                </p>
              </div>
            ) : null}

            {posts.length === 0 ? (
              <p className="text-center text-slate-600 py-12">
                No articles match your search. Try different keywords or{" "}
                <Link href="/blog" className="text-blue-600 font-semibold">
                  view all
                </Link>
                .
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {posts.map((post, i) => (
                  <BlogCard key={post._id} post={post} priority={i < 3} />
                ))}
              </div>
            )}

            {totalPages > 1 && posts.length > 0 ? (
              <nav
                className="mt-12 flex flex-col items-center gap-4"
                aria-label="Pagination"
              >
                <p className="text-xs font-medium text-slate-500">
                  Go to page ({totalPages} total)
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Link
                    href={buildHref(page - 1)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold border ${
                      page <= 1
                        ? "pointer-events-none opacity-40 border-slate-200 text-slate-400"
                        : "border-slate-200 bg-white hover:bg-slate-50 text-slate-800"
                    }`}
                    aria-disabled={page <= 1}
                  >
                    Previous
                  </Link>
                  {paginationItems.map((item, idx) =>
                    item === "ellipsis" ? (
                      <span
                        key={`e-${idx}`}
                        className="px-2 text-slate-400 font-bold select-none"
                        aria-hidden
                      >
                        …
                      </span>
                    ) : (
                      <Link
                        key={item}
                        href={buildHref(item)}
                        className={`min-w-[2.5rem] text-center rounded-full px-3 py-2 text-sm font-bold border ${
                          item === page
                            ? "border-blue-500 bg-blue-50 text-blue-800"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {item}
                      </Link>
                    )
                  )}
                  <Link
                    href={buildHref(page + 1)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold border ${
                      page >= totalPages
                        ? "pointer-events-none opacity-40 border-slate-200 text-slate-400"
                        : "border-slate-200 bg-white hover:bg-slate-50 text-slate-800"
                    }`}
                    aria-disabled={page >= totalPages}
                  >
                    Next
                  </Link>
                </div>
              </nav>
            ) : null}
          </>
        )}
      </main>
    </div>
  );
}
