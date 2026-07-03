"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Upload, Trash2, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export interface AdminImage {
  _id: string;
  src: string;
  category: string;
  alt?: string;
}

const CATEGORIES = ["Bridal", "Makeup", "Hair", "Skin", "Nails", "Mehndi"];

function fileToDataUri(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function GalleryManager({
  initial,
  disabled,
}: {
  initial: AdminImage[];
  disabled?: boolean;
}) {
  const [items, setItems] = useState(initial);
  const [category, setCategory] = useState("Makeup");
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);

  async function create(payload: Record<string, unknown>) {
    setBusy(true);
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, category }),
      });
      if (!res.ok) throw new Error();
      const { image } = await res.json();
      setItems((p) => [image, ...p]);
      toast.success("Image added.");
      setUrl("");
    } catch {
      toast.error("Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUri = await fileToDataUri(file);
    await create({ dataUri, alt: file.name });
  }

  async function remove(id: string) {
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setItems((p) => p.filter((i) => i._id !== id));
      toast.success("Image removed.");
    } catch {
      toast.error("Delete failed.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="space-y-1.5">
            <Label>Category</Label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-12 w-full rounded-xl border border-input bg-white px-3 text-sm"
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Image URL</Label>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div className="flex items-end gap-2">
            <Button
              variant="default"
              disabled={disabled || busy || !url}
              onClick={() => create({ src: url, alt: "Gallery image" })}
            >
              <LinkIcon className="h-4 w-4" /> Add
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-brown/40 px-5 py-2.5 text-sm font-medium text-brown transition-colors hover:bg-brown hover:text-white">
            <Upload className="h-4 w-4" /> Upload from device
            <input type="file" accept="image/*" className="hidden" onChange={onUpload} disabled={disabled || busy} />
          </label>
          <p className="mt-2 text-xs text-charcoal/70">
            Direct uploads require Cloudinary credentials. Otherwise paste an image URL.
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-border bg-white py-16 text-center text-sm text-charcoal/70">
          No gallery images yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((img) => (
            <div key={img._id} className="group relative overflow-hidden rounded-2xl shadow-soft">
              <Image
                src={img.src}
                alt={img.alt || "Gallery"}
                width={400}
                height={400}
                className="h-44 w-full object-cover"
              />
              <Badge variant="dark" className="absolute left-2 top-2">{img.category}</Badge>
              <button
                onClick={() => remove(img._id)}
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-500 opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Delete image"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
