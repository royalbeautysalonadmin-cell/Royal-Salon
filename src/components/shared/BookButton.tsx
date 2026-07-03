import { Calendar } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

interface BookButtonProps {
  /** Kept for call-site compatibility; Booksy handles service selection itself. */
  serviceSlug?: string;
  label?: string;
  full?: boolean;
  className?: string;
}

/** Links directly to the salon's Booksy booking page. */
export function BookButton({ label = "Book Now", full, className }: BookButtonProps) {
  return (
    <a
      href={siteConfig.booksyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-luxury-black shadow-luxury transition-transform hover:-translate-y-0.5",
        full && "w-full",
        className
      )}
    >
      <Calendar className="h-4 w-4" />
      {label}
    </a>
  );
}
