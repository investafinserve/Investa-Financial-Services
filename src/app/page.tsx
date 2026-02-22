import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import LiveMutualFunds from "@/components/LiveMutualFunds";
import FinancialCalculators from "@/components/FinancialCalculators";

const YOUTUBE_VIDEOS = [
  { id: "5oyjqMCKzL4", title: "Mastering Market Basics" },
  { id: "FSf4et5jNa0", title: "Grow Your Wealth Consistently" },
  { id: "HuhwNF-jBcY", title: "The Power of Compounding" },
  { id: "xC47QG7HndM", title: "Smart Asset Allocation" },
  { id: "J98sArifIT4", title: "Start Your Investment Journey" },
  { id: "4x3Idnz7RyU", title: "Importance of Starting Early" },
];

export default function Home() {
  return (
    <div id="home" className="min-h-screen flex flex-col font-sans">
      {/* Top strip */}
      <div className="w-full bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 border-b border-white/10 text-blue-50 text-[0.65rem] sm:text-xs font-semibold tracking-[0.2em] py-2.5 relative overflow-hidden group">
        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
        <div className="max-w-6xl mx-auto px-4 flex justify-center items-center sm:px-6">
          <span className="opacity-90 inline-block text-[0.65rem] sm:text-[0.7rem] uppercase tracking-widest font-bold">Empowering the Next Generation of Investors</span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-slate-200 shadow-sm transition-all duration-300">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          {/* Logo area */}
          <a href="#home" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
          </a>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#home" className="hover:text-blue-600 transition-colors">Home</a>
            <a href="#curated" className="hover:text-blue-600 transition-colors">Curated Funds</a>
            <a href="#calculators" className="hover:text-blue-600 transition-colors">Calculators</a>
            <a href="#learn" className="hover:text-blue-600 transition-colors">Learn</a>
            <a href="tel:+919909111020" className="px-5 py-2.5 rounded-full border border-blue-200 text-blue-700 font-semibold hover:bg-blue-50 transition-all shadow-sm">
              Contact Us
            </a>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <main className="flex-1">
        <section className="relative mx-auto flex max-w-6xl flex-col-reverse gap-8 px-4 py-8 sm:px-6 md:flex-row md:items-center md:py-12 lg:py-16">
          {/* Left: text */}
          <div className="w-full md:w-1/2 space-y-5 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700 mb-1 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_4px_#3b82f6]"></span>
              Guiding Your Financial Future
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-extrabold leading-[1.15] text-slate-900 drop-shadow-sm tracking-tight">
                Confused by <br />
                <span className="opacity-40 line-through decoration-red-500/60 decoration-4 inline-block transform -rotate-1">Market Noise?</span>
                <br />
                Simplify with <br className="hidden md:block" />
                <span className="text-gradient font-black pb-1 inline-block">Investa.</span>
              </h1>
            </div>

            <div className="space-y-2 text-sm sm:text-lg text-slate-600 max-w-lg font-medium">
              <p className="border-l-4 border-blue-500 pl-4 py-1 bg-gradient-to-r from-blue-50 to-transparent">Personalized mutual fund distribution meant for the new generation.</p>
              <p className="border-l-4 border-purple-500 pl-4 py-1 bg-gradient-to-r from-purple-50 to-transparent">Start right, grow consistently, and achieve your dreams.</p>
            </div>

            {/* Buttons */}
            <div className="pt-5 sm:flex sm:items-center gap-5 space-y-4 sm:space-y-0">
              <a
                href="#contact"
                className="block text-center w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-base font-bold text-white shadow-[0_10px_20px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_15px_25px_-10px_rgba(37,99,235,0.7)] hover:-translate-y-1 transition-all duration-300 scroll-smooth"
              >
                Start Investing Now
              </a>

              <div className="flex items-center justify-center gap-3 text-slate-500 font-medium">
                <span className="text-sm">or call</span>
                <a
                  href="tel:+919909111020"
                  className="font-bold text-slate-800 hover:text-blue-600 transition-colors flex items-center gap-2 text-lg"
                >
                  <div className="p-2.5 rounded-full bg-slate-100 group relative overflow-hidden shadow-sm">
                    <span className="relative z-10">📞</span>
                    <div className="absolute inset-0 bg-blue-100 translate-y-[100%] group-hover:translate-y-0 transition-transform"></div>
                  </div>
                  +91 99091 11020
                </a>
              </div>
            </div>
          </div>

          {/* Right: illustration */}
          <div className="w-full md:w-1/2 lg:w-[55%] flex justify-center md:justify-end relative z-10">
            <div className="relative w-full max-w-lg md:max-w-xl lg:max-w-2xl mt-8 md:mt-0">
              {/* Decorative backgrounds behind image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-200 to-purple-200 rounded-full blur-3xl animate-pulse-glow opacity-60"></div>

              <Image
                src="/hero-investing.png"
                alt="Young investors growing wealth"
                width={600}
                height={600}
                className="relative z-20 h-auto w-full drop-shadow-[0_20px_30px_rgba(0,0,0,0.1)] animate-float"
                priority
              />

              {/* Floating badges */}
              {/* Top Right - Debt */}
              <div className="absolute top-[12%] -right-2 sm:-right-8 z-30 glass shadow-md sm:shadow-lg px-3 py-2 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3 animate-float-delayed">
                <span className="text-xl sm:text-3xl drop-shadow-md">🏦</span>
                <span className="text-sm sm:text-base font-bold text-slate-800 tracking-wide">Debt</span>
              </div>

              {/* Middle Left - Mutual Funds */}
              <div className="absolute top-[42%] -left-3 sm:-left-10 z-30 glass shadow-md sm:shadow-lg px-3 py-2 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3 animate-float" style={{ animationDelay: '1s' }}>
                <span className="text-xl sm:text-3xl drop-shadow-md">💼</span>
                <span className="text-sm sm:text-base font-bold text-slate-800 tracking-wide">Mutual Funds</span>
              </div>

              {/* Bottom Right - Gold */}
              <div className="absolute bottom-[16%] right-2 sm:-right-4 z-30 glass shadow-md sm:shadow-lg px-3 py-2 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3 animate-float" style={{ animationDelay: '2.5s' }}>
                <span className="text-xl sm:text-3xl drop-shadow-md">⚜️</span>
                <span className="text-sm sm:text-base font-bold text-slate-800 tracking-wide">Gold</span>
              </div>            </div>
          </div>
        </section>

        {/* Live Mutual Funds Tracker Section */}
        <LiveMutualFunds />

        {/* Financial Calculators Section */}
        <FinancialCalculators />

        {/* Videos Section */}
        <section id="learn" className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <div className="text-center space-y-4 mb-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Learn & <span className="text-gradient">Get Motivated</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base font-medium">
              Dive into our curated YouTube guides designed for youngsters starting their investment journey. Gain insights, avoid pitfalls, and build a strong financial mindset.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {YOUTUBE_VIDEOS.map((video, idx) => (
              <a
                key={video.id}
                href={`https://youtu.be/${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass-card rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(37,99,235,0.25)] flex flex-col"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                  <Image
                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-600 backdrop-blur-md flex items-center justify-center transform group-hover:scale-110 shadow-[0_8px_25px_rgba(220,38,38,0.5)] transition-all duration-300">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <h3 className="font-bold text-base sm:text-lg text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  <div className="mt-4 sm:mt-5 flex items-center text-xs sm:text-sm text-slate-500 font-bold tracking-wide">
                    <span className="text-red-600 mr-2 text-base sm:text-lg">▶</span> WATCH ON YOUTUBE
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Contact Form Section */}
        <ContactForm />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/50 mt-8 py-8 flex flex-col items-center justify-center gap-1.5 text-center text-sm text-slate-600 backdrop-blur-md">
        <p className="font-medium">© {new Date().getFullYear()} Investa Finserve Services. All rights reserved.</p>
        <p className="text-[10px] text-slate-500 font-medium">
          Designed and developed by <span className="font-bold text-slate-800 text-[11px]">Ascenties</span>.
        </p>
      </footer>

      {/* Global Floating WhatsApp Widget */}
      <a
        href="https://wa.me/919909111020?text=Hi%20Investa%2C%20I%20visited%20Investa%20Finserve%20and%20would%20like%20to%20know%20more%20about%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-3.5 sm:p-4 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_12px_40px_rgba(37,211,102,0.6)] transition-all duration-300 flex items-center justify-center group"
        aria-label="Chat with us on WhatsApp"
      >
        {/* Subtle pulse ring behind the button */}
        <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-20"></div>

        <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.062-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </a>

    </div>
  );
}
