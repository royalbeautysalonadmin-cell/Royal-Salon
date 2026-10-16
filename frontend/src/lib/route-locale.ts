/**
 * Content language for the fixed-language niche landing pages.
 *
 * These pages render entirely in one language (their surrounding chrome does
 * not follow the site's EN/PL toggle — see `NicheLanding`), so `<html lang>`
 * must reflect the *page*, not the toggle. The 4800-line `niche-seo` dataset
 * must never be imported into the client bundle, so this is a tiny, explicit
 * map instead.
 *
 * Keep in sync with `nichePages` in `src/data/niche-seo.ts`
 * (38 with `locale: "pl"`, 8 without = English).
 */
const NICHE_LOCALE: Record<string, "en" | "pl"> = {
  // ── English niche pages (no `locale` set) ──
  "indian-salon-warsaw": "en",
  "indian-parlour-warsaw": "en",
  "desi-salon-warsaw": "en",
  "hijab-friendly-salon-warsaw": "en",
  "women-only-hair-salon-warsaw": "en",
  "muslim-women-hairdresser-warsaw": "en",
  "keratin-nanoplasty-hijab-hair-warsaw": "en",
  "beauty-salon-near-me-warsaw": "en",

  // ── Polish niche pages (`locale: "pl"`) ──
  "salon-kosmetyczny-warszawa": "pl",
  "salon-pieknosci-warszawa": "pl",
  "salon-urody-warszawa": "pl",
  "fryzjer-warszawa": "pl",
  "depilacja-warszawa": "pl",
  "manicure-warszawa": "pl",
  "makijaz-slubny-warszawa": "pl",
  "keratynowe-prostowanie-warszawa": "pl",
  "baleaz-warszawa": "pl",
  "henna-brwi-warszawa": "pl",
  "przedluzanie-rzes-warszawa": "pl",
  "salon-tylko-dla-kobiet-warszawa": "pl",
  "salon-dla-muzulmanek-warszawa": "pl",
  "fryzjer-dla-kobiet-warszawa": "pl",
  "mezoterapia-warszawa": "pl",
  "oczyszczanie-twarzy-warszawa": "pl",
  "laminacja-brwi-rzes-warszawa": "pl",
  "pedicure-warszawa": "pl",
  "strzyzenie-meskie-warszawa": "pl",
  "salon-kosmetyczny-blisko-mnie-warszawa": "pl",
  "salon-kosmetyczny-wilanow": "pl",
  "peeling-chemiczny-warszawa": "pl",
  "koloryzacja-wlosow-warszawa": "pl",
  "strzyzenie-damskie-warszawa": "pl",
  "salon-fryzjerski-blisko-mnie-warszawa": "pl",
  "zabiegi-anti-aging-warszawa": "pl",
  "barber-warszawa": "pl",
  "manicure-hybrydowy-warszawa": "pl",
  "przedluzanie-rzes-warszawa-1-1": "pl",
  "strzyzenie-meskie-z-broda-warszawa": "pl",
  "zabiegi-na-twarz-warszawa": "pl",
  "depilacja-woskiem-warszawa": "pl",
  "botox-wlosow-warszawa": "pl",
  "koloryzacja-ombre-warszawa": "pl",
  "strzyzenie-dzieci-warszawa": "pl",
  "fryzura-slubna-warszawa": "pl",
  "hydrafacial-warszawa": "pl",
  "salon-otwarty-w-niedziele-warszawa": "pl",
};

/**
 * Returns the forced content language for a pathname if it is a
 * fixed-language niche page, otherwise `null` (caller falls back to the
 * user's EN/PL toggle).
 */
export function contentLocaleForPath(pathname: string): "en" | "pl" | null {
  const segment = pathname.split("/")[1]?.toLowerCase() ?? "";
  return NICHE_LOCALE[segment] ?? null;
}
