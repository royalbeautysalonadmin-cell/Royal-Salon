"use client";

import {
  Users,
  Sparkles,
  ShieldCheck,
  Crown,
  Heart,
  Award,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { whyChooseUs } from "@/data/content";

const icons: Record<string, LucideIcon> = {
  Users,
  Sparkles,
  ShieldCheck,
  Crown,
  Heart,
  Award,
};

export function WhyChooseUs() {
  return (
    <section className="bg-white py-24">
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="The Royal Difference"
          description="Every detail is designed to deliver an unmatched luxury beauty experience you can trust."
        />

        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item) => {
            const Icon = icons[item.icon] ?? Sparkles;
            return (
              <RevealItem key={item.title}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-brown/10 bg-cream/40 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-white hover:shadow-luxury">
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold/10 transition-transform duration-500 group-hover:scale-150" />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-brown-gradient text-white shadow-gold">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="relative mt-5 font-serif text-xl font-semibold text-luxury-black">
                    {item.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-charcoal/65">
                    {item.desc}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
