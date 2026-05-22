import type { FaqEntry } from "@/content/faqs-data";

function FaqAnswerBody({ segments }: { segments: FaqEntry["segments"] }) {
  return (
    <div className="space-y-3 text-sm sm:text-[0.95rem] leading-relaxed text-slate-600 pb-5 px-5 sm:pb-6 sm:px-6 border-t border-slate-100/80 mt-[-1px]">
      {segments.map((seg, idx) =>
        seg.kind === "p" ? (
          <p key={idx}>{seg.text}</p>
        ) : (
          <ul key={idx} className="list-disc pl-5 space-y-2 marker:text-blue-500">
            {seg.items.map((item, li) => (
              <li key={`${idx}-${li}`}>{item}</li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}

export function FaqAccordionList({ items }: { items: readonly FaqEntry[] }) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {items.map((faq, index) => (
        <details
          key={faq.id}
          className="group glass-card rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <summary className="cursor-pointer list-none flex items-start gap-3 p-5 sm:p-6 font-semibold text-slate-900 text-[0.95rem] sm:text-base leading-snug select-none [&::-webkit-details-marker]:hidden">
            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700 border border-blue-100">
              {index + 1}
            </span>
            <span className="flex-1 pt-px">{faq.question}</span>
            <span className="shrink-0 text-blue-600 text-xl leading-none mt-0.5 group-open:rotate-180 transition-transform">
              ▾
            </span>
          </summary>
          <FaqAnswerBody segments={faq.segments} />
        </details>
      ))}
    </div>
  );
}
