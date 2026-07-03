"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Star } from "lucide-react";
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
import { formatPrice } from "@/lib/utils";

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
}

const CATEGORIES = ["Makeup", "Hair", "Skin", "Nails", "Threading & Waxing", "Mehndi", "Training"];

export function ServicesManager({
  initial,
  disabled,
}: {
  initial: AdminService[];
  disabled?: boolean;
}) {
  const [items, setItems] = useState(initial);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  async function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, price: Number(data.price), featured: data.featured === "on" }),
      });
      if (!res.ok) throw new Error();
      const { service } = await res.json();
      setItems((p) => [service, ...p]);
      toast.success("Service added.");
      setOpen(false);
    } catch {
      toast.error("Could not add service.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setItems((p) => p.filter((s) => s._id !== id));
      toast.success("Service deleted.");
    } catch {
      toast.error("Delete failed.");
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="gold" disabled={disabled}>
              <Plus className="h-4 w-4" /> Add Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Service</DialogTitle>
            </DialogHeader>
            <form onSubmit={add} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="s-name">Name</Label>
                  <Input id="s-name" name="name" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="s-category">Category</Label>
                  <select
                    id="s-category"
                    name="category"
                    className="h-12 w-full rounded-xl border border-input bg-white px-3 text-sm"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="s-price">Price (zł)</Label>
                  <Input id="s-price" name="price" type="number" min="0" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="s-duration">Duration</Label>
                  <Input id="s-duration" name="duration" placeholder="1 hr" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="s-image">Image URL</Label>
                <Input id="s-image" name="image" placeholder="https://..." />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="s-desc">Description</Label>
                <Textarea id="s-desc" name="description" />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="featured" className="h-4 w-4 accent-brown" />
                Mark as signature/featured
              </label>
              <Button type="submit" variant="gold" className="w-full" disabled={saving}>
                {saving ? "Saving..." : "Add Service"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-border bg-white py-16 text-center text-sm text-charcoal/70">
          No services yet. Add your first treatment.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => (
            <div key={s._id} className="rounded-2xl border border-border bg-white p-5 shadow-soft">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-serif text-lg font-semibold text-luxury-black">{s.name}</p>
                  <Badge variant="default" className="mt-1">{s.category}</Badge>
                </div>
                {s.featured && <Star className="h-4 w-4 fill-gold text-gold" />}
              </div>
              <p className="mt-3 line-clamp-2 text-xs text-charcoal/70">{s.description}</p>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                <span className="font-semibold text-brown">{formatPrice(s.price)}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-red-500 hover:bg-red-50"
                  onClick={() => remove(s._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
