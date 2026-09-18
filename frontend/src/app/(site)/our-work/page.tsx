import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { OurWorkPage } from "@/components/sections/OurWorkPage";
import { getBackendServices } from "@/lib/backend-api";
import type { Service } from "@/types";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Our Work — Beauty Transformations | Royal Beauty Salon Warsaw",
  description:
    "Watch real hair styling, bridal makeup, skincare and makeover transformations at Royal Beauty Salon in Warsaw. See our artistry in action.",
  keywords: [
    "beauty salon work Warsaw",
    "hair transformation Warsaw",
    "bridal makeup before after Warsaw",
    "makeover video Warsaw",
    "salon portfolio Warsaw",
    "keratin treatment results Warsaw",
    "skincare transformation Poland",
    "beauty salon videos Warsaw",
    "salon kosmetyczny prace Warszawa",
    "metamorfoza urody Warszawa",
    "makijaż ślubny Warszawa",
    "pielęgnacja włosów Warszawa",
  ],
  alternates: {
    canonical: `${siteConfig.url}/our-work`,
    languages: {
      "en-GB": `${siteConfig.url}/our-work`,
      "x-default": `${siteConfig.url}/our-work`,
    },
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/our-work`,
    title: "Our Work — Beauty Transformations | Royal Beauty Salon Warsaw",
    description:
      "Watch real hair styling, bridal makeup, skincare and makeover transformations at Royal Beauty Salon in Warsaw.",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "Royal Beauty Salon Work" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Work — Beauty Transformations | Royal Beauty Salon Warsaw",
    description:
      "Watch real hair styling, bridal makeup, skincare and makeover transformations at Royal Beauty Salon in Warsaw.",
    images: [siteConfig.ogImage],
  },
};

export default async function OurWorkRoute() {
  let services: Service[] = [];
  try {
    services = await getBackendServices();
  } catch {
    // Graceful fallback — services carousel will be empty
  }
  return <OurWorkPage services={services} />;
}
