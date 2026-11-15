import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * Called right after a service/testimonial/gallery mutation so the
 * statically-generated frontend doesn't wait out its ISR window.
 *
 * Two callers, two auth paths:
 *  - the backend's fire-and-forget ping, authenticated with x-revalidate-secret;
 *  - the admin dashboard itself (bustSiteCache), authenticated with the
 *    NextAuth admin session cookie. This path exists because the backend ping
 *    silently does nothing when FRONTEND_URL / REVALIDATE_SECRET aren't set on
 *    the backend host — the exact failure mode where an admin price edit never
 *    reached the public site.
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
  const provided =
    req.headers.get("x-revalidate-secret") || new URL(req.url).searchParams.get("secret");
  const secretOk = Boolean(
    process.env.REVALIDATE_SECRET && provided === process.env.REVALIDATE_SECRET
  );

  if (!secretOk) {
    let session = null;
    try {
      session = await getServerSession(authOptions);
    } catch {
      session = null;
    }
    if (!session) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }
  }

  revalidatePath("/", "layout");
  revalidateTag("services");
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
