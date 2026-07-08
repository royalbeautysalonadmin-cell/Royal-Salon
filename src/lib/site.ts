export const siteConfig = {
  name: "Royal Beauty Salon",
  shortName: "Royal Beauty",
  tagline: "Where Beauty Meets Royalty",
  description:
    "Experience luxury beauty treatments, bridal makeovers, premium skincare, and professional beauty training at Royal Beauty Salon.",
  // Falls back to the live domain so production SEO (sitemap, canonical, OG)
  // is correct even if NEXT_PUBLIC_SITE_URL is not set in the host env.
  // Local dev overrides this via .env.local (http://localhost:3000).
  // MUST match the domain the host actually serves. The apex (non-www) domain
  // 308-redirects to www, so www is the canonical origin — a non-www value here
  // makes every canonical/sitemap URL a redirect and Google refuses to index.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.royalbeautysaloon.com",
  ogImage: "/og.jpg",
  phone: process.env.NEXT_PUBLIC_SALON_PHONE || "+48 22 123 45 67",
  whatsapp: process.env.NEXT_PUBLIC_SALON_WHATSAPP || "48221234567",
  email: process.env.NEXT_PUBLIC_SALON_EMAIL || "warsawroyalbeauty@gmail.com",
  address: {
    line1: "ul. Mokotowska 12",
    line2: "00-561 Warsaw, Poland",
    full: "ul. Mokotowska 12, 00-561 Warsaw, Poland",
    mapsQuery: "Mokotowska+12+Warszawa",
    lat: 52.2235,
    lng: 21.0185,
  },
  hours: [
    { day: "Monday – Friday", time: "9:00 – 21:00" },
    { day: "Saturday", time: "9:00 – 20:00" },
    { day: "Sunday", time: "10:00 – 18:00" },
  ],
  socials: {
    instagram: "https://instagram.com/royalbeautywarsaw",
    facebook: "https://facebook.com/royalbeautywarsaw",
    tiktok: "https://tiktok.com/@royalbeautywarsaw",
    youtube: "https://youtube.com/@royalbeautywarsaw",
  },
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

/** Service category links for footer / internal linking. */
export const serviceCategoryLinks = [
  { label: "Hair", href: "/services/hair" },
  { label: "Makeup & Styling", href: "/services/makeup" },
  { label: "Facials & Skincare", href: "/services/facials" },
  { label: "Waxing", href: "/services/waxing" },
  { label: "Threading & Brows", href: "/services/threading" },
  { label: "Manicure & Pedicure", href: "/services/nails" },
  { label: "Mehndi & Henna", href: "/services/mehndi-henna" },
] as const;

/** Local SEO links for footer / internal linking. */
export const warsawLinks = [
  { label: "Beauty Salon Warsaw", href: "/warsaw" },
  { label: "Bridal Makeup Warsaw", href: "/warsaw/bridal-makeup-warsaw" },
  { label: "Hair Salon Warsaw", href: "/warsaw/hair-salon-warsaw" },
  { label: "Facial Warsaw", href: "/warsaw/facial-warsaw" },
  { label: "Eyebrow Threading Warsaw", href: "/warsaw/eyebrow-threading-warsaw" },
  { label: "Waxing Warsaw", href: "/warsaw/waxing-warsaw" },
] as const;

/** Specialty / community landing pages for footer + internal linking. */
export const specialtyLinks = [
  { label: "Indian Salon Warsaw", href: "/indian-salon-warsaw" },
  { label: "Indian Parlour Warsaw", href: "/indian-parlour-warsaw" },
  { label: "Desi Salon Warsaw", href: "/desi-salon-warsaw" },
  { label: "Hijab-Friendly Salon Warsaw", href: "/hijab-friendly-salon-warsaw" },
  { label: "Women-Only Hair Salon Warsaw", href: "/women-only-hair-salon-warsaw" },
  { label: "Muslim Women Hairdresser Warsaw", href: "/muslim-women-hairdresser-warsaw" },
  { label: "Keratin for Hijab Hair Warsaw", href: "/keratin-nanoplasty-hijab-hair-warsaw" },
  { label: "Salon Kosmetyczny Warszawa", href: "/salon-kosmetyczny-warszawa" },
] as const;

export function whatsappLink(message?: string) {
  const text = encodeURIComponent(
    message || "Hello Royal Beauty Salon, I'd like to book an appointment."
  );
  return `https://wa.me/${siteConfig.whatsapp}?text=${text}`;
}
