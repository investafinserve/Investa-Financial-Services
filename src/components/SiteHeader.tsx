"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/faqs", label: "FAQs" },
  { href: "/#curated", label: "Curated Funds" },
  { href: "/#calculators", label: "Calculators" },
  { href: "/#learn", label: "Learn" },
  { href: "/#blog", label: "Blog" },
] as const;

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 border-b border-slate-200 shadow-sm transition-all duration-300 bg-white/70 backdrop-blur-xl ${
        menuOpen ? "z-[100]" : "z-50"
      }`}
    >
      {menuOpen ? (
        <button
          type="button"
          className="md:hidden fixed inset-0 z-[1] bg-slate-900/40 backdrop-blur-[2px]"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      ) : null}

      <div className="relative z-[2]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer shrink-0 min-w-0" onClick={closeMenu}>
            <div className="relative shrink-0">
              <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Image
                src="/investa-financial-logo.png"
                alt="Investa Finserve Services logo"
                width={44}
                height={44}
                className="h-9 w-auto sm:h-11 relative z-10 drop-shadow-[0_0_4px_rgba(0,0,0,0.1)]"
              />
            </div>
            <div className="leading-tight min-w-0">
              <p className="text-base sm:text-lg font-bold text-slate-900 tracking-wide group-hover:text-blue-700 transition-colors truncate">
                Investa
              </p>
              <p className="text-[0.65rem] sm:text-xs text-blue-600 font-bold uppercase tracking-widest truncate">
                Financial Services
              </p>
            </div>
          </Link>

          <nav
            className="hidden md:flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm font-medium text-slate-600 lg:gap-x-6"
            aria-label="Primary"
          >
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href + label} href={href} className="hover:text-blue-600 transition-colors whitespace-nowrap">
                {label}
              </Link>
            ))}
            <a
              href="tel:+919909111020"
              className="px-5 py-2.5 rounded-full border border-blue-200 text-blue-700 font-semibold hover:bg-blue-50 transition-all shadow-sm whitespace-nowrap"
            >
              Contact Us
            </a>
          </nav>

          <button
            type="button"
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white/95 text-slate-800 shadow-sm hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
            aria-expanded={menuOpen}
            aria-controls={panelId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {menuOpen ? (
          <nav
            id={panelId}
            className="md:hidden relative z-10 max-h-[min(75dvh,calc(100dvh-5rem))] overflow-y-auto border-t border-slate-100 bg-white/98 backdrop-blur-xl shadow-inner"
            aria-label="Primary mobile"
          >
            <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-1 sm:px-6">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href + label}
                  href={href}
                  className="rounded-xl px-4 py-3 text-base font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  onClick={closeMenu}
                >
                  {label}
                </Link>
              ))}
              <a
                href="tel:+919909111020"
                className="mt-2 text-center rounded-full border border-blue-200 bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-md hover:opacity-95 transition-opacity"
                onClick={closeMenu}
              >
                Contact Us · +91 99091 11020
              </a>
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
