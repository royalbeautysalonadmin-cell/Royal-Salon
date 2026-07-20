import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Check, MapPin, Phone, ChevronRight, ArrowUpRight } from "lucide-react";
import { ServiceLinkCard } from "@/components/shared/ServiceLinkCard";
import { FaqSection } from "@/components/shared/FaqSection";
import { CtaBand } from "@/components/shared/CtaBand";
import { JsonLd } from "@/components/shared/JsonLd";
import { BookButton } from "@/components/shared/BookButton";
import { siteConfig, whatsappLink } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, genericServiceJsonLd } from "@/lib/seo";
import { nicheBySlug, nicheFeaturedServices } from "@/data/niche-seo";
import { categoryBySlug } from "@/data/seo-data";
import { getBackendServices } from "@/lib/backend-api";

const categoryLabelFallback = (slug: string) =>
  categoryBySlug(slug)?.label ?? slug;

const CHROME = {
  en: {
    home: "Home",
    bookAppointment: "Book an Appointment",
    askWhatsapp: "Ask on WhatsApp",
    popularTreatments: "Popular treatments",
    treatmentsHeading: "Treatments you might be looking for",
    allCategory: (label: string) => `All ${label}`,
    alsoLooking: "You may also be looking for",
    learnMore: "Learn more",
    address: "ul. Mokotowska, Warsaw",
  },
  pl: {
    home: "Strona główna",
    bookAppointment: "Umów wizytę",
    askWhatsapp: "Napisz na WhatsApp",
    popularTreatments: "Popularne zabiegi",
    treatmentsHeading: "Zabiegi, które mogą Cię zainteresować",
    allCategory: (label: string) => `Wszystkie: ${label}`,
    alsoLooking: "Może zainteresuje Cię również",
    learnMore: "Dowiedz się więcej",
    address: "ul. Mokotowska, Warszawa",
  },
} as const;

