import { Plus } from "lucide-react";

interface FaqSectionProps {
  title?: string;
  eyebrow?: string;
  faqs: { q: string; a: string }[];
}

/**
 * Server-rendered FAQ accordion using native <details>/<summary> so the
 * answers are present in the HTML for crawlers and require no client JS.
 */
export function FaqSection({ title = "Frequently Asked Questions", eyebrow = "FAQ", faqs }: FaqSectionProps) {
  if (!faqs.length) return null;
  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="container-luxury">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-brown-600">
              <span className="h-px w-6 bg-gold" />
              {eyebrow}
            </span>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-luxury-black md:text-[2.4rem]">
              {title}
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-brown/10 bg-white p-5 shadow-soft [&_summary]:list-none"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-serif text-base font-semibold text-luxury-black sm:text-lg">
                  {faq.q}
                  <Plus className="h-5 w-5 shrink-0 text-brown transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/70 sm:text-base">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
