/** Mirrors the same constant in `backend/src/lib/validation.ts` — the two
 * packages talk over HTTP now, not shared imports, so this is duplicated by
 * design. Keep both lists in sync when adding a category. */
export const SERVICE_CATEGORIES = [
  "Hair",
  "Makeup & Styling",
  "Threading",
  "Waxing",
  "Facial & Skin Care",
  "Manicure & Pedicure",
] as const;
