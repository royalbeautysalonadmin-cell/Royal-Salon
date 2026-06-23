import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB, isDbConfigured } from "@/lib/db";
import { ContactMessage } from "@/models/index";

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
  const updated = await ContactMessage.findByIdAndUpdate(id, body, { new: true }).lean();
  return NextResponse.json({ message: updated });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await connectDB();
  await ContactMessage.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
