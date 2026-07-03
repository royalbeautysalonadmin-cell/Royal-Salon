import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { ServiceLinkCard } from "@/components/shared/ServiceLinkCard";
import { FaqSection } from "@/components/shared/FaqSection";
import { CtaBand } from "@/components/shared/CtaBand";
import { JsonLd } from "@/components/shared/JsonLd";
import {
  categories,
  categoryBySlug,
  servicesForCategorySlug,
  servicePath,
} from "@/data/seo-data";
import { siteConfig } from "@/lib/site";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  categoryItemListJsonLd,
} from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const meta = categoryBySlug(category);
  if (!meta) return {};
  const canonical = `${siteConfig.url}/services/${meta.slug}`;
  return {
    title: meta.title,
    description: meta.metaDescription,
    keywords: meta.keywords,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: meta.title,
      description: meta.metaDescription,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: meta.heading }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.metaDescription,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const meta = categoryBySlug(category);
  if (!meta) notFound();

  const services = servicesForCategorySlug(category);
  const fromPrice = Math.min(...services.map((s) => s.price));

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: meta.label, path: `/services/${meta.slug}` },
  ]);
  const itemList = categoryItemListJsonLd(services, meta.label, servicePath);

  return (
    <>
      <JsonLd data={[breadcrumb, itemList, faqJsonLd(meta.faqs)]} />

      <PageHero
        eyebrow={meta.eyebrow}
        title={meta.heading}
        description={meta.tagline}
        breadcrumb={meta.label}
      />

      {/* Intro + benefits */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-luxury grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-5">
            {meta.intro.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-charcoal/75 sm:text-lg">
                {p}
              </p>
            ))}
            <p className="text-sm text-charcoal/70">
              {services.length} treatments available · from {fromPrice} zł · central Warsaw
            </p>
          </div>
          <div className="rounded-3xl border border-brown/10 bg-cream p-7 shadow-soft">
            <h2 className="font-serif text-xl font-semibold text-luxury-black">
              Why choose Royal Beauty for {meta.label.toLowerCase()}
            </h2>
            <ul className="mt-5 space-y-3">
              {meta.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-charcoal/75">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brown" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Service grid */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-luxury">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-brown-600">
              <span className="h-px w-6 bg-gold" />
              {meta.label}
            </span>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-luxury-black md:text-[2.4rem]">
              Explore our {meta.label.toLowerCase()} menu
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((s) => (
              <ServiceLinkCard key={s.slug} service={s} />
            ))}
          </div>

          {/* Cross-links to other categories */}
          <div className="mt-14 border-t border-brown/10 pt-10 text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-charcoal/70">
              Explore other services
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {categories
                .filter((c) => c.slug !== meta.slug)
                .map((c) => (
                  <Link
                    key={c.slug}
                    href={`/services/${c.slug}`}
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-charcoal/70 shadow-sm transition-colors hover:bg-brown/10 hover:text-brown"
                  >
                    {c.label}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      <FaqSection eyebrow={`${meta.label} FAQ`} faqs={meta.faqs} />

      <CtaBand
        title={`Book your ${meta.label.toLowerCase()} appointment in Warsaw`}
        message={`Hello Royal Beauty Salon, I'd like to book a ${meta.label.toLowerCase()} appointment.`}
      />
    </>
  );
}
