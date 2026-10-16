// NOTE: the six granular Service arrays (services, makeupServices,
// threadingServices, waxingServices, facialServices, nailServices) and
// `allServices` used to live here. They now live only in MongoDB, seeded
// from `backend/scripts/seed-data.ts`, and are fetched at build time via
// `@/lib/backend-api`'s `getBackendServices()` — see that file for why a
// local static fallback is deliberately not kept here.
//
// The fake/stock `testimonials` and `gallery` arrays that also used to live
// here were removed: both were unused dead code, and real client reviews and
// photos now come from the backend (`getBackendTestimonials` /
// `getBackendGallery`) with a real-service-image gallery fallback.

/* ─── Why Choose Us ─── */
export const whyChooseUs = [
  {
    icon: "Users",
    title: "Professional Team",
    desc: "Certified beauticians and experienced artists with international training, serving Warsaw's clientele.",
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
    link: "/services",
  },
  {
    icon: "Heart",
    title: "Customer Satisfaction",
    desc: "2000+ delighted clients and a 5-star average rating — our most loved beauty salon.",
    link: "/services",
  },
  {
    icon: "Award",
    title: "Certified Experts",
    desc: "Internationally trained professionals and certified specialists at our Warsaw salon.",
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
