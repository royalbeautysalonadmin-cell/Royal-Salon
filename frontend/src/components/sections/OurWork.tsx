"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Play } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { useBookingStore } from "@/store/booking";
import { workVideos } from "@/data/our-work";
import { cn } from "@/lib/utils";

export function OurWork() {
  const [current, setCurrent] = useState(0);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const { t, lang } = useTranslation();
  const openBooking = useBookingStore((s) => s.open);

  const video = workVideos[current];

  const goTo = useCallback(
    (idx: number) => {
      setCurrent((idx + workVideos.length) % workVideos.length);
    },
    []
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-advance every 6 seconds
  useEffect(() => {
    timerRef.current = setInterval(next, 6000);
    return () => clearInterval(timerRef.current);
  }, [next]);

  // Pause autoplay while hovering
  const pauseAutoplay = () => clearInterval(timerRef.current);
  const resumeAutoplay = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 6000);
  };

  // Sync muted state to video element
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted, current]);

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

        <div
          className="relative mt-14 mx-auto max-w-4xl"
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
        >
          {/* Video carousel */}
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-black/60 shadow-2xl ring-1 ring-white/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <video
                  ref={videoRef}
                  src={video.src}
                  poster={video.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <h3 className="font-serif text-2xl font-semibold text-white md:text-3xl">
                    {lang === "pl" ? video.titlePl : video.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-sm text-white/70 md:text-base">
                    {lang === "pl" ? video.descriptionPl : video.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Mute toggle */}
            <button
              onClick={toggleMute}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
              aria-label={muted ? t("ourWork.unmute") : t("ourWork.mute")}
            >
              {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>

            {/* Play indicator (shown when paused/muted) */}
            {muted && (
              <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <Play className="h-7 w-7 text-white" fill="white" />
                </div>
              </div>
            )}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/25 hover:scale-110"
            aria-label="Previous video"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/25 hover:scale-110"
            aria-label="Next video"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dot indicators */}
          <div className="mt-6 flex items-center justify-center gap-3">
            {workVideos.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  i === current
                    ? "w-8 bg-gold"
                    : "w-2.5 bg-white/30 hover:bg-white/50"
                )}
                aria-label={`Go to video ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <Button variant="gold" size="lg" onClick={() => openBooking()}>
            {t("ourWork.bookCTA")}
          </Button>
        </div>
      </div>
    </section>
  );
}
