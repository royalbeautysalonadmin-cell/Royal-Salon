/**
 * Fire-and-forget: tells the frontend to bust its ISR cache after a
 * services/testimonials/gallery mutation. Never awaited by callers and
 * never throws — a slow or failed revalidation ping must not turn into a
 * failed admin save. Worst case the frontend just serves stale data until
 * its next natural revalidation window.
 *
 * Failures are logged loudly (including missing env vars and non-2xx
 * responses) so a broken ping shows up in the host's logs instead of
 * silently leaving the public site stale.
 */
export function triggerRevalidate() {
  const frontendUrl = process.env.FRONTEND_URL;
  const secret = process.env.REVALIDATE_SECRET;
  if (!frontendUrl || !secret) {
    console.error(
      "[revalidate] SKIP: FRONTEND_URL or REVALIDATE_SECRET is not set on the backend — " +
        "the public site will NOT be notified of this change (stale until its next ISR window). " +
        `FRONTEND_URL=${frontendUrl ? "set" : "missing"}, REVALIDATE_SECRET=${secret ? "set" : "missing"}`
    );
    return;
  }

  const ping = (attempt: number) => {
    fetch(`${frontendUrl}/revalidate`, {
      method: "POST",
      headers: { "x-revalidate-secret": secret },
    })
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.text().catch(() => "");
          throw new Error(`HTTP ${res.status} ${body.slice(0, 200)}`);
        }
        console.log(`[revalidate] frontend cache bust acknowledged (attempt ${attempt}).`);
      })
      .catch((err) => {
        if (attempt === 1) {
          setTimeout(() => ping(2), 1500);
          return;
        }
        console.error(
          `[revalidate] FAILED after retry — public site may serve stale data for up to 5 min:`,
          err
        );
      });
  };

  ping(1);
}
