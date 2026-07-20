import { siteConfig } from "./site";
import { faqs } from "@/data/content";
import type { Service } from "@/types";

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: siteConfig.name,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    "@id": `${siteConfig.url}/#organization`,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "$$$",
    currenciesAccepted: "PLN",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.line1,
      addressLocality: "Warsaw",
      postalCode: "00-561",
      addressCountry: "PL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.address.lat,
      longitude: siteConfig.address.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "10:00",
        closes: "18:00",
      },
    ],
    sameAs: Object.values(siteConfig.socials),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1280",
    },
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
        provider: { "@type": "BeautySalon", name: siteConfig.name },
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
    provider: {
      "@type": "BeautySalon",
      name: siteConfig.name,
      image: `${siteConfig.url}${siteConfig.ogImage}`,
      telephone: siteConfig.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.line1,
        addressLocality: "Warsaw",
        postalCode: "00-561",
        addressCountry: "PL",
      },
    },
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
    provider: {
      "@type": "BeautySalon",
      name: siteConfig.name,
      image: `${siteConfig.url}${siteConfig.ogImage}`,
      telephone: siteConfig.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.line1,
        addressLocality: "Warsaw",
        postalCode: "00-561",
        addressCountry: "PL",
      },
    },
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
