import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Services } from "@/components/sections/Services";
import { Packages } from "@/components/sections/Packages";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Contact } from "@/components/sections/Contact";
import { JsonLd } from "@/components/shared/JsonLd";
import { servicesJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { categories, servicesForCategorySlug } from "@/data/seo-data";
import { siteConfig } from "@/lib/site";
import { getBackendServices } from "@/lib/backend-api";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Our Services — 55+ Beauty Treatments in Warsaw",
  description:
    "Explore our full menu of 55+ luxury beauty treatments in Warsaw — hair, makeup, threading, waxing, facials, manicure, pedicure and more at Royal Beauty Salon.",
  alternates: { canonical: `${siteConfig.url}/services` },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/services`,
    title: "Our Services — 55+ Beauty Treatments in Warsaw",
    description:
      "Explore our full menu of luxury beauty treatments in Warsaw at Royal Beauty Salon.",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "Royal Beauty Salon Services" }],
  },
};

export default async function ServicesPage() {
  const services = await getBackendServices();
  const activeServices = services.filter((s) => s.active !== false);
  return (
    <>
      <JsonLd
        data={[
          servicesJsonLd(activeServices),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Our Services"
        title="Premium Beauty Treatments"
        description="From bridal artistry to advanced skincare, every service is delivered with luxury, precision and care in the heart of Warsaw."
        breadcrumb="Services"
      />

      {/* Category navigation — links to dedicated category landing pages */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-luxury">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-brown-600">
              <span className="h-px w-6 bg-gold" />
              Browse by category
            </span>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-luxury-black md:text-[2.4rem]">
              Find the right treatment for you
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => {
              const count = servicesForCategorySlug(activeServices, cat.slug).length;
              const cover = servicesForCategorySlug(activeServices, cat.slug)[0]?.image;
              return (
                <Link
                  key={cat.slug}
                  href={`/services/${cat.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-brown/10 shadow-soft transition-all hover:-translate-y-1 hover:shadow-luxury"
                >
                  <div className="relative h-44">
                    {cover && (
                      <Image
                        src={cover}
                        alt={`${cat.label} services in Warsaw`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/85 via-luxury-black/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-[0.65rem] font-medium uppercase tracking-wider text-gold-300">
                        {count} treatments
                      </p>
                      <h3 className="mt-1 flex items-center justify-between font-serif text-xl font-semibold text-white">
                        {cat.label}
                        <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </h3>
                      <p className="mt-1 line-clamp-1 text-xs text-white/70">{cat.tagline}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Services services={services} showHeader={false} />
      <Packages />
      <WhyChooseUs />
      <Contact />
    </>
  );
}
