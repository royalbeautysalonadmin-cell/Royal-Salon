import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB, isDbConfigured } from "@/lib/db";
import { Gallery } from "@/models/index";
import { uploadImage, isCloudinaryConfigured } from "@/lib/cloudinary";

export async function GET() {
  if (!isDbConfigured) return NextResponse.json({ images: [] });
  await connectDB();
  const images = await Gallery.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ images });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isDbConfigured) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

  const body = await req.json();
  let src = body.src as string | undefined;
  let publicId: string | undefined;

  // If a data URI is provided and Cloudinary is configured, upload it.
  if (body.dataUri && isCloudinaryConfigured) {
    const result = await uploadImage(body.dataUri, "royal-beauty/gallery");
    src = result.url;
    publicId = result.publicId;
  }
  if (!src) return NextResponse.json({ error: "Image source required" }, { status: 400 });

  await connectDB();
  const image = await Gallery.create({
    src,
    publicId,
    category: body.category || "Makeup",
    alt: body.alt || "Royal Beauty gallery image",
  });
  return NextResponse.json({ image }, { status: 201 });
}
