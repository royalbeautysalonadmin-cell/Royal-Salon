import type {
  Package,
  Course,
  Testimonial,
  GalleryImage,
} from "@/types";

const U = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

// NOTE: the six granular Service arrays (services, makeupServices,
// threadingServices, waxingServices, facialServices, nailServices) and
// `allServices` used to live here. They now live only in MongoDB, seeded
// from `backend/scripts/seed-data.ts`, and are fetched at build time via
// `@/lib/backend-api`'s `getBackendServices()` — see that file for why a
// local static fallback is deliberately not kept here.

/* ─── Packages ─── */
export const packages: Package[] = [
  {
    slug: "royal-bridal",
    name: "Royal Bridal Package",
    type: "Bridal",
    price: 3500,
    description: "The complete head-to-toe bridal transformation for your wedding day.",
    includes: [
      "Bridal HD makeup",
      "Hair styling & extensions",
      "Bridal mehndi (hands & feet)",
      "Pre-bridal facial & cleanup",
      "Manicure & pedicure",
      "Draping & accessories",
    ],
    benefits: ["Dedicated lead artist", "Trial session included", "On-location available"],
    image: U("photo-1519741497674-611481863552"),
    popular: true,
  },
  {
    slug: "glow-monthly",
    name: "Glow Monthly Membership",
    type: "Monthly",
    price: 900,
    description: "Stay radiant all month with our curated self-care membership.",
    includes: [
      "2 signature facials",
      "1 hydra facial",
      "2 blow-dry sessions",
      "1 manicure & pedicure",
      "Threading (unlimited)",
    ],
    benefits: ["Priority booking", "15% off add-ons", "Free skin consultation"],
    image: U("photo-1596178065887-1198b6148b2b"),
  },
  {
    slug: "seasonal-radiance",
    name: "Seasonal Radiance Package",
    type: "Seasonal",
    price: 1600,
    description: "A seasonal reset pampering experience for skin, hair and nails.",
    includes: [
      "Hydra facial",
      "Keratin treatment",
      "Hair spa",
      "Full-body waxing",
      "Spa pedicure",
    ],
    benefits: ["Complimentary head massage", "Seasonal gift box", "Refreshments"],
    image: U("photo-1616394584738-fc6e612e71b9"),
  },
];

/* ─── Courses ─── */
export const courses: Course[] = [
  {
    slug: "professional-makeup-artistry",
    name: "Professional Makeup Artistry",
    duration: "8 Weeks",
    level: "Professional",
    price: 4500,
    description:
      "Master bridal, editorial and HD makeup with a complete professional kit and live model practice.",
    modules: ["Skin prep & theory", "Bridal & HD looks", "Editorial & airbrush", "Business of makeup"],
    certification: "Internationally Accredited Diploma",
    image: U("photo-1487412947147-5cebf100ffc2"),
  },
  {
    slug: "advanced-hair-styling",
    name: "Advanced Hair Styling",
    duration: "6 Weeks",
    level: "Professional",
    price: 3800,
    description:
      "Learn cutting, colouring, keratin and red-carpet styling from senior stylists.",
    modules: ["Cutting techniques", "Colour theory", "Keratin & treatments", "Bridal updos"],
    certification: "Professional Hair Certification",
    image: U("photo-1562322140-8baeececf3df"),
  },
  {
    slug: "skincare-facial-specialist",
    name: "Skincare & Facial Specialist",
    duration: "4 Weeks",
    level: "Beginner",
    price: 2800,
    description:
      "Become a certified facial therapist with hands-on training in advanced skincare.",
    modules: ["Skin analysis", "Facial protocols", "Hydra facial", "Client care"],
    certification: "Certified Skincare Therapist",
    image: U("photo-1616394584738-fc6e612e71b9"),
  },
  {
    slug: "master-mehndi-art",
    name: "Master Mehndi Art",
    duration: "3 Weeks",
    level: "Master",
    price: 2200,
    description:
      "Perfect intricate bridal henna design and build your freelance mehndi business.",
    modules: ["Pattern fundamentals", "Bridal motifs", "Arabic & Indo designs", "Speed & finishing"],
    certification: "Master Mehndi Artist Certificate",
    image: U("photo-1595407753234-0882f1e77954"),
  },
];

/* ─── Testimonials ─── */
export const testimonials: Testimonial[] = [
  {
    name: "Zofia Kowalska",
    role: "Bride",
    avatar: U("photo-1438761681033-6461ffad8d80", 200),
    rating: 5,
    quote:
      "My bridal look was beyond a dream. The team made me feel like royalty from the trial to the wedding day. Every detail was perfect.",
  },
  {
    name: "Maria Nowak",
    role: "Monthly Member",
    avatar: U("photo-1494790108377-be9c29b29330", 200),
    rating: 5,
    quote:
      "The Glow membership transformed my skin. The hydra facials are unmatched in Warsaw. Truly a luxury experience every visit.",
  },
  {
    name: "Anna Wiśniewska",
    role: "Academy Graduate",
    avatar: U("photo-1534528741775-53994a69daeb", 200),
    rating: 5,
    quote:
      "I completed the makeup artistry course and now run my own studio. The training was world-class and the mentors were so supportive.",
  },
  {
    name: "Katarzyna Lewandowska",
    role: "Regular Client",
    avatar: U("photo-1544005313-94ddf0286df2", 200),
    rating: 5,
    quote:
      "From hair colour to nails, the attention to detail is exceptional. The ambience feels like a five-star retreat.",
  },
  {
    name: "Julia Zielińska",
    role: "Party Makeup",
    avatar: U("photo-1502823403499-6ccfcf4fb453", 200),
    rating: 5,
    quote:
      "I get endless compliments every time. The artists truly understand luxury and elegance. My go-to salon for every event.",
  },
];

