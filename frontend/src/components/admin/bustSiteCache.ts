"use client";

/**
 * Asks the frontend itself to bust its ISR cache (revalidatePath("/") +
 * revalidateTag("services")) right after an admin mutation.
 *
 * The backend does the same via its own fire-and-forget ping, but that ping
 * silently no-ops when FRONTEND_URL / REVALIDATE_SECRET aren't set on the
 * backend host — which left the public site serving stale prices after an
 * admin price edit. Calling it from the admin dashboard (same origin, with
 * the admin session cookie) removes that dependency entirely.
 *
 * The /revalidate route accepts an authenticated admin session, so no secret
 * needs to live in client code. Returns false if the bust failed — callers
 * can then tell the admin the site will only catch up on its next ISR window.
 */
export async function bustSiteCache(): Promise<boolean> {
  try {
    const res = await fetch("/revalidate", { method: "POST" });
    return res.ok;
  } catch {
    return false;
  }
}
