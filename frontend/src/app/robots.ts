import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/**
 * AI / LLM crawlers we deliberately welcome. Being crawlable by these agents
 * is the on-site half of Generative Engine Optimization (GEO) — it lets the
 * salon appear in and be cited by ChatGPT, Gemini, Claude, Perplexity, Copilot
 * and similar answer engines. Blocking them would remove the business from
 * those answers entirely.
 */
const AI_CRAWLERS = [
  "GPTBot", // OpenAI training
  "OAI-SearchBot", // OpenAI search / ChatGPT search index
  "ChatGPT-User", // ChatGPT browsing on a user's behalf
  "ClaudeBot", // Anthropic
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot", // Perplexity index
  "Perplexity-User", // Perplexity on a user's behalf
  "Google-Extended", // Gemini / Vertex AI grounding
  "Applebot-Extended", // Apple Intelligence
  "CCBot", // Common Crawl (feeds many LLMs)
  "cohere-ai",
  "meta-externalagent", // Meta AI
  "Amazonbot",
  "Bytespider",
  "YouBot",
  "DuckAssistBot",
  "ImagesiftBot",
  "Diffbot",
  "Timpibot",
];

export default function robots(): MetadataRoute.Robots {
  // Keep private/non-content routes out of every index.
  const disallow = ["/admin", "/admin/", "/api/", "/_next/"];
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      {
        // Same rules for AI agents, but listed explicitly so AI answer engines
        // can see (and trust) that they are allowed to index and cite the site.
        userAgent: AI_CRAWLERS,
        allow: "/",
        disallow,
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
