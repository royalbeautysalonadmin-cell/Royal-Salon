import "server-only";
import { siteConfig } from "./site";
import { faqs } from "@/data/content";
import { categories, localPages, blogPosts } from "@/data/seo-data";
import { nichePages } from "@/data/niche-seo";
import { getBackendServices } from "./backend-api";
import type { Service } from "@/types";

/**
 * Builders for the /llms.txt and /llms-full.txt files (https://llmstxt.org).
 * These give answer engines a clean, machine-readable map of the salon and
 * its content so it can be retrieved and cited accurately in AI responses —
 * the on-site half of Generative Engine Optimization (GEO).
 */

const url = (path = "") => `${siteConfig.url}${path}`;
const localPath = (slug: string) => (slug === "warsaw" ? "/warsaw" : `/warsaw/${slug}`);

const SUMMARY =
  `${siteConfig.name} is a luxury, women-focused beauty salon and bridal studio in Warsaw, Poland ` +
  `(Mokotów / Praga-Południe, Aleja Stanów Zjednoczonych 67/D7). It offers bridal makeup, hair ` +
  `colouring and keratin smoothing, facials and skincare, eyebrow threading and brows, waxing, ` +
  `manicure and pedicure, and specialty services for South-Asian, Muslim and hijab-wearing women.`;

function facts(): string[] {
  return [
    `Full name: ${siteConfig.name} (${siteConfig.shortName})`,
    `Address: ${siteConfig.address.full}`,
    `Phone / WhatsApp: ${siteConfig.phone}`,
    `Email: ${siteConfig.email}`,
    `Opening hours: Monday and Wednesday–Sunday 11:00–18:00 (closed Tuesdays)`,
    `Languages: English, Polish (staff also speak Hindi and Urdu)`,
    `Booking: online, by phone or WhatsApp`,
    `Price range: luxury ($$$), prices in PLN`,
    `Google rating: 5.0 from 2,000+ reviews (google.com/maps search: Royal Beauty Salon Warsaw)`,
  ];
}

/** Concise index following the llms.txt convention. */
export function buildLlmsTxt(): string {
  const out: string[] = [];
  out.push(`# ${siteConfig.name}`);
  out.push("");
  out.push(`> ${SUMMARY}`);
  out.push("");
  out.push("Key facts:");
  for (const f of facts()) out.push(`- ${f}`);
  out.push("");

  out.push("## Core pages");
  const core: [string, string][] = [
    ["Home", "/"],
    ["About", "/about"],
    ["Services", "/services"],
    ["Our work", "/our-work"],
    ["Blog", "/blog"],
    ["Free beauty tools", "/tools"],
    ["Contact & booking", "/contact"],
    ["Warsaw beauty salon hub", "/warsaw"],
  ];
  for (const [label, path] of core) out.push(`- [${label}](${url(path)})`);
  out.push("");

  out.push("## Services");
  out.push("Categories — each page lists individual treatments with prices in PLN:");
  for (const c of categories) out.push(`- [${c.label}](${url(`/services/${c.slug}`)}): ${c.tagline}`);
  out.push("");

  out.push("## Warsaw & neighbourhood guides");
  for (const p of localPages) out.push(`- [${p.heading}](${url(localPath(p.slug))}): ${p.tagline}`);
  out.push("");

  out.push("## Specialty & audience landing pages");
  for (const p of nichePages) out.push(`- [${p.h1}](${url(`/${p.slug}`)}): ${p.tagline}`);
  out.push("");

  out.push("## Blog");
  for (const b of blogPosts) out.push(`- [${b.title}](${url(`/blog/${b.slug}`)}): ${b.metaDescription}`);
  out.push("");

  out.push("## Optional");
  out.push(`- [Privacy policy](${url("/privacy")})`);
  out.push(`- [Terms of service](${url("/terms")})`);
  out.push("");
  return out.join("\n");
}

