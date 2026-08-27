import type { Metadata } from "next";
import { TreatmentRecommender } from "@/components/tools/TreatmentRecommender";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Treatment Recommender — Find the Right Beauty Treatment for You",
  description:
    "Not sure which treatment is right for you? Answer a few questions and get personalised hair, skin, brow, nail and waxing recommendations. Free tool from Royal Beauty Salon Warsaw.",
  alternates: { canonical: `${siteConfig.url}/tools/treatment-recommender` },
};

export default function TreatmentRecommenderPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Beauty Tools", path: "/tools" },
          { name: "Treatment Recommender", path: "/tools/treatment-recommender" },
        ])}
      />
      <section className="bg-luxury-black pt-32 pb-16 text-white sm:pt-40">
        <div className="container-luxury text-center">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-gold-300">
            <span className="h-px w-6 bg-gold" />
            Free Beauty Tool
          </span>
          <h1 className="mt-4 font-serif text-4xl font-semibold md:text-5xl">
            Treatment Recommender
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Not sure what you need? Select your area of concern and get personalised treatment recommendations from our beauty experts.
          </p>
        </div>
      </section>
      <section className="bg-white py-16 sm:py-20">
        <div className="container-luxury max-w-3xl">
          <TreatmentRecommender />
        </div>
      </section>
    </>
  );
}
