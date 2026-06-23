import { NextResponse } from "next/server";
import { connectDB, isDbConfigured } from "@/lib/db";
import { Appointment } from "@/models/Appointment";
import { bookingSchema } from "@/lib/validation";
import { sendBookingEmails } from "@/lib/email";
import { services } from "@/data/content";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const data = parsed.data;
    const match = services.find((s) => s.slug === data.service);
    const serviceName = data.serviceName || match?.name || data.service;

    // Persist to MongoDB when configured; otherwise run in graceful demo mode.
    let id = "demo";
    if (isDbConfigured) {
      await connectDB();
      const doc = await Appointment.create({ ...data, serviceName, status: "pending" });
      id = String(doc._id);
    }

    // Fire confirmation + admin notification emails (non-blocking failure tolerated).
    try {
      await sendBookingEmails({ ...data, serviceName });
    } catch (e) {
      console.error("[bookings] email error", e);
    }

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (e) {
    console.error("[bookings] error", e);
    return NextResponse.json({ error: "Unable to create booking" }, { status: 500 });
  }
}

// Admin: list appointments
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isDbConfigured) return NextResponse.json({ appointments: [] });
  await connectDB();
  const appointments = await Appointment.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ appointments });
}
