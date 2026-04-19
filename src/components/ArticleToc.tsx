import type { TocItem } from "@/lib/portable-toc";

function TocList({ items, className }: { items: TocItem[]; className?: string }) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item._key}>
          <a
            href={`#${item._key}`}
            className={
              item.level === 3
                ? "block py-1 pl-3 text-sm text-slate-600 hover:text-blue-600 border-l-2 border-transparent hover:border-blue-200 transition-colors"
                : "block py-1.5 text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors"
            }
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Inline TOC below the hero image — same centered column as the article. */
export function ArticleToc({ items }: { items: TocItem[] }) {
  if (items.length < 2) return null;

  return (
    <nav
      className="rounded-2xl border border-slate-100 bg-white/80 p-4 sm:p-5 mb-8 sm:mb-10 shadow-sm w-full"
      aria-label="On this page"
    >
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">On this page</p>
      <TocList items={items} className="space-y-0.5" />
    </nav>
  );
}
