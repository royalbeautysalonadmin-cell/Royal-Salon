import { GalleryManager } from "@/components/admin/GalleryManager";

export default function GalleryAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-luxury-black">Gallery</h1>
        <p className="text-charcoal/70">Upload and manage portfolio images.</p>
      </div>
      <GalleryManager />
    </div>
  );
}
