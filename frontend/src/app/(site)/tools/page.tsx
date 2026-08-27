import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, Scissors, ClipboardList, Palette, ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Beauty Tools — Hair, Skin & Bridal Calculators",
  description:
    "Free online beauty tools from Royal Beauty Salon Warsaw — face shape finder, hair colour simulator, bridal beauty timeline, treatment recommender and skin undertone analyzer.",
  alternates: { canonical: `${siteConfig.url}/tools` },
};

const tools = [
  {
    slug: "face-shape-finder",
    title: "Face Shape Finder",
    description: "Discover your face shape and get personalised hairstyle and brow recommendations.",
    icon: Sparkles,
    color: "from-rose-500 to-pink-600",
  },
  {
    slug: "hair-color-simulator",
    title: "Hair Colour Simulator",
    description: "Virtually try on hair colours before you commit — find your perfect shade.",
    icon: Palette,
    color: "from-violet-500 to-purple-600",
  },
  {
    slug: "treatment-recommender",
    title: "Treatment Recommender",
    description: "Answer a few questions and get personalised hair, skin and beauty treatment suggestions.",
    icon: ClipboardList,
    color: "from-emerald-500 to-teal-600",
  },
  {
    slug: "skin-undertone-analyzer",
    title: "Skin Undertone Analyzer",
    description: "Find your skin undertone — warm, cool or neutral — for perfect makeup and hair colour matching.",
    icon: Scissors,
    color: "from-blue-500 to-cyan-600",
  },
];

export default function ToolsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Beauty Tools", path: "/tools" }])} />

      {/* Hero */}
      <section className="bg-luxury-black pt-32 pb-16 text-white sm:pt-40">
        <div className="container-luxury text-center">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-gold-300">
            <span className="h-px w-6 bg-gold" />
            Free Beauty Tools
          </span>
          <h1 className="mt-4 font-serif text-4xl font-semibold md:text-5xl">
            Your Personal Beauty Guide
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/70 md:text-lg">
            Free interactive tools to help you discover your perfect look — from face shape analysis to bridal beauty planning.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-luxury">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group relative overflow-hidden rounded-3xl border border-brown/10 bg-cream p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-luxury"
                >
                  <div className={`inline-flex rounded-2xl bg-gradient-to-br ${tool.color} p-3 text-white shadow-lg`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-5 font-serif text-xl font-semibold text-luxury-black group-hover:text-brown">
                    {tool.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                    {tool.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brown">
                    Try it now
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
