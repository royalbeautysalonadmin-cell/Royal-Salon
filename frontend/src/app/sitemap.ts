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

export const revalidate = 86400;

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastModified?: Date;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();
  const allServices = await getBackendServices();

  const entries: Entry[] = [
    // Core pages
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "about", priority: 0.7, changeFrequency: "monthly" },
    { path: "services", priority: 0.9, changeFrequency: "weekly" },
    { path: "packages", priority: 0.8, changeFrequency: "monthly" },
    { path: "contact", priority: 0.7, changeFrequency: "monthly" },

    // Local SEO hub
    { path: "warsaw", priority: 0.9, changeFrequency: "weekly" },

    // Blog index
    { path: "blog", priority: 0.7, changeFrequency: "weekly" },

    // Legal (low priority but indexable)
    { path: "privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "terms", priority: 0.2, changeFrequency: "yearly" },
  ];

  // Category landing pages
  for (const c of categories) {
    entries.push({
      path: `services/${c.slug}`,
      priority: 0.8,
      changeFrequency: "weekly",
    });
  }

  // Individual service pages
  for (const s of allServices) {
    const found = findServiceBySlug(allServices, s.slug);
    if (!found) continue;
    entries.push({
      path: `services/${found.categorySlug}/${s.slug}`,
      priority: 0.7,
      changeFrequency: "monthly",
    });
  }

  // Warsaw local sub-pages (excluding the "warsaw" hub already added above)
  for (const p of localPages) {
    if (p.slug === "warsaw") continue;
    entries.push({
      path: `warsaw/${p.slug}`,
      priority: 0.8,
      changeFrequency: "monthly",
    });
  }

  // Niche local-SEO landing pages (high-intent money pages)
  for (const p of nichePages) {
    entries.push({
      path: p.slug,
      priority: 0.85,
      changeFrequency: "weekly",
    });
  }

  // Blog posts
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
    lastModified: e.lastModified ?? now,
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));
}
