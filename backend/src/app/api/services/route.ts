import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB, isDbConfigured } from "@/lib/db";
import { ServiceModel } from "@/models/Service";
import { serviceSchema } from "@/lib/validation";
import { slugify } from "@/lib/utils";
import { triggerRevalidate } from "@/lib/revalidate";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!isDbConfigured) return NextResponse.json({ services: [] });
  await connectDB();
  // The public booking form only ever asks for active services; the admin
  // dashboard omits this param so it can see (and re-enable) disabled ones.
  const onlyActive = new URL(req.url).searchParams.get("active") === "true";
  const query = onlyActive ? { active: true } : {};
  const services = await ServiceModel.find(query).sort({ createdAt: -1 }).lean();
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
  try {
    const created = await ServiceModel.create(parsed.data);
    triggerRevalidate();
    return NextResponse.json({ service: created }, { status: 201 });
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
