import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB, isDbConfigured } from "@/lib/db";
import { ContactMessage } from "@/models/index";

// Admin-only: contact messages contain customer PII, unlike the other list
// endpoints (services/gallery/testimonials) which are intentionally public.
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isDbConfigured) return NextResponse.json({ messages: [] });
  await connectDB();
  const messages = await ContactMessage.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ messages });
}
