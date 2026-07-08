import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB, isDbConfigured } from "@/lib/db";
import { Testimonial } from "@/models/index";
import { triggerRevalidate } from "@/lib/revalidate";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isDbConfigured) return NextResponse.json({ testimonials: [] });
  await connectDB();
  const testimonials = await Testimonial.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ testimonials });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isDbConfigured) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

  const body = await req.json();
  if (!body.name || !body.quote) {
    return NextResponse.json({ error: "Name and quote are required" }, { status: 400 });
  }
  await connectDB();
  const testimonial = await Testimonial.create({
    name: body.name,
    role: body.role || "Client",
    avatar: body.avatar || "",
    rating: Number(body.rating) || 5,
    quote: body.quote,
  });
  triggerRevalidate();
  return NextResponse.json({ testimonial }, { status: 201 });
}
