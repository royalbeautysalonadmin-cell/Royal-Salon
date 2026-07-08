import { Crown } from "lucide-react";
import { AdminDashboardStats } from "@/components/admin/AdminDashboardStats";

export default function DashboardPage() {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl bg-luxury-black px-6 py-7 text-white shadow-luxury sm:px-8">
        <div className="pointer-events-none absolute inset-0 bg-luxury-radial opacity-50" />
        <div className="relative flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brown-gradient text-white shadow-gold">
            <Crown className="h-6 w-6" />
          </span>
          <div>
            <h1 className="font-serif text-2xl font-semibold sm:text-3xl">Welcome back</h1>
            <p className="text-sm text-white/60">{today} · here&apos;s your salon at a glance.</p>
          </div>
        </div>
      </div>
      <AdminDashboardStats />
    </div>
  );
}
