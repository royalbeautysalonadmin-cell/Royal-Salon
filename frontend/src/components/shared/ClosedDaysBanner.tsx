import { CalendarOff } from "lucide-react";
import { closedDaysLabel, type WeekdayKey } from "@/lib/availability";

export function ClosedDaysBanner({ closedDays }: { closedDays: WeekdayKey[] }) {
  if (closedDays.length === 0) return null;
  return (
    <div className="bg-luxury-black py-2.5 text-center text-sm text-white">
      <span className="inline-flex items-center gap-2">
        <CalendarOff className="h-4 w-4 text-gold" />
        We&apos;re closed on {closedDaysLabel(closedDays)}. Book any other day of the week!
      </span>
    </div>
  );
}