/** Build page <metadata> for a niche landing page from its slug. */
export function nicheMetadata(slug: string): Metadata {
  const page = nicheBySlug(slug);
  if (!page) return {};
  const canonical = `${siteConfig.url}/${page.slug}`;
  // The Polish hub page and the English homepage reciprocally declare each
  // other as language alternates — required for Google to honour hreflang.
  const languages =
    page.locale === "pl"
      ? { "en-GB": siteConfig.url, "x-default": siteConfig.url }
      : undefined;
  return {
    title: page.title,
    description: page.metaDescription,
    keywords: [page.primaryKeyword, ...page.secondaryKeywords],
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      url: canonical,
      title: page.title,
      description: page.metaDescription,
      images: [{ url: page.heroImage, width: 1200, height: 630, alt: page.heroAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.metaDescription,
      images: [page.heroImage],
    },
  };
}

export async function NicheLanding({ slug }: { slug: string }) {
  const page = nicheBySlug(slug);
  if (!page) notFound();

  const allServices = await getBackendServices();
  const services = nicheFeaturedServices(allServices, page);
  const locale = page.locale ?? "en";
  const t = CHROME[locale];

  return (
    <div lang={locale === "pl" ? "pl" : undefined}>
      <JsonLd
        data={[
          genericServiceJsonLd({
            name: page.serviceName,
            description: page.serviceDescription,
            path: `/${page.slug}`,
            serviceType: page.primaryKeyword,
          }),
          breadcrumbJsonLd([
            { name: t.home, path: "/" },
            { name: page.h1, path: `/${page.slug}` },
          ]),
          faqJsonLd(page.faqs),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-luxury-black pt-32 pb-16 text-white sm:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-luxury-radial opacity-60" />
        <div className="container-luxury relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <nav className="flex flex-wrap items-center gap-1.5 text-sm text-white/50">
              <Link href="/" className="hover:text-gold">{t.home}</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-gold">{page.eyebrow}</span>
            </nav>
            <span className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-gold-300">
              <span className="h-px w-6 bg-gold" />
              {page.eyebrow}
            </span>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight md:text-5xl text-balance">
              {page.h1}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              {page.tagline}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-5 text-sm text-white/80">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold" /> {t.address}
              </span>
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold" /> {siteConfig.phone}
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <BookButton label={t.bookAppointment} />
              <a
                href={whatsappLink(page.ctaMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {t.askWhatsapp}
              </a>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-luxury">
            <Image
              src={page.heroImage}
              alt={page.heroAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Intro + highlights */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-luxury grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-5">
            {page.intro.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-charcoal/75 sm:text-lg">
                {p}
              </p>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 self-start">
            {page.highlights.map((h, i) => (
              <div key={i} className="rounded-2xl border border-brown/10 bg-cream p-4 shadow-soft">
                <Check className="h-4 w-4 text-brown" />
                <p className="mt-2 text-sm font-semibold text-luxury-black">{h.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-charcoal/70">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content sections */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-luxury max-w-4xl space-y-10">
          {page.sections.map((section, i) => (
            <div key={i}>
              <h2 className="font-serif text-2xl font-semibold text-luxury-black sm:text-[1.7rem]">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-4">
                {section.body.map((p, j) => (
                  <p key={j} className="text-base leading-relaxed text-charcoal/75">{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured services */}
      {services.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="container-luxury">
            <div className="mb-10 text-center">
              <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-brown-600">
                <span className="h-px w-6 bg-gold" />
                {t.popularTreatments}
              </span>
              <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-luxury-black md:text-[2.4rem]">
                {t.treatmentsHeading}
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
              {services.map((s) => (
                <ServiceLinkCard key={s.slug} service={s} locale={locale} />
              ))}
            </div>

            {/* Category cross-links */}
            <div className="mt-12 flex flex-wrap justify-center gap-2">
              {page.relatedCategorySlugs.map((catSlug) => (
                <Link
                  key={catSlug}
                  href={`/services/${catSlug}`}
                  className="rounded-full bg-cream px-4 py-2 text-sm font-medium text-charcoal/70 shadow-sm transition-colors hover:bg-brown hover:text-white"
                >
                  {t.allCategory(categoryLabelFallback(catSlug))}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FaqSection
        eyebrow={`${page.eyebrow} FAQ`}
        title={locale === "pl" ? "Najczęściej zadawane pytania" : undefined}
        faqs={page.faqs}
      />

      {/* Related niche pages — topical cluster internal linking */}
      {page.relatedNicheSlugs.length > 0 && (
        <section className="bg-cream py-16 sm:py-20">
          <div className="container-luxury">
            <h2 className="mb-10 text-center font-serif text-3xl font-semibold text-luxury-black">
              {t.alsoLooking}
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {page.relatedNicheSlugs.map((relSlug) => {
                const rel = nicheBySlug(relSlug);
                if (!rel) return null;
                return (
                  <Link
                    key={relSlug}
                    href={`/${rel.slug}`}
                    className="group rounded-2xl border border-brown/10 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-luxury"
                  >
                    <p className="text-xs font-medium uppercase tracking-wider text-brown">
                      {rel.eyebrow}
                    </p>
                    <h3 className="mt-2 font-serif text-lg font-semibold text-luxury-black group-hover:text-brown">
                      {rel.h1}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brown">
                      {t.learnMore}
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title={
          locale === "pl"
            ? "Umów wizytę w Royal Beauty Salon"
            : "Book your appointment at Royal Beauty Salon"
        }
        description={
          locale === "pl"
            ? "Zarezerwuj termin w centrum Warszawy. Podziel się swoimi preferencjami podczas rezerwacji, a zadbamy o komfortową wizytę."
            : "Reserve your spot in central Warsaw. Tell us your preferences when booking and we'll make your visit perfectly comfortable."
        }
        message={page.ctaMessage}
        locale={locale}
      />
    </div>
  );
}