function serviceMenu(services: Service[]): string {
  const out: string[] = [];
  for (const c of categories) {
    const items = services.filter((s) => s.category === c.category);
    if (!items.length) continue;
    out.push(`### ${c.label} — ${url(`/services/${c.slug}`)}`);
    for (const s of items) {
      const price = s.priceOnRequest ? "price on request" : `${s.price} PLN`;
      const duration = s.duration ? ` (${s.duration})` : "";
      const desc = s.description ? ` ${s.description}` : "";
      out.push(`- ${s.name} — ${price}${duration}.${desc}`);
    }
    out.push("");
  }
  return out.join("\n");
}

/** Full-content reference for /llms-full.txt. Degrades gracefully if the
 *  backend catalog is unreachable (e.g. during an offline build). */
export async function buildLlmsFullTxt(): Promise<string> {
  let services: Service[] = [];
  try {
    services = await getBackendServices();
  } catch {
    services = [];
  }

  const out: string[] = [];
  out.push(`# ${siteConfig.name} — full reference`);
  out.push("");
  out.push(`> ${SUMMARY}`);
  out.push("");
  for (const f of facts()) out.push(`- ${f}`);
  out.push("");

  if (services.length) {
    out.push("## Full service menu and prices");
    out.push("");
    out.push(serviceMenu(services));
  }

  out.push("## Service categories in detail");
  out.push("");
  for (const c of categories) {
    out.push(`### ${c.heading}`);
    out.push(`URL: ${url(`/services/${c.slug}`)}`);
    out.push(`Keywords: ${c.keywords.join(", ")}`);
    out.push("");
    for (const p of c.intro) {
      out.push(p);
      out.push("");
    }
    out.push(`Benefits: ${c.benefits.join("; ")}.`);
    out.push("");
    for (const f of c.faqs) {
      out.push(`Q: ${f.q}`);
      out.push(`A: ${f.a}`);
      out.push("");
    }
  }

  out.push("## Warsaw & neighbourhood guides");
  out.push("");
  for (const p of localPages) {
    out.push(`### ${p.heading}`);
    out.push(`URL: ${url(localPath(p.slug))}`);
    out.push("");
    for (const para of p.intro) {
      out.push(para);
      out.push("");
    }
    for (const f of p.faqs) {
      out.push(`Q: ${f.q}`);
      out.push(`A: ${f.a}`);
      out.push("");
    }
  }

  out.push("## Specialty & audience landing pages");
  out.push("");
  for (const p of nichePages) {
    out.push(`### ${p.h1}`);
    out.push(`URL: ${url(`/${p.slug}`)}`);
    out.push(`Primary keyword: ${p.primaryKeyword}`);
    out.push("");
    for (const para of p.intro) {
      out.push(para);
      out.push("");
    }
    for (const s of p.sections) {
      out.push(`#### ${s.heading}`);
      out.push("");
      for (const para of s.body) {
        out.push(para);
        out.push("");
      }
    }
    for (const f of p.faqs) {
      out.push(`Q: ${f.q}`);
      out.push(`A: ${f.a}`);
      out.push("");
    }
  }

  out.push("## Blog articles");
  out.push("");
  for (const b of blogPosts) {
    out.push(`### ${b.title}`);
    out.push(`URL: ${url(`/blog/${b.slug}`)}`);
    out.push(`Category: ${b.category} | Published: ${b.date} | ${b.readMinutes} min read`);
    out.push("");
    out.push(b.metaDescription);
    out.push("");
    for (const para of b.intro) {
      out.push(para);
      out.push("");
    }
    for (const f of b.faqs) {
      out.push(`Q: ${f.q}`);
      out.push(`A: ${f.a}`);
      out.push("");
    }
  }

  out.push("## Frequently asked questions");
  out.push("");
  for (const f of faqs) {
    out.push(`Q: ${f.q}`);
    out.push(`A: ${f.a}`);
    out.push("");
  }

  return out.join("\n");
}
