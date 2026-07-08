"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { Testimonial } from "@/types";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % testimonials.length),
    [testimonials.length]
  );
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused || testimonials.length === 0) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next, testimonials.length]);

  if (testimonials.length === 0) return null;
  const active = testimonials[index];

  return (
    <section
      className="relative overflow-hidden bg-luxury-black py-24 text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0 bg-luxury-radial opacity-50" />
      <Quote className="pointer-events-none absolute left-1/2 top-16 h-40 w-40 -translate-x-1/2 text-gold/5" />

      <div className="container-luxury relative">
        <SectionHeading
          light
          eyebrow="Testimonials"
          title="Loved by Thousands"
          description="Real words from the clients and graduates who trust us with their beauty."
        />

        <div className="relative mx-auto mt-12 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="glass-dark rounded-3xl p-8 text-center md:p-12"
            >
              <div className="mb-5 flex justify-center gap-1">
                {Array.from({ length: active.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                ))}
              </div>
              <p className="font-serif text-xl leading-relaxed text-white/90 md:text-2xl text-balance">
                &ldquo;{active.quote}&rdquo;
              </p>
              <div className="mt-8 flex items-center justify-center gap-4">
                <Image
                  src={active.avatar}
                  alt={active.name}
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-gold"
                />
                <div className="text-left">
                  <p className="font-serif text-lg">{active.name}</p>
                  <p className="text-sm text-gold">{active.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-8 bg-gold" : "w-2 bg-white/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
