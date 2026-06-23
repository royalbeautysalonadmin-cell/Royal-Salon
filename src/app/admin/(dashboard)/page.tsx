import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { connectDB, isDbConfigured } from "@/lib/db";
import { Appointment } from "@/models/Appointment";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/admin/StatusBadge";

export const dynamic = "force-dynamic";

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

async function getData() {
  if (!isDbConfigured) {
    return { all: [] as Appt[], configured: false };
  }
  await connectDB();
  const all = JSON.parse(
    JSON.stringify(await Appointment.find().sort({ createdAt: -1 }).lean())
  ) as Appt[];
  return { all, configured: true };
}

export default async function DashboardPage() {
  const { all, configured } = await getData();

  const total = all.length;
  const pending = all.filter((a) => a.status === "pending").length;
  const completed = all.filter((a) => a.status === "completed").length;

  // Popular services
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
      <div>
        <h1 className="font-serif text-3xl font-semibold text-luxury-black">Dashboard</h1>
        <p className="text-charcoal/60">Welcome back — here&apos;s your salon at a glance.</p>
      </div>

      {!configured && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-700">
          <strong>Demo mode:</strong> No <code>MONGODB_URI</code> is configured, so live data is
          unavailable. Add it to <code>.env.local</code> and run <code>npm run seed</code> to enable
          full functionality.
        </div>
      )}

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-2xl border border-border bg-white p-5 shadow-soft"
          >
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${c.color} text-white`}
            >
              <c.icon className="h-5 w-5" />
            </span>
            <p className="mt-4 font-serif text-3xl font-semibold text-luxury-black">{c.value}</p>
            <p className="text-sm text-charcoal/55">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent appointments */}
        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft lg:col-span-2">
          <h2 className="mb-4 font-serif text-xl font-semibold">Recent Appointments</h2>
          {all.length === 0 ? (
            <p className="py-8 text-center text-sm text-charcoal/50">No appointments yet.</p>
          ) : (
            <div className="divide-y divide-border">
              {all.slice(0, 6).map((a) => (
                <div key={a._id} className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <p className="font-medium text-charcoal">{a.name}</p>
                    <p className="text-xs text-charcoal/55">
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
            <p className="py-8 text-center text-sm text-charcoal/50">No data yet.</p>
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
