import type { Metadata } from "next";
import { HairColorSimulator } from "@/components/tools/HairColorSimulator";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hair Colour Simulator — Virtual Try-On Free Tool",
  description:
    "Try on hair colours virtually before you commit. Upload a photo and see how blonde, brown, red, copper and more look on you. Free tool from Royal Beauty Salon Warsaw.",
  alternates: { canonical: `${siteConfig.url}/tools/hair-color-simulator` },
};

export default function HairColorSimulatorPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Beauty Tools", path: "/tools" },
          { name: "Hair Colour Simulator", path: "/tools/hair-color-simulator" },
        ])}
      />
      <section className="bg-luxury-black pt-32 pb-16 text-white sm:pt-40">
        <div className="container-luxury text-center">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-gold-300">
            <span className="h-px w-6 bg-gold" />
            Free Beauty Tool
          </span>
          <h1 className="mt-4 font-serif text-4xl font-semibold md:text-5xl">
            Hair Colour Simulator
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Upload a photo and virtually try on 12+ hair colours — from natural blacks to trendy rose gold. Your photo stays in your browser.
          </p>
        </div>
      </section>
      <section className="bg-white py-16 sm:py-20">
        <div className="container-luxury max-w-3xl">
          <HairColorSimulator />
        </div>
      </section>
    </>
  );
}
