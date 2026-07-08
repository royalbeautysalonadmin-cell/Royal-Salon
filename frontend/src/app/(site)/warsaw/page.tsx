import type { Metadata } from "next";
import Link from "next/link";
import { Check, MapPin, Clock, Phone, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { ServiceLinkCard } from "@/components/shared/ServiceLinkCard";
import { FaqSection } from "@/components/shared/FaqSection";
import { CtaBand } from "@/components/shared/CtaBand";
import { JsonLd } from "@/components/shared/JsonLd";
import {
  localPages,
  localPageBySlug,
  categories,
  servicesForCategorySlug,
} from "@/data/seo-data";
import { siteConfig } from "@/lib/site";
import { localBusinessJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { getBackendServices } from "@/lib/backend-api";

export const revalidate = 300;

const hub = localPageBySlug("warsaw")!;

export const metadata: Metadata = {
  title: hub.title,
  description: hub.metaDescription,
  alternates: { canonical: `${siteConfig.url}/warsaw` },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/warsaw`,
    title: hub.title,
    description: hub.metaDescription,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: hub.heading }],
  },
  twitter: {
    card: "summary_large_image",
    title: hub.title,
    description: hub.metaDescription,
  },
};

export default async function WarsawHubPage() {
  const allServices = await getBackendServices();
  const subPages = localPages.filter((p) => p.slug !== "warsaw");
  const featured = categories
    .flatMap((c) => servicesForCategorySlug(allServices, c.slug).filter((s) => s.featured).slice(0, 2))
    .slice(0, 8);

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Warsaw", path: "/warsaw" },
  ]);

  return (
    <>
      <JsonLd data={[localBusinessJsonLd(), breadcrumb, faqJsonLd(hub.faqs)]} />

      <PageHero
        eyebrow={hub.eyebrow}
        title={hub.heading}
        description={hub.tagline}
        breadcrumb="Warsaw"
      />

      {/* Intro + visit card */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-luxury grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-5">
            {hub.intro.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-charcoal/75 sm:text-lg">
                {p}
              </p>
            ))}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {hub.highlights.map((h, i) => (
                <div key={i} className="rounded-2xl border border-brown/10 bg-cream p-4">
                  <Check className="h-4 w-4 text-brown" />
                  <p className="mt-2 text-sm font-semibold text-luxury-black">{h.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-charcoal/70">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-brown/10 bg-cream p-7 shadow-soft lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-serif text-xl font-semibold text-luxury-black">Visit our salon</h2>
            <ul className="mt-5 space-y-3 text-sm text-charcoal/75">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brown" />
                {siteConfig.address.full}
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brown" />
                {siteConfig.phone}
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brown" />
                <span>
                  {siteConfig.hours.map((h) => (
                    <span key={h.day} className="block">
                      {h.day}: {h.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${siteConfig.address.mapsQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brown hover:underline"
            >
              Get directions <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Local landing pages */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-luxury">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-brown-600">
              <span className="h-px w-6 bg-gold" />
              Services across Warsaw
            </span>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-luxury-black md:text-[2.4rem]">
              Beauty services in Warsaw
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subPages.map((p) => (
              <Link
                key={p.slug}
                href={`/warsaw/${p.slug}`}
                className="group rounded-2xl border border-brown/10 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-luxury"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-brown">
                  {p.eyebrow}
                </p>
                <h3 className="mt-2 font-serif text-lg font-semibold text-luxury-black group-hover:text-brown">
                  {p.heading}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{p.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brown">
                  Learn more
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category links */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-luxury">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-3xl font-semibold leading-tight text-luxury-black md:text-[2.4rem]">
              Browse by category
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/services/${c.slug}`}
                className="rounded-full bg-cream px-5 py-2.5 text-sm font-medium text-charcoal/75 shadow-sm transition-colors hover:bg-brown hover:text-white"
              >
                {c.label}
              </Link>
            ))}
          </div>

          {featured.length > 0 && (
            <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {featured.map((s) => (
                <ServiceLinkCard key={s.slug} service={s} />
              ))}
            </div>
          )}
        </div>
      </section>

      <FaqSection eyebrow="Warsaw FAQ" faqs={hub.faqs} />

      <CtaBand message="Hello Royal Beauty Salon, I'd like to book an appointment in Warsaw." />
    </>
  );
}
