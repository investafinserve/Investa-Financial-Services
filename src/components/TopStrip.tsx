export default function TopStrip() {
  return (
    <div className="w-full bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 border-b border-white/10 text-blue-50 text-[0.65rem] sm:text-xs font-semibold tracking-[0.2em] py-2.5 relative overflow-hidden group">
      <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
      <div className="max-w-6xl mx-auto px-4 flex justify-center items-center sm:px-6 relative">
        <span className="opacity-90 inline-block text-[0.65rem] sm:text-[0.7rem] uppercase tracking-widest font-bold">
          Empowering the Next Generation of Investors
        </span>
      </div>
    </div>
  );
}
