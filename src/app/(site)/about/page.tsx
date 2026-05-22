import type { Metadata } from "next";
import Link from "next/link";
import { SITE_KEYWORDS, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Investa Finserve — Mumbai-based mutual fund & SIP advisors for Indian residents and NRIs. Founded by Sanjeeta Shah with 20+ years in financial services. Goal-first, jargon-free guidance.",
  keywords: [
    ...SITE_KEYWORDS,
    "about Investa Finserve",
    "Investa Mumbai",
    "NRI mutual fund India",
    "online mutual fund distributor",
    "financial advisor India",
  ],
  openGraph: {
    title: `About Us | ${SITE_NAME}`,
    description:
      "Simple, transparent investing built around your goals. Mutual funds and SIP today; a fuller financial hub tomorrow.",
    url: "/about",
    type: "website",
  },
  twitter: {
    title: `About Us | ${SITE_NAME}`,
    description:
      "Goal-first mutual fund guidance for residents and NRIs — from a team led by founder Sanjeeta Shah with 20+ years’ experience.",
  },
  alternates: { canonical: "/about" },
};

const WHY_CHOOSE = [
  {
    title: "Two decades of real experience",
    body:
      "With 20+ years advising on financial products, our founder has navigated every kind of market and helped clients through them all — steady, level-headed guidance, not guesswork.",
  },
  {
    title: "Built for residents and NRIs alike",
    body:
      "Our fully online platform lets you invest from anywhere — Mumbai, Dubai, London, Singapore, or the US. Wherever you are, we are just a call or click away.",
  },
  {
    title: "Advice that puts you first",
    body:
      "We are not here to sell the most expensive plan. We recommend what fits your goals, income, and comfort with risk.",
  },
  {
    title: "A growing one-stop financial hub",
    body:
      "Today it is mutual funds. Soon — bonds, corporate FDs, and insurance (term, health, motor, and travel) — so you are not juggling multiple advisors.",
  },
  {
    title: "Simple conversation, jargon-free guidance",
    body: "Finance can feel intimidating. We explain things clearly and patiently — the way we would for our own family.",
  },
  {
    title: "A relationship, not a transaction",
    body:
      "When you invest with us, you gain a long-term partner who reviews your portfolio and adjusts your plan as life changes.",
  },
  {
    title: "Trust you can feel",
    body: "Our recommendations rest on transparency and integrity — no hidden surprises.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 pb-16">
        {/* Hero */}
        <section className="relative mx-auto max-w-4xl px-4 pt-10 pb-8 sm:px-6 md:pt-14 md:pb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-3">Investa Finserve</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-5">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Us</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Investment that is simple, transparent, and built around your goals — with trust and meaningful conversations at
            the centre.
          </p>
        </section>

        {/* Intro story */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 space-y-6">
          <div className="glass-card rounded-3xl border border-slate-100 p-6 sm:p-10 shadow-[0_20px_50px_-20px_rgba(37,99,235,0.15)]">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-6">About Investa Finserve</h2>
            <div className="space-y-5 text-slate-700 leading-relaxed text-[0.95rem] sm:text-base">
              <p>
                At Investa Finserve, we believe investment should be{" "}
                <strong className="text-slate-900 font-semibold">simple, transparent</strong>, and built around your financial
                goals — whatever they may be. We focus on building relationships based on{" "}
                <strong className="text-slate-900 font-semibold">trust</strong> and meaningful conversations.
              </p>
              <p>
                Based in Mumbai and built for the new age, Investa Finserve is founded by{" "}
                <strong className="text-slate-900 font-semibold">Sanjeeta Shah</strong>, who brings more than twenty years of
                experience in the financial services industry. Across two decades, Sanjeeta has helped numerous investors
                become well-informed, guided them through market volatility, and supported their life milestones.
              </p>
              <p>
                Because we operate online, distance is never a hurdle. Whether you are{" "}
                <strong className="text-slate-900 font-semibold">an Indian citizen</strong> managing savings at home or an{" "}
                <strong className="text-slate-900 font-semibold">NRI</strong> investing in India from anywhere in the world,
                Investa Finserve keeps the entire process straightforward, secure, and convenient.
              </p>
              <p>
                Today, our core focus is <strong className="text-slate-900 font-semibold">mutual fund investments</strong>,
                helping you start SIPs, plan goals, and build long-term wealth with the right fund choices. Soon, Investa
                Finserve will grow into a full financial solutions hub — adding bonds, corporate fixed deposits, term
                insurance, health insurance, motor insurance, and travel insurance — so key investment and protection needs
                can sit under one trusted roof.
              </p>
              <p className="border-l-4 border-blue-500 pl-5 py-1 bg-gradient-to-r from-blue-50/90 to-transparent rounded-r-lg">
                We do not push products. We follow a process — understand the financial goal first, including risk tolerance
                and time horizon — then recommend what fits best for you.
              </p>
            </div>
          </div>

          {/* Why choose */}
          <div className="pt-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-3">Why Choose Investa Finserve?</h2>
            <p className="text-center text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-10">
              What you can expect when you partner with us.
            </p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {WHY_CHOOSE.map(({ title, body }) => (
                <li
                  key={title}
                  className="glass-card rounded-2xl border border-slate-100 p-5 sm:p-6 transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-24px_rgba(37,99,235,0.35)]"
                >
                  <h3 className="font-bold text-slate-900 text-base mb-2 leading-snug">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{body}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Vision & Mission */}
          <div className="grid gap-6 md:grid-cols-2 pt-8">
            <article className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-white via-indigo-50/40 to-blue-50/60 p-6 sm:p-8 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 mb-3">Our Vision</p>
              <p className="text-slate-800 leading-relaxed text-[0.95rem] sm:text-base mb-4">
                Our vision is to become a trusted financial partner for investors across India — and Indians around the world.
                We want to help people grow wealth, secure their future, and pursue their goals with confidence and peace of
                mind.
              </p>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                We believe financial planning should be{" "}
                <strong className="text-slate-900 font-semibold">simple, transparent, and accessible</strong> — whether you
                live in Mumbai or anywhere on the globe.
              </p>
            </article>

            <article className="rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-blue-50/50 to-slate-50/80 p-6 sm:p-8 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-3">Our Mission</p>
              <div className="space-y-4 text-slate-800 leading-relaxed text-[0.95rem] sm:text-base">
                <p className="font-semibold text-slate-900">Our mission is simple.</p>
                <p>
                  We strive to understand every investor&apos;s needs and financial goals{" "}
                  <em>before</em> suggesting a solution. Advice should feel personal, honest, and always in your best interest.
                </p>
                <p>
                  We aim to make investing in India simple and hassle-free for residents and NRIs through a smooth online
                  experience — and to become a complete destination across mutual funds, bonds, corporate FDs, and
                  insurance.
                </p>
                <p>
                  Most importantly, we want you to feel confident in your decisions, wherever you live. We focus on long-term
                  relationships built on trust, transparency, and steady support — turning confusion into clarity, one
                  conversation at a time.
                </p>
              </div>
            </article>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center glass-card rounded-3xl border border-slate-100 p-8 sm:p-10">
            <p className="text-slate-800 font-semibold text-lg mb-4">Ready to talk goals — not jargon?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
              <Link
                href="/#contact"
                className="inline-flex justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg hover:opacity-95 transition-opacity"
              >
                Get in touch
              </Link>
              <Link
                href="/"
                className="inline-flex justify-center rounded-full border border-slate-200 bg-white px-8 py-3.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
              >
                Back to home
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
