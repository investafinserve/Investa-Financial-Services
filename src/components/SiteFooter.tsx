export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white/50 mt-8 py-8 flex flex-col items-center justify-center gap-1.5 text-center text-sm text-slate-600 backdrop-blur-md">
      <p className="font-medium">
        © {new Date().getFullYear()} Investa Finserve Services. All rights reserved.
      </p>
      <p className="text-[10px] text-slate-500 font-medium">
        Designed and developed by <span className="font-bold text-slate-800 text-[11px]">Ascenties</span>.
      </p>
    </footer>
  );
}
