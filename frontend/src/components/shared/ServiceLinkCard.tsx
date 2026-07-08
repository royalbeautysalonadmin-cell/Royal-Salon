"use client";

import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Clock, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn, formatPrice } from "@/lib/utils";
import { servicePath } from "@/data/seo-data";
import type { Service } from "@/types";

const UNAVAILABLE_MESSAGE: Record<"en" | "pl", string> = {
  en: "This service is currently unavailable. Please check back later or contact us for details.",
  pl: "Ta usługa jest obecnie niedostępna. Sprawdź ponownie później lub skontaktuj się z nami.",
};

/**
 * A crawlable, link-based service card that points to the service detail
 * page (unlike the homepage card which opens the booking dialog). Disabled
 * services render faded and non-navigating — clicking shows an alert
 * instead of taking the visitor to a page for something they can't book.
 */
export function ServiceLinkCard({
  service,
  locale = "en",
}: {
  service: Service;
  locale?: "en" | "pl";
}) {
  const href = servicePath(service);
  const unavailable = service.active === false;

  const content = (
    <>
      <div className="relative h-44 overflow-hidden sm:h-52">
        <Image
          src={service.image}
          alt={`${service.name} in Warsaw`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/70 via-luxury-black/10 to-transparent" />
        <Badge variant="dark" className="absolute left-3 top-3 text-[0.6rem]">
          {service.category}
        </Badge>
        {unavailable ? (
          <Badge variant="danger" className="absolute right-3 top-3 text-[0.6rem]">
            {locale === "pl" ? "Niedostępne" : "Unavailable"}
          </Badge>
        ) : (
          service.originalPrice && (
            <div className="absolute bottom-3 right-3 rounded-full bg-red-500 px-2.5 py-1 text-[0.65rem] font-bold text-white shadow-lg">
              Save {Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100)}%
            </div>
          )
        )}
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-sm font-semibold leading-snug text-luxury-black group-hover:text-brown sm:text-base">
            {service.name}
          </h3>
          <div className="flex shrink-0 items-baseline gap-1.5">
            {service.originalPrice && (
              <span className="text-xs text-charcoal/70 line-through">
                {formatPrice(service.originalPrice)}
              </span>
            )}
            <span className="whitespace-nowrap font-serif text-sm font-bold text-brown sm:text-base">
              {formatPrice(service.price)}
            </span>
          </div>
        </div>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-charcoal/70">
          {service.description}
        </p>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <span className="flex items-center gap-1.5 text-xs text-charcoal/70">
            <Clock className="h-3 w-3 text-brown" />
            {service.duration}
          </span>
          {!unavailable && (
            <span className="flex items-center gap-1 text-xs font-medium text-brown">
              {locale === "pl" ? "Zobacz szczegóły" : "View details"}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          )}
        </div>
      </div>
    </>
  );

  const className = cn(
    "group overflow-hidden rounded-2xl border border-brown/10 bg-white shadow-soft transition-all duration-300",
    unavailable ? "opacity-60 grayscale" : "hover:shadow-luxury hover:-translate-y-1"
  );

  if (unavailable) {
    return (
      <article
        className={cn(className, "cursor-pointer")}
        onClick={() => toast.error(UNAVAILABLE_MESSAGE[locale])}
      >
        {content}
      </article>
    );
  }

  return (
    <article className={className}>
      <Link href={href} className="block">
        {content}
      </Link>
    </article>
  );
}
