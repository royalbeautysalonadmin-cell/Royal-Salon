import type { Service } from "@/types";
import { allServices } from "./content";

/* ──────────────────────────────────────────────────────────────────────────
 *  Niche local-SEO landing pages
 *  Targeted, high-intent pages for the South-Asian / Muslim / women-only
 *  audience in Warsaw. Each page has a genuinely distinct angle and content
 *  so they complement (not cannibalise) one another. Top-level slugs are used
 *  for exact-match local keywords.
 * ────────────────────────────────────────────────────────────────────────── */

const U = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export interface NicheSection {
  heading: string;
  body: string[];
}

export interface NichePage {
  slug: string;
  /** Page language — swaps the surrounding UI chrome (buttons, breadcrumb,
   *  section labels) to match. Defaults to English when omitted. */
  locale?: "en" | "pl";
  /** Primary target keyword (used in copy + schema serviceType). */
  primaryKeyword: string;
  /** Secondary keywords woven naturally into the page. */
  secondaryKeywords: string[];
  title: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  tagline: string;
  heroImage: string;
  /** Recommended alt text for the hero image (keyword-aware, descriptive). */
  heroAlt: string;
  intro: string[];
  sections: NicheSection[];
  highlights: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  /** Service slugs to surface as cards + internal links. */
  featuredServiceSlugs: string[];
  /** Other niche slugs to cross-link for topical clustering. */
  relatedNicheSlugs: string[];
  /** Category slugs to link into the main services tree. */
  relatedCategorySlugs: string[];
  /** Schema Service name + description. */
  serviceName: string;
  serviceDescription: string;
  /** Image alt-text recommendations for the salon to apply across the page. */
  imageAltRecommendations: string[];
  /** WhatsApp prefill / CTA message. */
  ctaMessage: string;
}

