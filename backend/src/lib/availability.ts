import { connectDB, isDbConfigured } from "@/lib/db";
import { Appointment } from "@/models/Appointment";
import { BlockedSlot } from "@/models/BlockedSlot";
import { CustomSlot } from "@/models/CustomSlot";

/** The salon's default bookable time slots — the baseline shared by the
 *  public booking dialog, the admin availability manager, and the
 *  server-side booking validation. Admins can add extra one-off times on
 *  top of this per date via CustomSlot (see getTimesForDate below), so
 *  this constant is a floor, not the full set of what's ever bookable. */
export const TIME_SLOTS = [
  "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
  "06:00 PM", "07:00 PM", "08:00 PM",
] as const;

/** Matches "9:15 AM", "09:15 AM", "12:00 PM", etc. */
export const TIME_FORMAT_RE = /^(\d{1,2}):([0-5]\d)\s*(AM|PM)$/i;

function timeToMinutes(time: string): number {
  const m = time.match(TIME_FORMAT_RE);
  if (!m) return 0;
  let hours = parseInt(m[1], 10) % 12;
  if (m[3].toUpperCase() === "PM") hours += 12;
  return hours * 60 + parseInt(m[2], 10);
}

/** All bookable times for a date — the standard catalog plus any
 *  admin-added custom times for that specific date, chronologically sorted. */
export async function getTimesForDate(date: string): Promise<string[]> {
  if (!isDbConfigured) return [...TIME_SLOTS];
  await connectDB();
  const customs = await CustomSlot.find({ date }).select("time").lean<{ time: string }[]>();
  const merged = [...new Set<string>([...TIME_SLOTS, ...customs.map((c) => c.time)])];
  return merged.sort((a, b) => timeToMinutes(a) - timeToMinutes(b));
}

/** Appointment statuses that still occupy a slot. Rejected bookings free
 *  the slot back up for someone else. */
const OCCUPYING_STATUSES = ["pending", "approved", "completed"];

export type SlotStatus = "available" | "booked" | "blocked";

export interface SlotInfo {
  time: string;
  status: SlotStatus;
  /** True for a slot added via the admin's custom-time feature rather than the standard catalog. */
  isCustom?: boolean;
}

/** Public-safe: which slots on a date are open, booked or admin-blocked —
 *  no customer details. Used by the booking dialog. */
export async function getSlotStatuses(date: string): Promise<SlotInfo[]> {
  if (!isDbConfigured) {
    return TIME_SLOTS.map((time) => ({ time, status: "available" as const }));
  }
  await connectDB();

  const [times, appointments, blocked] = await Promise.all([
    getTimesForDate(date),
    Appointment.find({ date, status: { $in: OCCUPYING_STATUSES } })
      .select("time")
      .lean<{ time: string }[]>(),
    BlockedSlot.find({ date }).select("time").lean<{ time: string }[]>(),
  ]);

  const bookedTimes = new Set(appointments.map((a) => a.time));
  const blockedTimes = new Set(blocked.map((b) => b.time));
  const standardTimes = new Set<string>(TIME_SLOTS);

  return times.map((time) => ({
    time,
    status: bookedTimes.has(time) ? "booked" : blockedTimes.has(time) ? "blocked" : "available",
    isCustom: !standardTimes.has(time),
  }));
}

/** Admin view: same as above but with the booking's customer/service
 *  details attached to occupied slots, for the availability manager. */
export interface AdminSlotInfo extends SlotInfo {
  appointment?: { _id: string; name: string; serviceName?: string; service: string };
}

export async function getAdminSlotStatuses(date: string): Promise<AdminSlotInfo[]> {
  if (!isDbConfigured) {
    return TIME_SLOTS.map((time) => ({ time, status: "available" as const }));
  }
  await connectDB();

  const [times, appointments, blocked] = await Promise.all([
    getTimesForDate(date),
    Appointment.find({ date, status: { $in: OCCUPYING_STATUSES } })
      .select("time name serviceName service")
      .lean<{ _id: unknown; time: string; name: string; serviceName?: string; service: string }[]>(),
    BlockedSlot.find({ date }).select("time").lean<{ time: string }[]>(),
  ]);

  const byTime = new Map(appointments.map((a) => [a.time, a]));
  const blockedTimes = new Set(blocked.map((b) => b.time));
  const standardTimes = new Set<string>(TIME_SLOTS);

  return times.map((time) => {
    const isCustom = !standardTimes.has(time);
    const appt = byTime.get(time);
    if (appt) {
      return {
        time,
        status: "booked" as const,
        isCustom,
        appointment: {
          _id: String(appt._id),
          name: appt.name,
          serviceName: appt.serviceName,
          service: appt.service,
        },
      };
    }
    return {
      time,
      status: blockedTimes.has(time) ? ("blocked" as const) : ("available" as const),
      isCustom,
    };
  });
}

/** True if a given date+time is free to book right now — used server-side
 *  by the booking API as the final guard against double-booking. */
export async function isSlotAvailable(date: string, time: string): Promise<boolean> {
  if (!isDbConfigured) return true;
  await connectDB();
  const [existing, blocked] = await Promise.all([
    Appointment.exists({ date, time, status: { $in: OCCUPYING_STATUSES } }),
    BlockedSlot.exists({ date, time }),
  ]);
  return !existing && !blocked;
}
