"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { gallery } from "@/data/content";
import type { GalleryImage } from "@/types";

const filters = ["All", "Bridal", "Makeup", "Hair", "Skin", "Nails", "Mehndi"] as const;

export function Gallery() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  const items =
    active === "All" ? gallery : gallery.filter((g) => g.category === active);

  return (
    <section id="gallery" className="bg-cream py-24">
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Gallery"
          title="Moments of Royal Beauty"
          description="A glimpse into our artistry — from breathtaking bridals to flawless everyday glamour."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                active === f
                  ? "bg-brown text-white shadow-luxury"
                  : "bg-white text-charcoal/70 hover:bg-brown/10 hover:text-brown"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
          <AnimatePresence>
            {items.map((img, i) => (
              <motion.button
                layout
                key={img.src}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setLightbox(img)}
                className="group relative block w-full overflow-hidden rounded-2xl shadow-soft"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={500}
                  height={i % 3 === 0 ? 640 : 500}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-luxury-black/0 opacity-0 transition-all duration-300 group-hover:bg-luxury-black/40 group-hover:opacity-100">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-brown">
                    <ZoomIn className="h-5 w-5" />
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-luxury-black/90 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox.src.replace("w=500", "w=1200")}
                alt={lightbox.alt}
                width={1200}
                height={1400}
                className="max-h-[85vh] w-full object-contain"
              />
              <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-luxury-black/80 to-transparent p-6 text-white">
                {lightbox.alt} · <span className="text-gold">{lightbox.category}</span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
