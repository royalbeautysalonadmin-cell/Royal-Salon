import type { Metadata } from "next";
import { SkinUndertoneAnalyzer } from "@/components/tools/SkinUndertoneAnalyzer";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Skin Undertone Analyzer — Find Your Undertone Free Tool",
  description:
    "Discover whether you have warm, cool or neutral skin undertones. Get personalised makeup, hair colour and clothing recommendations. Free tool from Royal Beauty Salon Warsaw.",
  alternates: { canonical: `${siteConfig.url}/tools/skin-undertone-analyzer` },
};

export default function SkinUndertoneAnalyzerPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Beauty Tools", path: "/tools" },
          { name: "Skin Undertone Analyzer", path: "/tools/skin-undertone-analyzer" },
        ])}
      />
      <section className="bg-luxury-black pt-32 pb-16 text-white sm:pt-40">
        <div className="container-luxury text-center">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-gold-300">
            <span className="h-px w-6 bg-gold" />
            Free Beauty Tool
          </span>
          <h1 className="mt-4 font-serif text-4xl font-semibold md:text-5xl">
            Skin Undertone Analyzer
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Answer 6 quick questions to discover your skin undertone and get personalised makeup, hair colour and wardrobe recommendations.
          </p>
        </div>
      </section>
      <section className="bg-white py-16 sm:py-20">
        <div className="container-luxury max-w-3xl">
          <SkinUndertoneAnalyzer />
        </div>
      </section>
    </>
  );
}
