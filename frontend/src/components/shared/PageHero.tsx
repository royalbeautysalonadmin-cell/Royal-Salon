import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumb: string;
}

export function PageHero({ eyebrow, title, description, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-luxury-black pt-40 pb-20 text-white">
      <div className="pointer-events-none absolute inset-0 bg-luxury-radial opacity-60" />
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-brown/30 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-gold/20 blur-[120px]" />

      <div className="container-luxury relative text-center">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-gold-300">
            <span className="h-px w-6 bg-gold" />
            {eyebrow}
            <span className="h-px w-6 bg-gold" />
          </span>
        )}
        <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight md:text-6xl text-balance">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            {description}
          </p>
        )}
        <nav className="mt-7 flex items-center justify-center gap-1.5 text-sm text-white/50">
          <Link href="/" className="transition-colors hover:text-gold">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-gold">{breadcrumb}</span>
        </nav>
      </div>
    </section>
  );
}
