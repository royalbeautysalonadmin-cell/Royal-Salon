import { connectDB, isDbConfigured } from "@/lib/db";
import { Appointment } from "@/models/Appointment";
import { AppointmentsTable, type AdminAppt } from "@/components/admin/AppointmentsTable";

export const dynamic = "force-dynamic";

async function getData(): Promise<{ items: AdminAppt[]; configured: boolean }> {
  if (!isDbConfigured) return { items: [], configured: false };
  await connectDB();
  const items = JSON.parse(
    JSON.stringify(await Appointment.find().sort({ createdAt: -1 }).lean())
  ) as AdminAppt[];
  return { items, configured: true };
}

export default async function AppointmentsPage() {
  const { items, configured } = await getData();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-luxury-black">Appointments</h1>
        <p className="text-charcoal/60">Approve, reschedule, complete or reject bookings.</p>
      </div>
      {!configured && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-700">
          <strong>Demo mode:</strong> connect <code>MONGODB_URI</code> to manage live appointments.
        </div>
      )}
      <AppointmentsTable initial={items} />
    </div>
  );
}
