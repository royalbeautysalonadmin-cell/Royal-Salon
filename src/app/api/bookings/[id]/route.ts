import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB, isDbConfigured } from "@/lib/db";
import { Appointment } from "@/models/Appointment";

async function guard() {
  const session = await getServerSession(authOptions);
  return Boolean(session);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await guard())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isDbConfigured) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const { id } = await params;
  const body = await req.json();
  const allowed: Record<string, unknown> = {};
  if (body.status) allowed.status = body.status;
  if (body.date) allowed.date = body.date;
  if (body.time) allowed.time = body.time;

  await connectDB();
  const updated = await Appointment.findByIdAndUpdate(id, allowed, { new: true }).lean();
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ appointment: updated });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await guard())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isDbConfigured) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const { id } = await params;
  await connectDB();
  await Appointment.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
