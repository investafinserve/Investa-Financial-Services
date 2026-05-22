import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white/50 mt-8 py-8 flex flex-col items-center justify-center gap-4 text-center text-sm text-slate-600 backdrop-blur-md px-4">
      <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 font-semibold text-slate-700" aria-label="Footer">
        <Link href="/about" className="hover:text-blue-600 transition-colors">
          About Us
        </Link>
        <Link href="/faqs" className="hover:text-blue-600 transition-colors">
          FAQs
        </Link>
        <Link href="/blog" className="hover:text-blue-600 transition-colors">
          Blog
        </Link>
        <Link href="/#contact" className="hover:text-blue-600 transition-colors">
          Contact
        </Link>
      </nav>
      <p className="font-medium">© {new Date().getFullYear()} Investa Finserve Services. All rights reserved.</p>
      <p className="text-[10px] text-slate-500 font-medium">
        Designed and developed by <span className="font-bold text-slate-800 text-[11px]">Ascenties</span>.
      </p>
    </footer>
  );
}
