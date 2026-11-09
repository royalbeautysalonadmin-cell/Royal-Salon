import type { Metadata } from "next";
import {
  Calendar,
  Clock,
  Star,
  ShieldCheck,
  ExternalLink,
  MessageCircle,
  Phone,
  CheckCircle2,
} from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { JsonLd } from "@/components/shared/JsonLd";
import { TrackedLink } from "@/components/shared/TrackedLink";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { siteConfig, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book Online via Booksy — Royal Beauty Salon Warsaw",
  description:
    "Book your appointment at Royal Beauty Salon Warsaw instantly on Booksy. Live availability for hair, makeup, facials, nails and waxing — 24/7 online booking with instant confirmation.",
  keywords: [
    "book beauty salon Warsaw online",
    "Booksy booking Warsaw",
    "online booking beauty salon Warszawa",
    "hairdresser appointment Warsaw",
    "salon booking online Poland",
    "Royal Beauty Salon Booksy",
  ],
  alternates: {
    canonical: `${siteConfig.url}/booksy`,
    languages: {
      "en-GB": `${siteConfig.url}/booksy`,
      "x-default": `${siteConfig.url}/booksy`,
    },
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/booksy`,
    title: "Book Online via Booksy — Royal Beauty Salon Warsaw",
    description:
      "Instant online booking for hair, makeup, facials, nails and waxing at Royal Beauty Salon Warsaw.",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "Book Royal Beauty Salon Warsaw" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Online via Booksy — Royal Beauty Salon Warsaw",
    description: "Instant online booking for hair, makeup, facials, nails and waxing at Royal Beauty Salon Warsaw.",
    images: [siteConfig.ogImage],
  },
};

const steps = [
  {
    icon: Calendar,
    title: "Pick your service",
    text: "Browse the full Royal Beauty Salon menu — hair, bridal makeup, facials, threading, waxing and nails — with real prices in PLN.",
  },
  {
    icon: Clock,
    title: "Choose date & time",
    text: "See live availability and grab a slot that suits you. Bookings are confirmed instantly, day or night.",
  },
  {
    icon: ShieldCheck,
    title: "Get instant confirmation",
    text: "Your appointment is reserved straight away — no phone calls, no waiting for a reply.",
  },
];

const faqs = [
  {
    q: "How do I book an appointment at Royal Beauty Salon Warsaw online?",
    a: "Click any “Book on Booksy” button on this site to open our Booksy profile, choose your service, date and time, and confirm. You’ll get an instant booking confirmation.",
  },
  {
    q: "Is the Booksy booking page the official Royal Beauty Salon profile?",
    a: "Yes. royalbeautywarsawsalon.booksy.com is our official Booksy profile for Royal Beauty Salon at Aleja Stanów Zjednoczonych 67/D7, Warsaw.",
  },
  {
    q: "Can I book outside opening hours?",
    a: "Yes — Booksy is available 24/7. The salon itself is open Monday and Wednesday–Sunday, 11:00–18:00 (closed Tuesdays), and you can only pick slots within our opening hours.",
  },
  {
    q: "Can I cancel or reschedule my Booksy booking?",
    a: "Yes. Open your confirmation email or the Booksy app to cancel or move your appointment. For last-minute changes you can also call or WhatsApp us.",
  },
  {
    q: "Do I need a Booksy account to book?",
    a: "No. You can book as a guest with your name, phone number and email. A free Booksy account only makes managing future bookings easier.",
  },
];

export default function BooksyPage() {
  return (
    <>
      <JsonLd
        data={[
          faqJsonLd(faqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Book Online", path: "/booksy" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Online Booking"
        title="Book Your Appointment on Booksy"
        description="Live availability for every service at Royal Beauty Salon Warsaw — reserve your slot in under a minute, 24/7."
        breadcrumb="Book Online"
      />

      {/* Primary strong outbound backlink to the Booksy profile */}
      <section className="bg-white py-16">
        <div className="container-luxury">
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-3xl border border-gold/30 bg-cream/60 p-8 text-center shadow-luxury md:p-12">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brown-gradient text-white shadow-gold">
              <Calendar className="h-7 w-7" />
            </span>
            <h2 className="font-serif text-2xl font-semibold text-luxury-black md:text-3xl">
              Royal Beauty Salon Warsaw — Official Booksy Profile
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-charcoal/70 md:text-base">
              Every treatment, every price, every free slot — all on our official Booksy page.
              Book hair, bridal makeup, facials, threading, waxing or nails in seconds.
            </p>
            <TrackedLink
              event="booksy_click"
              params={{ source: "booksy_page_primary" }}
              href={siteConfig.booksy}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-gold px-8 py-4 text-sm font-semibold text-luxury-black shadow-luxury transition-transform hover:-translate-y-0.5 md:text-base"
            >
              Book on Booksy
              <ExternalLink className="h-4 w-4 opacity-70" />
            </TrackedLink>
            <TrackedLink
              event="booksy_click"
              params={{ source: "booksy_page_url" }}
              href={siteConfig.booksy}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-charcoal/60 underline decoration-gold/50 underline-offset-4 transition-colors hover:text-brown"
            >
              royalbeautywarsawsalon.booksy.com
            </TrackedLink>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-cream py-20">
        <div className="container-luxury">
          <SectionHeading
            eyebrow="How It Works"
            title="Three Steps to Your Next Appointment"
            description="Booking with us online is fast, secure and confirmed instantly."
          />
          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <RevealItem key={s.title}>
                <div className="h-full rounded-2xl border border-brown/10 bg-white p-7 shadow-soft">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brown-gradient text-white shadow-gold">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-brown">
                    Step {i + 1}
                  </p>
                  <h3 className="mt-1 font-serif text-xl font-semibold text-luxury-black">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{s.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Why book on Booksy */}
      <section className="bg-white py-20">
        <div className="container-luxury grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold text-luxury-black">
              Why Clients Book Us on Booksy
            </h2>
            <ul className="mt-6 space-y-4">
              {[
                "Live availability — only real, open slots are shown",
                "Instant confirmation by email, no back-and-forth",
                "Full price list in PLN before you commit",
                "Verified reviews from 2,000+ happy clients",
                "Manage or reschedule your visit any time",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-charcoal/80 md:text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brown" />
                  {item}
                </li>
              ))}
            </ul>
            <TrackedLink
              event="booksy_click"
              params={{ source: "booksy_page_why" }}
              href={siteConfig.booksy}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-luxury-black shadow-luxury transition-transform hover:-translate-y-0.5"
            >
              <Star className="h-4 w-4" />
              Open Our Booksy Profile
              <ExternalLink className="h-3.5 w-3.5 opacity-70" />
            </TrackedLink>
          </Reveal>

          <Reveal direction="right">
            <div className="rounded-3xl border border-brown/10 bg-cream/60 p-8">
              <h3 className="font-serif text-2xl font-semibold text-luxury-black">
                Prefer to talk to us?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                Walk-ins are welcome during opening hours, and our team is happy to help by
                phone or WhatsApp if you&rsquo;re not sure which treatment to book.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <TrackedLink
                  event="call_click"
                  params={{ source: "booksy_page" }}
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brown-gradient px-6 py-3 text-sm font-semibold text-white shadow-gold transition-transform hover:-translate-y-0.5"
                >
                  <Phone className="h-4 w-4" />
                  {siteConfig.phone}
                </TrackedLink>
                <TrackedLink
                  event="whatsapp_click"
                  params={{ source: "booksy_page" }}
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-brown/20 bg-white px-6 py-3 text-sm font-semibold text-charcoal transition-colors hover:border-brown/50"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Us
                </TrackedLink>
              </div>
              <div className="mt-6 border-t border-brown/10 pt-5 text-sm text-charcoal/70">
                <p className="font-medium text-luxury-black">Opening hours</p>
                {siteConfig.hours.map((h) => (
                  <p key={h.day} className="mt-1 flex justify-between gap-4">
                    <span>{h.day}</span>
                    <span className="font-medium text-charcoal">{h.time}</span>
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream py-20">
        <div className="container-luxury max-w-3xl">
          <SectionHeading
            eyebrow="FAQ"
            title="Online Booking Questions"
            description="Everything you need to know about booking Royal Beauty Salon on Booksy."
          />
          <div className="mt-10 space-y-4">
            {faqs.map((f) => (
              <Reveal key={f.q}>
                <div className="rounded-2xl border border-brown/10 bg-white p-6 shadow-soft">
                  <h3 className="font-serif text-lg font-semibold text-luxury-black">{f.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-luxury-black py-16 text-white">
        <div className="pointer-events-none absolute inset-0 bg-luxury-radial opacity-60" />
        <div className="container-luxury relative text-center">
          <h2 className="mx-auto max-w-2xl font-serif text-3xl font-semibold leading-tight md:text-[2.4rem]">
            Ready when you are
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/70">
            Your next appointment at Royal Beauty Salon Warsaw is one click away.
          </p>
          <TrackedLink
            event="booksy_click"
            params={{ source: "booksy_page_closing" }}
            href={siteConfig.booksy}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-gold px-8 py-4 text-sm font-semibold text-luxury-black shadow-luxury transition-transform hover:-translate-y-0.5 md:text-base"
          >
            Book on Booksy
            <ExternalLink className="h-4 w-4 opacity-70" />
          </TrackedLink>
        </div>
      </section>
    </>
  );
}
