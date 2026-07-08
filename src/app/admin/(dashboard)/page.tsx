import { AdminDashboardStats } from "@/components/admin/AdminDashboardStats";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-luxury-black">Dashboard</h1>
        <p className="text-charcoal/70">Welcome back — here&apos;s your salon at a glance.</p>
      </div>
      <AdminDashboardStats />
    </div>
  );
}
