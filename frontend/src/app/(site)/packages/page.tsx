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
  alternates: { canonical: `${siteConfig.url}/packages` },
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
