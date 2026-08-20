"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({
  rating,
  count,
  className,
}: {
  rating: number;
  count?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "h-3 w-3",
              star <= rating
                ? "fill-gold text-gold"
                : star - 0.5 <= rating
                ? "fill-gold/50 text-gold"
                : "fill-charcoal/10 text-charcoal/20"
            )}
          />
        ))}
      </div>
      {count !== undefined && (
        <span className="text-[0.65rem] text-charcoal/60">({count})</span>
      )}
    </div>
  );
}
