import { AvailabilityManager } from "@/components/admin/AvailabilityManager";

export default function AvailabilityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-luxury-black">Availability</h1>
        <p className="text-charcoal/70">
          Open or block time slots. Slots with a customer booking are shown automatically and
          can&apos;t be blocked.
        </p>
      </div>
      <AvailabilityManager />
    </div>
  );
}
