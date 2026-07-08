"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { Ban, CheckCircle2, Loader2, User } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import type { AdminSlotInfo } from "@/lib/availability";

function todayIso() {
  return new Date().toISOString().split("T")[0];
}

export function AvailabilityManager() {
  const [date, setDate] = useState(todayIso());
  const [slots, setSlots] = useState<AdminSlotInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyTime, setBusyTime] = useState<string | null>(null);

  const loadSlots = useCallback(async (d: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/availability?date=${d}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setSlots(data.slots);
    } catch {
      toast.error("Couldn't load availability for that date.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSlots(date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  async function toggle(slot: AdminSlotInfo) {
    if (slot.status === "booked") return;
    const action = slot.status === "blocked" ? "unblock" : "block";
    setBusyTime(slot.time);
    try {
      const res = await fetch("/api/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time: slot.time, action }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Update failed.");
      setSlots(json.slots);
      toast.success(action === "block" ? `${slot.time} blocked.` : `${slot.time} reopened.`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed.");
    } finally {
      setBusyTime(null);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <label htmlFor="avail-date" className="text-sm font-medium text-charcoal">
            Date
          </label>
          <input
            id="avail-date"
            type="date"
            value={date}
            min={todayIso()}
            onChange={(e) => setDate(e.target.value)}
            className="block h-11 rounded-xl border border-input bg-white px-4 text-sm text-charcoal focus:border-brown focus:outline-none focus:ring-2 focus:ring-brown/20"
          />
        </div>
        <p className="text-sm text-charcoal/70">{formatDate(date)}</p>
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-charcoal/70">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /> Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-brown" /> Booked
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-charcoal/40" /> Blocked
        </span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-white py-16 text-sm text-charcoal/70">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading...
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {slots.map((slot) => {
            const isBusy = busyTime === slot.time;
            const isBooked = slot.status === "booked";
            const isBlocked = slot.status === "blocked";
            return (
              <button
                key={slot.time}
                type="button"
                disabled={isBooked || isBusy}
                onClick={() => toggle(slot)}
                className={cn(
                  "flex flex-col gap-2 rounded-2xl border p-4 text-left shadow-soft transition-all",
                  isBooked
                    ? "cursor-default border-brown/20 bg-brown/5"
                    : isBlocked
                    ? "border-charcoal/20 bg-charcoal/5 hover:border-red-300 hover:bg-red-50"
                    : "border-emerald-200 bg-emerald-50/50 hover:border-emerald-400 hover:bg-emerald-50",
                  isBusy && "opacity-60"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-base font-semibold text-luxury-black">
                    {slot.time}
                  </span>
                  {isBusy ? (
                    <Loader2 className="h-4 w-4 animate-spin text-charcoal/50" />
                  ) : isBooked ? (
                    <User className="h-4 w-4 text-brown" />
                  ) : isBlocked ? (
                    <Ban className="h-4 w-4 text-charcoal/50" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  )}
                </div>
                {isBooked && slot.appointment ? (
                  <p className="text-xs text-charcoal/70">
                    <span className="font-medium text-charcoal">{slot.appointment.name}</span>
                    {" · "}
                    {slot.appointment.serviceName || slot.appointment.service}
                  </p>
                ) : isBlocked ? (
                  <p className="text-xs text-charcoal/70">Blocked — click to reopen</p>
                ) : (
                  <p className="text-xs text-charcoal/70">Open — click to block</p>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
