"use client";

import { useCallback, useEffect, useState } from "react";

export function BlogReadingProgress() {
  const [p, setP] = useState(0);

  const onScroll = useCallback(() => {
    const el = document.documentElement;
    const scrollTop = el.scrollTop;
    const height = el.scrollHeight - el.clientHeight;
    const next = height > 0 ? Math.min(1, scrollTop / height) : 0;
    setP(next);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => onScroll());
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [onScroll]);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[190] h-1 pointer-events-none"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(p * 100)}
      aria-label="Reading progress"
    >
      <div
        className="h-full w-full origin-left bg-gradient-to-r from-blue-600 to-indigo-600 transition-[transform] duration-150 ease-out"
        style={{ transform: `scaleX(${p})` }}
      />
    </div>
  );
}

export function BlogBackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-6 z-[185] flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-lg backdrop-blur-sm transition hover:border-blue-200 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 sm:bottom-28"
      aria-label="Back to top"
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
