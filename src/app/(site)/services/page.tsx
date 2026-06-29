import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Services } from "@/components/sections/Services";
import { Packages } from "@/components/sections/Packages";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Contact } from "@/components/sections/Contact";
import { servicesJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore our full menu of 55+ luxury beauty treatments in Warsaw — hair, makeup, threading, waxing, facials, manicure, pedicure and more at Royal Beauty Salon.",
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd()) }}
      />
      <PageHero
        eyebrow="Our Services"
        title="Premium Beauty Treatments"
        description="From bridal artistry to advanced skincare, every service is delivered with luxury, precision and care in the heart of Warsaw."
        breadcrumb="Services"
      />
      <Services showHeader={false} />
      <Packages />
      <WhyChooseUs />
      <Contact />
    </>
  );
}