/* ─── Gallery ─── */
export const gallery: GalleryImage[] = [
  { src: U("photo-1457972729786-0411a3b2b626"), category: "Bridal", alt: "Bridal makeover at Royal Beauty Salon Warsaw" },
  { src: U("photo-1560066984-138dadb4c035"), category: "Hair", alt: "Hair styling at luxury salon Warsaw" },
  { src: U("photo-1487412947147-5cebf100ffc2"), category: "Makeup", alt: "Party makeup artistry Warsaw" },
  { src: U("photo-1604654894610-df63bc536371"), category: "Nails", alt: "Luxury manicure pedicure Warsaw" },
  { src: U("photo-1570172619644-dfd03ed5d881"), category: "Skin", alt: "Facial treatment hydra facial Warsaw" },
  { src: U("photo-1595407753234-0882f1e77954"), category: "Mehndi", alt: "Bridal mehndi art Warsaw" },
  { src: U("photo-1519741497674-611481863552"), category: "Bridal", alt: "Bride portrait luxury beauty Warsaw" },
  { src: U("photo-1527799820374-dcf8d9d4a388"), category: "Hair", alt: "Hair colouring specialist Warsaw" },
  { src: U("photo-1522337360788-8b13dee7a37e"), category: "Hair", alt: "Hair updo styling Warsaw" },
  { src: U("photo-1512290923902-8a9f81dc236c"), category: "Skin", alt: "Glowing skin facial Warsaw" },
  { src: U("photo-1519014816548-bf5fe059798b"), category: "Nails", alt: "Spa pedicure Warsaw" },
  { src: U("photo-1596178065887-1198b6148b2b"), category: "Makeup", alt: "Glam makeup artistry Warsaw" },
];

/* ─── Why Choose Us ─── */
export const whyChooseUs = [
  {
    icon: "Users",
    title: "Professional Team",
    desc: "Award-winning artists and certified beauticians with global experience, serving Warsaw's elite clientele.",
    link: "/about",
  },
  {
    icon: "Sparkles",
    title: "Premium Products",
    desc: "Only luxury, dermatologically tested and cruelty-free brands used in our Warsaw salon.",
    link: "/services",
  },
  {
    icon: "ShieldCheck",
    title: "Hygienic Environment",
    desc: "Hospital-grade sterilisation and single-use tools for every guest at our central Warsaw location.",
    link: "/contact",
  },
  {
    icon: "Crown",
    title: "Luxury Experience",
    desc: "A serene five-star ambience designed for total relaxation in the heart of Warsaw.",
    link: "/packages",
  },
  {
    icon: "Heart",
    title: "Customer Satisfaction",
    desc: "2000+ delighted clients and a 5-star average rating — our most loved beauty salon.",
    link: "/packages",
  },
  {
    icon: "Award",
    title: "Certified Experts",
    desc: "Internationally accredited professionals and trainers at our Warsaw beauty academy.",
    link: "/about",
  },
];

/* ─── Salon Amenities ─── */
export const amenities = [
  { icon: "Car", title: "Free Parking", desc: "Complimentary parking space for all guests visiting our Warsaw salon." },
  { icon: "CreditCard", title: "Card Payments", desc: "We accept all major credit and debit cards for your convenience." },
  { icon: "Gift", title: "Loyalty Program", desc: "Earn points with every visit and redeem for free beauty services." },
  { icon: "Wifi", title: "Free Wi-Fi", desc: "Stay connected while you pamper yourself at our Warsaw salon." },
  { icon: "Accessibility", title: "Accessible", desc: "Wheelchair accessible facilities for everyone in central Warsaw." },
  { icon: "Baby", title: "Child Friendly", desc: "Kids-friendly services and a welcoming environment for families." },
];

/* ─── FAQs ─── */
export const faqs = [
  {
    q: "How far in advance should I book a bridal appointment at your Warsaw salon?",
    a: "We recommend booking your bridal package at least 4–6 weeks in advance to secure your preferred date at our Warsaw location and include a complimentary trial session.",
  },
  {
    q: "Do you offer on-location bridal services in Warsaw?",
    a: "Yes. Our bridal and party teams can travel to your home, hotel or venue across Warsaw. On-location charges apply based on distance within the city.",
  },
  {
    q: "Are your products suitable for sensitive skin?",
    a: "Absolutely. We use premium, dermatologically tested and cruelty-free products at our Warsaw salon, and every treatment begins with a skin consultation.",
  },
  {
    q: "Do you provide certificates for your beauty courses in Warsaw?",
    a: "All our academy courses at our Warsaw beauty academy include internationally accredited certification upon successful completion, plus career and placement guidance.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Appointments can be rescheduled or cancelled up to 24 hours in advance at no charge. Bridal bookings follow a separate deposit policy.",
  },
];

/* ─── Stats ─── */
export const stats = [
  { value: "1+", label: "Year of Excellence" },
  { value: "2K+", label: "Happy Clients" },
  { value: "3", label: "Beauty Experts" },
  { value: "5★", label: "Average Rating" },
];
