"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Check, X, CheckCheck, Trash2, Search, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "./StatusBadge";
import { formatDate } from "@/lib/utils";

export interface AdminAppt {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  serviceName?: string;
  date: string;
  time: string;
  notes?: string;
  status: string;
  createdAt: string;
}

const FILTERS = ["all", "pending", "approved", "completed", "rejected"] as const;

export function AppointmentsTable({ initial }: { initial: AdminAppt[] }) {
  const [items, setItems] = useState(initial);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState<string | null>(null);

  async function setStatus(id: string, status: string) {
    setBusy(id);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      setItems((prev) => prev.map((a) => (a._id === id ? { ...a, status } : a)));
      toast.success(`Appointment ${status}.`);
    } catch {
      toast.error("Update failed.");
    } finally {
      setBusy(null);
    }
  }

  async function remove(id: string) {
    setBusy(id);
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setItems((prev) => prev.filter((a) => a._id !== id));
      toast.success("Appointment deleted.");
    } catch {
      toast.error("Delete failed.");
    } finally {
      setBusy(null);
    }
  }

  const filtered = items.filter((a) => {
    const matchesFilter = filter === "all" || a.status === filter;
    const matchesQuery =
      !q ||
      [a.name, a.email, a.phone, a.serviceName, a.service]
        .join(" ")
        .toLowerCase()
        .includes(q.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                filter === f
                  ? "bg-brown text-white"
                  : "bg-white text-charcoal/70 hover:bg-brown/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/70" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search bookings..."
            className="pl-9"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border bg-white py-16 text-center text-sm text-charcoal/70">
          No appointments found.
        </div>
      ) : (
        <div className="grid gap-3">
          {filtered.map((a) => (
            <div
              key={a._id}
              className="rounded-2xl border border-border bg-white p-5 shadow-soft"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <p className="font-serif text-lg font-semibold text-luxury-black">{a.name}</p>
                    <StatusBadge status={a.status} />
                  </div>
                  <p className="mt-1 text-sm text-brown">{a.serviceName || a.service}</p>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-charcoal/70">
                    <span>{formatDate(a.date)} · {a.time}</span>
                    <a href={`mailto:${a.email}`} className="flex items-center gap-1 hover:text-brown">
                      <Mail className="h-3 w-3" /> {a.email}
                    </a>
                    <a href={`tel:${a.phone}`} className="flex items-center gap-1 hover:text-brown">
                      <Phone className="h-3 w-3" /> {a.phone}
                    </a>
                  </div>
                  {a.notes && <p className="mt-2 text-xs italic text-charcoal/70">“{a.notes}”</p>}
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={busy === a._id || a.status === "approved"}
                    onClick={() => setStatus(a._id, "approved")}
                  >
                    <Check className="h-4 w-4" /> Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={busy === a._id || a.status === "completed"}
                    onClick={() => setStatus(a._id, "completed")}
                  >
                    <CheckCheck className="h-4 w-4" /> Complete
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={busy === a._id || a.status === "rejected"}
                    onClick={() => setStatus(a._id, "rejected")}
                  >
                    <X className="h-4 w-4" /> Reject
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                    disabled={busy === a._id}
                    onClick={() => remove(a._id)}
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
