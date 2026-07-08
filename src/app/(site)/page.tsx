import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { servicesJsonLd, faqJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

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
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "en-GB": siteConfig.url,
      "pl-PL": `${siteConfig.url}/salon-kosmetyczny-warszawa`,
      "x-default": siteConfig.url,
    },
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />
      <Hero />
      <About />
      <Services />
      <BridalShowcase />
      <Packages />
      <WhyChooseUs />
      <Amenities />
      <Testimonials />
      <Gallery />
      <Contact />
    </>
  );
}
