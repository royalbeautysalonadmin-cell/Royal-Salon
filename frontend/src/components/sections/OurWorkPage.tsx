"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { CtaBand } from "@/components/shared/CtaBand";
import { FaqSection } from "@/components/shared/FaqSection";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { useBookingStore } from "@/store/booking";
import { workVideos } from "@/data/our-work";
import { cn, formatPrice } from "@/lib/utils";
import type { Service } from "@/types";

const faqs = [
  {
    q: "How often do you post new work videos?",
    qPl: "Jak często publikujecie nowe filmy?",
    a: "We regularly update our portfolio with new transformation videos showcasing our latest work in hair styling, bridal makeup, skincare and complete makeovers.",
    aPl: "Regularnie aktualizujemy nasze portfolio nowymi filmami transformacji prezentującymi naszą najnowszą pracę w stylizacji włosów, makijażu ślubnym, pielęgnacji skóry i kompleksowych metamorfozach.",
  },
  {
    q: "Can I book the same treatment shown in the videos?",
    qPl: "Czy mogę zarezerwować ten sam zabieg pokazany na filmach?",
    a: "Absolutely! Every treatment shown in our work videos is available to book. Simply click the book button or contact us via WhatsApp.",
    aPl: "Oczywiście! Każdy zabieg pokazany w naszych filmach jest dostępny do rezerwacji. Wystarczy kliknąć przycisk rezerwacji lub skontaktować się z nami przez WhatsApp.",
  },
  {
    q: "Do you offer bridal makeup services?",
    qPl: "Czy oferujecie usługi makijażu ślubnego?",
    a: "Yes, bridal artistry is one of our specialties. We offer complete bridal packages including makeup, hair styling, and skincare treatments for your special day.",
    aPl: "Tak, sztuka ślubna to jedna z naszych specjalności. Oferujemy kompleksowe pakiety ślubne obejmujące makijaż, stylizację włosów i zabiegi pielęgnacyjne w Twoim wyjątkowym dniu.",
  },
  {
    q: "What keratin treatments do you offer?",
    qPl: "Jakie zabiegi keratynowe oferujecie?",
    a: "We offer premium keratin and nanoplasty treatments for all hair types, including specialized care for hijab hair. Results last 3-5 months with proper care.",
    aPl: "Oferujemy premium zabiegi keratynowe i nanoplastyczne dla wszystkich rodzajów włosów, w tym specjalistyczną pielęgnację włosów z hidżabem. Efekty utrzymują się 3-5 miesięcy przy odpowiedniej pielęgnacji.",
  },
];

const categoryColors: Record<string, string> = {
  Hair: "bg-amber-100 text-amber-800",
  "Makeup & Styling": "bg-pink-100 text-pink-800",
  Threading: "bg-purple-100 text-purple-800",
  Waxing: "bg-rose-100 text-rose-800",
  "Facial & Skin Care": "bg-emerald-100 text-emerald-800",
  "Manicure & Pedicure": "bg-sky-100 text-sky-800",
};

