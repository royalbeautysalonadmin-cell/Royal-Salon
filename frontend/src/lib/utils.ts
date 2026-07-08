import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a price in Polish złoty (the salon's currency). */
export function formatPrice(amount: number) {
  return `${amount.toLocaleString("pl-PL")} zł`;
}

/** Human friendly date, e.g. "Mon, 22 Jun 2026". */
export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/** Slugify a string for ids / urls. */
export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Build a Cloudinary delivery URL with sensible optimization defaults. */
export function cloudinaryUrl(publicId: string, transform = "f_auto,q_auto,w_1200") {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloud || !publicId) return publicId;
  if (publicId.startsWith("http")) return publicId;
  return `https://res.cloudinary.com/${cloud}/image/upload/${transform}/${publicId}`;
}
