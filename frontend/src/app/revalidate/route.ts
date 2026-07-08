import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * Called by the backend right after a service/testimonial/gallery mutation
 * so the statically-generated frontend doesn't wait out its 24h ISR window.
 *
 * Deliberately NOT under /api/ — next.config.ts proxies all /api/* requests
 * to the backend (beforeFiles rewrite), which would make a route handler
 * placed there unreachable; it'd always be intercepted before Next's own
 * routing sees it.
 *
 * Revalidating "/" with the "layout" type busts every route nested under
 * the root layout in one call — simpler and safer than trying to enumerate
 * every affected path (service detail pages, category pages, the homepage,
 * warsaw/niche pages that surface featured services, the sitemap...).
 */
export async function POST(req: Request) {
  const secret =
    req.headers.get("x-revalidate-secret") || new URL(req.url).searchParams.get("secret");
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }
  revalidatePath("/", "layout");
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
