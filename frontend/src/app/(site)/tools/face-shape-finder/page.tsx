import type { Metadata } from "next";
import { FaceShapeFinder } from "@/components/tools/FaceShapeFinder";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Face Shape Finder — Discover Your Face Shape Online Free",
  description:
    "Find your face shape with our free online quiz. Get personalised hairstyle, haircut and eyebrow shape recommendations based on your face shape. Royal Beauty Salon Warsaw.",
  alternates: { canonical: `${siteConfig.url}/tools/face-shape-finder` },
};

export default function FaceShapeFinderPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Beauty Tools", path: "/tools" },
          { name: "Face Shape Finder", path: "/tools/face-shape-finder" },
        ])}
      />
      <section className="bg-luxury-black pt-32 pb-16 text-white sm:pt-40">
        <div className="container-luxury text-center">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-gold-300">
            <span className="h-px w-6 bg-gold" />
            Free Beauty Tool
          </span>
          <h1 className="mt-4 font-serif text-4xl font-semibold md:text-5xl">
            Face Shape Finder
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Answer 5 quick questions to discover your face shape and get personalised hairstyle and brow recommendations.
          </p>
        </div>
      </section>
      <section className="bg-white py-16 sm:py-20">
        <div className="container-luxury max-w-3xl">
          <FaceShapeFinder />
        </div>
      </section>
    </>
  );
}
