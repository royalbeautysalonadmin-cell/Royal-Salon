"use client";

import { useEffect, useState } from "react";
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/admin/StatusBadge";

interface Appt {
  _id: string;
  name: string;
  serviceName?: string;
  service: string;
  date: string;
  time: string;
  status: string;
  createdAt: string;
}

export function AdminDashboardStats() {
  const [all, setAll] = useState<Appt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data: { appointments: Appt[] }) => setAll(data.appointments || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-white py-16 text-sm text-charcoal/70">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading...
      </div>
    );
  }

  const total = all.length;
  const pending = all.filter((a) => a.status === "pending").length;
  const completed = all.filter((a) => a.status === "completed").length;

  const counts = new Map<string, number>();
  all.forEach((a) => {
    const key = a.serviceName || a.service;
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  const popular = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);

  const cards = [
    { label: "Total Bookings", value: total, icon: CalendarCheck, color: "from-brown to-brown-600" },
    { label: "Pending", value: pending, icon: Clock, color: "from-amber-400 to-amber-600" },
    { label: "Completed", value: completed, icon: CheckCircle2, color: "from-emerald-400 to-emerald-600" },
    { label: "Popular Services", value: counts.size, icon: TrendingUp, color: "from-gold to-gold-600" },
  ];

  return (
    <div className="space-y-8">
      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-border bg-white p-5 shadow-soft">
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${c.color} text-white`}
            >
              <c.icon className="h-5 w-5" />
            </span>
            <p className="mt-4 font-serif text-3xl font-semibold text-luxury-black">{c.value}</p>
            <p className="text-sm text-charcoal/70">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent appointments */}
        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft lg:col-span-2">
          <h2 className="mb-4 font-serif text-xl font-semibold">Recent Appointments</h2>
          {all.length === 0 ? (
            <p className="py-8 text-center text-sm text-charcoal/70">No appointments yet.</p>
          ) : (
            <div className="divide-y divide-border">
              {all.slice(0, 6).map((a) => (
                <div key={a._id} className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <p className="font-medium text-charcoal">{a.name}</p>
                    <p className="text-xs text-charcoal/70">
                      {a.serviceName || a.service} · {formatDate(a.date)} · {a.time}
                    </p>
                  </div>
                  <StatusBadge status={a.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Popular services */}
        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
          <h2 className="mb-4 font-serif text-xl font-semibold">Popular Services</h2>
          {popular.length === 0 ? (
            <p className="py-8 text-center text-sm text-charcoal/70">No data yet.</p>
          ) : (
            <ul className="space-y-3">
              {popular.map(([name, count], i) => (
                <li key={name} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-sm text-charcoal/80">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cream text-xs font-semibold text-brown">
                      {i + 1}
                    </span>
                    {name}
                  </span>
                  <Badge variant="default">{count}</Badge>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
