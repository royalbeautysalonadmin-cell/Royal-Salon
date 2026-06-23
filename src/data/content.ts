import type {
  Service,
  Package,
  Course,
  Testimonial,
  GalleryImage,
} from "@/types";

const U = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const services: Service[] = [
  {
    slug: "bridal-makeup",
    name: "Bridal Makeup",
    category: "Makeup",
    description:
      "A flawless, long-wearing bridal look crafted by our master artists for your most important day.",
    price: 1200,
    duration: "2.5 hrs",
    image: U("photo-1457972729786-0411a3b2b626"),
    featured: true,
  },
  {
    slug: "party-makeup",
    name: "Party Makeup",
    category: "Makeup",
    description: "Glamorous, photo-ready makeup for parties, galas and special evenings.",
    price: 450,
    duration: "1 hr",
    image: U("photo-1487412947147-5cebf100ffc2"),
    featured: true,
  },
  {
    slug: "hair-cutting",
    name: "Hair Cutting",
    category: "Hair",
    description: "Precision cuts and shaping tailored to your face and lifestyle.",
    price: 180,
    duration: "45 mins",
    image: U("photo-1560066984-138dadb4c035"),
  },
  {
    slug: "hair-styling",
    name: "Hair Styling",
    category: "Hair",
    description: "Blow-dry, curls, updos and red-carpet styling for any occasion.",
    price: 220,
    duration: "1 hr",
    image: U("photo-1522337660859-02fbefca4702"),
  },
  {
    slug: "hair-coloring",
    name: "Hair Coloring",
    category: "Hair",
    description: "Balayage, highlights and global colour using premium ammonia-free dyes.",
    price: 650,
    duration: "2 hrs",
    image: U("photo-1605497788044-5a32c7078486"),
    featured: true,
  },
  {
    slug: "hair-treatments",
    name: "Hair Treatments",
    category: "Hair",
    description: "Deep-conditioning and scalp therapies that restore shine and strength.",
    price: 350,
    duration: "1 hr",
    image: U("photo-1519699047748-de8e457a634e"),
  },
  {
    slug: "keratin-treatment",
    name: "Keratin Treatment",
    category: "Hair",
    description: "Smoothing keratin therapy for frizz-free, glossy and manageable hair.",
    price: 850,
    duration: "2.5 hrs",
    image: U("photo-1633681926022-84c23e8cb2d6"),
  },
  {
    slug: "facials",
    name: "Facials",
    category: "Skin",
    description: "Customised facials that cleanse, brighten and rejuvenate your skin.",
    price: 400,
    duration: "1 hr",
    image: U("photo-1570172619644-dfd03ed5d881"),
    featured: true,
  },
  {
    slug: "hydra-facial",
    name: "Hydra Facial",
    category: "Skin",
    description: "Medical-grade hydradermabrasion for instantly radiant, plump skin.",
    price: 600,
    duration: "1 hr",
    image: U("photo-1512290923902-8a9f81dc236c"),
  },
  {
    slug: "skin-care",
    name: "Skin Care",
    category: "Skin",
    description: "Advanced skin analysis and bespoke treatment plans for lasting glow.",
    price: 300,
    duration: "45 mins",
    image: U("photo-1598440947619-2c35fc9aa908"),
  },
  {
    slug: "threading",
    name: "Threading",
    category: "Threading & Waxing",
    description: "Precise brow and facial threading for clean, defined features.",
    price: 60,
    duration: "20 mins",
    image: U("photo-1522337094846-8a818192de1f"),
  },
  {
    slug: "waxing",
    name: "Waxing",
    category: "Threading & Waxing",
    description: "Gentle full-body waxing with soothing, skin-friendly formulas.",
    price: 200,
    duration: "45 mins",
    image: U("photo-1519823551278-64ac92734fb1"),
  },
  {
    slug: "manicure",
    name: "Manicure",
    category: "Nails",
    description: "Luxury manicures with nourishing care and flawless polish.",
    price: 120,
    duration: "45 mins",
    image: U("photo-1604654894610-df63bc536371"),
  },
  {
    slug: "pedicure",
    name: "Pedicure",
    category: "Nails",
    description: "Indulgent spa pedicures that pamper and refresh tired feet.",
    price: 150,
    duration: "1 hr",
    image: U("photo-1519014816548-bf5fe059798b"),
  },
  {
    slug: "mehndi-services",
    name: "Mehndi Services",
    category: "Mehndi",
    description: "Intricate bridal and party henna artistry by award-winning artists.",
    price: 250,
    duration: "1.5 hrs",
    image: U("photo-1595407753234-0882f1e77954"),
    featured: true,
  },
  {
    slug: "beauty-courses",
    name: "Beauty Courses",
    category: "Training",
    description: "Hands-on professional beauty courses with internationally recognised certification.",
    price: 3500,
    duration: "Flexible",
    image: U("photo-1556760544-74068565f05c"),
  },
  {
    slug: "training-programs",
    name: "Training Programs",
    category: "Training",
    description: "Advanced master-classes to elevate your career as a beauty professional.",
    price: 5000,
    duration: "Flexible",
    image: U("photo-1607779097040-26e80aa78e66"),
  },
];

