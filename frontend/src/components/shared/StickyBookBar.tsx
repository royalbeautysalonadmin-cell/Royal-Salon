"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookingStore } from "@/store/booking";

export function StickyBookBar() {
  const [visible, setVisible] = useState(false);
  const openBooking = useBookingStore((s) => s.open);

  useEffect(() => {
    const onScroll = () => {
      const servicesSection = document.getElementById("services");
      if (!servicesSection) return;
      const rect = servicesSection.getBoundingClientRect();
      setVisible(rect.top < -200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
              Ready to book your beauty appointment?
            </p>
            <p className="text-sm font-medium text-charcoal sm:hidden">
              Book your appointment
            </p>
            <Button
              onClick={() => openBooking()}
              className="rounded-full bg-brown px-6 py-2.5 text-sm font-semibold text-white shadow-luxury hover:bg-brown/90"
            >
              <CalendarCheck className="mr-2 h-4 w-4" />
              Book Now
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
