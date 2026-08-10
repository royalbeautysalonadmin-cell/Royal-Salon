import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB, isDbConfigured } from "@/lib/db";
import { Appointment } from "@/models/Appointment";
import { ContactMessage } from "@/models/index";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isDbConfigured) return NextResponse.json({ pending: 0, unread: 0 });

  await connectDB();

  const [pending, unread] = await Promise.all([
    Appointment.countDocuments({ status: "pending" }),
    ContactMessage.countDocuments({ read: false }),
  ]);

  return NextResponse.json({ pending, unread });
}
