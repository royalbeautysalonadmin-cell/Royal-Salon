"use client";

import { Calendar, Clock, Star, ExternalLink, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { siteConfig } from "@/lib/site";
import { useTranslation } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";

const perks: { icon: LucideIcon; labelKey: string }[] = [
  { icon: Clock, labelKey: "booksy.perk1" },
  { icon: Calendar, labelKey: "booksy.perk2" },
  { icon: Star, labelKey: "booksy.perk3" },
];

/**
 * Homepage band that links out to our Booksy profile with a descriptive,
 * dofollow anchor — the strong outbound backlink to Booksy.
 */
export function BooksySection() {
  const { t } = useTranslation();

  return (
    <section id="booksy" className="relative overflow-hidden bg-luxury-black py-24 text-white">
      <div className="pointer-events-none absolute inset-0 bg-luxury-radial opacity-50" />
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-brown/30 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-gold/20 blur-[120px]" />

      <div className="container-luxury relative">
        <SectionHeading
          light
          eyebrow={t("booksy.heading")}
          title={t("booksy.title")}
          description={t("booksy.description")}
        />

        <RevealGroup className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
          {perks.map(({ icon: Icon, labelKey }) => (
            <RevealItem key={labelKey}>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="text-sm text-white/80">{t(labelKey)}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealGroup className="mt-10 flex flex-col items-center gap-5">
          <RevealItem>
            <a
              href={siteConfig.booksy}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("booksy_click", { source: "home_section" })}
              className="inline-flex items-center gap-2.5 rounded-full bg-gold px-8 py-4 text-sm font-semibold text-luxury-black shadow-luxury transition-transform hover:-translate-y-0.5 md:text-base"
            >
              <Calendar className="h-5 w-5" />
              {t("booksy.cta")}
              <ExternalLink className="h-4 w-4 opacity-70" />
            </a>
          </RevealItem>
          <RevealItem>
            <a
              href={siteConfig.booksy}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("booksy_click", { source: "home_section_url" })}
              className="text-sm text-white/50 underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold"
            >
              royalbeautywarsawsalon.booksy.com
            </a>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
