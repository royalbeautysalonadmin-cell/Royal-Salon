import "server-only";
import { z } from "zod";
import { SERVICE_CATEGORIES } from "@/lib/validation";
import type { Service } from "@/types";

const BACKEND_URL = process.env.BACKEND_URL;
// Tripwire, not a business rule — bump as the catalog genuinely grows.
const MIN_EXPECTED_SERVICES = 60;

const rawServiceSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  category: z.enum(SERVICE_CATEGORIES),
  description: z.string().default(""),
  price: z.number(),
  duration: z.string().default(""),
  image: z.string().default(""),
  featured: z.boolean().optional(),
  active: z.boolean().optional(),
  originalPrice: z.number().optional(),
  priceOnRequest: z.boolean().optional(),
  variant: z.string().optional(),
});
const responseSchema = z.object({ services: z.array(rawServiceSchema) });

async function fetchWithRetry(url: string, attempts = 3): Promise<Response> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fetch(url, { cache: "force-cache", signal: AbortSignal.timeout(20_000) });
    } catch (err) {
      lastErr = err;
      if (i < attempts - 1) await new Promise((r) => setTimeout(r, 2000 * 2 ** i));
    }
  }
  throw lastErr;
}

/**
 * Fetches the full active+inactive service catalog from the backend at
 * build/revalidate time. Fails loud on purpose: a truncated or empty
 * catalog must never silently ship, since it would deindex 75+ live,
 * already-ranking SEO pages. See the plan notes on why there is
 * deliberately no local static fallback here.
 */
export async function getBackendServices(): Promise<Service[]> {
  if (!BACKEND_URL) throw new Error("BACKEND_URL is not set — cannot build service pages.");
  const res = await fetchWithRetry(`${BACKEND_URL}/api/services`);
  if (!res.ok) throw new Error(`Backend returned ${res.status} for /api/services — refusing to build.`);
  const parsed = responseSchema.safeParse(await res.json());
  if (!parsed.success) {
    throw new Error(`Backend /api/services failed validation: ${JSON.stringify(parsed.error.flatten())}`);
  }
  const services = parsed.data.services as Service[];
  if (services.length < MIN_EXPECTED_SERVICES) {
    throw new Error(
      `Only ${services.length} services returned (expected >= ${MIN_EXPECTED_SERVICES}) — looks like a truncated response, failing the build.`
    );
  }
  const missing = SERVICE_CATEGORIES.filter((c) => !services.some((s) => s.category === c));
  if (missing.length) {
    throw new Error(`No services returned for: ${missing.join(", ")} — partial response, failing the build.`);
  }
  // Only publicly bookable services render on SEO/site pages — the tripwire
  // checks above ran against the full response so a legitimately disabled
  // service doesn't look like a truncated one.
  return services.filter((s) => s.active !== false);
}
