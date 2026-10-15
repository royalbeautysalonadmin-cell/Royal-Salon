import { buildLlmsFullTxt } from "@/lib/llms";

export const revalidate = 3600;

/**
 * Serves /llms-full.txt — the full content reference for LLMs: complete
 * service menu with prices, category/neighbourhood/specialty page copy and
 * every FAQ answer, so answer engines can quote accurate, current facts.
 */
export async function GET() {
  const body = await buildLlmsFullTxt();
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
