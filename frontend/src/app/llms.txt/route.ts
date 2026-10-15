import { buildLlmsTxt } from "@/lib/llms";

export const revalidate = 3600;

/** Serves /llms.txt — a concise, machine-readable index of the site for LLMs. */
export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
