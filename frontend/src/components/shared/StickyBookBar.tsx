"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookingStore } from "@/store/booking";
import { useTranslation } from "@/lib/i18n";
import { useStickyBarStore } from "@/store/stickyBar";

export function StickyBookBar() {
  const [visible, setVisible] = useState(false);
  const openBooking = useBookingStore((s) => s.open);
  const { t } = useTranslation();
  const setStickyVisible = useStickyBarStore((s) => s.setVisible);

  useEffect(() => {
    const onScroll = () => {
      const servicesSection = document.getElementById("services");
      if (!servicesSection) return;
      const rect = servicesSection.getBoundingClientRect();
      const show = rect.top < -200;
      setVisible(show);
      setStickyVisible(show);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      setStickyVisible(false);
    };
  }, [setStickyVisible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-brown/10 bg-white/95 shadow-luxury backdrop-blur-md"
        >
          <div className="container-luxury flex items-center justify-between py-3">
            <p className="hidden text-sm font-medium text-charcoal sm:block">
              {t("stickyBar.desktop")}
            </p>
            <p className="text-sm font-medium text-charcoal sm:hidden">
              {t("stickyBar.mobile")}
            </p>
            <Button
              onClick={() => openBooking()}
              className="rounded-full bg-brown px-6 py-2.5 text-sm font-semibold text-white shadow-luxury hover:bg-brown/90"
            >
              <CalendarCheck className="mr-2 h-4 w-4" />
              {t("stickyBar.bookNow")}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
