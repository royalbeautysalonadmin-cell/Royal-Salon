import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { About } from "@/components/sections/About";
import { AboutExtras } from "@/components/sections/AboutExtras";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover the story, philosophy and award-winning team behind Royal Beauty Salon — Warsaw's destination for luxury beauty and bridal artistry.",
  alternates: { canonical: `${siteConfig.url}/about` },
};

export default function AboutPage() {
  return (
    <>
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
