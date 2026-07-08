import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB, isDbConfigured } from "@/lib/db";
import { ServiceModel } from "@/models/Service";
import { serviceUpdateSchema } from "@/lib/validation";
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
  if (body.price !== undefined) body.price = Number(body.price);
  const parsed = serviceUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten() }, { status: 400 });
  }
  await connectDB();
  try {
    const updated = await ServiceModel.findByIdAndUpdate(id, parsed.data, {
      new: true,
      runValidators: true,
    }).lean();
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    triggerRevalidate();
    return NextResponse.json({ service: updated });
  } catch (e: unknown) {
    if (e && typeof e === "object" && "code" in e && e.code === 11000) {
      return NextResponse.json(
        { error: "A service with that name already exists." },
        { status: 409 }
      );
    }
    throw e;
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await connectDB();
  await ServiceModel.findByIdAndDelete(id);
  triggerRevalidate();
  return NextResponse.json({ success: true });
}
