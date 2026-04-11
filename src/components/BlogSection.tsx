import Link from "next/link";
import { getPostsForHome } from "@/sanity/lib/fetch";
import BlogCard from "./BlogCard";

export default async function BlogSection() {
  const posts = await getPostsForHome();
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <div className="text-center space-y-4 mb-10">
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
          Insights & <span className="text-gradient">Articles</span>
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base font-medium">
          Practical ideas on mutual funds, goal-based investing, and building wealth—written for young investors.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {posts.slice(0, 4).map((post, i) => (
          <BlogCard key={post._id} post={post} priority={i < 2} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-blue-200 bg-white/80 text-blue-700 font-bold text-sm shadow-sm hover:bg-blue-50 hover:border-blue-300 transition-all"
        >
          View all articles
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
