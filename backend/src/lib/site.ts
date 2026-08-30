/** Minimal subset of `frontend/src/lib/site.ts`'s siteConfig — only the
 * fields the backend's transactional emails need. Keep in sync if the
 * salon's address/phone/email change. */
export const siteConfig = {
  name: "Royal Beauty Salon",
  phone: process.env.NEXT_PUBLIC_SALON_PHONE || "+48 573 377 659",
  email: process.env.NEXT_PUBLIC_SALON_EMAIL || "warsawroyalbeauty@gmail.com",
  address: {
    full: "Aleja Stanów Zjednoczonych 67/D7, 03-770 Warszawa, Poland",
  },
} as const;