export const nichePages: NichePage[] = [
  /* ─────────────────────────── Indian salon (hub) ─────────────────────────── */
  {
    slug: "indian-salon-warsaw",
    primaryKeyword: "Indian salon Warsaw",
    secondaryKeywords: [
      "Indian beauty salon Warsaw",
      "South Asian salon Warsaw",
      "Indian parlour Warsaw",
      "Desi salon Warsaw",
      "Asian beauty salon Warsaw",
      "Indian hair salon Warsaw",
      "Indian hairdresser Warsaw",
      "Indian makeup artist Warsaw",
    ],
    title: "Indian Beauty Salon in Warsaw — Threading, Bridal & Mehndi",
    metaDescription:
      "Looking for an Indian beauty salon in Warsaw? Royal Beauty Salon offers threading, bridal makeup, mehndi, hair oil treatments and HD makeup for the South Asian community. Book today.",
    h1: "Indian Beauty Salon in Warsaw",
    eyebrow: "Indian Salon • Warsaw",
    tagline:
      "Authentic South Asian beauty — threading, bridal, mehndi and hair care — in the heart of Warsaw.",
    heroImage: U("photo-1595407753234-0882f1e77954"),
    heroAlt: "Bridal mehndi being applied at an Indian beauty salon in Warsaw",
    intro: [
      "If you have been searching for an Indian beauty salon in Warsaw that truly understands South Asian beauty traditions, you have found your home. Royal Beauty Salon brings authentic threading, bridal artistry, mehndi, hair oil treatments and HD makeup together under one roof on ul. Mokotowska in central Warsaw.",
      "Our team grew up with these services and performs them the way they are meant to be done — precise eyebrow threading, rich champi hair oil massage, intricate bridal mehndi and flawless Desi bridal makeup. Whether you are part of the Indian, Pakistani, Bangladeshi or wider Desi community in Warsaw, or simply love these treatments, you will feel right at home.",
      "Many of our clients come to us because mainstream salons in Warsaw do not offer threading or understand South Asian bridal looks. We do both — with the warmth, attention and skill you would expect from the best parlour back home.",
    ],
    sections: [
      {
        heading: "Why choose an Indian salon in Warsaw?",
        body: [
          "South Asian beauty has its own techniques and traditions — threading instead of waxing for brows, oil massage for hair health, mehndi for celebrations, and bridal looks built for vibrant outfits and jewellery. A salon that specialises in these gets the details right.",
          "At Royal Beauty Salon we combine these authentic services with the hygiene, comfort and premium products of a luxury Warsaw salon, so you never have to compromise.",
        ],
      },
      {
        heading: "Threading and facial hair removal",
        body: [
          "Threading is at the heart of every Indian parlour, and ours is no exception. Our specialists shape brows with precision and remove upper lip, chin, forehead and full-face hair gently — ideal for sensitive skin and far more exact than waxing.",
        ],
      },
      {
        heading: "Bridal makeup, mehndi and Desi occasions",
        body: [
          "From mehndi and sangeet to the walima and reception, our artists create long-wearing HD bridal looks designed for South Asian weddings, complete with hairstyling and saree or dupatta draping. Our henna artists apply intricate bridal mehndi for hands and feet.",
        ],
      },
      {
        heading: "Indian hair salon: oil treatments, cutting and colour",
        body: [
          "A proper hair oil massage — champi — with steam and wash nourishes the scalp, relieves stress and supports healthy hair growth. It is one of the most-loved services we carry over from traditional Indian parlours, alongside cutting, colour and keratin smoothing.",
          "As a full Indian hair salon, we go beyond champi — our Indian hairdressers also handle global colour, balayage, keratin and nanoplasty smoothing, and precision cuts, so you can treat your hair and your beauty routine at the same appointment.",
        ],
      },
    ],
    highlights: [
      { title: "Authentic threading", desc: "Precise brow and facial threading, just like back home." },
      { title: "Desi bridal & mehndi", desc: "HD bridal makeup, hairstyling, draping and henna." },
      { title: "Hair oil champi", desc: "Nourishing oil massage with steam for healthy hair." },
      { title: "Community-friendly", desc: "A warm, welcoming space for the South Asian community." },
    ],
    faqs: [
      {
        q: "Is there an Indian salon in Warsaw that does threading?",
        a: "Yes. Royal Beauty Salon on ul. Mokotowska offers authentic eyebrow and facial threading along with the full range of South Asian beauty services, performed by specialists who do it daily.",
      },
      {
        q: "Do you do Indian and Desi bridal makeup?",
        a: "Absolutely. Our artists specialise in HD Desi bridal makeup, bridal hairstyling, saree and dupatta draping, and bridal mehndi for weddings, mehndi nights and receptions.",
      },
      {
        q: "Can I get bridal mehndi (henna) in Warsaw?",
        a: "Yes — our henna artists create intricate bridal and party mehndi for hands and feet. Book ahead for weddings so we can reserve enough time for detailed designs.",
      },
      {
        q: "Do I need to be from the South Asian community to visit?",
        a: "Not at all. Everyone is warmly welcome. Our services are loved by clients of every background who enjoy threading, mehndi, hair oil treatments and our bridal artistry.",
      },
      {
        q: "Do you have an Indian hairdresser and Indian makeup artist on the team?",
        a: "Yes. Our Indian hairdressers handle everything from champi oil massage to global colour and keratin smoothing, and our Indian makeup artists specialise in HD Desi bridal and party looks built for vibrant outfits and jewellery.",
      },
    ],
    featuredServiceSlugs: [
      "threading-combo",
      "bridal-makeup",
      "bridal-mehndi-hands-feet",
      "hair-oil-massage-steam",
      "full-face-eyebrows-threading",
      "party-makeup",
      "royal-nanoplasty",
    ],
    relatedNicheSlugs: ["indian-parlour-warsaw", "desi-salon-warsaw", "hijab-friendly-salon-warsaw"],
    relatedCategorySlugs: ["threading", "makeup", "hair", "mehndi-henna"],
    serviceName: "Indian Beauty Salon Services in Warsaw",
    serviceDescription:
      "Authentic South Asian beauty services in Warsaw including eyebrow threading, bridal makeup, mehndi, hair oil treatments and HD makeup.",
    imageAltRecommendations: [
      "Indian beauty salon in Warsaw — eyebrow threading close-up",
      "Bridal mehndi (henna) design on hands at Warsaw Indian salon",
      "Desi bridal makeup and hairstyling at Royal Beauty Salon Warsaw",
      "Hair oil champi massage at an Indian parlour in Warsaw",
    ],
    ctaMessage: "Hello Royal Beauty Salon, I'd like to book at your Indian salon in Warsaw.",
  },

  /* ─────────────────────────── Indian parlour ─────────────────────────── */
  {
    slug: "indian-parlour-warsaw",
    primaryKeyword: "Indian parlour Warsaw",
    secondaryKeywords: [
      "ladies parlour Warsaw",
      "Indian beauty parlour Warsaw",
      "threading and waxing Warsaw",
    ],
    title: "Indian Parlour in Warsaw — Threading, Waxing & Facials",
    metaDescription:
      "Your everyday Indian parlour in Warsaw for threading, waxing, facials, bleach and cleanups. Quick, affordable, hygienic ladies' grooming at Royal Beauty Salon.",
    h1: "Indian Ladies' Parlour in Warsaw",
    eyebrow: "Ladies' Parlour • Warsaw",
    tagline:
      "Everyday grooming done the parlour way — threading, waxing, facials and cleanups in central Warsaw.",
    heroImage: U("photo-1594744803329-e58b31de8bf5"),
    heroAlt: "Eyebrow threading at an Indian ladies' parlour in Warsaw",
    intro: [
      "An Indian parlour is where you go for the everyday essentials — a quick eyebrow thread, an upper-lip tidy, a clean-up before an event, a relaxing facial or smooth waxing. Royal Beauty Salon brings that familiar, no-fuss ladies' parlour experience to central Warsaw, with the hygiene and comfort of a premium salon.",
      "Whether you need a five-minute threading touch-up on the way home or a full grooming session, our parlour services are quick, friendly and affordable. No appointment anxiety, no judgement — just the reliable grooming routine you know and trust.",
      "It is the kind of place where regulars pop in between errands and leave looking and feeling fresh — the everyday parlour Warsaw's South Asian community has been looking for.",
    ],
    sections: [
      {
        heading: "Threading — brows, lip, chin and full face",
        body: [
          "Threading is the cornerstone of any good parlour. We shape eyebrows precisely and remove upper lip, chin, forehead, sideburn and full-face hair with a fine thread — gentle, exact and perfect for sensitive skin. Prefer wax? We offer that for every area too.",
        ],
      },
      {
        heading: "Waxing for smooth, lasting results",
        body: [
          "From full arms and underarms to half and full legs, our waxing leaves skin smooth for weeks. We use gentle, low-temperature wax and single-use applicators for a hygienic, comfortable visit every time.",
        ],
      },
      {
        heading: "Facials, cleanups and bleach",
        body: [
          "Refresh your skin with a quick cleanup, brighten with a face bleach or de-tan, or unwind with a full facial tailored to your skin type. These are the everyday skin services a good parlour is known for — fast, effective and affordable.",
        ],
      },
      {
        heading: "Hair oil massage and quick hair care",
        body: [
          "Round off your visit with a nourishing hair oil massage to relax the scalp and strengthen your hair — a parlour classic that never goes out of style.",
        ],
      },
    ],
    highlights: [
      { title: "Quick & walk-in friendly", desc: "Pop in for fast threading and touch-ups." },
      { title: "Affordable everyday care", desc: "Threading from 25 zł, cleanups from 50 zł." },
      { title: "Hygienic", desc: "Single-use tools and strict sanitisation every visit." },
      { title: "All the parlour basics", desc: "Threading, waxing, facials, bleach and more." },
    ],
    faqs: [
      {
        q: "How much is threading at your Warsaw parlour?",
        a: "Eyebrow threading starts from 25 zł and a full threading combo (brows, lip and chin) is 40 zł. Full-face threading is 50 zł.",
      },
      {
        q: "Do I need an appointment for threading or waxing?",
        a: "Quick threading is walk-in friendly when we have availability, but we recommend booking for waxing, facials and busy weekend slots so you don't have to wait.",
      },
      {
        q: "Do you offer facials and cleanups too?",
        a: "Yes — we offer cleanups, face bleach, de-tan and full facials for every skin type, all part of our everyday parlour menu.",
      },
      {
        q: "Where is your parlour located in Warsaw?",
        a: "We are on ul. Mokotowska 12 in central Warsaw (Śródmieście), easy to reach by public transport, with free parking for guests.",
      },
    ],
    featuredServiceSlugs: [
      "threading-combo",
      "eyebrow-threading",
      "full-arms-wax",
      "cleanup",
      "face-bleach",
      "hair-oil-massage",
    ],
    relatedNicheSlugs: ["indian-salon-warsaw", "desi-salon-warsaw"],
    relatedCategorySlugs: ["threading", "waxing", "facials"],
    serviceName: "Indian Ladies' Parlour Services in Warsaw",
    serviceDescription:
      "Everyday ladies' parlour grooming in Warsaw — eyebrow and facial threading, waxing, facials, cleanups, bleach and hair oil massage.",
    imageAltRecommendations: [
      "Indian parlour in Warsaw — eyebrow threading in progress",
      "Underarm and arm waxing at a ladies' parlour in Warsaw",
      "Face cleanup and bleach at an Indian beauty parlour Warsaw",
      "Relaxing hair oil massage at a Warsaw ladies' parlour",
    ],
    ctaMessage: "Hello Royal Beauty Salon, I'd like to book threading/waxing at your Warsaw parlour.",
  },

  /* ─────────────────────────── Desi salon ─────────────────────────── */
  {
    slug: "desi-salon-warsaw",
    primaryKeyword: "Desi salon Warsaw",
    secondaryKeywords: [
      "Desi bridal makeup Warsaw",
      "Pakistani bridal makeup Warsaw",
      "Indian bridal makeup Warsaw",
      "Indian bridal salon Warsaw",
      "mehndi artist Warsaw",
      "Asian bridal Warsaw",
      "engagement makeup Warsaw",
    ],
    title: "Desi Salon in Warsaw — Bridal Makeup, Mehndi & Draping",
    metaDescription:
      "Desi salon in Warsaw for weddings and celebrations — HD bridal makeup, mehndi, saree and dupatta draping, and party makeup for mehndi, sangeet and walima. Book at Royal Beauty Salon.",
    h1: "Desi Salon in Warsaw for Weddings & Celebrations",
    eyebrow: "Desi Bridal • Warsaw",
    tagline:
      "HD bridal makeup, mehndi, draping and party glam for every Desi celebration in Warsaw.",
    heroImage: U("photo-1519741497674-611481863552"),
    heroAlt: "Desi bride with HD bridal makeup and jewellery at a Warsaw salon",
    intro: [
      "Desi weddings are a series of beautiful events — mehndi, sangeet, baraat, walima and the reception — and each one deserves a flawless look. Royal Beauty Salon is the Desi salon in Warsaw where brides, families and guests get camera-ready for every celebration.",
      "Our artists understand South Asian bridal beauty: bold, long-wearing HD makeup that complements vibrant outfits and heavy jewellery, intricate bridal mehndi, polished hairstyling and expert saree and dupatta draping. Whether your style is Pakistani, Indian or Bangladeshi, we tailor every look to your culture, outfit and theme.",
      "From the bride to her mother, sisters and friends, we glam up the whole party — with trials, on-location service across Warsaw and the kind of care that makes your event stress-free.",
    ],
    sections: [
      {
        heading: "Desi bridal makeup that lasts all day",
        body: [
          "South Asian weddings are long and emotional, so your makeup needs to last. We build looks on careful skin prep using HD, transfer-resistant products designed to photograph beautifully under any light and hold from the first rasm to the last dance.",
        ],
      },
      {
        heading: "Bridal mehndi and henna art",
        body: [
          "Our henna artists create detailed bridal mehndi for hands and feet, from traditional Indian motifs to Arabic and Indo-Western designs. We also offer simpler party mehndi for guests and family.",
        ],
      },
      {
        heading: "Hairstyling, saree and dupatta draping",
        body: [
          "Complete your look with bridal hairstyling and professional saree or dupatta draping — pinned securely and styled to sit perfectly through every function.",
        ],
      },
      {
        heading: "Glam for the whole wedding party",
        body: [
          "Mothers, sisters and friends can book party and HD makeup, hairstyling and draping too. Tell us your event schedule and we'll plan timings so everyone is ready together.",
        ],
      },
    ],
    highlights: [
      { title: "HD Desi bridal looks", desc: "Long-wearing makeup for vibrant outfits and jewellery." },
      { title: "Bridal mehndi", desc: "Intricate henna for hands and feet." },
      { title: "Draping experts", desc: "Saree and dupatta draping that stays perfect." },
      { title: "On-location", desc: "We travel across Warsaw for your functions." },
    ],
    faqs: [
      {
        q: "Do you do Pakistani and Indian bridal makeup in Warsaw?",
        a: "Yes — our artists specialise in Desi bridal makeup for Pakistani, Indian and Bangladeshi weddings, with HD, long-wearing looks tailored to your outfit and theme. As an Indian bridal salon at heart, we also handle every event around the wedding, not just the main day.",
      },
      {
        q: "Do you do engagement and mehndi-night makeup, not just the wedding day?",
        a: "Yes — engagement makeup, mehndi night, sangeet and reception looks are all popular bookings alongside the main bridal day. Each function gets its own look, tailored to the outfit and lighting.",
      },
      {
        q: "Can you do makeup for the whole wedding party?",
        a: "Absolutely. Alongside the bride, we glam mothers, sisters and friends with party and HD makeup, hairstyling and draping. Share your schedule and we'll coordinate timings.",
      },
      {
        q: "Do you offer bridal trials?",
        a: "Yes, we strongly recommend a bridal trial so we can perfect your look before the big day. It's included with our bridal package.",
      },
      {
        q: "Can you come to my venue or home?",
        a: "Yes — we offer on-location bridal and party services across Warsaw. On-location charges depend on distance and team size.",
      },
    ],
    featuredServiceSlugs: [
      "bridal-makeup",
      "bridal-mehndi-hands-feet",
      "bridal-hairstyle",
      "saree-dupatta-draping",
      "hd-party-makeup",
      "party-makeup",
      "hair-do-advanced",
    ],
    relatedNicheSlugs: ["indian-salon-warsaw", "indian-parlour-warsaw"],
    relatedCategorySlugs: ["makeup", "hair", "threading", "mehndi-henna"],
    serviceName: "Desi Bridal & Party Services in Warsaw",
    serviceDescription:
      "Desi salon services in Warsaw — HD bridal makeup, bridal mehndi, hairstyling, and saree and dupatta draping for South Asian weddings and celebrations.",
    imageAltRecommendations: [
      "Desi bride in HD bridal makeup at a Warsaw salon",
      "Bridal mehndi henna design for a Desi wedding in Warsaw",
      "Saree and dupatta draping by a Warsaw Desi salon",
      "Party HD makeup for wedding guests at a Desi salon Warsaw",
    ],
    ctaMessage: "Hello Royal Beauty Salon, I'd like to enquire about Desi bridal services in Warsaw.",
  },

  /* ─────────────────────────── Hijab-friendly salon ─────────────────────────── */
  {
    slug: "hijab-friendly-salon-warsaw",
    primaryKeyword: "Hijab-friendly salon Warsaw",
    secondaryKeywords: [
      "private women-only salon Warsaw",
      "modest salon Warsaw",
      "screened hair salon Warsaw",
    ],
    title: "Hijab-Friendly Salon in Warsaw — Private, Women-Only Beauty",
    metaDescription:
      "Hijab-friendly salon in Warsaw with private, screened, women-only treatment areas and female staff. Comfortable hair, keratin and skincare in a modest setting. Book privately.",
    h1: "Hijab-Friendly Salon in Warsaw",
    eyebrow: "Hijab-Friendly • Private",
    tagline:
      "A private, women-only space with female staff where you can relax and uncover with complete comfort.",
    heroImage: U("photo-1560066984-138dadb4c035"),
    heroAlt: "Private hijab-friendly women-only salon room in Warsaw",
    intro: [
      "For many women who wear hijab, a normal open-plan salon simply isn't comfortable. Royal Beauty Salon offers a genuinely hijab-friendly experience in Warsaw — with private, screened treatment areas, female staff and the discretion you need to relax and enjoy your appointment fully.",
      "You can remove your hijab in privacy, away from male eyes and walk-in view, while our female stylists and therapists take care of your hair, skin and grooming. It's the modest, respectful environment that lets you have keratin, colour, a fresh cut or a facial without compromise.",
      "We've built our space and booking around privacy and comfort, so observant Muslim women, and anyone who simply prefers a private women-only setting, can feel completely at ease in central Warsaw.",
    ],
    sections: [
      {
        heading: "Private, screened treatment areas",
        body: [
          "Our hair and skincare services for hijab-wearing clients are carried out in private, screened areas — not in an open salon floor visible from the street or to other clients. You decide your comfort level, and we make it happen.",
        ],
      },
      {
        heading: "Female stylists and therapists",
        body: [
          "Every treatment for our hijab-friendly clients is performed by female staff. From cutting and colour to keratin smoothing and facials, you're always in the care of women who understand and respect your needs.",
        ],
      },
      {
        heading: "Hair care designed for covered hair",
        body: [
          "Hair worn under a hijab has particular needs — friction, flattening and scalp sweat can all take a toll. We offer keratin and nanoplasty smoothing, nourishing hair spa and oil treatments, and healthy-hair cutting and colour to keep your hair strong and manageable.",
        ],
      },
      {
        heading: "Book with privacy in mind",
        body: [
          "Let us know your preferences when you book — a private slot, female-only staff, quieter times — and we'll arrange your appointment to match. Discretion is part of our service, not an afterthought.",
        ],
      },
    ],
    highlights: [
      { title: "Private & screened", desc: "Uncover comfortably, away from male and public view." },
      { title: "Female staff only", desc: "Women stylists and therapists for your treatments." },
      { title: "Modest environment", desc: "Respectful, discreet and welcoming." },
      { title: "Covered-hair care", desc: "Keratin, smoothing and scalp-healthy treatments." },
    ],
    faqs: [
      {
        q: "Is there a hijab-friendly salon in Warsaw?",
        a: "Yes. Royal Beauty Salon offers private, screened, women-only treatment areas with female staff so hijab-wearing clients can uncover and relax in complete comfort.",
      },
      {
        q: "Will my hair be done in private?",
        a: "Yes — for hijab-friendly bookings we use private, screened areas away from public view and male staff. Tell us your preferences when booking and we'll arrange it.",
      },
      {
        q: "Are the staff female?",
        a: "Treatments for our hijab-friendly clients are carried out by female stylists and therapists. Please mention this when booking so we can confirm availability.",
      },
      {
        q: "What services can I have in the private area?",
        a: "Haircuts, colour, keratin and nanoplasty smoothing, hair spa, oil treatments and facials can all be arranged privately. Just let us know what you'd like when you book.",
      },
    ],
    featuredServiceSlugs: [
      "royal-nanoplasty",
      "keratin-treatment-medium",
      "hair-spa-blow-dry",
      "royal-facial",
      "hair-oil-massage-steam",
      "hair-cutting-advanced",
    ],
    relatedNicheSlugs: [
      "women-only-hair-salon-warsaw",
      "muslim-women-hairdresser-warsaw",
      "keratin-nanoplasty-hijab-hair-warsaw",
    ],
    relatedCategorySlugs: ["hair", "facials"],
    serviceName: "Hijab-Friendly Salon Services in Warsaw",
    serviceDescription:
      "Private, women-only, hijab-friendly beauty services in Warsaw with female staff and screened treatment areas for hair, keratin and skincare.",
    imageAltRecommendations: [
      "Hijab-friendly private salon room in Warsaw",
      "Female stylist performing keratin treatment in a private Warsaw salon",
      "Women-only screened hair styling area in Warsaw",
      "Modest, private facial treatment room at a Warsaw salon",
    ],
    ctaMessage:
      "Hello Royal Beauty Salon, I'd like to book a private hijab-friendly appointment in Warsaw.",
  },

  /* ─────────────────────────── Women-only hair salon ─────────────────────────── */
  {
    slug: "women-only-hair-salon-warsaw",
    primaryKeyword: "Women-only hair salon Warsaw",
    secondaryKeywords: [
      "female-only hair salon Warsaw",
      "ladies hair salon Warsaw",
      "female hairdresser Warsaw",
    ],
    title: "Women-Only Hair Salon in Warsaw — Female Stylists",
    metaDescription:
      "Women-only hair salon in Warsaw with female stylists in a comfortable, private setting. Cuts, colour, keratin and styling for women who prefer a female-only space. Book now.",
    h1: "Women-Only Hair Salon in Warsaw",
    eyebrow: "Women-Only • Warsaw",
    tagline:
      "A comfortable, female-only hair salon with women stylists for cuts, colour, keratin and styling.",
    heroImage: U("photo-1522337660859-02fbefca4702"),
    heroAlt: "Female stylist colouring hair at a women-only salon in Warsaw",
    intro: [
      "Some women simply feel more comfortable in a female-only space — and that's exactly what Royal Beauty Salon offers in Warsaw. Our women-only hair services are delivered by skilled female stylists in a relaxed, private setting where you can be completely at ease.",
      "Whether you prefer a women-only environment for cultural, religious or personal reasons, you'll find expert hair care here without compromise — precision cuts, balayage and global colour, keratin smoothing, treatments and styling, all by women who take the time to understand exactly what you want.",
      "It's a calm, welcoming salon in central Warsaw where the focus is entirely on you, your hair and your comfort.",
    ],
    sections: [
      {
        heading: "Cuts and styling by female stylists",
        body: [
          "From a precision cut mapped to your face shape to blow-dries and event styling, our female stylists deliver polished, healthy-looking results in a comfortable women-only setting.",
        ],
      },
      {
        heading: "Colour, highlights and balayage",
        body: [
          "Refresh or transform your colour with our senior colourists — balayage, highlights, global colour and seamless grey coverage, always using low-ammonia, bond-protecting products to keep your hair healthy.",
        ],
      },
      {
        heading: "Keratin and smoothing treatments",
        body: [
          "Tame frizz and add shine with keratin, silk-botox or nanoplasty smoothing. These treatments make hair noticeably more manageable — a favourite for busy women and anyone with thick or unruly hair.",
        ],
      },
      {
        heading: "A private, comfortable environment",
        body: [
          "Our women-only setting means you can relax fully throughout your appointment. Let us know your preferences when booking and we'll make sure your visit is exactly as comfortable as you'd like.",
        ],
      },
    ],
    highlights: [
      { title: "Female stylists", desc: "All hair services by skilled women stylists." },
      { title: "Private & comfortable", desc: "A relaxed, female-only environment." },
      { title: "Full hair menu", desc: "Cuts, colour, keratin, treatments and styling." },
      { title: "Healthy-hair focus", desc: "Low-ammonia colour and bond protection." },
    ],
    faqs: [
      {
        q: "Is there a women-only hair salon in Warsaw?",
        a: "Yes. Royal Beauty Salon offers women-only hair services with female stylists in a private, comfortable setting in central Warsaw. Mention your preference when booking.",
      },
      {
        q: "Are all the hair stylists female?",
        a: "Our women-only hair services are performed by female stylists. Please let us know when booking so we can confirm a female stylist for your appointment.",
      },
      {
        q: "What hair services do you offer?",
        a: "Everything from cuts and blow-dries to colour, highlights, balayage, grey coverage, keratin and nanoplasty smoothing, hair spa and treatments.",
      },
      {
        q: "Can I request a private space?",
        a: "Yes — we can arrange a more private setting on request. Tell us your preferences when booking and we'll do our best to accommodate them.",
      },
    ],
    featuredServiceSlugs: [
      "hair-cutting-advanced",
      "fashion-shade-global-color",
      "hair-highlights-medium",
      "keratin-treatment-medium",
      "blow-dry",
      "hair-spa-blow-dry",
    ],
    relatedNicheSlugs: [
      "hijab-friendly-salon-warsaw",
      "muslim-women-hairdresser-warsaw",
      "keratin-nanoplasty-hijab-hair-warsaw",
    ],
    relatedCategorySlugs: ["hair"],
    serviceName: "Women-Only Hair Salon Services in Warsaw",
    serviceDescription:
      "Women-only hair salon services in Warsaw by female stylists — cuts, colour, highlights, balayage, keratin smoothing and styling in a private setting.",
    imageAltRecommendations: [
      "Women-only hair salon in Warsaw with female stylist",
      "Balayage and highlights by a female colourist in Warsaw",
      "Keratin smoothing at a female-only hair salon Warsaw",
      "Blow-dry and styling in a private women-only salon Warsaw",
    ],
    ctaMessage:
      "Hello Royal Beauty Salon, I'd like to book at your women-only hair salon in Warsaw with a female stylist.",
  },

  /* ─────────────────────────── Muslim women hairdresser ─────────────────────────── */
  {
    slug: "muslim-women-hairdresser-warsaw",
    primaryKeyword: "Muslim women hairdresser Warsaw",
    secondaryKeywords: [
      "Muslim hairdresser Warsaw",
      "private female hairdresser Warsaw",
      "modest hairdresser Warsaw",
    ],
    title: "Muslim Women Hairdresser in Warsaw — Private & Female",
    metaDescription:
      "Muslim women hairdresser in Warsaw offering private, female-only hair services with discretion and respect. Cuts, colour and keratin in a modest, screened setting. Book today.",
    h1: "Hairdresser for Muslim Women in Warsaw",
    eyebrow: "Muslim Women • Private",
    tagline:
      "Private, female hair services delivered with discretion and respect for your values.",
    heroImage: U("photo-1559599101-f09722fb4948"),
    heroAlt: "Female hairdresser styling hair privately for a Muslim client in Warsaw",
    intro: [
      "Finding a hairdresser in Warsaw who understands the needs of Muslim women can be difficult. Royal Beauty Salon offers private, female hair services delivered with genuine discretion and respect — so you can care for your hair without compromising your values.",
      "Your hair is cared for by female hairdressers in a private, screened space, away from male staff and public view. Whether you wear hijab or simply prefer a modest, female-only setting, you'll find a comfortable, welcoming experience in central Warsaw.",
      "From healthy cuts and colour to keratin smoothing designed for hair worn under a scarf, our team combines real skill with the privacy and understanding you deserve.",
    ],
    sections: [
      {
        heading: "Private, female-only hair service",
        body: [
          "Your appointment is carried out by a female hairdresser in a private, screened area. You set your comfort level — covered, uncovered, quieter times — and we arrange everything around it with full discretion.",
        ],
      },
      {
        heading: "Healthy cuts, colour and grey coverage",
        body: [
          "Enjoy precise cuts, low-ammonia colour, highlights and natural grey coverage that keep your hair healthy. Every service starts with a consultation so the result is exactly what you want.",
        ],
      },
      {
        heading: "Keratin and smoothing for covered hair",
        body: [
          "Hair worn under a scarf or hijab can become frizzy, flat or stressed. Our keratin and nanoplasty smoothing treatments restore softness, shine and manageability — ideal for everyday covered hair.",
        ],
      },
      {
        heading: "Respect and discretion as standard",
        body: [
          "We understand that privacy and modesty matter. From booking to checkout, we handle your visit with care, so you always feel respected and at ease.",
        ],
      },
    ],
    highlights: [
      { title: "Female hairdressers", desc: "Your hair cared for entirely by women." },
      { title: "Private & screened", desc: "Away from male staff and public view." },
      { title: "Modest & respectful", desc: "Your values understood and respected." },
      { title: "Covered-hair expertise", desc: "Keratin and care for hair worn under a scarf." },
    ],
    faqs: [
      {
        q: "Is there a hairdresser for Muslim women in Warsaw?",
        a: "Yes. Royal Beauty Salon provides private, female-only hair services for Muslim women in Warsaw, with female hairdressers and screened areas for full comfort and discretion.",
      },
      {
        q: "Will a woman do my hair?",
        a: "Yes — your hair will be cared for by a female hairdresser. Please mention this when booking so we can confirm a female stylist and a private space.",
      },
      {
        q: "Can my appointment be private?",
        a: "Absolutely. We offer private, screened areas away from male staff and public view. Let us know your preferences and we'll arrange your visit accordingly.",
      },
      {
        q: "Do you treat hair that's worn under a hijab?",
        a: "Yes — we specialise in keratin and nanoplasty smoothing and nourishing treatments that keep hair worn under a hijab healthy, smooth and manageable.",
      },
    ],
    featuredServiceSlugs: [
      "hair-cutting-advanced",
      "keratin-treatment-medium",
      "royal-nanoplasty",
      "hair-spa-blow-dry",
      "fashion-shade-global-color",
      "hair-oil-massage",
    ],
    relatedNicheSlugs: [
      "hijab-friendly-salon-warsaw",
      "women-only-hair-salon-warsaw",
      "keratin-nanoplasty-hijab-hair-warsaw",
    ],
    relatedCategorySlugs: ["hair"],
    serviceName: "Hairdressing for Muslim Women in Warsaw",
    serviceDescription:
      "Private, female-only hairdressing for Muslim women in Warsaw — cuts, colour, grey coverage and keratin smoothing delivered with discretion and respect.",
    imageAltRecommendations: [
      "Female hairdresser for Muslim women in a private Warsaw salon",
      "Private screened hair colour service in Warsaw",
      "Keratin treatment for hair worn under hijab in Warsaw",
      "Modest, women-only haircut in central Warsaw",
    ],
    ctaMessage:
      "Hello Royal Beauty Salon, I'd like to book a private female hairdresser appointment in Warsaw.",
  },

  /* ─────────────────────────── Keratin/Nanoplasty for hijab hair ─────────────────────────── */
  {
    slug: "keratin-nanoplasty-hijab-hair-warsaw",
    primaryKeyword: "Keratin and Nanoplasty for hijab hair Warsaw",
    secondaryKeywords: [
      "keratin for hijab hair Warsaw",
      "nanoplasty Warsaw",
      "smoothing treatment covered hair Warsaw",
    ],
    title: "Keratin & Nanoplasty for Hijab Hair in Warsaw",
    metaDescription:
      "Keratin and nanoplasty smoothing for hijab hair in Warsaw. Beat friction frizz, flattening and scalp sweat with private, female treatments for healthy, manageable covered hair.",
    h1: "Keratin & Nanoplasty for Hijab Hair in Warsaw",
    eyebrow: "Smoothing • Hijab Hair",
    tagline:
      "Smooth, manageable, healthy hair under your hijab — private, female smoothing treatments in Warsaw.",
    heroImage: U("photo-1560869713-7d0a29430803"),
    heroAlt: "Smooth, healthy hair after keratin treatment for hijab hair in Warsaw",
    intro: [
      "Wearing a hijab is wonderful for many reasons — but it can be tough on your hair. Constant friction, flattening at the roots, trapped heat and scalp sweat often leave covered hair frizzy, limp and harder to manage. Royal Beauty Salon offers keratin and nanoplasty smoothing in Warsaw designed specifically with hijab hair in mind.",
      "These treatments smooth the hair cuticle, lock out frizz and make your hair noticeably softer, shinier and easier to handle — so it looks and feels healthy every time you take your scarf off. Because hair under a hijab spends most of the day covered, a sleek, low-maintenance finish makes daily styling effortless.",
      "Every treatment is available as a private, female service for our hijab-wearing clients, so you can relax completely while we transform your hair.",
    ],
    sections: [
      {
        heading: "Why hijab hair needs special care",
        body: [
          "Fabric friction roughens the hair cuticle and causes frizz and breakage, while a covered scalp can trap heat and sweat. Over time this leaves hair flat at the roots, dry at the ends and prone to tangling. Smoothing treatments tackle exactly these problems.",
        ],
      },
      {
        heading: "Keratin smoothing for frizz-free, manageable hair",
        body: [
          "Our keratin treatments infuse the hair with smoothing proteins that seal the cuticle, cut down frizz and make hair far easier to manage. The result lasts for months and is ideal for hair that's covered most of the day.",
        ],
      },
      {
        heading: "Nanoplasty — a gentler, long-lasting alternative",
        body: [
          "Nanoplasty is an advanced, low-formaldehyde smoothing treatment that delivers silky, frizz-free results while being kinder to the hair and scalp. It's a great option if you want long-lasting smoothness with a gentler formula.",
        ],
      },
      {
        heading: "Private, female treatment and aftercare",
        body: [
          "We perform these treatments privately with female staff for hijab-wearing clients. We'll also guide you on aftercare — a sulphate-free routine and letting hair breathe when possible — so your results last as long as possible.",
        ],
      },
    ],
    highlights: [
      { title: "Beats friction frizz", desc: "Smooths the cuticle roughened by your scarf." },
      { title: "Months of results", desc: "Long-lasting smoothness, easy daily styling." },
      { title: "Gentle nanoplasty option", desc: "Low-formaldehyde, scalp-friendly smoothing." },
      { title: "Private & female", desc: "Carried out privately by female staff." },
    ],
    faqs: [
      {
        q: "Is keratin good for hair worn under a hijab?",
        a: "Yes. Keratin smoothing seals the cuticle, reduces the friction frizz caused by your scarf and makes hair much easier to manage — ideal for hair that's covered most of the day.",
      },
      {
        q: "What's the difference between keratin and nanoplasty?",
        a: "Both smooth and de-frizz hair. Nanoplasty is a newer, low-formaldehyde treatment that's gentler on the hair and scalp while still long-lasting, making it a great option for sensitive scalps.",
      },
      {
        q: "How long do the results last?",
        a: "With good aftercare — a sulphate-free shampoo and letting your hair breathe when you can — keratin and nanoplasty results typically last three to five months.",
      },
      {
        q: "Can I have the treatment privately with a female stylist?",
        a: "Yes. For hijab-wearing clients we offer these smoothing treatments privately with female staff. Please mention this when booking.",
      },
    ],
    featuredServiceSlugs: [
      "royal-nanoplasty",
      "keratin-treatment-medium",
      "keratin-treatment-long",
      "silk-botox-smoothing-medium",
      "hair-spa-blow-dry",
      "hair-oil-massage-steam",
    ],
    relatedNicheSlugs: [
      "hijab-friendly-salon-warsaw",
      "muslim-women-hairdresser-warsaw",
      "women-only-hair-salon-warsaw",
    ],
    relatedCategorySlugs: ["hair"],
    serviceName: "Keratin & Nanoplasty for Hijab Hair in Warsaw",
    serviceDescription:
      "Keratin and nanoplasty smoothing treatments in Warsaw tailored for hijab hair — reducing friction frizz and flattening for smooth, healthy, manageable covered hair, in a private female setting.",
    imageAltRecommendations: [
      "Smooth healthy hair after keratin treatment for hijab hair Warsaw",
      "Nanoplasty smoothing treatment being applied in a private Warsaw salon",
      "Before and after keratin for frizzy hijab hair in Warsaw",
      "Female stylist performing hair smoothing for a hijab client Warsaw",
    ],
    ctaMessage:
      "Hello Royal Beauty Salon, I'd like to book keratin/nanoplasty for hijab hair in Warsaw.",
  },

  /* ─────────────────────────── Polish-language hub ─────────────────────────── */
  {
    slug: "salon-kosmetyczny-warszawa",
    locale: "pl",
    primaryKeyword: "salon kosmetyczny Warszawa",
    secondaryKeywords: [
      "salon fryzjerski Warszawa",
      "fryzjer damski Warszawa",
      "indyjski salon Warszawa",
      "salon dla kobiet Warszawa",
      "salon przyjazny muzułmankom Warszawa",
    ],
    title: "Salon Kosmetyczny i Fryzjerski w Warszawie",
    metaDescription:
      "Salon kosmetyczny i fryzjerski w centrum Warszawy — depilacja nitką, koloryzacja, keratynowe prostowanie, nanoplastia, manicure, pedicure i makijaż ślubny. Umów wizytę w Royal Beauty Salon.",
    h1: "Salon Kosmetyczny i Fryzjerski w Warszawie",
    eyebrow: "Salon Kosmetyczny • Warszawa",
    tagline:
      "Depilacja nitką, koloryzacja włosów, nanoplastia i makijaż ślubny — wszystko w jednym miejscu na ul. Mokotowskiej.",
    heroImage: U("photo-1522337360788-8b13dee7a37e"),
    heroAlt: "Wnętrze salonu kosmetycznego i fryzjerskiego w Warszawie",
    intro: [
      "Royal Beauty Salon to salon kosmetyczny i fryzjerski w samym centrum Warszawy, na ul. Mokotowskiej. Łączymy tradycyjne, azjatyckie techniki pielęgnacji urody — takie jak depilacja nitką — z nowoczesnymi zabiegami fryzjerskimi: koloryzacją, keratynowym prostowaniem włosów i nanoplastią.",
      "Nasz zespół tworzą doświadczeni specjaliści, w tym fryzjerki damskie i kosmetyczki, które doskonale znają zarówno klasyczne europejskie techniki, jak i azjatyckie metody pielęgnacji urody — w tym depilację i regulację brwi metodą nitki, henna brwi oraz tradycyjne zabiegi z olejkami do włosów.",
      "Jako indyjski salon w Warszawie z otwartym sercem dla wszystkich, jesteśmy również salonem przyjaznym kobietom i muzułmankom — oferujemy prywatną, komfortową atmosferę oraz żeński personel dla klientek, które tego potrzebują.",
    ],
    sections: [
      {
        heading: "Depilacja i regulacja brwi metodą nitki",
        body: [
          "Depilacja twarzy nitką (threading) to precyzyjna, delikatna metoda usuwania niechcianego owłosienia — idealna do regulacji brwi, depilacji wąsika i całej twarzy. W przeciwieństwie do wosku, nitka usuwa włoski dokładnie od cebulki, bez podrażniania skóry.",
          "Oferujemy również henna brwi — naturalne barwienie brwi, które podkreśla ich kształt i intensywność koloru na kilka tygodni.",
        ],
      },
      {
        heading: "Fryzjer damski: koloryzacja, keratyna i nanoplastia",
        body: [
          "Nasi fryzjerzy damscy specjalizują się w koloryzacji włosów — od pełnej zmiany koloru po delikatne rozjaśnienia — a także w zabiegach wygładzających: keratynowym prostowaniu włosów i nanoplastii, które redukują puszenie się włosów i przywracają im gładkość na miesiące.",
          "Każda wizyta zaczyna się od konsultacji, podczas której oceniamy kondycję Twoich włosów i dobieramy zabieg dopasowany do Twoich potrzeb.",
        ],
      },
      {
        heading: "Manicure, pedicure i makijaż ślubny",
        body: [
          "Zadbaj o dłonie i stopy w naszym salonie manicure i pedicure w Warszawie — precyzyjne opracowanie, pielęgnacja skórek i trwały lakier w higienicznych warunkach.",
          "Dla Panny Młodej oferujemy profesjonalny makijaż ślubny, stylizację fryzury oraz — w ramach naszej indyjskiej specjalizacji — tradycyjną henna na dłonie i stopy (mehndi) na wesele.",
        ],
      },
      {
        heading: "Salon dla kobiet i przyjazny muzułmankom",
        body: [
          "Rozumiemy, że wiele klientek szuka salonu, w którym mogą czuć się w pełni komfortowo — dlatego jesteśmy salonem przyjaznym muzułmankom, oferującym prywatną atmosferę i zabiegi wykonywane wyłącznie przez kobiecy personel na życzenie.",
        ],
      },
    ],
    highlights: [
      { title: "Depilacja nitką", desc: "Precyzyjna regulacja brwi i depilacja twarzy." },
      { title: "Koloryzacja i nanoplastia", desc: "Pełna pielęgnacja i stylizacja włosów." },
      { title: "Manicure i pedicure", desc: "Higieniczna, relaksująca pielęgnacja dłoni i stóp." },
      { title: "Salon dla kobiet", desc: "Prywatna atmosfera, żeński personel na życzenie." },
    ],
    faqs: [
      {
        q: "Czy wykonujecie depilację brwi metodą nitki?",
        a: "Tak — regulacja i depilacja brwi nitką to jedna z naszych specjalności. Wykonujemy również henna brwi oraz pełną depilację twarzy nitką.",
      },
      {
        q: "Czym różni się keratynowe prostowanie od nanoplastii?",
        a: "Oba zabiegi wygładzają i redukują puszenie się włosów, ale nanoplastia jest łagodniejsza dla włosów (nie zawiera formaldehydu) i często polecana przy delikatniejszych włosach. Nasz stylista doradzi, który zabieg będzie odpowiedni dla Twoich włosów.",
      },
      {
        q: "Czy oferujecie makijaż ślubny i henna na wesele?",
        a: "Tak — nasi artyści wykonują profesjonalny makijaż ślubny oraz tradycyjną henna (mehndi) na dłonie i stopy, idealną na wesela i uroczystości.",
      },
      {
        q: "Czy salon jest przyjazny kobietom noszącym hidżab?",
        a: "Tak, jesteśmy salonem przyjaznym muzułmankom — oferujemy prywatną, komfortową przestrzeń oraz zabiegi wykonywane przez kobiecy personel na życzenie.",
      },
      {
        q: "Gdzie znajduje się salon?",
        a: "Znajdujemy się na ul. Mokotowskiej 12 w centrum Warszawy (Śródmieście), z łatwym dojazdem komunikacją miejską.",
      },
    ],
    featuredServiceSlugs: [
      "eyebrow-threading",
      "royal-nanoplasty",
      "keratin-treatment-medium",
      "fashion-shade-global-color",
      "manicure",
      "pedicure",
      "bridal-makeup",
      "bridal-mehndi-hands-feet",
    ],
    relatedNicheSlugs: [
      "indian-salon-warsaw",
      "hijab-friendly-salon-warsaw",
      "women-only-hair-salon-warsaw",
    ],
    relatedCategorySlugs: ["hair", "threading", "nails"],
    serviceName: "Salon Kosmetyczny i Fryzjerski w Warszawie",
    serviceDescription:
      "Kompleksowy salon kosmetyczny i fryzjerski w centrum Warszawy — depilacja nitką, koloryzacja, keratynowe prostowanie, nanoplastia, manicure, pedicure oraz makijaż ślubny.",
    imageAltRecommendations: [
      "Zabieg depilacji brwi nitką w salonie w Warszawie",
      "Koloryzacja włosów w salonie fryzjerskim w Warszawie",
      "Manicure i pedicure w salonie kosmetycznym Warszawa",
      "Makijaż ślubny wykonywany w warszawskim salonie",
    ],
    ctaMessage: "Dzień dobry, chciałabym umówić wizytę w Royal Beauty Salon w Warszawie.",
  },
];

export const nicheBySlug = (slug: string) =>
  nichePages.find((p) => p.slug === slug);

/** Resolve featured service slugs → Service objects. */
export function nicheFeaturedServices(page: NichePage): Service[] {
  return page.featuredServiceSlugs
    .map((slug) => allServices.find((s) => s.slug === slug))
    .filter((s): s is Service => Boolean(s));
}
