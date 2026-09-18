"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { useBookingStore } from "@/store/booking";
import { workVideos } from "@/data/our-work";
import { cn } from "@/lib/utils";

export function OurWork() {
  const [current, setCurrent] = useState(0);
  const [muted, setMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const { t } = useTranslation();
  const openBooking = useBookingStore((s) => s.open);

  const goTo = useCallback((idx: number) => {
    setCurrent((idx + workVideos.length) % workVideos.length);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Sync muted state to all video elements
  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (v) v.muted = muted;
    });
  }, [muted]);

  // Pause/play videos based on current index
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === current) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [current]);

  const toggleMute = () => setMuted((m) => !m);

  return (
    <section id="our-work" className="relative overflow-hidden bg-luxury-black py-24">
      <div className="container-luxury">
        <SectionHeading
          eyebrow={t("ourWork.heading")}
          title={t("ourWork.title")}
          description={t("ourWork.description")}
          light
        />

        <div className="relative mt-14 mx-auto max-w-3xl">
          {/* Video carousel */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="flex justify-center"
              >
                <div className="relative w-full aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10">
                  <video
                    ref={(el) => { videoRefs.current[current] = el; }}
                    src={workVideos[current].src}
                    poster={workVideos[current].poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                  {/* Mute toggle */}
                  <button
                    onClick={toggleMute}
                    className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white/80 backdrop-blur-sm transition-all hover:bg-black/60 hover:text-white"
                    aria-label={muted ? t("ourWork.unmute") : t("ourWork.mute")}
                  >
                    {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute -left-5 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/25 hover:scale-110 md:-left-6 md:h-12 md:w-12"
            aria-label="Previous video"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute -right-5 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/25 hover:scale-110 md:-right-6 md:h-12 md:w-12"
            aria-label="Next video"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dot indicators */}
          <div className="mt-6 flex items-center justify-center gap-2.5">
            {workVideos.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === current ? "w-8 bg-gold" : "w-2 bg-white/25 hover:bg-white/40"
                )}
                aria-label={`Video ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button variant="gold" size="lg" onClick={() => openBooking()}>
            {t("ourWork.bookCTA")}
          </Button>
        </div>
      </div>
    </section>
  );
}
