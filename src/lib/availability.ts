import { connectDB, isDbConfigured } from "@/lib/db";
import { Appointment } from "@/models/Appointment";
import { BlockedSlot } from "@/models/BlockedSlot";

/** The salon's bookable time slots — the single source of truth shared by
 *  the public booking dialog, the admin availability manager, and the
 *  server-side booking validation, so all three can never drift apart. */
export const TIME_SLOTS = [
  "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
  "06:00 PM", "07:00 PM", "08:00 PM",
] as const;

/** Appointment statuses that still occupy a slot. Rejected bookings free
 *  the slot back up for someone else. */
const OCCUPYING_STATUSES = ["pending", "approved", "completed"];

export type SlotStatus = "available" | "booked" | "blocked";

export interface SlotInfo {
  time: string;
  status: SlotStatus;
}

/** Public-safe: which slots on a date are open, booked or admin-blocked —
 *  no customer details. Used by the booking dialog. */
export async function getSlotStatuses(date: string): Promise<SlotInfo[]> {
  if (!isDbConfigured) {
    return TIME_SLOTS.map((time) => ({ time, status: "available" as const }));
  }
  await connectDB();

  const [appointments, blocked] = await Promise.all([
    Appointment.find({ date, status: { $in: OCCUPYING_STATUSES } })
      .select("time")
      .lean<{ time: string }[]>(),
    BlockedSlot.find({ date }).select("time").lean<{ time: string }[]>(),
  ]);

  const bookedTimes = new Set(appointments.map((a) => a.time));
  const blockedTimes = new Set(blocked.map((b) => b.time));

  return TIME_SLOTS.map((time) => ({
    time,
    status: bookedTimes.has(time) ? "booked" : blockedTimes.has(time) ? "blocked" : "available",
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

  const [appointments, blocked] = await Promise.all([
    Appointment.find({ date, status: { $in: OCCUPYING_STATUSES } })
      .select("time name serviceName service")
      .lean<{ _id: unknown; time: string; name: string; serviceName?: string; service: string }[]>(),
    BlockedSlot.find({ date }).select("time").lean<{ time: string }[]>(),
  ]);

  const byTime = new Map(appointments.map((a) => [a.time, a]));
  const blockedTimes = new Set(blocked.map((b) => b.time));

  return TIME_SLOTS.map((time) => {
    const appt = byTime.get(time);
    if (appt) {
      return {
        time,
        status: "booked" as const,
        appointment: {
          _id: String(appt._id),
          name: appt.name,
          serviceName: appt.serviceName,
          service: appt.service,
        },
      };
    }
    return { time, status: blockedTimes.has(time) ? ("blocked" as const) : ("available" as const) };
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
