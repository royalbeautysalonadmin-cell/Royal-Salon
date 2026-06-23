export const siteConfig = {
  name: "Royal Beauty Salon",
  shortName: "Royal Beauty",
  tagline: "Where Beauty Meets Royalty",
  description:
    "Experience luxury beauty treatments, bridal makeovers, premium skincare, and professional beauty training at Royal Beauty Salon.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og.jpg",
  phone: process.env.NEXT_PUBLIC_SALON_PHONE || "+48 22 123 45 67",
  whatsapp: process.env.NEXT_PUBLIC_SALON_WHATSAPP || "48221234567",
  email: process.env.NEXT_PUBLIC_SALON_EMAIL || "hello@royalbeautysalon.pl",
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
  { label: "Contact", href: "/contact" },
] as const;

export function whatsappLink(message?: string) {
  const text = encodeURIComponent(
    message || "Hello Royal Beauty Salon, I'd like to book an appointment."
  );
  return `https://wa.me/${siteConfig.whatsapp}?text=${text}`;
}
