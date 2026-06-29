"use client";

import {
  Car,
  CreditCard,
  Gift,
  Wifi,
  Accessibility,
  Baby,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { amenities } from "@/data/content";

const icons: Record<string, LucideIcon> = {
  Car,
  CreditCard,
  Gift,
  Wifi,
  Accessibility,
  Baby,
};

export function Amenities() {
  return (
    <section className="relative overflow-hidden bg-luxury-black py-24">
      <div className="pointer-events-none absolute inset-0 bg-luxury-radial opacity-40" />
      <div className="container-luxury relative">
        <SectionHeading
          eyebrow="Salon Amenities"
          title="Everything You Need"
          description="We've thought of every detail to make your visit comfortable, convenient and truly luxurious."
        />

        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((item) => {
            const Icon = icons[item.icon] ?? Car;
            return (
              <RevealItem key={item.title}>
                <div className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:bg-white/10">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold transition-colors group-hover:bg-gold group-hover:text-luxury-black">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-0.5 text-sm text-white/50">{item.desc}</p>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
