import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB, isDbConfigured } from "@/lib/db";
import { ServiceModel } from "@/models/Service";

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
  if (body.price !== undefined) body.price = Number(body.price);
  await connectDB();
  const updated = await ServiceModel.findByIdAndUpdate(id, body, { new: true }).lean();
  return NextResponse.json({ service: updated });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await connectDB();
  await ServiceModel.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
