"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

const highlights = [
  "Certified, internationally trained beauticians",
  "Premium, cruelty-free luxury products",
  "Bespoke treatments tailored to you",
  "Award-winning bridal & editorial artistry",
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-24">
      <div className="container-luxury grid items-center gap-14 lg:grid-cols-2">
        {/* Image collage with reveal */}
        <Reveal direction="right" className="relative">
          <div className="relative">
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-[2rem] shadow-luxury"
            >
              <Image
                src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=900&q=80"
                alt="Luxury treatment at Royal Beauty Salon"
                width={900}
                height={1100}
                className="h-[520px] w-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="absolute -bottom-8 -left-6 hidden w-56 rounded-2xl border border-brown/10 bg-white p-5 shadow-luxury sm:block"
            >
              <p className="font-serif text-4xl font-semibold text-gradient-brown">1+</p>
              <p className="mt-1 text-sm text-charcoal/70">
                Year crafting beauty &amp; confidence
              </p>
            </motion.div>
            <div className="absolute -right-4 -top-4 -z-10 h-40 w-40 rounded-full bg-gold/20 blur-2xl" />
          </div>
        </Reveal>

        {/* Story */}
        <div>
          <SectionHeading
            align="left"
            eyebrow="Our Story"
            title="A Royal Legacy of Beauty & Elegance"
            description="Born from a passion for artistry and refinement, Royal Beauty Salon has become a sanctuary for those who expect nothing less than perfection."
          />

          <Reveal delay={0.1}>
            <p className="mt-6 leading-relaxed text-charcoal/70">
              Since our founding, our master artists have transformed brides, professionals and
              beauty enthusiasts with treatments that blend timeless elegance with the latest
              innovations. Every visit is a curated experience — from the moment you step into our
              opulent space to the final flawless reveal.
            </p>
          </Reveal>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {highlights.map((h, i) => (
              <Reveal key={h} delay={0.15 + i * 0.08}>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brown-gradient text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm text-charcoal/80">{h}</span>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.4} className="mt-10 flex items-center gap-6 border-t border-border pt-6">
            <div className="flex -space-x-3">
              {["K", "K", "D"].map((initial, i) => (
                <div
                  key={i}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-brown-gradient text-sm font-semibold text-white ring-2 ring-white"
                >
                  {initial}
                </div>
              ))}
            </div>
            <div>
              <p className="font-serif text-lg text-luxury-black">Kinjal, Kiran &amp; Darpan</p>
              <p className="text-sm text-charcoal/70">Founders</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
