import { AppointmentsTable } from "@/components/admin/AppointmentsTable";

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-luxury-black">Appointments</h1>
        <p className="text-charcoal/70">Approve, reschedule, complete or reject bookings.</p>
      </div>
      <AppointmentsTable />
    </div>
  );
}
