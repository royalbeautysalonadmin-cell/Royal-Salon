"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Gem, HandHeart, Leaf, Wand2, Quote, Instagram } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { useBookingStore } from "@/store/booking";

const U = (id: string, w = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const values = [
  {
    icon: Wand2,
    title: "Artistry First",
    desc: "Every look is a bespoke creation, sculpted by award-winning specialists with an obsessive eye for detail.",
  },
  {
    icon: Leaf,
    title: "Clean & Premium",
    desc: "We use only luxury, dermatologically tested and cruelty-free products that love your skin and hair.",
  },
  {
    icon: HandHeart,
    title: "Personalised Care",
    desc: "Your treatment begins with a consultation — because true luxury is an experience made only for you.",
  },
  {
    icon: Gem,
    title: "Timeless Elegance",
    desc: "A serene, five-star sanctuary in the heart of Warsaw where refinement meets warmth.",
  },
];

const team = [
  { name: "Aleksandra Wójcik", role: "Founder & Creative Director", img: U("photo-1494790108377-be9c29b29330") },
  { name: "Natalia Kamińska", role: "Lead Bridal Artist", img: U("photo-1438761681033-6461ffad8d80") },
  { name: "Weronika Dąbrowska", role: "Senior Colourist", img: U("photo-1534528741775-53994a69daeb") },
  { name: "Julia Lewandowska", role: "Master Aesthetician", img: U("photo-1544005313-94ddf0286df2") },
];

export function AboutExtras() {
  const openBooking = useBookingStore((s) => s.open);

  return (
    <>
      {/* Philosophy band */}
      <section className="relative overflow-hidden bg-luxury-black py-24 text-white">
        <div className="pointer-events-none absolute inset-0 bg-luxury-radial opacity-60" />
        <Quote className="pointer-events-none absolute left-1/2 top-10 h-32 w-32 -translate-x-1/2 text-gold/10" />
        <div className="container-luxury relative max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow justify-center text-gold-300">Our Philosophy</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 font-serif text-2xl leading-relaxed text-white/90 md:text-3xl text-balance">
              &ldquo;We believe beauty is not about changing who you are — it&apos;s about revealing
              the most radiant, confident version of yourself.&rdquo;
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-sm uppercase tracking-[0.3em] text-gold">
              Aleksandra Wójcik · Founder
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-24">
        <div className="container-luxury">
          <SectionHeading
            eyebrow="What We Stand For"
            title="The Values Behind Every Visit"
            description="Four principles guide everything we do — from your first consultation to the final flawless reveal."
          />
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <RevealItem key={v.title}>
                <div className="group h-full rounded-2xl border border-brown/10 bg-cream/40 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:bg-white hover:shadow-luxury">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brown-gradient text-white shadow-gold transition-transform duration-300 group-hover:scale-110">
                    <v.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 font-serif text-xl font-semibold text-luxury-black">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{v.desc}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Team */}
      <section className="bg-cream py-24">
        <div className="container-luxury">
          <SectionHeading
            eyebrow="Meet The Artists"
            title="The Hands Behind The Magic"
            description="Internationally trained, endlessly passionate — our team is the heart of Royal Beauty Salon."
          />
          <RevealGroup className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {team.map((m) => (
              <RevealItem key={m.name}>
                <div className="group overflow-hidden rounded-2xl bg-white shadow-soft transition-shadow hover:shadow-luxury">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={m.img}
                      alt={m.name}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/70 via-transparent to-transparent" />
                    <a
                      href="#"
                      aria-label={`${m.name} on Instagram`}
                      className="absolute right-3 top-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white/90 text-brown opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="font-serif text-lg font-semibold leading-tight">{m.name}</p>
                      <p className="text-xs text-gold-300">{m.role}</p>
                    </div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[2rem] bg-brown-gradient px-8 py-14 text-center text-white"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <h2 className="font-serif text-3xl font-semibold md:text-4xl">Ready to Feel Like Royalty?</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/85">
              Book your appointment today and discover the Royal Beauty difference in the heart of Warsaw.
            </p>
            <Button variant="light" size="lg" className="mt-7" onClick={() => openBooking()}>
              Book Your Appointment
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
