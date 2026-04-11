import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import { getPostsPaginated } from "@/sanity/lib/fetch";
import { sanityConfigured } from "@/sanity/lib/client";

const PAGE_SIZE = 6;

export const revalidate = 60;

type Props = {
  searchParams: Promise<{ page?: string; q?: string }>;
};

export default async function BlogIndexPage({ searchParams }: Props) {
  const sp = await searchParams;
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);
  const q = typeof sp.q === "string" ? sp.q : "";
  const { posts, total } = await getPostsPaginated(page, PAGE_SIZE, q);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

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
        <div className="text-center space-y-3 mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Blog</p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Insights & <span className="text-gradient">Resources</span>
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base font-medium">
            Articles on investing, mutual funds, and building long-term wealth—search by title or excerpt.
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
              className="mb-10 flex flex-col sm:flex-row gap-3 sm:items-center justify-center max-w-2xl mx-auto"
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
                className="mt-12 flex flex-wrap items-center justify-center gap-2"
                aria-label="Pagination"
              >
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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={buildHref(p)}
                    className={`min-w-[2.5rem] text-center rounded-full px-3 py-2 text-sm font-bold border ${
                      p === page
                        ? "border-blue-500 bg-blue-50 text-blue-800"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {p}
                  </Link>
                ))}
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
              </nav>
            ) : null}
          </>
        )}
      </main>
    </div>
  );
}
