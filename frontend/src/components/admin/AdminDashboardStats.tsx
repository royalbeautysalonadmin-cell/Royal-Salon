"use client";

import { useEffect, useState } from "react";
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  TrendingUp,
  Loader2,
  CalendarX,
  Sparkles,
} from "lucide-react";
import { formatDate, cn } from "@/lib/utils";
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
    fetch("/api/bookings", { cache: "no-store" })
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
  const maxPopular = popular[0]?.[1] || 1;

  return (
    <div className="space-y-8">
      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="group rounded-2xl border border-border bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-luxury"
          >
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${c.color} text-white shadow-md transition-transform duration-300 group-hover:scale-105`}
            >
              <c.icon className="h-6 w-6" />
            </span>
            <p className="mt-4 font-serif text-3xl font-semibold text-luxury-black">{c.value}</p>
            <p className="text-xs font-medium uppercase tracking-wide text-charcoal/60">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent appointments */}
        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold">Recent Appointments</h2>
            {all.length > 0 && (
              <span className="text-xs font-medium text-charcoal/50">{all.length} total</span>
            )}
          </div>
          {all.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12 text-center">
              <CalendarX className="h-8 w-8 text-charcoal/20" />
              <p className="text-sm text-charcoal/70">No appointments yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {all.slice(0, 6).map((a) => (
                <div key={a._id} className="flex items-center gap-3 py-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brown-gradient text-xs font-semibold text-white">
                    {a.name.charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-charcoal">{a.name}</p>
                    <p className="truncate text-xs text-charcoal/70">
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
            <div className="flex flex-col items-center gap-2 py-12 text-center">
              <Sparkles className="h-8 w-8 text-charcoal/20" />
              <p className="text-sm text-charcoal/70">No data yet.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {popular.map(([name, count], i) => (
                <li key={name}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex min-w-0 items-center gap-2 text-sm text-charcoal/80">
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                          i === 0 ? "bg-gold text-luxury-black" : "bg-cream text-brown"
                        )}
                      >
                        {i + 1}
                      </span>
                      <span className="truncate">{name}</span>
                    </span>
                    <Badge variant="default">{count}</Badge>
                  </div>
                  <div className="mt-1.5 ml-8 h-1.5 overflow-hidden rounded-full bg-cream">
                    <div
                      className="h-full rounded-full bg-brown-gradient transition-all duration-500"
                      style={{ width: `${Math.max((count / maxPopular) * 100, 8)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
