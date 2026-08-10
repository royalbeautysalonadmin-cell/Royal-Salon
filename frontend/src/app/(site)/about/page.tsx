import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { About } from "@/components/sections/About";
import { AboutExtras } from "@/components/sections/AboutExtras";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover the story, philosophy and award-winning team behind Royal Beauty Salon — Warsaw's destination for luxury beauty and bridal artistry.",
  keywords: [
    "about Royal Beauty Salon",
    "beauty salon Warsaw",
    "luxury salon Warsaw",
    "beauty academy Warsaw",
  ],
  alternates: {
    canonical: `${siteConfig.url}/about`,
    languages: {
      "en-GB": `${siteConfig.url}/about`,
      "x-default": `${siteConfig.url}/about`,
    },
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/about`,
    title: "About Royal Beauty Salon — Warsaw's Luxury Beauty Destination",
    description:
      "Discover the story, philosophy and award-winning team behind Royal Beauty Salon — Warsaw's destination for luxury beauty and bridal artistry.",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "About Royal Beauty Salon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Royal Beauty Salon — Warsaw's Luxury Beauty Destination",
    description:
      "Discover the story, philosophy and award-winning team behind Royal Beauty Salon.",
    images: [siteConfig.ogImage],
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageHero
        eyebrow="Our Story"
        title="A Royal Legacy of Beauty"
        description="For over a decade, Royal Beauty Salon has been Warsaw's sanctuary for those who expect nothing less than perfection."
        breadcrumb="About"
      />
      <About />
      <AboutExtras />
    </>
  );
}
