// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Investa Finserve Services – Coming Soon",
  description:
    "Confused by the market noise? Simplify investing with Investa Finserve Services.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} font-sans bg-slate-50 text-slate-900 relative selection:bg-blue-500/20 selection:text-blue-900`}>
        {/* Background ambient orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[120px] animate-float"></div>
          <div className="absolute top-[20%] right-[-5%] w-[30%] h-[50%] rounded-full bg-indigo-400/10 blur-[120px] animate-float-delayed"></div>
          <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[40%] rounded-full bg-purple-400/10 blur-[120px] animate-float"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
