"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, ArrowRight, Star, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { stats } from "@/data/content";
import { HeroSlider } from "./HeroSlider";

const ParticleField = dynamic(() => import("@/components/three/ParticleField"), {
  ssr: false,
});

/** Mounts once the browser is idle so the heavy WebGL init never competes
 *  with the main thread during the critical hydration window — the
 *  decorative layer still appears within a beat, just off the hot path. */
function useIdleMount() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const ric = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 200));
    const cic = window.cancelIdleCallback ?? clearTimeout;
    const id = ric(() => setReady(true));
    return () => cic(id as never);
  }, []);
  return ready;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const showParticles = useIdleMount();
  // Scroll-linked parallax: content, slider and orbs drift apart at
  // different speeds while the visitor scrolls out of the hero.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const sliderY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const statsY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-cream via-white to-cream pt-28 lg:pt-24"
    >
      {/* Decorative gradient backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          style={{ y: orbY }}
          className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-brown/10 blur-[120px]"
        />
        <motion.div
          style={{ y: orbY }}
          className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-gold/20 blur-[120px]"
        />
        <div className="absolute inset-0 bg-luxury-radial" />
      </div>

      {/* 3D particle layer (subtle golden dust) */}
      <div className="absolute inset-0 z-0 opacity-80">
        {showParticles && <ParticleField />}
      </div>

      <div className="container-luxury relative z-10 py-14">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            style={{ y: contentY, opacity: contentOpacity }}
          >
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
              <Button size="lg" variant="gold" className="group" asChild>
                <a href={siteConfig.booksyUrl} target="_blank" rel="noopener noreferrer">
                  Book Appointment
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </a>
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
            style={{ y: sliderY }}
          >
            <HeroSlider />
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          style={{ y: statsY }}
          className="mt-14 grid grid-cols-2 gap-4 rounded-3xl border border-white/50 bg-white/50 p-6 shadow-soft backdrop-blur-md sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-3xl font-semibold text-gradient-brown">{s.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-charcoal/70">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to explore"
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-charcoal/70 transition-colors hover:text-brown sm:flex"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-9 w-6 items-start justify-center rounded-full border border-charcoal/25 pt-1.5"
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </motion.span>
      </motion.a>
    </section>
  );
}
