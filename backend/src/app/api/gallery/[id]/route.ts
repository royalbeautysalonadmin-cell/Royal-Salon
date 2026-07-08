import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB, isDbConfigured } from "@/lib/db";
import { Gallery } from "@/models/index";
import { deleteImage } from "@/lib/cloudinary";
import { triggerRevalidate } from "@/lib/revalidate";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isDbConfigured) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

  const { id } = await params;
  await connectDB();
  const doc = await Gallery.findById(id);
  if (doc?.publicId) {
    try { await deleteImage(doc.publicId); } catch (e) { console.error(e); }
  }
  await Gallery.findByIdAndDelete(id);
  triggerRevalidate();
  return NextResponse.json({ success: true });
}
