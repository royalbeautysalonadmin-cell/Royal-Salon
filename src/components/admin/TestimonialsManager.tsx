"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface AdminTestimonial {
  _id: string;
  name: string;
  role?: string;
  rating: number;
  quote: string;
  avatar?: string;
}

export function TestimonialsManager({
  initial,
  disabled,
}: {
  initial: AdminTestimonial[];
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
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, rating: Number(data.rating) }),
      });
      if (!res.ok) throw new Error();
      const { testimonial } = await res.json();
      setItems((p) => [testimonial, ...p]);
      toast.success("Testimonial added.");
      setOpen(false);
    } catch {
      toast.error("Could not add testimonial.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setItems((p) => p.filter((t) => t._id !== id));
      toast.success("Deleted.");
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
              <Plus className="h-4 w-4" /> Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Testimonial</DialogTitle>
            </DialogHeader>
            <form onSubmit={add} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="t-name">Name</Label>
                  <Input id="t-name" name="name" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="t-role">Role</Label>
                  <Input id="t-role" name="role" placeholder="Bride / Client" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="t-avatar">Avatar URL</Label>
                <Input id="t-avatar" name="avatar" placeholder="https://..." />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="t-rating">Rating</Label>
                <select
                  id="t-rating"
                  name="rating"
                  defaultValue="5"
                  className="h-12 w-full rounded-xl border border-input bg-white px-3 text-sm"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>{r} Stars</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="t-quote">Review</Label>
                <Textarea id="t-quote" name="quote" required />
              </div>
              <Button type="submit" variant="gold" className="w-full" disabled={saving}>
                {saving ? "Saving..." : "Add Testimonial"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-border bg-white py-16 text-center text-sm text-charcoal/70">
          No testimonials yet.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((t) => (
            <div key={t._id} className="rounded-2xl border border-border bg-white p-5 shadow-soft">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-serif text-lg font-semibold text-luxury-black">{t.name}</p>
                  <p className="text-xs text-brown">{t.role}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-sm italic text-charcoal/70">“{t.quote}”</p>
              <div className="mt-4 flex justify-end border-t border-border pt-3">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-red-500 hover:bg-red-50"
                  onClick={() => remove(t._id)}
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
