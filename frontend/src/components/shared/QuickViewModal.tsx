"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowUpRight, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/shared/StarRating";
import { cn, formatPrice } from "@/lib/utils";
import { useBookingStore } from "@/store/booking";
import { useTranslation } from "@/lib/i18n";
import { servicePath } from "@/data/seo-data";
import type { Service } from "@/types";

export function QuickViewModal({
  service,
  open,
  onClose,
}: {
  service: Service | null;
  open: boolean;
  onClose: () => void;
}) {
  const openBooking = useBookingStore((s) => s.open);
  const { t } = useTranslation();

  if (!service) return null;

  const unavailable = service.active === false;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md gap-0 overflow-hidden p-0 sm:max-w-xl">
        <div className="relative h-56 overflow-hidden sm:h-72">
          <Image
            src={service.image}
            alt={service.name}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/70 via-transparent to-transparent" />
          <Badge variant="dark" className="absolute left-4 top-4 text-xs">
            {service.category}
          </Badge>
          {service.featured && (
            <Badge variant="gold" className="absolute right-4 top-4 text-xs">
              <Sparkles className="mr-1 h-3 w-3" />
              {t("services.signature")}
            </Badge>
          )}
          {service.originalPrice && (
            <div className="absolute bottom-4 right-4 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
              {t("services.save")}{" "}
              {Math.round(
                ((service.originalPrice - service.price) /
                  service.originalPrice) *
                  100
              )}
              %
            </div>
          )}
        </div>

        <div className="p-5 sm:p-6">
          <DialogHeader className="text-left">
            <div className="flex items-start justify-between gap-3">
              <DialogTitle className="font-serif text-lg sm:text-xl">
                {service.name}
              </DialogTitle>
              <div className="flex shrink-0 flex-col items-end gap-0.5">
                {service.originalPrice && (
                  <span className="text-xs text-charcoal/60 line-through">
                    {formatPrice(service.originalPrice)}
                  </span>
                )}
                <span className="font-serif text-lg font-bold text-brown">
                  {formatPrice(service.price)}
                </span>
              </div>
            </div>
            {service.rating && (
              <StarRating
                rating={service.rating}
                count={service.reviewCount}
                className="mt-1"
              />
            )}
          </DialogHeader>

          <DialogDescription className="mt-3 text-sm leading-relaxed text-charcoal/70">
            {service.description}
          </DialogDescription>

          <div className="mt-4 flex items-center gap-4 text-sm text-charcoal/70">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-brown" />
              {service.duration}
            </span>
          </div>

          <div className="mt-5 flex gap-3">
            {unavailable ? (
              <Button disabled className="flex-1 rounded-full">
                {t("quickView.unavailable")}
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="flex-1 rounded-full border-brown/20"
                  asChild
                >
                  <Link href={servicePath(service)}>
                    {t("quickView.viewDetails")}
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  className="flex-1 rounded-full bg-brown text-white hover:bg-brown/90"
                  onClick={() => {
                    onClose();
                    openBooking(service.slug);
                  }}
                >
                  {t("quickView.bookNow")}
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
