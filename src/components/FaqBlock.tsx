import { JsonLd } from "./JsonLd";
import { faqSchema } from "@/lib/schema";
import type { Faq } from "@/lib/types";

export function FaqBlock({ faqs }: { faqs: Faq[] }) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="mt-14 border-t border-line pt-8">
      <JsonLd data={faqSchema(faqs)} />
      <p className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
        Frequently asked
      </p>
      <div className="mt-5 space-y-6">
        {faqs.map((faq) => (
          <div key={faq.question}>
            <h3 className="font-serif-display text-lg text-ink">
              {faq.question}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
