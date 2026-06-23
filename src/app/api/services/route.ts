import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB, isDbConfigured } from "@/lib/db";
import { ServiceModel } from "@/models/Service";
import { serviceSchema } from "@/lib/validation";
import { slugify } from "@/lib/utils";

export async function GET() {
  if (!isDbConfigured) return NextResponse.json({ services: [] });
  await connectDB();
  const services = await ServiceModel.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ services });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isDbConfigured) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

  const body = await req.json();
  if (!body.slug && body.name) body.slug = slugify(body.name);
  const parsed = serviceSchema.safeParse({ ...body, price: Number(body.price) });
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten() }, { status: 400 });
  }
  await connectDB();
  const created = await ServiceModel.create(parsed.data);
  return NextResponse.json({ service: created }, { status: 201 });
}
