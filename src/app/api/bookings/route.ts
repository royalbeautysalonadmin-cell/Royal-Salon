import { NextResponse } from "next/server";
import { connectDB, isDbConfigured } from "@/lib/db";
import { Appointment } from "@/models/Appointment";
import { ServiceModel } from "@/models/Service";
import { bookingSchema } from "@/lib/validation";
import { sendBookingEmails } from "@/lib/email";
import { isSlotAvailable } from "@/lib/availability";
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
    let serviceName = data.serviceName || data.service;

    // Persist to MongoDB when configured; otherwise run in graceful demo mode.
    let id = "demo";
    if (isDbConfigured) {
      await connectDB();

      // Re-verify the service is a real, currently-bookable service — the
      // client already filters to active services, but this guards against
      // a stale form or a service disabled between load and submit.
      const service = await ServiceModel.findOne({ slug: data.service, active: true }).lean<{
        name: string;
      }>();
      if (!service) {
        return NextResponse.json(
          { error: "That service is no longer available. Please choose another." },
          { status: 409 }
        );
      }
      serviceName = service.name;

      // Fast, friendly pre-check — the client already only offers open
      // slots, but this catches a slot taken or blocked since the form loaded.
      if (!(await isSlotAvailable(data.date, data.time))) {
        return NextResponse.json(
          { error: "That time slot was just taken. Please choose another." },
          { status: 409 }
        );
      }

      try {
        const doc = await Appointment.create({ ...data, serviceName, status: "pending" });
        id = String(doc._id);
      } catch (e: unknown) {
        // Final safety net: the DB's partial unique index catches the rare
        // race where two customers submit the same slot at almost the same instant.
        if (e && typeof e === "object" && "code" in e && e.code === 11000) {
          return NextResponse.json(
            { error: "That time slot was just taken. Please choose another." },
            { status: 409 }
          );
        }
        throw e;
      }
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
