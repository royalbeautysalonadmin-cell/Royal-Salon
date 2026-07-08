"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  PartyPopper,
  Loader2,
  Search,
  AlertCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn, formatPrice, formatDate } from "@/lib/utils";
import { useBookingStore } from "@/store/booking";
import { SERVICE_CATEGORIES } from "@/lib/validation";
import type { SlotInfo } from "@/lib/availability";
import type { ServiceCategory } from "@/types";

interface BookableService {
  _id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  price: number;
  duration?: string;
}

const STEPS = ["Service", "Date", "Time", "Details", "Confirm"];

function nextDays(count: number) {
  const days: Date[] = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

export function BookingDialog() {
  const { isOpen, close, preselectedService } = useBookingStore();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [services, setServices] = useState<BookableService[]>([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [servicesError, setServicesError] = useState<string | null>(null);

  const [slots, setSlots] = useState<SlotInfo[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);

  const [serviceSearch, setServiceSearch] = useState("");
  const [serviceCategory, setServiceCategory] = useState<ServiceCategory | "All">("All");

  const [form, setForm] = useState({
    service: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const days = useMemo(() => nextDays(21), []);
  const selectedService = services.find((s) => s.slug === form.service);

  // Fetch the live, bookable (active-only) service catalog each time the
  // dialog opens, so admin-side add/disable/delete is reflected immediately.
  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    setLoadingServices(true);
    setServicesError(null);
    fetch("/api/services?active=true", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data: { services: BookableService[] }) => {
        if (!cancelled) setServices(data.services || []);
      })
      .catch(() => {
        if (!cancelled) setServicesError("Couldn't load services. Please try again.");
      })
      .finally(() => {
        if (!cancelled) setLoadingServices(false);
      });
    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  // Fetch real slot availability for the chosen date — merges admin-blocked
  // slots and existing customer bookings, so double-booking is impossible.
  useEffect(() => {
    if (!isOpen || !form.date) {
      setSlots([]);
      return;
    }
    let cancelled = false;
    setLoadingSlots(true);
    setSlotsError(null);
    fetch(`/api/availability?date=${form.date}`, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data: { slots: SlotInfo[] }) => {
        if (!cancelled) setSlots(data.slots || []);
      })
      .catch(() => {
        if (!cancelled) setSlotsError("Couldn't load availability. Please try again.");
      })
      .finally(() => {
        if (!cancelled) setLoadingSlots(false);
      });
    return () => {
      cancelled = true;
    };
  }, [isOpen, form.date]);

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setDone(false);
      setError(null);
      setServiceSearch("");
      setServiceCategory("All");
      setForm((f) => ({
        ...f,
        service: preselectedService || "",
        date: "",
        time: "",
      }));
    }
  }, [isOpen, preselectedService]);

  // Once services load, confirm the preselected slug actually exists among
  // them (it may have been disabled/deleted) — otherwise clear the selection.
  useEffect(() => {
    if (!loadingServices && form.service && !services.some((s) => s.slug === form.service)) {
      setForm((f) => ({ ...f, service: "" }));
    }
  }, [loadingServices, services, form.service]);

  // If the chosen time is no longer available once slots load for the date
  // (booked or blocked since the dialog opened), clear it so the customer
  // has to pick a genuinely open slot.
  useEffect(() => {
    if (!loadingSlots && form.time) {
      const slot = slots.find((s) => s.time === form.time);
      if (!slot || slot.status !== "available") {
        setForm((f) => ({ ...f, time: "" }));
      }
    }
  }, [loadingSlots, slots, form.time]);

  const update = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }));

  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      const matchCategory = serviceCategory === "All" || s.category === serviceCategory;
      const matchSearch =
        !serviceSearch || s.name.toLowerCase().includes(serviceSearch.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [services, serviceSearch, serviceCategory]);

  const servicesByCategory = useMemo(() => {
    const grouped: Record<string, BookableService[]> = {};
    for (const cat of SERVICE_CATEGORIES) {
      const items = filteredServices.filter((s) => s.category === cat);
      if (items.length > 0) grouped[cat] = items;
    }
    return grouped;
  }, [filteredServices]);

  const canNext = useMemo(() => {
    switch (step) {
      case 0: return !!form.service;
      case 1: return !!form.date;
      case 2: return !!form.time;
      case 3: return form.name.length > 1 && /\S+@\S+\.\S+/.test(form.email) && form.phone.length > 5;
      default: return true;
    }
  }, [step, form]);

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          serviceName: selectedService?.name,
        }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        throw new Error(json?.error || "Booking failed");
      }
      setDone(true);
    } catch (err) {
      setError(
        err instanceof Error && err.message !== "Booking failed"
          ? err.message
          : "We couldn't submit your booking. Please try again or call us directly."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && close()}>
      <DialogContent className="max-w-xl overflow-hidden p-0">
        <DialogTitle className="sr-only">Book an Appointment</DialogTitle>

        {done ? (
          <SuccessScreen
            service={selectedService?.name}
            date={form.date}
            time={form.time}
            onClose={close}
          />
        ) : (
          <div>
            <div className="bg-brown-gradient px-6 py-5 text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                <h2 className="font-serif text-xl font-semibold">Book Your Appointment</h2>
              </div>
              <div className="mt-4 flex items-center gap-1.5">
                {STEPS.map((label, i) => (
                  <div key={label} className="flex flex-1 flex-col items-center gap-1.5">
                    <div className="flex w-full items-center">
                      <div
                        className={cn(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                          i < step
                            ? "bg-white text-brown"
                            : i === step
                            ? "bg-white text-brown ring-4 ring-white/30"
                            : "bg-white/20 text-white"
                        )}
                      >
                        {i < step ? <Check className="h-4 w-4" /> : i + 1}
                      </div>
                      {i < STEPS.length - 1 && (
                        <div
                          className={cn(
                            "h-0.5 flex-1 transition-colors",
                            i < step ? "bg-white" : "bg-white/20"
                          )}
                        />
                      )}
                    </div>
                    <span className="hidden text-[0.65rem] sm:block">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="max-h-[55vh] overflow-y-auto px-6 py-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25 }}
                >
                  {step === 0 && (
                    <div>
                      <p className="mb-3 text-sm text-charcoal/70">Choose your treatment</p>

                      {loadingServices ? (
                        <div className="flex items-center justify-center gap-2 py-14 text-sm text-charcoal/70">
                          <Loader2 className="h-4 w-4 animate-spin" /> Loading services...
                        </div>
                      ) : servicesError ? (
                        <div className="flex flex-col items-center gap-2 py-14 text-center text-sm text-charcoal/70">
                          <AlertCircle className="h-5 w-5 text-red-500" />
                          {servicesError}
                        </div>
                      ) : services.length === 0 ? (
                        <div className="flex flex-col items-center gap-2 py-14 text-center text-sm text-charcoal/70">
                          <AlertCircle className="h-5 w-5 text-brown" />
                          No services are available to book right now.
                          <br />
                          Please call or WhatsApp us directly.
                        </div>
                      ) : (
                        <>
                          <div className="relative mb-3">
                            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-charcoal/70" />
                            <input
                              type="text"
                              placeholder="Search services..."
                              value={serviceSearch}
                              onChange={(e) => setServiceSearch(e.target.value)}
                              className="w-full rounded-lg border border-brown/15 bg-cream/30 py-2 pl-9 pr-3 text-sm text-charcoal placeholder:text-charcoal/70 focus:border-brown focus:outline-none focus:ring-1 focus:ring-brown/10"
                            />
                          </div>

                          <div className="mb-3 flex flex-wrap gap-1.5">
                            {(["All", ...SERVICE_CATEGORIES] as const).map((cat) => (
                              <button
                                key={cat}
                                onClick={() => setServiceCategory(cat)}
                                className={cn(
                                  "rounded-full px-3 py-1 text-xs font-medium transition-all",
                                  serviceCategory === cat
                                    ? "bg-brown text-white"
                                    : "bg-cream text-charcoal/70 hover:bg-brown/10"
                                )}
                              >
                                {cat}
                              </button>
                            ))}
                          </div>

                          <div className="space-y-4">
                            {Object.entries(servicesByCategory).map(([cat, items]) => (
                              <div key={cat}>
                                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brown/70">
                                  {cat}
                                </p>
                                <div className="grid gap-1.5">
                                  {items.map((s) => (
                                    <button
                                      key={s.slug}
                                      onClick={() => update({ service: s.slug })}
                                      className={cn(
                                        "flex items-center justify-between rounded-xl border p-3 text-left transition-all",
                                        form.service === s.slug
                                          ? "border-brown bg-brown/5 ring-1 ring-brown"
                                          : "border-border hover:border-brown/40"
                                      )}
                                    >
                                      <span className="min-w-0 flex-1">
                                        <span className="block truncate text-sm font-medium text-charcoal">
                                          {s.name}
                                        </span>
                                        {s.duration && (
                                          <span className="block text-xs text-charcoal/70">
                                            {s.duration}
                                          </span>
                                        )}
                                      </span>
                                      <span className="ml-2 shrink-0 text-sm font-semibold text-brown">
                                        {formatPrice(s.price)}
                                      </span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {step === 1 && (
                    <div>
                      <p className="mb-4 flex items-center gap-2 text-sm text-charcoal/70">
                        <CalendarIcon className="h-4 w-4 text-brown" /> Select a date
                      </p>
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                        {days.map((d) => {
                          const iso = d.toISOString().split("T")[0];
                          const active = form.date === iso;
                          return (
                            <button
                              key={iso}
                              onClick={() => update({ date: iso })}
                              className={cn(
                                "flex flex-col items-center rounded-xl border py-3 transition-all",
                                active
                                  ? "border-brown bg-brown text-white"
                                  : "border-border hover:border-brown/40"
                              )}
                            >
                              <span className="text-[0.65rem] uppercase opacity-70">
                                {d.toLocaleDateString("en", { weekday: "short" })}
                              </span>
                              <span className="text-lg font-semibold">{d.getDate()}</span>
                              <span className="text-[0.65rem] opacity-70">
                                {d.toLocaleDateString("en", { month: "short" })}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <p className="mb-4 flex items-center gap-2 text-sm text-charcoal/70">
                        <Clock className="h-4 w-4 text-brown" /> Choose a time
                      </p>
                      {loadingSlots ? (
                        <div className="flex items-center justify-center gap-2 py-14 text-sm text-charcoal/70">
                          <Loader2 className="h-4 w-4 animate-spin" /> Checking availability...
                        </div>
                      ) : slotsError ? (
                        <div className="flex flex-col items-center gap-2 py-14 text-center text-sm text-charcoal/70">
                          <AlertCircle className="h-5 w-5 text-red-500" />
                          {slotsError}
                        </div>
                      ) : (
                        <>
                          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                            {slots.map((s) => {
                              const isAvailable = s.status === "available";
                              const isSelected = form.time === s.time;
                              return (
                                <button
                                  key={s.time}
                                  disabled={!isAvailable}
                                  onClick={() => isAvailable && update({ time: s.time })}
                                  title={
                                    s.status === "booked"
                                      ? "Already booked"
                                      : s.status === "blocked"
                                      ? "Not available"
                                      : undefined
                                  }
                                  className={cn(
                                    "rounded-xl border py-2.5 text-sm transition-all",
                                    isSelected
                                      ? "border-brown bg-brown text-white"
                                      : isAvailable
                                      ? "border-border hover:border-brown/40"
                                      : "cursor-not-allowed border-border/50 bg-cream/50 text-charcoal/70 line-through"
                                  )}
                                >
                                  {s.time}
                                </button>
                              );
                            })}
                          </div>
                          <p className="mt-3 text-xs text-charcoal/70">
                            Greyed-out times are already booked or unavailable.
                          </p>
                        </>
                      )}
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                          <Label htmlFor="b-name">Full Name *</Label>
                          <Input
                            id="b-name"
                            value={form.name}
                            onChange={(e) => update({ name: e.target.value })}
                            placeholder="Your name"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="b-phone">Phone *</Label>
                          <Input
                            id="b-phone"
                            value={form.phone}
                            onChange={(e) => update({ phone: e.target.value })}
                            placeholder="+48 ..."
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="b-email">Email *</Label>
                        <Input
                          id="b-email"
                          type="email"
                          value={form.email}
                          onChange={(e) => update({ email: e.target.value })}
                          placeholder="you@email.com"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="b-notes">Notes (optional)</Label>
                        <Textarea
                          id="b-notes"
                          value={form.notes}
                          onChange={(e) => update({ notes: e.target.value })}
                          placeholder="Any preferences or requests..."
                        />
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-4">
                      <p className="text-sm text-charcoal/70">Please confirm your details</p>
                      <div className="space-y-3 rounded-2xl border border-brown/15 bg-cream/50 p-5">
                        <Row label="Service" value={selectedService?.name || "—"} />
                        <Row label="Price" value={selectedService ? formatPrice(selectedService.price) : "—"} />
                        <Row label="Date" value={form.date ? formatDate(form.date) : "—"} />
                        <Row label="Time" value={form.time} />
                        <Row label="Name" value={form.name} />
                        <Row label="Phone" value={form.phone} />
                        <Row label="Email" value={form.email} />
                        {form.notes && <Row label="Notes" value={form.notes} />}
                      </div>
                      {error && (
                        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between border-t border-border px-6 py-4">
              <Button
                variant="ghost"
                onClick={() => (step === 0 ? close() : setStep((s) => s - 1))}
                disabled={submitting}
              >
                {step === 0 ? "Cancel" : <><ChevronLeft className="h-4 w-4" /> Back</>}
              </Button>
              {step < STEPS.length - 1 ? (
                <Button variant="gold" onClick={() => setStep((s) => s + 1)} disabled={!canNext}>
                  Continue <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button variant="gold" onClick={submit} disabled={submitting}>
                  {submitting ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Booking...</>
                  ) : (
                    <>Confirm Booking <Check className="h-4 w-4" /></>
                  )}
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-charcoal/70">{label}</span>
      <span className="text-right font-medium text-charcoal">{value}</span>
    </div>
  );
}

function SuccessScreen({
  service,
  date,
  time,
  onClose,
}: {
  service?: string;
  date: string;
  time: string;
  onClose: () => void;
}) {
  return (
    <div className="px-8 py-12 text-center">
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brown-gradient text-white shadow-gold"
      >
        <PartyPopper className="h-9 w-9" />
      </motion.div>
      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 font-serif text-2xl font-semibold text-luxury-black"
      >
        Booking Confirmed!
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-charcoal/70"
      >
        Thank you for booking with Royal Beauty Salon. We&apos;ve received your request and sent a
        confirmation to your email. Our team will contact you shortly.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mx-auto mt-6 max-w-xs rounded-2xl border border-brown/15 bg-cream/50 p-4 text-sm"
      >
        <p className="font-semibold text-brown">{service}</p>
        <p className="mt-1 text-charcoal/70">
          {date ? formatDate(date) : ""} &middot; {time}
        </p>
      </motion.div>
      <Button variant="gold" className="mt-7" onClick={onClose}>
        Done
      </Button>
    </div>
  );
}
