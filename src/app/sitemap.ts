import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();
  const routes = ["", "about", "services", "packages", "contact", "#bridal", "#gallery"];
  return routes.map((r) => ({
    url: `${base}/${r}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: r === "" ? 1 : 0.8,
  }));
}