export const packages: Package[] = [
  {
    slug: "royal-bridal",
    name: "Royal Bridal Package",
    type: "Bridal",
    price: 3500,
    originalPrice: 4800,
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
    image: U("photo-1457972729786-0411a3b2b626"),
    popular: true,
  },
  {
    slug: "glow-monthly",
    name: "Glow Monthly Membership",
    type: "Monthly",
    price: 900,
    originalPrice: 1400,
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
    originalPrice: 2200,
    description: "A seasonal reset pampering experience for skin, hair and nails.",
    includes: [
      "Hydra facial",
      "Keratin treatment",
      "Hair spa",
      "Full-body waxing",
      "Spa pedicure",
    ],
    benefits: ["Complimentary head massage", "Seasonal gift box", "Refreshments"],
    image: U("photo-1633681926035-ec1ac984418a"),
  },
];

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
    image: U("photo-1570172619644-dfd03ed5d881"),
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

export const gallery: GalleryImage[] = [
  { src: U("photo-1457972729786-0411a3b2b626"), category: "Bridal", alt: "Bridal makeover" },
  { src: U("photo-1560066984-138dadb4c035"), category: "Hair", alt: "Hair styling" },
  { src: U("photo-1487412947147-5cebf100ffc2"), category: "Makeup", alt: "Party makeup" },
  { src: U("photo-1604654894610-df63bc536371"), category: "Nails", alt: "Luxury manicure" },
  { src: U("photo-1570172619644-dfd03ed5d881"), category: "Skin", alt: "Facial treatment" },
  { src: U("photo-1595407753234-0882f1e77954"), category: "Mehndi", alt: "Bridal mehndi" },
  { src: U("photo-1519699047748-de8e457a634e"), category: "Bridal", alt: "Bride portrait" },
  { src: U("photo-1605497788044-5a32c7078486"), category: "Hair", alt: "Hair colouring" },
  { src: U("photo-1522337660859-02fbefca4702"), category: "Hair", alt: "Hair updo" },
  { src: U("photo-1512290923902-8a9f81dc236c"), category: "Skin", alt: "Glowing skin" },
  { src: U("photo-1519014816548-bf5fe059798b"), category: "Nails", alt: "Spa pedicure" },
  { src: U("photo-1596178065887-1198b6148b2b"), category: "Makeup", alt: "Glam makeup" },
];

export const whyChooseUs = [
  {
    icon: "Users",
    title: "Professional Team",
    desc: "Award-winning artists and certified beauticians with global experience.",
  },
  {
    icon: "Sparkles",
    title: "Premium Products",
    desc: "Only luxury, dermatologically tested and cruelty-free brands.",
  },
  {
    icon: "ShieldCheck",
    title: "Hygienic Environment",
    desc: "Hospital-grade sterilisation and single-use tools for every guest.",
  },
  {
    icon: "Crown",
    title: "Luxury Experience",
    desc: "A serene five-star ambience designed for total relaxation.",
  },
  {
    icon: "Heart",
    title: "Customer Satisfaction",
    desc: "Thousands of delighted clients and a 4.9-star average rating.",
  },
  {
    icon: "Award",
    title: "Certified Experts",
    desc: "Internationally accredited professionals and trainers.",
  },
];

export const faqs = [
  {
    q: "How far in advance should I book a bridal appointment?",
    a: "We recommend booking your bridal package at least 4–6 weeks in advance to secure your preferred date and include a complimentary trial session.",
  },
  {
    q: "Do you offer on-location services?",
    a: "Yes. Our bridal and party teams can travel to your home, hotel or venue across Warsaw. On-location charges apply based on distance.",
  },
  {
    q: "Are your products suitable for sensitive skin?",
    a: "Absolutely. We use premium, dermatologically tested and cruelty-free products, and every treatment begins with a skin consultation.",
  },
  {
    q: "Do you provide certificates for your beauty courses?",
    a: "All our academy courses include internationally accredited certification upon successful completion, plus career and placement guidance.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Appointments can be rescheduled or cancelled up to 24 hours in advance at no charge. Bridal bookings follow a separate deposit policy.",
  },
];

export const stats = [
  { value: "12+", label: "Years of Excellence" },
  { value: "20K+", label: "Happy Clients" },
  { value: "50+", label: "Beauty Experts" },
  { value: "4.9★", label: "Average Rating" },
];
