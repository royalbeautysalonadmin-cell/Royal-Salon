import Link from "next/link";
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react";
import { siteConfig, navLinks } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-luxury-black text-white">
      <div className="pointer-events-none absolute inset-0 bg-luxury-radial opacity-40" />
      <div className="container-luxury relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brown-gradient font-serif text-xl font-bold text-white">
              R
            </span>
            <div className="leading-none">
              <p className="font-serif text-lg font-semibold">Royal Beauty</p>
              <p className="text-[0.6rem] uppercase tracking-[0.35em] text-gold">Salon</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/60">
            {siteConfig.tagline}. Warsaw&apos;s destination for luxury beauty treatments, bridal
            artistry and professional beauty training.
          </p>
          <div className="flex gap-3">
            {[
              { icon: Instagram, href: siteConfig.socials.instagram },
              { icon: Facebook, href: siteConfig.socials.facebook },
              { icon: Youtube, href: siteConfig.socials.youtube },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-gold hover:bg-gold hover:text-luxury-black"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-5 font-serif text-lg">Explore</h4>
          <ul className="space-y-3 text-sm text-white/60">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 font-serif text-lg">Contact</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{siteConfig.address.full}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="h-4 w-4 shrink-0 text-gold" />
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-gold">
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="h-4 w-4 shrink-0 text-gold" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-gold">
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-5 font-serif text-lg">Opening Hours</h4>
          <ul className="space-y-3 text-sm text-white/60">
            {siteConfig.hours.map((h) => (
              <li key={h.day} className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>
                  <span className="block text-white/80">{h.day}</span>
                  {h.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-luxury flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-gold">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold">Terms of Service</Link>
            <Link href="/admin" className="hover:text-gold">Admin</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
