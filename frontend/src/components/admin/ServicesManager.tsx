"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Plus, Trash2, Star, Pencil, EyeOff, Eye, Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatPrice, cn } from "@/lib/utils";
import { SERVICE_CATEGORIES } from "@/lib/validation";

export interface AdminService {
  _id: string;
  slug?: string;
  name: string;
  category: string;
  description?: string;
  price: number;
  duration?: string;
  image?: string;
  featured?: boolean;
  active?: boolean;
  originalPrice?: number;
  priceOnRequest?: boolean;
  variant?: string;
}

type ServiceFormValues = {
  name: string;
  category: string;
  price: string;
  duration: string;
  image: string;
  description: string;
  featured: boolean;
  originalPrice?: string | number;
  priceOnRequest?: boolean;
  variant?: string;
};

function fileToDataUri(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function ServiceForm({
  defaults,
  submitLabel,
  saving,
  onSubmit,
}: {
  defaults?: Partial<ServiceFormValues>;
  submitLabel: string;
  saving: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const [image, setImage] = useState(defaults?.image || "");
  const [uploading, setUploading] = useState(false);

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    try {
      const dataUri = await fileToDataUri(file);
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataUri }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Upload failed.");
      setImage(json.url);
      toast.success("Image uploaded.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="s-name">Name</Label>
          <Input id="s-name" name="name" required defaultValue={defaults?.name} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="s-category">Category</Label>
          <select
            id="s-category"
            name="category"
            defaultValue={defaults?.category}
            className="h-12 w-full rounded-xl border border-input bg-white px-3 text-sm"
          >
            {SERVICE_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="s-price">Price (zł)</Label>
          <Input
            id="s-price"
            name="price"
            type="number"
            min="0"
            step="1"
            required
            defaultValue={defaults?.price}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="s-duration">Duration</Label>
          <Input
            id="s-duration"
            name="duration"
            placeholder="1 hr"
            defaultValue={defaults?.duration}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="s-originalPrice">Original Price (zł, optional)</Label>
          <Input
            id="s-originalPrice"
            name="originalPrice"
            type="number"
            min="0"
            step="1"
            placeholder="Leave blank if not discounted"
            defaultValue={defaults?.originalPrice}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="s-variant">Variant (optional)</Label>
          <Input
            id="s-variant"
            name="variant"
            placeholder="e.g. Short / Medium / Long"
            defaultValue={defaults?.variant}
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="s-image">Image</Label>
        <div className="flex items-center gap-3">
          {image && (
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-border">
              <Image src={image} alt="" fill className="object-cover" unoptimized />
            </div>
          )}
          <Input
            id="s-image"
            name="image"
            placeholder="https://..."
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <label className="mt-1 inline-flex cursor-pointer items-center gap-2 rounded-full border border-brown/40 px-4 py-2 text-xs font-medium text-brown transition-colors hover:bg-brown hover:text-white">
          {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
          Upload from device
          <input type="file" accept="image/*" className="hidden" onChange={onUpload} disabled={uploading} />
        </label>
        <p className="text-xs text-charcoal/70">
          Direct uploads require Cloudinary credentials on the backend. Otherwise paste an image URL above.
        </p>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="s-desc">Description</Label>
        <Textarea id="s-desc" name="description" defaultValue={defaults?.description} />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="featured"
          className="h-4 w-4 accent-brown"
          defaultChecked={defaults?.featured}
        />
        Mark as signature/featured
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="priceOnRequest"
          className="h-4 w-4 accent-brown"
          defaultChecked={defaults?.priceOnRequest}
        />
        Price on request (hide the price, show &quot;Price on request&quot;)
      </label>
      <Button type="submit" variant="gold" className="w-full" disabled={saving}>
        {saving ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}

export function ServicesManager() {
  const [items, setItems] = useState<AdminService[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState<AdminService | null>(null);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/services", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data: { services: AdminService[] }) => setItems(data.services || []))
      .catch(() => toast.error("Couldn't load services."))
      .finally(() => setLoading(false));
  }, []);

  function readForm(form: HTMLFormElement) {
    const data = Object.fromEntries(new FormData(form));
    return {
      name: String(data.name || ""),
      category: String(data.category || ""),
      price: Number(data.price),
      duration: String(data.duration || ""),
      image: String(data.image || ""),
      description: String(data.description || ""),
      featured: data.featured === "on",
      originalPrice: data.originalPrice ? Number(data.originalPrice) : undefined,
      priceOnRequest: data.priceOnRequest === "on",
      variant: String(data.variant || ""),
    };
  }

  async function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(readForm(e.currentTarget)),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Could not add service.");
      setItems((p) => [json.service, ...p]);
      toast.success("Service added.");
      setAddOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not add service.");
    } finally {
      setSaving(false);
    }
  }

  async function saveEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/services/${editing._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(readForm(e.currentTarget)),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Could not update service.");
      setItems((p) => p.map((s) => (s._id === editing._id ? json.service : s)));
      toast.success("Service updated.");
      setEditing(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update service.");
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(s: AdminService) {
    setBusyId(s._id);
    try {
      const res = await fetch(`/api/services/${s._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !s.active }),
      });
      if (!res.ok) throw new Error();
      const { service } = await res.json();
      setItems((p) => p.map((i) => (i._id === s._id ? service : i)));
      toast.success(service.active ? "Service enabled." : "Service disabled.");
    } catch {
      toast.error("Could not update status.");
    } finally {
      setBusyId(null);
    }
  }

  async function remove(id: string) {
    setBusyId(id);
    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setItems((p) => p.filter((s) => s._id !== id));
      toast.success("Service deleted.");
    } catch {
      toast.error("Delete failed.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button variant="gold">
              <Plus className="h-4 w-4" /> Add Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Service</DialogTitle>
            </DialogHeader>
            <ServiceForm submitLabel="Add Service" saving={saving} onSubmit={add} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit dialog — driven by `editing`, not a per-card Dialog, so state resets cleanly */}
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>
          {editing && (
            <ServiceForm
              key={editing._id}
              defaults={{
                name: editing.name,
                category: editing.category,
                price: String(editing.price),
                duration: editing.duration,
                image: editing.image,
                description: editing.description,
                featured: editing.featured,
                originalPrice: editing.originalPrice,
                priceOnRequest: editing.priceOnRequest,
                variant: editing.variant,
              }}
              submitLabel="Save Changes"
              saving={saving}
              onSubmit={saveEdit}
            />
          )}
        </DialogContent>
      </Dialog>

      {loading ? (
        <div className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-white py-16 text-sm text-charcoal/70">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading...
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-border bg-white py-16 text-center text-sm text-charcoal/70">
          No services yet. Add your first treatment.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => (
            <div
              key={s._id}
              className={cn(
                "rounded-2xl border border-border bg-white p-5 shadow-soft transition-opacity",
                s.active === false && "opacity-60"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-serif text-lg font-semibold text-luxury-black">{s.name}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5">
                    <Badge variant="default">{s.category}</Badge>
                    {s.active === false && <Badge variant="danger">Disabled</Badge>}
                  </div>
                </div>
                {s.featured && <Star className="h-4 w-4 shrink-0 fill-gold text-gold" />}
              </div>
              <p className="mt-3 line-clamp-2 text-xs text-charcoal/70">{s.description}</p>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                <span className="font-semibold text-brown">
                  {s.priceOnRequest ? (
                    "Price on request"
                  ) : s.originalPrice ? (
                    <>
                      <span className="mr-1.5 text-xs text-charcoal/40 line-through">
                        {formatPrice(s.originalPrice)}
                      </span>
                      {formatPrice(s.price)}
                    </>
                  ) : (
                    formatPrice(s.price)
                  )}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    aria-label="Edit service"
                    onClick={() => setEditing(s)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    aria-label={s.active === false ? "Enable service" : "Disable service"}
                    disabled={busyId === s._id}
                    onClick={() => toggleActive(s)}
                  >
                    {s.active === false ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    aria-label="Delete service"
                    className="text-red-500 hover:bg-red-50"
                    disabled={busyId === s._id}
                    onClick={() => remove(s._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
