import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB, isDbConfigured } from "@/lib/db";
import { BlockedSlot } from "@/models/BlockedSlot";
import { TIME_SLOTS, getSlotStatuses, getAdminSlotStatuses } from "@/lib/availability";

export const dynamic = "force-dynamic";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function GET(req: Request) {
  const date = new URL(req.url).searchParams.get("date");
  if (!date || !DATE_RE.test(date)) {
    return NextResponse.json({ error: "A valid ?date=YYYY-MM-DD is required" }, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  const slots = session ? await getAdminSlotStatuses(date) : await getSlotStatuses(date);
  return NextResponse.json({ date, slots });
}

/** Admin: block or unblock a single date+time slot. */
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
  if (!time || !TIME_SLOTS.includes(time as (typeof TIME_SLOTS)[number])) {
    return NextResponse.json({ error: "Invalid time slot" }, { status: 400 });
  }
  if (action !== "block" && action !== "unblock") {
    return NextResponse.json({ error: "action must be 'block' or 'unblock'" }, { status: 400 });
  }

  await connectDB();

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
