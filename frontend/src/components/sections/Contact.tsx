"use client";

import { useState } from "react";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteConfig, whatsappLink } from "@/lib/site";
import { faqs } from "@/data/content";
import { sendContactEmailJS, isEmailJSConfigured } from "@/lib/emailjs";

export function Contact() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();

      // Send email via EmailJS (client-side)
      if (isEmailJSConfigured) {
        try {
          await sendContactEmailJS({
            name: data.name as string,
            email: data.email as string,
            phone: data.phone as string | undefined,
            message: data.message as string,
          });
        } catch (emailErr) {
          console.error("[Contact] EmailJS error:", emailErr);
        }
      }

      toast.success("Message sent! We'll be in touch shortly.");
      form.reset();
    } catch {
      toast.error("Something went wrong. Please try again or WhatsApp us.");
    } finally {
      setLoading(false);
    }
  }

  const contactItems = [
    { icon: MapPin, label: "Visit Us", value: siteConfig.address.full },
    { icon: Phone, label: "Call Us", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
    { icon: Mail, label: "Email Us", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  ];

  return (
    <section id="contact" className="bg-white py-24">
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Visit Our Luxury Salon"
          description="We'd love to welcome you. Reach out, book a visit, or simply say hello."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {/* Left: info + map + faqs */}
          <Reveal direction="right" className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {contactItems.map((c) => (
                <a
                  key={c.label}
                  href={c.href || "#"}
                  className="rounded-2xl border border-brown/10 bg-cream/40 p-5 transition-colors hover:border-gold/40 hover:bg-white"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brown-gradient text-white">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-3 text-xs uppercase tracking-wider text-brown">{c.label}</p>
                  <p className="mt-1 text-sm text-charcoal/75">{c.value}</p>
                </a>
              ))}
            </div>

            <a
              href={`https://www.google.com/maps?q=${siteConfig.address.mapsQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-2xl border border-brown/10 shadow-soft transition-all hover:shadow-luxury"
            >
              <div className="flex items-center gap-3 bg-cream/60 p-5">
                <MapPin className="h-5 w-5 text-brown" />
                <div>
                  <p className="text-sm font-medium text-luxury-black">{siteConfig.address.full}</p>
                  <p className="text-xs text-charcoal/70">Open in Google Maps</p>
                </div>
              </div>
            </a>

            <div className="rounded-2xl border border-brown/10 bg-cream/40 p-6">
              <h3 className="mb-2 flex items-center gap-2 font-serif text-lg">
                <Clock className="h-5 w-5 text-brown" /> Opening Hours
              </h3>
              <ul className="space-y-1.5 text-sm text-charcoal/70">
                {siteConfig.hours.map((h) => (
                  <li key={h.day} className="flex justify-between">
                    <span>{h.day}</span>
                    <span className="font-medium text-charcoal">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Right: form + faqs */}
          <Reveal className="space-y-8">
            <form
              onSubmit={onSubmit}
              className="rounded-3xl border border-brown/10 bg-white p-7 shadow-luxury"
            >
              <h3 className="font-serif text-2xl font-semibold">Send Us a Message</h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="c-name">Name</Label>
                  <Input id="c-name" name="name" required placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-phone">Phone</Label>
                  <Input id="c-phone" name="phone" required placeholder="+971 ..." />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Label htmlFor="c-email">Email</Label>
                <Input id="c-email" name="email" type="email" required placeholder="you@email.com" />
              </div>
              <div className="mt-4 space-y-2">
                <Label htmlFor="c-message">Message</Label>
                <Textarea id="c-message" name="message" required placeholder="How can we help you?" />
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button type="submit" variant="gold" disabled={loading} className="flex-1">
                  {loading ? "Sending..." : <>Send Message <Send className="h-4 w-4" /></>}
                </Button>
                <Button type="button" variant="outline" asChild className="flex-1">
                  <a href={whatsappLink()} target="_blank" rel="noreferrer">
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </Button>
              </div>
            </form>

            <div className="rounded-3xl border border-brown/10 bg-cream/40 p-7">
              <h3 className="mb-2 font-serif text-2xl font-semibold">Frequently Asked</h3>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((f, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger>{f.q}</AccordionTrigger>
                    <AccordionContent>{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
