"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MapPin, Clock, Instagram, Facebook } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks, siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("#")[0]) && href !== "/";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Slim luxury utility bar */}
      <div
        className={cn(
          "hidden overflow-hidden bg-luxury-black text-white/80 transition-all duration-500 lg:block",
          scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        )}
      >
        <div className="container-luxury flex items-center justify-between py-2 text-xs">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-gold" /> {siteConfig.address.full}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-gold" /> Mon–Fri 9:00–21:00
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-gold">
              <Phone className="h-3.5 w-3.5 text-gold" /> {siteConfig.phone}
            </a>
            <span className="h-3 w-px bg-white/20" />
            <a href={siteConfig.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-gold">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={siteConfig.socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-gold">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "transition-all duration-500",
          scrolled
            ? "border-b border-brown/10 bg-white/90 py-3 shadow-soft backdrop-blur-xl"
            : "bg-white/40 py-4 backdrop-blur-md"
        )}
      >
        <nav className="container-luxury flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3" aria-label={siteConfig.name}>
            <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-brown-gradient font-serif text-lg font-bold text-white shadow-gold ring-1 ring-gold/40">
              R
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-serif text-xl font-semibold tracking-wide text-luxury-black">
                Royal Beauty
              </span>
              <span className="text-[0.6rem] uppercase tracking-[0.4em] text-gold-600">
                Salon · Warsaw
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative text-sm font-medium transition-colors",
                    active ? "text-brown" : "text-charcoal hover:text-brown"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-px bg-brown-gradient transition-all duration-300",
                      active ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Button variant="gold" size="sm" asChild>
              <a href={siteConfig.booksyUrl} target="_blank" rel="noopener noreferrer">
                Book Appointment
              </a>
            </Button>
          </div>

          <button
            className="rounded-full p-2 text-luxury-black lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-brown/10 bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container-luxury flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-charcoal transition-colors hover:bg-cream hover:text-brown"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-charcoal/70"
              >
                <Phone className="h-4 w-4 text-brown" /> {siteConfig.phone}
              </a>
              <Button variant="gold" className="mt-2" asChild>
                <a
                  href={siteConfig.booksyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  Book Appointment
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
