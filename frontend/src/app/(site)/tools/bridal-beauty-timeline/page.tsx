import type { Metadata } from "next";
import { BridalBeautyTimeline } from "@/components/tools/BridalBeautyTimeline";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bridal Beauty Timeline — Pre-Wedding Beauty Countdown Calculator",
  description:
    "Plan your pre-wedding beauty appointments with our free bridal beauty timeline calculator. Skincare, hair, nails, makeup and brows scheduled by week. Royal Beauty Salon Warsaw.",
  alternates: { canonical: `${siteConfig.url}/tools/bridal-beauty-timeline` },
};

export default function BridalBeautyTimelinePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Beauty Tools", path: "/tools" },
          { name: "Bridal Beauty Timeline", path: "/tools/bridal-beauty-timeline" },
        ])}
      />
      <section className="bg-luxury-black pt-32 pb-16 text-white sm:pt-40">
        <div className="container-luxury text-center">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-gold-300">
            <span className="h-px w-6 bg-gold" />
            Free Beauty Tool
          </span>
          <h1 className="mt-4 font-serif text-4xl font-semibold md:text-5xl">
            Bridal Beauty Timeline
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Enter your wedding date and get a personalised countdown of every beauty appointment you need — from skincare to the big day.
          </p>
        </div>
      </section>
      <section className="bg-white py-16 sm:py-20">
        <div className="container-luxury max-w-3xl">
          <BridalBeautyTimeline />
        </div>
      </section>
    </>
  );
}
