"use client";

import Link from "next/link";
import { Phone, Calendar } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/site";
import { useBookingStore } from "@/store/booking";

interface CtaBandProps {
  title?: string;
  description?: string;
  /** WhatsApp prefill message */
  message?: string;
  /** Service slug to pre-select in the booking dialog, if this band is on a service page. */
  serviceSlug?: string;
  /** Swaps the button labels to Polish for Polish-language pages. */
  locale?: "en" | "pl";
}

const COPY = {
  en: {
    title: "Ready to book your appointment?",
    description:
      "Reserve your spot at Royal Beauty Salon in central Warsaw. Walk-ins welcome, but booking ahead guarantees your preferred time.",
    bookNow: "Book Now",
    whatsapp: "WhatsApp Us",
    contact: "Contact Us",
  },
  pl: {
    title: "Gotowa na umówienie wizyty?",
    description:
      "Zarezerwuj termin w Royal Beauty Salon w centrum Warszawy. Klienci bez wcześniejszej rezerwacji są mile widziani, ale rezerwacja z wyprzedzeniem gwarantuje dogodny termin.",
    bookNow: "Umów wizytę",
    whatsapp: "Napisz na WhatsApp",
    contact: "Kontakt",
  },
} as const;

/** Reusable conversion band for service / category / location pages. */
export function CtaBand({
  title,
  description,
  message,
  serviceSlug,
  locale = "en",
}: CtaBandProps) {
  const openBooking = useBookingStore((s) => s.open);
  const t = COPY[locale];

  return (
    <section className="relative overflow-hidden bg-luxury-black py-16 text-white sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-luxury-radial opacity-60" />
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-brown/30 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-gold/20 blur-[120px]" />
      <div className="container-luxury relative text-center">
        <h2 className="mx-auto max-w-2xl font-serif text-3xl font-semibold leading-tight md:text-[2.4rem] text-balance">
          {title ?? t.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
          {description ?? t.description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => openBooking(serviceSlug)}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-luxury-black shadow-luxury transition-transform hover:-translate-y-0.5"
          >
            <Calendar className="h-4 w-4" />
            {t.bookNow}
          </button>
          <a
            href={whatsappLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            {t.whatsapp}
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            {t.contact}
          </Link>
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
