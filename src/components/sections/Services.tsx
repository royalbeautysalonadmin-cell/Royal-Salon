"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowUpRight, Search, SlidersHorizontal, X, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { allServices } from "@/data/content";
import type { ServiceCategory, Service } from "@/types";

const categories: (ServiceCategory | "All")[] = [
  "All",
  "Hair",
  "Makeup & Styling",
  "Threading",
  "Waxing",
  "Facial & Skin Care",
  "Manicure & Pedicure",
];

const categoryMeta: Record<ServiceCategory, { emoji: string; tagline: string }> = {
  Hair: { emoji: "", tagline: "Styling, colouring, treatments & more" },
  "Makeup & Styling": { emoji: "", tagline: "Party, bridal & HD makeup artistry" },
  Threading: { emoji: "", tagline: "Precision shaping for brows & face" },
  Waxing: { emoji: "", tagline: "Smooth, hair-free skin all year" },
  "Facial & Skin Care": { emoji: "", tagline: "Glow with our signature facials" },
  "Manicure & Pedicure": { emoji: "", tagline: "Nail care & pampering for hands & feet" },
};

type SortOption = "popular" | "price-low" | "price-high" | "duration";

function ServiceCard({ service }: { service: Service }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      className="group overflow-hidden rounded-2xl border border-brown/10 bg-white shadow-soft transition-all duration-300 hover:shadow-luxury hover:-translate-y-1"
    >
      <div className="relative h-48 overflow-hidden sm:h-56">
        <Image
          src={service.image}
          alt={service.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/70 via-luxury-black/10 to-transparent" />
        <Badge variant="dark" className="absolute left-3 top-3 text-[0.6rem]">
          {service.category}
        </Badge>
        {service.featured && (
          <Badge variant="gold" className="absolute right-3 top-3 text-[0.6rem]">
            <Sparkles className="mr-1 h-2.5 w-2.5" />
            Signature
          </Badge>
        )}
        {service.originalPrice && (
          <div className="absolute bottom-3 right-3 rounded-full bg-red-500 px-2.5 py-1 text-[0.65rem] font-bold text-white shadow-lg">
            Save {Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100)}%
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-sm font-semibold leading-snug text-luxury-black sm:text-base">
            {service.name}
          </h3>
          <div className="flex shrink-0 items-baseline gap-1.5">
            {service.originalPrice && (
              <span className="text-xs text-charcoal/70 line-through">
                {formatPrice(service.originalPrice)}
              </span>
            )}
            <span className="whitespace-nowrap font-serif text-sm font-bold text-brown sm:text-base">
              {formatPrice(service.price)}
            </span>
          </div>
        </div>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-charcoal/70">
          {service.description}
        </p>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <span className="flex items-center gap-1.5 text-xs text-charcoal/70">
            <Clock className="h-3 w-3 text-brown" />
            {service.duration}
          </span>
          <Button variant="ghost" size="sm" className="group/btn -mr-2 px-2" asChild>
            <a href={siteConfig.booksyUrl} target="_blank" rel="noopener noreferrer">
              Book Now
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

function CategorySection({
  title,
  tagline,
  services,
}: {
  title: string;
  tagline: string;
  services: Service[];
}) {
  return (
    <div className="scroll-mt-24" id={`cat-${title.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brown/10">
          <span className="text-lg">{categoryMeta[title as ServiceCategory]?.emoji}</span>
        </div>
        <div>
          <h3 className="font-serif text-xl font-semibold text-luxury-black sm:text-2xl">
            {title}
          </h3>
          <p className="text-xs text-charcoal/70 sm:text-sm">{tagline}</p>
        </div>
        <span className="ml-auto rounded-full bg-brown/8 px-3 py-1 text-xs font-medium text-brown">
          {services.length} service{services.length !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </div>
  );
}

export function Services({ showHeader = true }: { showHeader?: boolean }) {
  const [active, setActive] = useState<ServiceCategory | "All">("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = allServices.filter((s) => {
      const matchCategory = active === "All" || s.category === active;
      const matchSearch =
        !search ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });

    switch (sortBy) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "duration":
        result = [...result].sort((a, b) => {
          const toMin = (d: string) => {
            const h = parseInt(d) || 0;
            const m = parseInt(d.split(" ")[0]?.replace(/\D/g, "") || "0") || 0;
            return h * 60 + m;
          };
          return toMin(a.duration) - toMin(b.duration);
        });
        break;
      case "popular":
      default:
        result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [active, search, sortBy]);

  const categoryCount = (cat: ServiceCategory | "All") =>
    cat === "All"
      ? allServices.length
      : allServices.filter((s) => s.category === cat).length;

  const groupedByCategory = useMemo(() => {
    if (active !== "All") return null;
    const groups: Record<ServiceCategory, Service[]> = {
      Hair: [],
      "Makeup & Styling": [],
      Threading: [],
      Waxing: [],
      "Facial & Skin Care": [],
      "Manicure & Pedicure": [],
    };
    for (const s of filtered) {
      groups[s.category].push(s);
    }
    return groups;
  }, [active, filtered]);

  const serviceOrder: ServiceCategory[] = [
    "Hair",
    "Makeup & Styling",
    "Threading",
    "Waxing",
    "Facial & Skin Care",
    "Manicure & Pedicure",
  ];

  const hasActiveFilters = search || active !== "All" || sortBy !== "popular";

  return (
    <section id="services" className="relative bg-cream py-16 sm:py-24">
      <div className="container-luxury">
        {showHeader && (
          <SectionHeading
            eyebrow="Our Services"
            title="Premium Beauty Treatments"
            description="From hair artistry to advanced skincare, every service is delivered with luxury, precision and care. Browse our complete menu of treatments."
          />
        )}
        <div className="mx-auto mt-8 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/70" />
            <input
              type="text"
              placeholder="Search services (e.g. keratin, facial, waxing...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-brown/15 bg-white py-3.5 pl-11 pr-12 text-sm text-charcoal shadow-sm placeholder:text-charcoal/70 focus:border-brown focus:outline-none focus:ring-2 focus:ring-brown/10"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/70 hover:text-charcoal"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filter toggle + sort */}
          <div className="mt-3 flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-charcoal shadow-sm transition-colors hover:bg-brown/5"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
              {hasActiveFilters && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brown text-[0.6rem] font-bold text-white">
                  !
                </span>
              )}
            </button>
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setSearch("");
                  setActive("All");
                  setSortBy("popular");
                }}
                className="text-xs font-medium text-brown hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Expandable filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="mt-4 rounded-2xl border border-brown/10 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-charcoal/70">
                    <SlidersHorizontal className="h-3 w-3" />
                    Sort by
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(
                      [
                        { value: "popular", label: "Most Popular" },
                        { value: "price-low", label: "Price: Low to High" },
                        { value: "price-high", label: "Price: High to Low" },
                        { value: "duration", label: "Shortest First" },
                      ] as const
                    ).map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setSortBy(opt.value)}
                        className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                          sortBy === opt.value
                            ? "bg-brown text-white shadow-sm"
                            : "bg-charcoal/5 text-charcoal/70 hover:bg-charcoal/10"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Category pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                active === cat
                  ? "bg-brown text-white shadow-luxury"
                  : "bg-white text-charcoal/70 shadow-sm hover:bg-brown/10 hover:text-brown"
              }`}
            >
              {cat === "All" ? "All Services" : cat}
              <span
                className={`ml-1.5 text-xs ${
                  active === cat ? "text-white/70" : "text-charcoal/70"
                }`}
              >
                {categoryCount(cat)}
              </span>
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="mt-6 text-center text-sm text-charcoal/70">
          Showing{" "}
          <span className="font-medium text-charcoal/70">{filtered.length}</span>{" "}
          service{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* View: grouped by category or filtered list */}
        {active === "All" && !search ? (
          <div className="mt-12 space-y-16">
            {serviceOrder.map((cat) => {
              const catServices = groupedByCategory?.[cat];
              if (!catServices || catServices.length === 0) return null;
              return (
                <CategorySection
                  key={cat}
                  title={cat}
                  tagline={categoryMeta[cat].tagline}
                  services={catServices}
                />
              );
            })}
          </div>
        ) : (
          <motion.div layout className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {filtered.length === 0 && (
          <div className="mt-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-charcoal/5">
              <Search className="h-7 w-7 text-charcoal/70" />
            </div>
            <p className="text-lg font-medium text-charcoal/70">No services found</p>
            <p className="mt-1 text-sm text-charcoal/70">
              Try adjusting your search or filters
            </p>
            <Button
              variant="ghost"
              className="mt-4 text-brown"
              onClick={() => {
                setSearch("");
                setActive("All");
                setSortBy("popular");
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
