"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { useBookingStore } from "@/store/booking";
import { services } from "@/data/content";
import type { ServiceCategory } from "@/types";

const categories: (ServiceCategory | "All")[] = [
  "All",
  "Makeup",
  "Hair",
  "Skin",
  "Nails",
  "Threading & Waxing",
  "Mehndi",
  "Training",
];

export function Services() {
  const [active, setActive] = useState<ServiceCategory | "All">("All");
  const openBooking = useBookingStore((s) => s.open);

  const filtered =
    active === "All" ? services : services.filter((s) => s.category === active);

  return (
    <section id="services" className="relative bg-cream py-24">
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Our Services"
          title="Premium Beauty Treatments"
          description="From bridal artistry to advanced skincare, every service is delivered with luxury, precision and care."
        />

        {/* Category filter */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                active === cat
                  ? "bg-brown text-white shadow-luxury"
                  : "bg-white text-charcoal/70 hover:bg-brown/10 hover:text-brown"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <motion.div layout className="mt-12 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((service) => (
              <motion.article
                layout
                key={service.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group overflow-hidden rounded-2xl border border-brown/10 bg-white shadow-soft transition-shadow hover:shadow-luxury"
              >
                <div className="relative h-40 overflow-hidden sm:h-56">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 via-transparent to-transparent" />
                  <Badge variant="dark" className="absolute left-3 top-3 text-[0.65rem]">
                    {service.category}
                  </Badge>
                  {service.featured && (
                    <Badge variant="gold" className="absolute right-3 top-3 text-[0.65rem]">
                      Signature
                    </Badge>
                  )}
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                    <h3 className="font-serif text-base font-semibold text-luxury-black sm:text-xl">
                      {service.name}
                    </h3>
                    <span className="whitespace-nowrap font-serif text-base font-semibold text-brown sm:text-lg">
                      {formatPrice(service.price)}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-charcoal/65 sm:line-clamp-none sm:text-sm">
                    {service.description}
                  </p>
                  <div className="mt-3 flex flex-col items-start gap-2 border-t border-border pt-3 sm:mt-5 sm:flex-row sm:items-center sm:justify-between sm:pt-4">
                    <span className="flex items-center gap-1.5 text-xs text-charcoal/60">
                      <Clock className="h-3.5 w-3.5 text-brown" />
                      {service.duration}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group/btn -ml-2 px-2 sm:-mr-2 sm:ml-0"
                      onClick={() => openBooking(service.slug)}
                    >
                      Book Now
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
