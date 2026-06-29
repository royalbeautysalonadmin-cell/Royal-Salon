"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowUpRight, Search } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { useBookingStore } from "@/store/booking";
import { allServices } from "@/data/content";
import type { ServiceCategory } from "@/types";

const categories: (ServiceCategory | "All")[] = [
  "All",
  "Hair",
  "Makeup & Styling",
  "Threading",
  "Waxing",
  "Facial & Skin Care",
  "Manicure & Pedicure",
];

export function Services() {
  const [active, setActive] = useState<ServiceCategory | "All">("All");
  const [search, setSearch] = useState("");
  const openBooking = useBookingStore((s) => s.open);

  const filtered = allServices.filter((s) => {
    const matchCategory = active === "All" || s.category === active;
    const matchSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const categoryCount = (cat: ServiceCategory | "All") =>
    cat === "All"
      ? allServices.length
      : allServices.filter((s) => s.category === cat).length;

  return (
    <section id="services" className="relative bg-cream py-24">
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Our Services"
          title="Premium Beauty Treatments"
          description="From hair artistry to advanced skincare, every service is delivered with luxury, precision and care. Browse our complete menu of treatments."
        />

        {/* Search bar */}
        <div className="mx-auto mt-8 max-w-md">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/40" />
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-brown/15 bg-white py-3 pl-11 pr-4 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-brown focus:outline-none focus:ring-2 focus:ring-brown/10"
            />
          </div>
        </div>

        {/* Category filter */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
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
              <span
                className={`ml-1.5 text-xs ${
                  active === cat ? "text-white/70" : "text-charcoal/40"
                }`}
              >
                {categoryCount(cat)}
              </span>
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="mt-6 text-center text-sm text-charcoal/50">
          Showing {filtered.length} service{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Cards grid */}
        <motion.div layout className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((service) => (
              <motion.article
                layout
                key={service.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group overflow-hidden rounded-2xl border border-brown/10 bg-white shadow-soft transition-all hover:shadow-luxury hover:-translate-y-1"
              >
                <div className="relative h-44 overflow-hidden sm:h-52">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 via-transparent to-transparent" />
                  <Badge variant="dark" className="absolute left-3 top-3 text-[0.6rem]">
                    {service.category}
                  </Badge>
                  {service.featured && (
                    <Badge variant="gold" className="absolute right-3 top-3 text-[0.6rem]">
                      Signature
                    </Badge>
                  )}
                  {service.originalPrice && (
                    <div className="absolute right-3 top-3 rounded-full bg-red-500 px-2 py-0.5 text-[0.6rem] font-bold text-white sm:right-3 sm:top-auto sm:bottom-3">
                      Save {Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100)}%
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-5">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
                    <h3 className="font-serif text-sm font-semibold text-luxury-black sm:text-base">
                      {service.name}
                    </h3>
                    <div className="flex items-baseline gap-1.5">
                      {service.originalPrice && (
                        <span className="text-xs text-charcoal/40 line-through">
                          {formatPrice(service.originalPrice)}
                        </span>
                      )}
                      <span className="whitespace-nowrap font-serif text-sm font-semibold text-brown sm:text-base">
                        {formatPrice(service.price)}
                      </span>
                    </div>
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-charcoal/60">
                    {service.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                    <span className="flex items-center gap-1.5 text-xs text-charcoal/55">
                      <Clock className="h-3 w-3 text-brown" />
                      {service.duration}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group/btn -mr-2 px-2"
                      onClick={() => openBooking(service.slug)}
                    >
                      Book Now
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-lg text-charcoal/50">No services found matching your search.</p>
            <Button
              variant="ghost"
              className="mt-3 text-brown"
              onClick={() => {
                setSearch("");
                setActive("All");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
