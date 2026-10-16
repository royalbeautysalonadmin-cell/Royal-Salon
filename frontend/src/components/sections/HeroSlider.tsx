"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    src: "/videos/IMG_7287.mp4",
    poster: "/videos/IMG_7287.jpg",
    label: "Signature Hair Artistry",
  },
  {
    src: "/videos/IMG_6254_1.mp4",
    poster: "/videos/IMG_6254_1.jpg",
    label: "Bridal Makeovers",
  },
  {
    src: "/videos/IMG_7021.mp4",
    poster: "/videos/IMG_7021.jpg",
    label: "Luxury Skincare",
  },
  {
    src: "/videos/IMG_3014_1.mp4",
    poster: "/videos/IMG_3014_1.jpg",
    label: "Premium Treatments",
  },
  {
    src: "/videos/IMG_2129.mp4",
    poster: "/videos/IMG_2129.jpg",
    label: "Hair Styling & Treatment",
  },
  {
    src: "/videos/IMG_2283.mp4",
    poster: "/videos/IMG_2283.jpg",
    label: "Complete Makeover",
  },
  {
    src: "/videos/IMG_7230.mp4",
    poster: "/videos/IMG_7230.jpg",
    label: "Royal Beauty Experience",
  },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      {/* Decorative gold frame offset */}
      <div className="absolute -inset-3 -z-10 rounded-[2.5rem] border border-gold/30" />
      <div className="absolute -right-5 -top-5 -z-10 h-32 w-32 rounded-full bg-gold/20 blur-2xl" />

      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-luxury">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {/* Optimized LCP image (avif/webp, preloaded via priority on the
                first slide) sits behind the video, so the largest paint is a
                small optimized asset rather than the video's raw poster JPG. */}
            <Image
              src={slides[index].poster}
              alt={slides[index].label}
              fill
              priority={index === 0}
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <video
              src={slides[index].src}
              poster={slides[index].poster}
              aria-label={slides[index].label}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 via-transparent to-transparent" />

        {/* Caption */}
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
          <AnimatePresence mode="wait">
            <motion.p
              key={slides[index].label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="font-serif text-lg font-medium text-white drop-shadow"
            >
              {slides[index].label}
            </motion.p>
          </AnimatePresence>
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Show slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-gold" : "w-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating glass rating badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="absolute -left-4 top-10 hidden rounded-2xl border border-white/40 bg-white/70 px-4 py-3 shadow-luxury backdrop-blur-md sm:block"
      >
        <p className="font-serif text-2xl font-semibold text-gradient-brown">5★</p>
        <p className="text-[0.65rem] uppercase tracking-wider text-charcoal/70">2,000+ Google Reviews</p>
      </motion.div>
    </div>
  );
}
