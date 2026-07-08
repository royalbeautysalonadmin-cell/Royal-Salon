import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, MapPin, Clock, Phone } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { ServiceLinkCard } from "@/components/shared/ServiceLinkCard";
import { FaqSection } from "@/components/shared/FaqSection";
import { CtaBand } from "@/components/shared/CtaBand";
import { JsonLd } from "@/components/shared/JsonLd";
import {
  localPages,
  localPageBySlug,
  categoryBySlug,
  servicesForCategorySlug,
} from "@/data/seo-data";
import { siteConfig } from "@/lib/site";
import {
  localBusinessJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/lib/seo";
import { getBackendServices } from "@/lib/backend-api";

export const dynamicParams = false;
export const revalidate = 300;

export function generateStaticParams() {
  // "warsaw" is served by the /warsaw hub page, not this dynamic route.
  return localPages.filter((p) => p.slug !== "warsaw").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = localPageBySlug(slug);
  if (!page) return {};
  const canonical = `${siteConfig.url}/warsaw/${page.slug}`;
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: page.title,
      description: page.metaDescription,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: page.heading }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.metaDescription,
    },
  };
}

export default async function LocalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = localPageBySlug(slug);
  if (!page) notFound();

  const allServices = await getBackendServices();
  // Pull a handful of featured services from this page's categories
  const featured = page.featureCategories
    .flatMap((catSlug) => servicesForCategorySlug(allServices, catSlug).slice(0, 4))
    .slice(0, 8);

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Warsaw", path: "/warsaw" },
    { name: page.eyebrow.replace(/ •.*/, ""), path: `/warsaw/${page.slug}` },
  ]);

  return (
    <>
      <JsonLd data={[localBusinessJsonLd(), breadcrumb, faqJsonLd(page.faqs)]} />

      <PageHero
        eyebrow={page.eyebrow}
        title={page.heading}
        description={page.tagline}
        breadcrumb={page.eyebrow.replace(/ •.*/, "")}
      />

      {/* Intro */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-luxury grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-5">
            {page.intro.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-charcoal/75 sm:text-lg">
                {p}
              </p>
            ))}
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl border border-brown/10 bg-cream p-7 shadow-soft">
              <h2 className="font-serif text-xl font-semibold text-luxury-black">
                Visit us in Warsaw
              </h2>
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
            </div>
            <div className="grid grid-cols-2 gap-3">
              {page.highlights.map((h, i) => (
                <div key={i} className="rounded-2xl border border-brown/10 bg-white p-4 shadow-soft">
                  <Check className="h-4 w-4 text-brown" />
                  <p className="mt-2 text-sm font-semibold text-luxury-black">{h.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-charcoal/70">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured services */}
      {featured.length > 0 && (
        <section className="bg-cream py-16 sm:py-20">
          <div className="container-luxury">
            <div className="mb-10 text-center">
              <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-brown-600">
                <span className="h-px w-6 bg-gold" />
                Popular in Warsaw
              </span>
              <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-luxury-black md:text-[2.4rem]">
                Treatments our Warsaw clients love
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {featured.map((s) => (
                <ServiceLinkCard key={s.slug} service={s} />
              ))}
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-2">
              {page.featureCategories.map((catSlug) => {
                const cat = categoryBySlug(catSlug);
                if (!cat) return null;
                return (
                  <Link
                    key={catSlug}
                    href={`/services/${catSlug}`}
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-charcoal/70 shadow-sm transition-colors hover:bg-brown/10 hover:text-brown"
                  >
                    All {cat.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <FaqSection eyebrow="Warsaw FAQ" faqs={page.faqs} />

      <CtaBand message={`Hello Royal Beauty Salon, I'd like to book an appointment in Warsaw.`} />
    </>
  );
}
