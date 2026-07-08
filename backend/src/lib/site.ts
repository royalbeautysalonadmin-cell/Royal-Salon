/** Minimal subset of `frontend/src/lib/site.ts`'s siteConfig — only the
 * fields the backend's transactional emails need. Keep in sync if the
 * salon's address/phone/email change. */
export const siteConfig = {
  name: "Royal Beauty Salon",
  phone: process.env.NEXT_PUBLIC_SALON_PHONE || "+48 22 123 45 67",
  email: process.env.NEXT_PUBLIC_SALON_EMAIL || "warsawroyalbeauty@gmail.com",
  address: {
    full: "ul. Mokotowska 12, 00-561 Warsaw, Poland",
  },
} as const;
