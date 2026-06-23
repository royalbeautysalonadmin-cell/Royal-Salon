"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookingStore } from "@/store/booking";
import { stats } from "@/data/content";
import { HeroSlider } from "./HeroSlider";

const ParticleField = dynamic(() => import("@/components/three/ParticleField"), {
  ssr: false,
});

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const openBooking = useBookingStore((s) => s.open);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-cream via-white to-cream pt-28 lg:pt-24"
    >
      {/* Decorative gradient backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-brown/10 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-gold/20 blur-[120px]" />
        <div className="absolute inset-0 bg-luxury-radial" />
      </div>

      {/* 3D particle layer (subtle golden dust) */}
      <div className="absolute inset-0 z-0 opacity-80">
        <ParticleField />
      </div>

      <div className="container-luxury relative z-10 py-14">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item}>
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium tracking-wide text-brown-700 shadow-soft">
                <Sparkles className="h-4 w-4 text-gold-600" />
                Warsaw&apos;s Premier Luxury Beauty Destination
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-6 font-serif text-5xl font-semibold leading-[1.04] text-luxury-black sm:text-6xl lg:text-7xl text-balance"
            >
              Where Beauty <br />
              Meets <span className="text-gradient-gold">Royalty</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal/70"
            >
              Experience luxury beauty treatments, bridal makeovers, premium skincare, and
              professional artistry — crafted by award-winning specialists in the heart of Warsaw.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
              <Button size="lg" variant="gold" onClick={() => openBooking()} className="group">
                Book Appointment
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/services">Explore Services</a>
              </Button>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-9 flex items-center gap-6 text-sm text-charcoal/70"
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p>
                <span className="font-semibold text-luxury-black">4.9/5</span> from 1,280+ happy clients
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroSlider />
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-14 grid grid-cols-2 gap-4 rounded-3xl border border-white/50 bg-white/50 p-6 shadow-soft backdrop-blur-md sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-3xl font-semibold text-gradient-brown">{s.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-charcoal/60">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
