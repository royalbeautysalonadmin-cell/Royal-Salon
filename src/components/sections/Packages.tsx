"use client";

import Image from "next/image";
import { Check, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { useBookingStore } from "@/store/booking";
import { packages } from "@/data/content";

export function Packages() {
  const openBooking = useBookingStore((s) => s.open);

  return (
    <section id="packages" className="bg-white py-24">
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Beauty Packages"
          title="Curated Luxury Packages"
          description="Thoughtfully bundled experiences offering exceptional value for brides, members and seasonal pampering."
        />

        <RevealGroup className="mt-12 grid gap-8 lg:grid-cols-3">
          {packages.map((pkg) => (
            <RevealItem key={pkg.slug}>
              <div
                className={`relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-luxury ${
                  pkg.popular ? "border-gold shadow-gold" : "border-brown/10 shadow-soft"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute right-5 top-5 z-10">
                    <Badge variant="gold" className="gap-1">
                      <Sparkles className="h-3 w-3" /> Most Popular
                    </Badge>
                  </div>
                )}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-5 text-white">
                    <Badge variant="dark" className="mb-2">{pkg.type}</Badge>
                    <h3 className="font-serif text-2xl font-semibold">{pkg.name}</h3>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-end gap-2">
                    <span className="font-serif text-4xl font-semibold text-brown">
                      {formatPrice(pkg.price)}
                    </span>
                    {pkg.originalPrice && (
                      <span className="mb-1 text-sm text-charcoal/40 line-through">
                        {formatPrice(pkg.originalPrice)}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-charcoal/65">{pkg.description}</p>

                  <ul className="mt-5 space-y-2.5">
                    {pkg.includes.map((inc) => (
                      <li key={inc} className="flex items-start gap-2.5 text-sm text-charcoal/80">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                        {inc}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {pkg.benefits.map((b) => (
                      <span
                        key={b}
                        className="rounded-full bg-cream px-3 py-1 text-xs text-brown"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  <Button
                    variant={pkg.popular ? "gold" : "default"}
                    className="mt-6 w-full"
                    onClick={() => openBooking(pkg.slug)}
                  >
                    Book This Package
                  </Button>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
