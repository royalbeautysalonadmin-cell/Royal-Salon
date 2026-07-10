import "server-only";
import { z } from "zod";
import { SERVICE_CATEGORIES } from "@/lib/validation";
import { WEEKDAY_KEYS, type WeekdayKey } from "@/lib/availability";
import type { Service, Testimonial, GalleryImage } from "@/types";

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
  updatedAt: z.string().optional(),
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
  // Disabled services are still returned — the site renders them faded/
  // non-bookable rather than hiding them outright (see ServiceCard /
  // ServiceLinkCard). The tripwire checks above already ran against the
  // full response so a legitimately disabled service doesn't get mistaken
  // for a truncated one.
  return services;
}

const rawTestimonialSchema = z.object({
  name: z.string(),
  role: z.string().default("Client"),
  avatar: z.string().default(""),
  rating: z.number().default(5),
  quote: z.string(),
});

/**
 * Testimonials/gallery are decorative, not SEO-load-bearing the way the
 * service catalog is — degrade gracefully (empty array) rather than fail
 * the whole build if the backend is briefly unreachable.
 */
export async function getBackendTestimonials(): Promise<Testimonial[]> {
  if (!BACKEND_URL) return [];
  try {
    const res = await fetchWithRetry(`${BACKEND_URL}/api/testimonials`, 2);
    if (!res.ok) return [];
    const parsed = z.object({ testimonials: z.array(rawTestimonialSchema) }).safeParse(await res.json());
    return parsed.success ? parsed.data.testimonials : [];
  } catch {
    return [];
  }
}

const rawGalleryImageSchema = z.object({
  src: z.string(),
  category: z.enum(["Bridal", "Hair", "Makeup", "Nails", "Skin", "Mehndi"]),
  alt: z.string().default(""),
});

export async function getBackendGallery(): Promise<GalleryImage[]> {
  if (!BACKEND_URL) return [];
  try {
    const res = await fetchWithRetry(`${BACKEND_URL}/api/gallery`, 2);
    if (!res.ok) return [];
    const parsed = z.object({ images: z.array(rawGalleryImageSchema) }).safeParse(await res.json());
    return parsed.success ? parsed.data.images : [];
  } catch {
    return [];
  }
}

const settingsSchema = z.object({
  closedDays: z.array(z.enum(WEEKDAY_KEYS)).default([]),
  announcement: z.string().default(""),
});

/** Which weekdays the salon is closed on — decorative/informational, so
 * degrade to "open every day" rather than fail the build if unreachable. */
export async function getBackendClosedDays(): Promise<WeekdayKey[]> {
  if (!BACKEND_URL) return [];
  try {
    const res = await fetchWithRetry(`${BACKEND_URL}/api/settings`, 2);
    if (!res.ok) return [];
    const parsed = settingsSchema.safeParse(await res.json());
    return parsed.success ? parsed.data.closedDays : [];
  } catch {
    return [];
  }
}
