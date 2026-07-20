import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Packages } from "@/components/sections/Packages";
import { Testimonials } from "@/components/sections/Testimonials";
import { siteConfig } from "@/lib/site";
import { getBackendTestimonials } from "@/lib/backend-api";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Beauty Packages",
  description:
    "Curated luxury beauty packages in Warsaw — bridal, monthly memberships and seasonal pampering experiences with exceptional value.",
  keywords: [
    "beauty packages Warsaw",
    "bridal beauty package Warsaw",
    "luxury salon packages",
    "beauty membership Warsaw",
  ],
  alternates: { canonical: `${siteConfig.url}/packages` },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/packages`,
    title: "Beauty Packages — Royal Beauty Salon Warsaw",
    description:
      "Curated luxury beauty packages in Warsaw — bridal, monthly memberships and seasonal pampering experiences with exceptional value.",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "Beauty Packages at Royal Beauty Salon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beauty Packages — Royal Beauty Salon Warsaw",
    description:
      "Curated luxury beauty packages in Warsaw — bridal, monthly memberships and seasonal pampering.",
    images: [siteConfig.ogImage],
  },
};

export default async function PackagesPage() {
  const testimonials = await getBackendTestimonials();
  return (
    <>
      <PageHero
        eyebrow="Beauty Packages"
        title="Curated Luxury Packages"
        description="Thoughtfully bundled experiences offering exceptional value for brides, members and seasonal pampering."
        breadcrumb="Packages"
      />
      <Packages />
      <Testimonials testimonials={testimonials} />
    </>
  );
}
