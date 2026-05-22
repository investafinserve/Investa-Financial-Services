import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordionList } from "@/components/FaqAccordion";
import type { FaqSegment } from "@/content/faqs-data";
import { FAQ_ENTRIES } from "@/content/faqs-data";
import { SITE_KEYWORDS, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: `Answers about ${SITE_NAME}, mutual funds & SIP for residents and NRIs, founder Sanjeeta Shah, online KYC, and how we compare to banks and apps.`,
  keywords: [...SITE_KEYWORDS, "FAQ", "NRI mutual fund", "online mutual fund distributor", "SIP FAQ", "Indian mutual funds"],
  openGraph: {
    title: `FAQs | ${SITE_NAME}`,
    description:
      "Common questions about Investa Finserve — what we do, who we serve, NRIs, mutual funds, safety, starting small, and more.",
    url: "/faqs",
    type: "website",
  },
  twitter: {
    title: `FAQs | ${SITE_NAME}`,
    description: "Straight answers about mutual funds, SIPs, NRIs, and investing with Investa Finserve.",
  },
  alternates: { canonical: "/faqs" },
};

function segmentToPlainText(segment: FaqSegment): string {
  return segment.kind === "p" ? segment.text : segment.items.join(" ");
}

export default function FaqsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ENTRIES.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.segments.map(segmentToPlainText).join("\n\n"),
      },
    })),
  };

  return (
    <div className="flex flex-col flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 md:py-14">
        <nav className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            ← Home
          </Link>
        </nav>

        <header className="text-center mb-10 sm:mb-12 space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Help Centre</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Questions</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Straight answers about Investa Finserve — no jargon, no hard sell — just clarity.
          </p>
        </header>

        <FaqAccordionList items={FAQ_ENTRIES} />

        <section className="mt-14 text-center glass-card rounded-3xl border border-slate-100 p-8 sm:p-10">
          <p className="font-semibold text-slate-900 mb-2">Still have questions?</p>
          <p className="text-slate-600 text-sm mb-6">We are happy to chat — no obligation.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/#contact"
              className="inline-flex justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg hover:opacity-95 transition-opacity"
            >
              Contact us
            </Link>
            <Link
              href="https://wa.me/919909111020"
              className="inline-flex justify-center rounded-full border border-slate-200 bg-white px-8 py-3.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
            >
              WhatsApp us
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
