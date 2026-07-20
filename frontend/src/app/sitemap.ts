import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import {
  categories,
  localPages,
  blogPosts,
  findServiceBySlug,
} from "@/data/seo-data";
import { nichePages } from "@/data/niche-seo";
import { getBackendServices } from "@/lib/backend-api";

export const revalidate = 300;

/**
 * lastmod for hand-authored static content (categories, warsaw sub-pages,
 * niche landing pages, core pages) — the real git commit date each source
 * file was last edited, not build/request time. Google explicitly ignores
 * lastmod values that look fake (e.g. every URL sharing "now" on every
 * crawl), so these are deliberately per-file, fixed dates rather than
 * `new Date()`. Update the relevant constant when you actually edit that
 * file's content — `git log -1 --format=%aI -- <file>` gives the value.
 */
const SEO_DATA_UPDATED = new Date("2026-07-08T12:37:41-07:00"); // seo-data.ts (categories, localPages, blogPosts fallback)
const NICHE_DATA_UPDATED = new Date("2026-07-08T12:37:41-07:00"); // niche-seo.ts
const HOMEPAGE_UPDATED = new Date("2026-07-08T14:52:35-07:00"); // page.tsx (homepage)
const ABOUT_UPDATED = new Date("2026-07-08T12:37:41-07:00");
const SERVICES_PAGE_UPDATED = new Date("2026-07-08T14:52:35-07:00");
const PACKAGES_UPDATED = new Date("2026-07-08T14:52:35-07:00");
const CONTACT_UPDATED = new Date("2026-07-08T12:37:41-07:00");
const WARSAW_HUB_UPDATED = new Date("2026-07-08T14:52:35-07:00");
const BLOG_INDEX_UPDATED = new Date("2026-07-08T12:37:41-07:00");
const LEGAL_UPDATED = new Date("2026-07-08T12:37:41-07:00");

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastModified: Date;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const allServices = await getBackendServices();

  const entries: Entry[] = [
    // Core pages
    { path: "", priority: 1, changeFrequency: "weekly", lastModified: HOMEPAGE_UPDATED },
    { path: "about", priority: 0.7, changeFrequency: "monthly", lastModified: ABOUT_UPDATED },
    { path: "services", priority: 0.9, changeFrequency: "weekly", lastModified: SERVICES_PAGE_UPDATED },
    { path: "packages", priority: 0.8, changeFrequency: "monthly", lastModified: PACKAGES_UPDATED },
    { path: "contact", priority: 0.7, changeFrequency: "monthly", lastModified: CONTACT_UPDATED },

    // Local SEO hub
    { path: "warsaw", priority: 0.9, changeFrequency: "weekly", lastModified: WARSAW_HUB_UPDATED },

    // Blog index
    { path: "blog", priority: 0.7, changeFrequency: "weekly", lastModified: BLOG_INDEX_UPDATED },

    // Legal (low priority but indexable)
    { path: "privacy", priority: 0.2, changeFrequency: "yearly", lastModified: LEGAL_UPDATED },
    { path: "terms", priority: 0.2, changeFrequency: "yearly", lastModified: LEGAL_UPDATED },
  ];

  // Category landing pages
  for (const c of categories) {
    entries.push({
      path: `services/${c.slug}`,
      priority: 0.8,
      changeFrequency: "weekly",
      lastModified: SEO_DATA_UPDATED,
    });
  }

  // Individual service pages — real per-service lastmod from Mongo.
  for (const s of allServices) {
    const found = findServiceBySlug(allServices, s.slug);
    if (!found) continue;
    entries.push({
      path: `services/${found.categorySlug}/${s.slug}`,
      priority: 0.7,
      changeFrequency: "monthly",
      lastModified: s.updatedAt ? new Date(s.updatedAt) : SEO_DATA_UPDATED,
    });
  }

  // Warsaw local sub-pages (excluding the "warsaw" hub already added above)
  for (const p of localPages) {
    if (p.slug === "warsaw") continue;
    entries.push({
      path: `warsaw/${p.slug}`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: SEO_DATA_UPDATED,
    });
  }

  // Niche local-SEO landing pages (high-intent money pages)
  for (const p of nichePages) {
    entries.push({
      path: p.slug,
      priority: 0.85,
      changeFrequency: "weekly",
      lastModified: NICHE_DATA_UPDATED,
    });
  }

  // Blog posts — each post already carries its own real publish date.
  for (const post of blogPosts) {
    entries.push({
      path: `blog/${post.slug}`,
      priority: 0.6,
      changeFrequency: "monthly",
      lastModified: new Date(post.date),
    });
  }

  return entries.map((e) => ({
    url: e.path ? `${base}/${e.path}` : base,
    lastModified: e.lastModified,
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));
}
