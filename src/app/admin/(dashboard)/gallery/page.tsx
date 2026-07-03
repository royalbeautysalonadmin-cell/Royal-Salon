import { connectDB, isDbConfigured } from "@/lib/db";
import { Gallery } from "@/models/index";
import { GalleryManager, type AdminImage } from "@/components/admin/GalleryManager";

export const dynamic = "force-dynamic";

async function getData(): Promise<{ items: AdminImage[]; configured: boolean }> {
  if (!isDbConfigured) return { items: [], configured: false };
  await connectDB();
  const items = JSON.parse(
    JSON.stringify(await Gallery.find().sort({ createdAt: -1 }).lean())
  ) as AdminImage[];
  return { items, configured: true };
}

export default async function GalleryAdminPage() {
  const { items, configured } = await getData();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-luxury-black">Gallery</h1>
        <p className="text-charcoal/70">Upload and manage portfolio images.</p>
      </div>
      {!configured && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-700">
          <strong>Demo mode:</strong> connect <code>MONGODB_URI</code> (and Cloudinary) to manage the gallery.
        </div>
      )}
      <GalleryManager initial={items} disabled={!configured} />
    </div>
  );
}
