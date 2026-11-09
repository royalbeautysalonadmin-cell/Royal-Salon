"use client";

import Image from "next/image";
import { MapPin, Star, BadgeCheck, ExternalLink, Camera } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { siteConfig } from "@/lib/site";
import { useTranslation } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";

/** Real salon photos shown alongside the Google Business Profile link. */
const salonPhotos = [
  {
    src: "/salon/salon-hair-styling.jpg",
    alt: "Hair styling stations with illuminated mirrors at Royal Beauty Salon Warsaw",
  },
  {
    src: "/salon/salon-treatment-room.jpg",
    alt: "Pink-lit treatment and facial room at Royal Beauty Salon Warsaw",
  },
  {
    src: "/salon/salon-nail-studio.jpg",
    alt: "Manicure and nail studio station at Royal Beauty Salon Warsaw",
  },
];

/**
 * Homepage band linking to our Google Business Profile with a descriptive,
 * dofollow anchor — the strong outbound backlink to the GBP — plus real
 * salon photos (the same images uploaded to the profile).
 */
export function GoogleBusinessSection() {
  const { t } = useTranslation();

  const highlights = [
    { icon: Star, label: t("gbp.rating") },
    { icon: BadgeCheck, label: t("gbp.verified") },
    { icon: MapPin, label: t("gbp.local") },
  ];

  return (
    <section id="google-business" className="bg-cream py-24">
      <div className="container-luxury">
        <SectionHeading
          eyebrow={t("gbp.heading")}
          title={t("gbp.title")}
          description={t("gbp.description")}
        />

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
          <RevealGroup className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {salonPhotos.map((photo) => (
              <RevealItem key={photo.src}>
                <div className="group relative overflow-hidden rounded-2xl shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-luxury">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={600}
                    height={450}
                    className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-56 lg:h-40 xl:h-56"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-luxury-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex items-center gap-1.5 p-3 text-xs font-medium text-white">
                      <Camera className="h-3.5 w-3.5" />
                      {t("gbp.photoCaption")}
                    </span>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal direction="right" className="space-y-6">
            <ul className="space-y-3">
              {highlights.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-sm text-charcoal/80 md:text-base">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brown-gradient text-white">
                    <Icon className="h-4 w-4" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>

            <div className="rounded-2xl border border-brown/10 bg-white p-6 shadow-soft">
              <p className="text-sm leading-relaxed text-charcoal/70">{t("gbp.cardText")}</p>
              <a
                href={siteConfig.googleBusiness}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("google_business_click", { source: "home_section" })}
                className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-brown-gradient px-7 py-3.5 text-sm font-semibold text-white shadow-gold transition-transform hover:-translate-y-0.5"
              >
                <MapPin className="h-4 w-4" />
                {t("gbp.cta")}
                <ExternalLink className="h-3.5 w-3.5 opacity-80" />
              </a>
              <a
                href={siteConfig.googleBusiness}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("google_business_click", { source: "home_section_url" })}
                className="mt-4 block text-xs text-charcoal/60 underline decoration-brown/30 underline-offset-4 transition-colors hover:text-brown"
              >
                share.google/0fjJVnfXsKUH30EUb
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
