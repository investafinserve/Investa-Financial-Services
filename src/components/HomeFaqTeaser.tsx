import Link from "next/link";
import { FaqAccordionList } from "@/components/FaqAccordion";
import { getFaqsForHome } from "@/content/faqs-data";

export default function HomeFaqTeaser() {
  const previews = getFaqsForHome();

  return (
    <section id="faq" aria-labelledby="faq-heading" className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <div className="text-center space-y-3 mb-8 sm:mb-10 max-w-2xl mx-auto">
        <h2 id="faq-heading" className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
          Frequently Asked <span className="text-gradient">Questions</span>
        </h2>
        <p className="text-slate-600 text-sm md:text-base font-medium">
          Quick answers about Investa Finserve — mutual funds, our founder Sanjeeta Shah, NRIs, and getting started online.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <FaqAccordionList items={previews} />
        <div className="mt-8 text-center">
          <Link
            href="/faqs"
            className="inline-flex items-center justify-center rounded-full border-2 border-blue-200 bg-white px-8 py-3.5 text-sm font-bold text-blue-700 shadow-sm hover:bg-blue-50 hover:border-blue-300 transition-colors"
          >
            View all FAQs →
          </Link>
        </div>
      </div>
    </section>
  );
}
