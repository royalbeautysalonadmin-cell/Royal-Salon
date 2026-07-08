import { isDbConfigured } from "@/lib/db";
import { getAdminSlotStatuses } from "@/lib/availability";
import { AvailabilityManager } from "@/components/admin/AvailabilityManager";

export const dynamic = "force-dynamic";

function todayIso() {
  return new Date().toISOString().split("T")[0];
}

export default async function AvailabilityPage() {
  const date = todayIso();
  const slots = isDbConfigured ? await getAdminSlotStatuses(date) : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-luxury-black">Availability</h1>
        <p className="text-charcoal/70">
          Open or block time slots. Slots with a customer booking are shown automatically and
          can&apos;t be blocked.
        </p>
      </div>
      {!isDbConfigured && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-700">
          <strong>Demo mode:</strong> connect <code>MONGODB_URI</code> to manage live availability.
        </div>
      )}
      <AvailabilityManager initialDate={date} initialSlots={slots} />
    </div>
  );
}
