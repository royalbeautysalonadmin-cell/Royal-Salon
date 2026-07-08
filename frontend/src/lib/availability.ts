/** Mirrors the response shapes of `backend/src/lib/availability.ts` — the
 * frontend only ever talks to `/api/availability` over HTTP (proxied to the
 * backend), so it needs the types but not the Mongo-backed implementation. */
export type SlotStatus = "available" | "booked" | "blocked";

export interface SlotInfo {
  time: string;
  status: SlotStatus;
  /** True for a slot added via the admin's custom-time feature rather than the standard catalog. */
  isCustom?: boolean;
}

export interface AdminSlotInfo extends SlotInfo {
  appointment?: { _id: string; name: string; serviceName?: string; service: string };
}

/** Weekday keys in JS Date.getDay() order (0 = Sunday). Client-safe (no
 * "server-only" import) so both server pages and client components
 * (BookingDialog, ClosedDaysBanner) can share the same type/label logic. */
export const WEEKDAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;
export type WeekdayKey = (typeof WEEKDAY_KEYS)[number];

const DAY_LABELS: Record<WeekdayKey, string> = {
  sun: "Sundays",
  mon: "Mondays",
  tue: "Tuesdays",
  wed: "Wednesdays",
  thu: "Thursdays",
  fri: "Fridays",
  sat: "Saturdays",
};

const WEEK_ORDER: WeekdayKey[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export function closedDaysLabel(closedDays: WeekdayKey[]): string {
  const ordered = WEEK_ORDER.filter((d) => closedDays.includes(d)).map((d) => DAY_LABELS[d]);
  if (ordered.length === 0) return "";
  if (ordered.length === 1) return ordered[0];
  return `${ordered.slice(0, -1).join(", ")} and ${ordered[ordered.length - 1]}`;
}
