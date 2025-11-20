// app/page.tsx
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Top strip */}
      <div className="w-full bg-[#173F7F] text-white text-[0.65rem] sm:text-xs font-medium tracking-[0.18em] uppercase text-center py-2">
        Website Coming Soon
      </div>

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo area */}
          <div className="flex items-center gap-2">
            <Image
              src="/investa-financial-logo.png"
              alt="Investa Finserve Services logo"
              width={40}
              height={40}
              className="h-9 w-auto sm:h-10"
            />
            <div className="leading-tight">
              <p className="text-sm sm:text-base font-semibold text-[#1077BD]">
                Investa
              </p>
              <p className="text-[0.7rem] sm:text-xs text-slate-700">
                Financial
                <br />
                Services
              </p>
            </div>
          </div>

          {/* Right side of header intentionally empty for now */}
          <div className="hidden" aria-hidden="true" />
        </div>
      </header>

      {/* Hero section */}
      <main className="flex-1">
        <section className="mx-auto flex max-w-6xl flex-col-reverse gap-8 px-4 py-8 sm:px-6 md:flex-row md:items-center md:py-10 lg:py-12">
          {/* Left: text */}
          <div className="w-full md:w-1/2 space-y-4">
            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.1rem] font-semibold leading-snug text-[#1F3152]">
                Confused by the Market Noise?
                <br />
                Simplify Investing. We&apos;ll Guide Your Every Investment –{" "}
                <span className="text-[#1077BD]">Investa Finserve.</span>
              </h1>
            </div>

            <div className="space-y-1 text-xs sm:text-sm text-slate-600">
              <p>Personalized your Mutual Fund distribution.</p>
              <p>Start right, grow consistently.</p>
              <p>Invest directly with Investa Finserve Services.</p>
            </div>

            <div className="pt-2">
              <button className="inline-flex items-center justify-center rounded-md bg-[#2F7DDF] px-5 py-2.5 text-xs sm:text-sm font-medium text-white shadow-sm transition hover:bg-[#2568b8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F7DDF] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50">
                Get Started
              </button>
            </div>
          </div>

          {/* Right: illustration */}
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src="/hero-investing.png"
              alt="People investing illustration"
              width={480}
              height={320}
              className="h-auto w-full max-w-sm md:max-w-md"
              priority
            />
          </div>
        </section>
      </main>
    </div>
  );
}
