/**
 * Fire-and-forget: tells the frontend to bust its ISR cache after a
 * services/testimonials/gallery mutation. Never awaited by callers and
 * never throws — a slow or failed revalidation ping must not turn into a
 * failed admin save. Worst case the frontend just serves stale data until
 * its next natural revalidation window.
 */
export function triggerRevalidate() {
  const frontendUrl = process.env.FRONTEND_URL;
  const secret = process.env.REVALIDATE_SECRET;
  if (!frontendUrl || !secret) return;

  fetch(`${frontendUrl}/revalidate`, {
    method: "POST",
    headers: { "x-revalidate-secret": secret },
  }).catch((err) => {
    console.error("[revalidate] failed to notify frontend:", err);
  });
}
