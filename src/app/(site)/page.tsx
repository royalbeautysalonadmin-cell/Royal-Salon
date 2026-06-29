import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { BridalShowcase } from "@/components/sections/BridalShowcase";
import { Packages } from "@/components/sections/Packages";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Amenities } from "@/components/sections/Amenities";
import { Testimonials } from "@/components/sections/Testimonials";
import { Gallery } from "@/components/sections/Gallery";
import { Contact } from "@/components/sections/Contact";
import { servicesJsonLd, faqJsonLd } from "@/lib/seo";

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
