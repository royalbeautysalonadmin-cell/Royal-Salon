import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { uploadImage, isCloudinaryConfigured } from "@/lib/cloudinary";

/**
 * Generic admin-only image upload — returns a hosted URL without creating
 * any DB record. Used by the Services admin form (and reusable anywhere
 * else that just needs "give me a URL for this file", unlike POST
 * /api/gallery which always creates a Gallery document too).
 */
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isCloudinaryConfigured) {
    return NextResponse.json(
      { error: "Direct uploads aren't set up yet — add CLOUDINARY_CLOUD_NAME/API_KEY/API_SECRET on the backend, or paste an image URL instead." },
      { status: 503 }
    );
  }

  const body = await req.json();
  if (!body.dataUri) return NextResponse.json({ error: "dataUri is required" }, { status: 400 });

  const result = await uploadImage(body.dataUri, "royal-beauty/services");
  return NextResponse.json({ url: result.url, publicId: result.publicId }, { status: 201 });
}
