import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB, isDbConfigured } from "@/lib/db";
import { Testimonial } from "@/models/index";
import { triggerRevalidate } from "@/lib/revalidate";

async function guard() {
  const session = await getServerSession(authOptions);
  return Boolean(session) && isDbConfigured;
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  await connectDB();
  const updated = await Testimonial.findByIdAndUpdate(id, body, { new: true }).lean();
  triggerRevalidate();
  return NextResponse.json({ testimonial: updated });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await connectDB();
  await Testimonial.findByIdAndDelete(id);
  triggerRevalidate();
  return NextResponse.json({ success: true });
}
