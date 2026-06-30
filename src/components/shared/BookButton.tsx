"use client";

import { Calendar } from "lucide-react";
import { useBookingStore } from "@/store/booking";
import { cn } from "@/lib/utils";

interface BookButtonProps {
  serviceSlug?: string;
  label?: string;
  full?: boolean;
  className?: string;
}

/** Opens the global booking dialog, optionally pre-selecting a service. */
export function BookButton({ serviceSlug, label = "Book Now", full, className }: BookButtonProps) {
  const open = useBookingStore((s) => s.open);
  return (
    <button
      type="button"
      onClick={() => open(serviceSlug)}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-luxury-black shadow-luxury transition-transform hover:-translate-y-0.5",
        full && "w-full",
        className
      )}
    >
      <Calendar className="h-4 w-4" />
      {label}
    </button>
  );
}
