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
