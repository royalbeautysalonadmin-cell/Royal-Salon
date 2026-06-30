import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Clock, Tag, MapPin, Check, Sparkles, ChevronRight } from "lucide-react";
import { ServiceLinkCard } from "@/components/shared/ServiceLinkCard";
import { FaqSection } from "@/components/shared/FaqSection";
import { CtaBand } from "@/components/shared/CtaBand";
import { JsonLd } from "@/components/shared/JsonLd";
import { BookButton } from "@/components/shared/BookButton";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { siteConfig, whatsappLink } from "@/lib/site";
import { allServices } from "@/data/content";
import {
  categories,
  findServiceBySlug,
  getServiceContent,
  serviceMeta,
  servicePath,
} from "@/data/seo-data";
import {
  serviceDetailJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return allServices.map((s) => {
    const found = findServiceBySlug(s.slug)!;
    return { category: found.categorySlug, slug: s.slug };
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = findServiceBySlug(slug);
  if (!found) return {};
  const { service } = found;
  const { title, description } = serviceMeta(service);
  const canonical = `${siteConfig.url}${servicePath(service)}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      images: [{ url: service.image, width: 1200, height: 630, alt: service.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [service.image],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const found = findServiceBySlug(slug);
  // Guard against a category/slug mismatch so each service has one canonical URL.
  if (!found || found.categorySlug !== category) notFound();

  const { service, meta } = found;
  const content = getServiceContent(service);
  const path = servicePath(service);
  const savings = service.originalPrice
    ? Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100)
    : 0;

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: meta.label, path: `/services/${meta.slug}` },
    { name: service.name, path },
  ]);

  return (
    <>
      <JsonLd
        data={[
          serviceDetailJsonLd(service, path),
          breadcrumb,
          faqJsonLd(content.faqs),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-luxury-black pt-32 pb-16 text-white sm:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-luxury-radial opacity-60" />
        <div className="container-luxury relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <nav className="flex flex-wrap items-center gap-1.5 text-sm text-white/50">
              <Link href="/" className="hover:text-gold">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href="/services" className="hover:text-gold">Services</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href={`/services/${meta.slug}`} className="hover:text-gold">{meta.label}</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-gold">{service.name}</span>
            </nav>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Badge variant="gold" className="text-[0.65rem]">{service.category}</Badge>
              {service.featured && (
                <Badge variant="gold" className="text-[0.65rem]">
                  <Sparkles className="mr-1 h-2.5 w-2.5" /> Signature
                </Badge>
              )}
            </div>

            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight md:text-5xl text-balance">
              {service.name} in Warsaw
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              {service.description}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-5 text-sm">
              <span className="flex items-center gap-2 text-white/80">
                <Clock className="h-4 w-4 text-gold" /> {service.duration}
              </span>
              <span className="flex items-center gap-2 text-white/80">
                <Tag className="h-4 w-4 text-gold" />
                {service.price > 1 ? `from ${formatPrice(service.price)}` : formatPrice(service.price)}
                {service.originalPrice && (
                  <span className="text-white/40 line-through">{formatPrice(service.originalPrice)}</span>
                )}
                {savings > 0 && (
                  <span className="rounded-full bg-red-500 px-2 py-0.5 text-[0.65rem] font-bold">
                    Save {savings}%
                  </span>
                )}
              </span>
              <span className="flex items-center gap-2 text-white/80">
                <MapPin className="h-4 w-4 text-gold" /> ul. Mokotowska, Warsaw
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <BookButton serviceSlug={service.slug} />
              <a
                href={whatsappLink(`Hello Royal Beauty Salon, I'd like to book ${service.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-luxury">
            <Image
              src={service.image}
              alt={`${service.name} at Royal Beauty Salon Warsaw`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* About + details */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-luxury grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-luxury-black sm:text-3xl">
                About {service.name}
              </h2>
              <div className="mt-4 space-y-4">
                {content.about.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed text-charcoal/75">{p}</p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold text-luxury-black sm:text-3xl">
                What to expect
              </h2>
              <ul className="mt-4 space-y-3">
                {content.expect.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-charcoal/75">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brown/10 text-xs font-bold text-brown">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-brown/10 bg-cream p-6">
              <p className="text-base font-medium text-luxury-black">{content.idealFor}</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold text-luxury-black sm:text-3xl">
                Aftercare tips
              </h2>
              <ul className="mt-4 space-y-3">
                {content.aftercare.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-charcoal/75">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brown" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sticky booking card */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-brown/10 bg-white p-7 shadow-luxury">
              <p className="text-sm font-medium uppercase tracking-wider text-charcoal/50">
                Treatment summary
              </p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-brown">
                  {formatPrice(service.price)}
                </span>
                {service.originalPrice && (
                  <span className="text-charcoal/40 line-through">
                    {formatPrice(service.originalPrice)}
                  </span>
                )}
              </div>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <dt className="text-charcoal/55">Duration</dt>
                  <dd className="font-medium text-luxury-black">{service.duration}</dd>
                </div>
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <dt className="text-charcoal/55">Category</dt>
                  <dd className="font-medium text-luxury-black">
                    <Link href={`/services/${meta.slug}`} className="text-brown hover:underline">
                      {meta.label}
                    </Link>
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-charcoal/55">Location</dt>
                  <dd className="font-medium text-luxury-black">Warsaw</dd>
                </div>
              </dl>
              <div className="mt-6">
                <BookButton serviceSlug={service.slug} full />
              </div>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="mt-3 block text-center text-sm font-medium text-brown hover:underline"
              >
                Or call {siteConfig.phone}
              </a>
            </div>
          </aside>
        </div>
      </section>

      <FaqSection
        eyebrow={`${service.name} FAQ`}
        faqs={[...content.faqs, ...meta.faqs.slice(0, 2)]}
      />

      {/* Related services */}
      {content.related.length > 0 && (
        <section className="bg-cream py-16 sm:py-20">
          <div className="container-luxury">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-brown-600">
                  <span className="h-px w-6 bg-gold" />
                  Related
                </span>
                <h2 className="mt-3 font-serif text-3xl font-semibold text-luxury-black">
                  More {meta.label.toLowerCase()} treatments
                </h2>
              </div>
              <Link
                href={`/services/${meta.slug}`}
                className="text-sm font-medium text-brown hover:underline"
              >
                View all {meta.label.toLowerCase()} →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {content.related.map((s) => (
                <ServiceLinkCard key={s.slug} service={s} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title={`Book ${service.name} at Royal Beauty Salon`}
        message={`Hello Royal Beauty Salon, I'd like to book ${service.name}.`}
      />
    </>
  );
}
