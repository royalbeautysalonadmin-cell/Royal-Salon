import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em]",
            light ? "text-gold-300" : "text-brown-600"
          )}
        >
          <span className="h-px w-6 bg-gold" />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-serif text-3xl font-semibold leading-tight md:text-[2.6rem] text-balance",
          light ? "text-white" : "text-luxury-black"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-base leading-relaxed md:text-lg",
            light ? "text-white/70" : "text-charcoal/70"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
