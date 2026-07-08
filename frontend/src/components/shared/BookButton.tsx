"use client";

import { Calendar } from "lucide-react";
import { toast } from "sonner";
import { useBookingStore } from "@/store/booking";
import { cn } from "@/lib/utils";

interface BookButtonProps {
  serviceSlug?: string;
  label?: string;
  full?: boolean;
  className?: string;
  /** When true, renders a disabled-styled button that shows an alert instead of opening the booking dialog. */
  unavailable?: boolean;
}

/** Opens the global booking dialog, optionally pre-selecting a service. */
export function BookButton({
  serviceSlug,
  label = "Book Now",
  full,
  className,
  unavailable,
}: BookButtonProps) {
  const open = useBookingStore((s) => s.open);

  if (unavailable) {
    return (
      <button
        type="button"
        onClick={() =>
          toast.error("This service is currently unavailable. Please check back later or contact us for details.")
        }
        className={cn(
          "inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full bg-charcoal/20 px-6 py-3 text-sm font-semibold text-charcoal/60 shadow-none",
          full && "w-full",
          className
        )}
      >
        <Calendar className="h-4 w-4" />
        Currently Unavailable
      </button>
    );
  }

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
