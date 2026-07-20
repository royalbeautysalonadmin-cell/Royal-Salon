import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { ClosedDaysBanner } from "@/components/shared/ClosedDaysBanner";
import { servicesJsonLd, faqJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import {
  getBackendServices,
  getBackendTestimonials,
  getBackendGallery,
  getBackendClosedDays,
} from "@/lib/backend-api";

export const revalidate = 300;

// Below-the-fold sections are code-split into their own chunks (still fully
// server-rendered — ssr defaults to true — so content, SEO and layout are
// unchanged) so their JS doesn't bloat the critical bundle the Hero needs
// to hydrate first.
const About = dynamic(() => import("@/components/sections/About").then((m) => m.About));
const Services = dynamic(() =>
  import("@/components/sections/Services").then((m) => m.Services)
);
const BridalShowcase = dynamic(() =>
  import("@/components/sections/BridalShowcase").then((m) => m.BridalShowcase)
);
const Packages = dynamic(() =>
  import("@/components/sections/Packages").then((m) => m.Packages)
);
const WhyChooseUs = dynamic(() =>
  import("@/components/sections/WhyChooseUs").then((m) => m.WhyChooseUs)
);
const Amenities = dynamic(() =>
  import("@/components/sections/Amenities").then((m) => m.Amenities)
);
const Testimonials = dynamic(() =>
  import("@/components/sections/Testimonials").then((m) => m.Testimonials)
);
const Gallery = dynamic(() => import("@/components/sections/Gallery").then((m) => m.Gallery));
const Contact = dynamic(() => import("@/components/sections/Contact").then((m) => m.Contact));

export const metadata: Metadata = {
  title: `${siteConfig.name} — Luxury Beauty Salon in Warsaw`,
  description:
    "Royal Beauty Salon offers luxury beauty treatments, bridal makeovers, keratin nanoplasty, hijab-friendly services, and premium skincare in central Warsaw, Poland.",
  keywords: [
    "Beauty Salon Warsaw",
    "hijab friendly salon Warsaw",
    "Indian parlour Warsaw",
    "keratin treatment Warsaw",
    "nanoplasty hair treatment Warsaw",
    "luxury salon Warsaw",
    "bridal makeup Warsaw",
    "beauty salon Poland",
  ],
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "en-GB": siteConfig.url,
      "pl-PL": `${siteConfig.url}/salon-kosmetyczny-warszawa`,
      "x-default": siteConfig.url,
    },
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: `${siteConfig.name} — Luxury Beauty Salon in Warsaw`,
    description:
      "Luxury beauty treatments, bridal makeovers, keratin nanoplasty, and hijab-friendly services in central Warsaw.",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Luxury Beauty Salon in Warsaw`,
    description:
      "Luxury beauty treatments, bridal makeovers, keratin nanoplasty, and hijab-friendly services in central Warsaw.",
    images: [siteConfig.ogImage],
  },
};

export default async function HomePage() {
  const [services, testimonials, gallery, closedDays] = await Promise.all([
    getBackendServices(),
    getBackendTestimonials(),
    getBackendGallery(),
    getBackendClosedDays(),
  ]);
  const activeServices = services.filter((s) => s.active !== false);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd(activeServices)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />
      <ClosedDaysBanner closedDays={closedDays} />
      <Hero />
      <About />
      <Services services={services} />
      <BridalShowcase />
      <Packages />
      <WhyChooseUs />
      <Amenities />
      <Testimonials testimonials={testimonials} />
      <Gallery images={gallery} />
      <Contact />
    </>
  );
}