export function OurWorkPage({ services = [] }: { services?: Service[] }) {
  const [current, setCurrent] = useState(0);
  const [muted, setMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useTranslation();
  const openBooking = useBookingStore((s) => s.open);

  const video = workVideos[current];

  const goTo = useCallback((idx: number) => {
    const next = Math.max(0, Math.min(idx, workVideos.length - 1));
    setCurrent(next);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      v.muted = muted;
      if (i === current) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [current, muted]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); next(); }
      if (e.key === "m" || e.key === "M") setMuted((m) => !m);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const touchStart = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientY; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  };

  const toggleMute = () => setMuted((m) => !m);

  // Services carousel scroll
  const scrollServices = (dir: "left" | "right") => {
    if (!carouselRef.current) return;
    const amount = 320;
    carouselRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <>
      <PageHero
        eyebrow={t("ourWork.heading")}
        title={t("ourWork.title")}
        description={t("ourWork.description")}
        breadcrumb="Our Work"
      />

      {/* Shorts-style vertical carousel */}
      <section className="bg-luxury-black py-12 md:py-20">
        <div className="container-luxury">
          <div
            ref={containerRef}
            className="mx-auto flex max-w-lg flex-col items-center"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative w-full aspect-[9/16] max-h-[75vh] overflow-hidden rounded-[2rem] bg-black shadow-2xl ring-1 ring-white/10">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 60, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -60, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0"
                >
                  <video
                    ref={(el) => { videoRefs.current[current] = el; }}
                    src={video.src}
                    poster={video.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  <div className="absolute top-5 left-5 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {current + 1} / {workVideos.length}
                  </div>
                  <button
                    onClick={toggleMute}
                    className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white/80 backdrop-blur-sm transition-all hover:bg-black/60 hover:text-white"
                    aria-label={muted ? t("ourWork.unmute") : t("ourWork.mute")}
                  >
                    {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-end justify-between">
                      <div>
                        <h2 className="font-serif text-xl font-semibold text-white md:text-2xl">
                          {lang === "pl" ? video.titlePl : video.title}
                        </h2>
                        <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-white/60">
                          {lang === "pl" ? video.descriptionPl : video.description}
                        </p>
                      </div>
                      <Button variant="gold" size="sm" onClick={() => openBooking()} className="shrink-0 ml-3">
                        {t("ourWork.bookCTA")}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              {current > 0 && (
                <button
                  onClick={prev}
                  className="absolute left-1/2 top-4 z-20 -translate-x-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white/70 backdrop-blur-sm transition-all hover:bg-black/60 hover:text-white"
                  aria-label="Previous video"
                >
                  <ChevronUp className="h-5 w-5" />
                </button>
              )}
              {current < workVideos.length - 1 && (
                <button
                  onClick={next}
                  className="absolute left-1/2 bottom-24 z-20 -translate-x-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white/70 backdrop-blur-sm transition-all hover:bg-black/60 hover:text-white"
                  aria-label="Next video"
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              )}
            </div>
            <div className="mt-6 flex items-center gap-2">
              {workVideos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === current ? "w-7 bg-gold" : "w-2 bg-white/20 hover:bg-white/35"
                  )}
                  aria-label={`Video ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Services — horizontal carousel */}
      {services.length > 0 && (
        <section className="bg-cream py-20">
          <div className="container-luxury">
            <div className="flex items-end justify-between">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-brown-600">
                  <span className="h-px w-6 bg-gold" />
                  {lang === "pl" ? "Nasze Usługi" : "Our Services"}
                </span>
                <h2 className="mt-4 font-serif text-3xl font-semibold text-luxury-black md:text-4xl">
                  {lang === "pl" ? "Pełna Lista Zabiegów" : "Every Treatment We Offer"}
                </h2>
                <p className="mt-3 text-base text-charcoal/60 md:text-lg">
                  {lang === "pl"
                    ? "Przeglądaj wszystkie usługi dostępne w naszym salonie. Każda z nich jest prezentowana w naszych filmach transformacji."
                    : "Browse every service available at our salon — each one showcased in our transformation videos."}
                </p>
              </div>
              <div className="hidden gap-2 md:flex">
                <button
                  onClick={() => scrollServices("left")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-brown/15 bg-white text-charcoal transition-all hover:bg-brown hover:text-white hover:shadow-luxury"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => scrollServices("right")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-brown/15 bg-white text-charcoal transition-all hover:bg-brown hover:text-white hover:shadow-luxury"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Horizontal scrollable carousel */}
            <div
              ref={carouselRef}
              className="mt-10 flex gap-5 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {services.filter((s) => s.active !== false).map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}/${service.slug}`}
                  className="group snap-start shrink-0 w-[280px] overflow-hidden rounded-2xl border border-brown/8 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-luxury hover:border-gold/30"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                    {service.image ? (
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        sizes="280px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cream to-brown/10 text-brown/30">
                        <span className="text-4xl">✦</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <span className={cn(
                      "absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide",
                      categoryColors[service.category] || "bg-gray-100 text-gray-800"
                    )}>
                      {service.category}
                    </span>
                    {service.featured && (
                      <span className="absolute top-3 right-3 rounded-full bg-gold px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-white">
                        ★ {lang === "pl" ? "Sygnatura" : "Signature"}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-base font-semibold text-luxury-black line-clamp-1 group-hover:text-brown transition-colors">
                      {service.name}
                    </h3>
                    <p className="mt-1.5 text-xs text-charcoal/55 line-clamp-2 leading-relaxed">
                      {service.description || "Premium beauty treatment at Royal Beauty Salon Warsaw"}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-brown">
                          {service.priceOnRequest ? (lang === "pl" ? "Cena na zapytanie" : "Price on request") : formatPrice(service.price)}
                        </span>
                        {service.duration && (
                          <span className="flex items-center gap-1 text-xs text-charcoal/45">
                            <Clock className="h-3 w-3" />
                            {service.duration}
                          </span>
                        )}
                      </div>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cream text-brown/40 transition-all group-hover:bg-brown group-hover:text-white">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* View all link */}
            <div className="mt-8 text-center">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-medium text-brown hover:underline"
              >
                {lang === "pl" ? "Zobacz wszystkie usługi" : "View all services"} →
              </Link>
            </div>
          </div>
        </section>
      )}

      <FaqSection
        eyebrow={lang === "pl" ? "Najczęściej Zadawane" : "Frequently Asked"}
        faqs={faqs.map((f) => ({
          q: lang === "pl" ? f.qPl : f.q,
          a: lang === "pl" ? f.aPl : f.a,
        }))}
      />

      <CtaBand
        title={lang === "pl" ? "Gotowa na metamorfozę?" : "Ready for your transformation?"}
        message={lang === "pl"
          ? "Chciałabym zarezerwować wizytę w Royal Beauty Salon."
          : "Hello Royal Beauty Salon, I'd love to book an appointment."}
      />
    </>
  );
}
