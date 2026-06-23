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
import { services } from "@/data/content";

const TIME_SLOTS = [
  "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
  "06:00 PM", "07:00 PM", "08:00 PM",
];

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

  // Reset / preselect on open
  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setDone(false);
      setError(null);
      setForm((f) => ({
        ...f,
        service: preselectedService && services.some((s) => s.slug === preselectedService)
          ? preselectedService
          : "",
        date: "",
        time: "",
      }));
    }
  }, [isOpen, preselectedService]);

  const update = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }));

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
      if (!res.ok) throw new Error("Booking failed");
      setDone(true);
    } catch {
      setError("We couldn't submit your booking. Please try again or WhatsApp us.");
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
            {/* Header + progress */}
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

            {/* Step content */}
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
                      <p className="mb-4 text-sm text-charcoal/60">Choose your treatment</p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {services.map((s) => (
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
                            <span>
                              <span className="block text-sm font-medium text-charcoal">{s.name}</span>
                              <span className="block text-xs text-charcoal/50">{s.duration}</span>
                            </span>
                            <span className="text-sm font-semibold text-brown">
                              {formatPrice(s.price)}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div>
                      <p className="mb-4 flex items-center gap-2 text-sm text-charcoal/60">
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
                      <p className="mb-4 flex items-center gap-2 text-sm text-charcoal/60">
                        <Clock className="h-4 w-4 text-brown" /> Choose a time
                      </p>
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                        {TIME_SLOTS.map((t) => (
                          <button
                            key={t}
                            onClick={() => update({ time: t })}
                            className={cn(
                              "rounded-xl border py-2.5 text-sm transition-all",
                              form.time === t
                                ? "border-brown bg-brown text-white"
                                : "border-border hover:border-brown/40"
                            )}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
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
                            placeholder="+971 ..."
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
                      <p className="text-sm text-charcoal/60">Please confirm your details</p>
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

            {/* Footer nav */}
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
      <span className="text-charcoal/55">{label}</span>
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
        className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-charcoal/65"
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
          {date ? formatDate(date) : ""} · {time}
        </p>
      </motion.div>
      <Button variant="gold" className="mt-7" onClick={onClose}>
        Done
      </Button>
    </div>
  );
}
