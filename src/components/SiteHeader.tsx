import Image from "next/image";
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-slate-200 shadow-sm transition-all duration-300">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Image
              src="/investa-financial-logo.png"
              alt="Investa Finserve Services logo"
              width={44}
              height={44}
              className="h-10 w-auto sm:h-11 relative z-10 drop-shadow-[0_0_4px_rgba(0,0,0,0.1)]"
            />
          </div>
          <div className="leading-tight">
            <p className="text-base sm:text-lg font-bold text-slate-900 tracking-wide group-hover:text-blue-700 transition-colors">
              Investa
            </p>
            <p className="text-[0.7rem] sm:text-xs text-blue-600 font-bold uppercase tracking-widest">
              Financial Services
            </p>
          </div>
        </Link>

        <nav
          className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-xs sm:text-sm font-medium text-slate-600 md:gap-6"
          aria-label="Primary"
        >
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="/blog" className="hover:text-blue-600 transition-colors font-semibold text-blue-700/90">
            Blog
          </Link>
          <Link href="/#curated" className="hover:text-blue-600 transition-colors hidden sm:inline">
            Curated Funds
          </Link>
          <Link href="/#calculators" className="hover:text-blue-600 transition-colors hidden sm:inline">
            Calculators
          </Link>
          <Link href="/#learn" className="hover:text-blue-600 transition-colors hidden md:inline">
            Learn
          </Link>
          <a
            href="tel:+919909111020"
            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-blue-200 text-blue-700 font-semibold hover:bg-blue-50 transition-all shadow-sm whitespace-nowrap"
          >
            Contact Us
          </a>
        </nav>
      </div>
    </header>
  );
}
