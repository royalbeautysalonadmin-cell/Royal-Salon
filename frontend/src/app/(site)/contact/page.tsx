import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Contact } from "@/components/sections/Contact";
import { faqJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Visit Royal Beauty Salon in Warsaw. Find our address, opening hours, phone and book your luxury beauty appointment today.",
  keywords: [
    "contact Royal Beauty Salon",
    "beauty salon Warsaw address",
    "book appointment Warsaw",
    "salon Warszawa",
  ],
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/contact`,
    title: "Contact Royal Beauty Salon — Book Your Appointment",
    description:
      "Visit Royal Beauty Salon in Warsaw. Find our address, opening hours, phone and book your luxury beauty appointment today.",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "Contact Royal Beauty Salon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Royal Beauty Salon — Book Your Appointment",
    description:
      "Visit Royal Beauty Salon in Warsaw. Find our address, opening hours, phone and book your appointment.",
    images: [siteConfig.ogImage],
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />
      <PageHero
        eyebrow="Get In Touch"
        title="Visit Our Luxury Salon"
        description="We'd love to welcome you. Reach out, book a visit, or simply say hello — we're in the heart of Warsaw."
        breadcrumb="Contact"
      />
      <Contact />
    </>
  );
}
