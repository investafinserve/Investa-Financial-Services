import Link from "next/link";

export default function BlogPostNotFound() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center px-4 py-20 text-center">
      <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Article not found</h1>
      <p className="text-slate-600 mb-6 max-w-md">
        This article may have been moved or the link is incorrect.
      </p>
      <Link
        href="/blog"
        className="inline-flex rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-md hover:opacity-95"
      >
        Back to blog
      </Link>
    </div>
  );
}
