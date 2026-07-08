import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB, isDbConfigured } from "@/lib/db";
import { BlockedSlot } from "@/models/BlockedSlot";
import { CustomSlot } from "@/models/CustomSlot";
import {
  TIME_SLOTS,
  TIME_FORMAT_RE,
  getTimesForDate,
  getSlotStatuses,
  getAdminSlotStatuses,
} from "@/lib/availability";

export const dynamic = "force-dynamic";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const STANDARD_TIMES = new Set<string>(TIME_SLOTS);
const ACTIONS = ["block", "unblock", "add", "remove"] as const;

export async function GET(req: Request) {
  const date = new URL(req.url).searchParams.get("date");
  if (!date || !DATE_RE.test(date)) {
    return NextResponse.json({ error: "A valid ?date=YYYY-MM-DD is required" }, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  const slots = session ? await getAdminSlotStatuses(date) : await getSlotStatuses(date);
  return NextResponse.json({ date, slots });
}

/** Admin: block/unblock a slot, or add/remove a custom one-off time for a date. */
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isDbConfigured) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const body = await req.json();
  const { date, time, action } = body as { date?: string; time?: string; action?: string };

  if (!date || !DATE_RE.test(date)) {
    return NextResponse.json({ error: "A valid date (YYYY-MM-DD) is required" }, { status: 400 });
  }
  if (!action || !ACTIONS.includes(action as (typeof ACTIONS)[number])) {
    return NextResponse.json(
      { error: "action must be one of: block, unblock, add, remove" },
      { status: 400 }
    );
  }

  await connectDB();

  if (action === "add") {
    if (!time || !TIME_FORMAT_RE.test(time)) {
      return NextResponse.json(
        { error: "Enter a valid time like 9:15 AM or 06:30 PM" },
        { status: 400 }
      );
    }
    const existing = await getTimesForDate(date);
    if (existing.includes(time)) {
      return NextResponse.json({ error: "That time is already on the schedule for this date." }, { status: 409 });
    }
    await CustomSlot.create({ date, time });
    const slots = await getAdminSlotStatuses(date);
    return NextResponse.json({ date, slots }, { status: 201 });
  }

  if (action === "remove") {
    if (!time) return NextResponse.json({ error: "time is required" }, { status: 400 });
    if (STANDARD_TIMES.has(time)) {
      return NextResponse.json(
        { error: "Standard time slots can be blocked but not removed." },
        { status: 400 }
      );
    }
    const current = await getAdminSlotStatuses(date);
    const slot = current.find((s) => s.time === time);
    if (slot?.status === "booked") {
      return NextResponse.json(
        { error: "This slot already has a customer appointment and can't be removed." },
        { status: 409 }
      );
    }
    await CustomSlot.deleteOne({ date, time });
    await BlockedSlot.deleteOne({ date, time });
    const slots = await getAdminSlotStatuses(date);
    return NextResponse.json({ date, slots });
  }

  // block / unblock
  const validTimes = await getTimesForDate(date);
  if (!time || !validTimes.includes(time)) {
    return NextResponse.json({ error: "Invalid time slot" }, { status: 400 });
  }

  if (action === "block") {
    // A slot already occupied by a real customer appointment can't be
    // blocked — blocking is only meaningful for otherwise-open slots.
    const current = await getAdminSlotStatuses(date);
    const slot = current.find((s) => s.time === time);
    if (slot?.status === "booked") {
      return NextResponse.json(
        { error: "This slot already has a customer appointment and can't be blocked." },
        { status: 409 }
      );
    }
    await BlockedSlot.updateOne({ date, time }, { date, time }, { upsert: true });
  } else {
    await BlockedSlot.deleteOne({ date, time });
  }

  const slots = await getAdminSlotStatuses(date);
  return NextResponse.json({ date, slots });
}
