import { siteConfig } from "./site";
import { faqs } from "@/data/content";
import type { Service } from "@/types";

/** Warsaw districts the salon serves — helps answer engines ground local intent. */
const AREA_SERVED = [
  "Warsaw",
  "Mokotów",
  "Praga-Południe",
  "Śródmieście",
  "Wilanów",
  "Ursynów",
  "Wawer",
  "Ochota",
  "Targówek",
  "Białołęka",
];

/** Topics the salon is an authority on — feeds LLM entity/knowledge grounding. */
const KNOWS_ABOUT = [
  "Bridal makeup",
  "Hair colouring, balayage and highlights",
  "Keratin, silk-botox and nanoplasty hair smoothing",
  "HydraFacial and advanced skincare",
  "Eyebrow threading, lamination and henna",
  "Waxing and laser hair removal",
  "Manicure, pedicure and hybrid nails",
  "Hijab-friendly, women-only and Muslim women's hair services",
  "Beauty academy training courses",
];

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${siteConfig.address.mapsQuery}`;

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["BeautySalon", "LocalBusiness"],
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    url: siteConfig.url,
    image: [`${siteConfig.url}${siteConfig.ogImage}`],
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}${siteConfig.ogImage}`,
    },
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "$$$",
    currenciesAccepted: "PLN",
    paymentAccepted: "Cash, Credit Card, Debit Card, BLIK",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.line1,
      addressLocality: "Warsaw",
      addressRegion: "Masovia",
      postalCode: "04-028",
      addressCountry: "PL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.address.lat,
      longitude: siteConfig.address.lng,
    },
    hasMap: MAPS_URL,
    areaServed: AREA_SERVED.map((name) => ({ "@type": "City", name })),
    knowsAbout: KNOWS_ABOUT,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "11:00",
        closes: "18:00",
      },
    ],
    sameAs: [...Object.values(siteConfig.socials), MAPS_URL],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        email: siteConfig.email,
        contactType: "customer service",
        areaServed: "PL",
        availableLanguage: ["en", "pl", "hi", "ur"],
      },
    ],
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/contact`,
        inLanguage: "en",
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      result: {
        "@type": "Reservation",
        name: "Beauty appointment at Royal Beauty Salon Warsaw",
      },
    },
    // Verified Google Business Profile rating (5.0 from 2,000+ reviews).
    // This is third-party review data, not reviews the site itself collected,
    // which is what Google's structured-data policy requires for aggregateRating.
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "2000",
      bestRating: 5,
    },
  };
}

/** WebSite entity that ties the site to the organization — grounding signal. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: ["en-GB", "pl-PL"],
  };
}

export function servicesJsonLd(services: Service[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.name,
        description: s.description,
        provider: { "@id": `${siteConfig.url}/#organization` },
        offers: {
          "@type": "Offer",
          price: s.price,
          priceCurrency: "PLN",
        },
      },
    })),
  };
}

export function faqJsonLd(items?: { q: string; a: string }[]) {
  const list = items ?? faqs;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: list.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Structured data for a single service / treatment page. */
export function serviceDetailJsonLd(service: Service, canonicalPath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    serviceType: service.category,
    url: `${siteConfig.url}${canonicalPath}`,
    image: service.image,
    areaServed: { "@type": "City", name: "Warsaw" },
    provider: { "@id": `${siteConfig.url}/#organization` },
    offers: {
      "@type": "Offer",
      price: service.price,
      priceCurrency: "PLN",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}${canonicalPath}`,
    },
  };
}

/** Breadcrumb structured data. Pass ordered [name, path] pairs. */
export function breadcrumbJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${siteConfig.url}${c.path}`,
    })),
  };
}

/** Article / blog post structured data. */
export function articleJsonLd(post: {
  title: string;
  description: string;
  slug: string;
  image: string;
  date: string;
}) {
  const url = `${siteConfig.url}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${siteConfig.ogImage}`,
      },
    },
  };
}

/**
 * Generic Service structured data for landing pages that promote a themed
 * service (e.g. "Keratin for hijab hair") rather than a single menu item.
 */
export function genericServiceJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType ?? opts.name,
    url: `${siteConfig.url}${opts.path}`,
    areaServed: { "@type": "City", name: "Warsaw" },
    provider: { "@id": `${siteConfig.url}/#organization` },
  };
}

/** ItemList structured data for a category landing page. */
export function categoryItemListJsonLd(
  services: Service[],
  categoryName: string,
  pathFor: (s: Service) => string
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${categoryName} services in Warsaw`,
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      url: `${siteConfig.url}${pathFor(s)}`,
    })),
  };
}

/** HowTo structured data for step-by-step treatment guides. */
export function howToJsonLd(opts: { name: string; description: string; steps: { name: string; text: string }[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}
