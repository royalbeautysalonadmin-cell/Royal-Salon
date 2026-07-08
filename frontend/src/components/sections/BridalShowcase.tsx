"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";

const BEFORE =
  "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=1000&q=80";
const AFTER =
  "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?auto=format&fit=crop&w=1000&q=80";

function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const percent = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, percent)));
  }, []);

  return (
    <div
      ref={ref}
      className="relative aspect-[4/5] w-full select-none overflow-hidden rounded-[2rem] shadow-luxury"
      onMouseMove={(e) => dragging.current && update(e.clientX)}
      onMouseDown={(e) => {
        dragging.current = true;
        update(e.clientX);
      }}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchMove={(e) => update(e.touches[0].clientX)}
    >
      <Image src={AFTER} alt="After bridal makeover" fill className="object-cover" sizes="50vw" />
      <span className="absolute right-4 top-4 rounded-full bg-brown px-3 py-1 text-xs font-medium text-white">
        After
      </span>

      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <div className="relative h-full" style={{ width: ref.current?.offsetWidth || "100%" }}>
          <Image src={BEFORE} alt="Before makeover" fill className="object-cover" sizes="50vw" />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-luxury-black/80 px-3 py-1 text-xs font-medium text-white">
          Before
        </span>
      </div>

      {/* Handle */}
      <div
        className="absolute top-0 z-10 flex h-full w-1 -translate-x-1/2 cursor-ew-resize items-center justify-center bg-white"
        style={{ left: `${pos}%` }}
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brown shadow-luxury">
          <MoveHorizontal className="h-5 w-5" />
        </span>
      </div>
    </div>
  );
}

const bridalGallery = [
  "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1595407753234-0882f1e77954?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=500&q=80",
];

export function BridalShowcase() {
  return (
    <section id="bridal" className="relative overflow-hidden bg-luxury-black py-24 text-white">
      <div className="pointer-events-none absolute inset-0 bg-luxury-radial opacity-60" />
      <div className="container-luxury relative grid items-center gap-14 lg:grid-cols-2">
        <Reveal direction="right">
          <BeforeAfter />
        </Reveal>

        <div>
          <SectionHeading
            light
            align="left"
            eyebrow="Bridal Artistry"
            title="The Bride Deserves to Feel Like Royalty"
            description="Drag the slider to witness the artistry of our signature bridal transformations — flawless, radiant and timeless."
          />

          <div className="mt-8 grid grid-cols-4 gap-3">
            {bridalGallery.map((src, i) => (
              <Reveal key={src} delay={i * 0.1}>
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src={src}
                    alt={`Bridal look ${i + 1}`}
                    fill
                    sizes="120px"
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-8">
            {[
              { value: "2,500+", label: "Brides Styled" },
              { value: "100%", label: "Satisfaction" },
              { value: "On-Location", label: "Available" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-serif text-2xl font-semibold text-gold">{s.value}</p>
                <p className="text-sm text-white/60">{s.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
