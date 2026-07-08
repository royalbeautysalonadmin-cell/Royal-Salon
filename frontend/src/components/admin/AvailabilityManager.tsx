"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { Ban, CheckCircle2, Loader2, User, Plus, X, Sparkles } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import type { AdminSlotInfo } from "@/lib/availability";

function todayIso() {
  return new Date().toISOString().split("T")[0];
}

/** Converts an HTML <input type="time"> value ("HH:MM", 24h) to the
 * "h:mm AM/PM" format the backend's TIME_FORMAT_RE expects. */
function to12Hour(value: string): string {
  const [hStr, mStr] = value.split(":");
  let h = parseInt(hStr, 10) % 12;
  if (h === 0) h = 12;
  const period = parseInt(hStr, 10) >= 12 ? "PM" : "AM";
  return `${h}:${mStr} ${period}`;
}

export function AvailabilityManager() {
  const [date, setDate] = useState(todayIso());
  const [slots, setSlots] = useState<AdminSlotInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyTime, setBusyTime] = useState<string | null>(null);
  const [customTime, setCustomTime] = useState("");
  const [addingCustom, setAddingCustom] = useState(false);

  const loadSlots = useCallback(async (d: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/availability?date=${d}`, { cache: "no-store" });
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

  async function addCustom() {
    if (!customTime) return;
    const formatted = to12Hour(customTime);
    setAddingCustom(true);
    try {
      const res = await fetch("/api/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time: formatted, action: "add" }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Could not add time.");
      setSlots(json.slots);
      toast.success(`${formatted} added to the schedule.`);
      setCustomTime("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not add time.");
    } finally {
      setAddingCustom(false);
    }
  }

  async function removeCustom(slot: AdminSlotInfo) {
    setBusyTime(slot.time);
    try {
      const res = await fetch("/api/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time: slot.time, action: "remove" }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Could not remove time.");
      setSlots(json.slots);
      toast.success(`${slot.time} removed.`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not remove time.");
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
        <span className="flex items-center gap-1.5">
          <Sparkles className="h-3 w-3 text-gold" /> Custom time
        </span>
      </div>

      {/* Add a custom time on top of the standard schedule for this date */}
      <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-white p-4 shadow-soft">
        <div className="space-y-1">
          <label htmlFor="custom-time" className="text-sm font-medium text-charcoal">
            Add a custom time
          </label>
          <input
            id="custom-time"
            type="time"
            value={customTime}
            onChange={(e) => setCustomTime(e.target.value)}
            className="block h-11 rounded-xl border border-input bg-white px-4 text-sm text-charcoal focus:border-brown focus:outline-none focus:ring-2 focus:ring-brown/20"
          />
        </div>
        <button
          type="button"
          disabled={!customTime || addingCustom}
          onClick={addCustom}
          className="flex h-11 items-center gap-2 rounded-xl bg-gold px-4 text-sm font-semibold text-luxury-black shadow-sm transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {addingCustom ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          Add to {formatDate(date)}
        </button>
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
              <div
                key={slot.time}
                role="button"
                tabIndex={isBooked || isBusy ? -1 : 0}
                onClick={() => !isBooked && !isBusy && toggle(slot)}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && !isBooked && !isBusy) toggle(slot);
                }}
                className={cn(
                  "relative flex flex-col gap-2 rounded-2xl border p-4 text-left shadow-soft transition-all",
                  isBooked
                    ? "cursor-default border-brown/20 bg-brown/5"
                    : isBlocked
                    ? "cursor-pointer border-charcoal/20 bg-charcoal/5 hover:border-red-300 hover:bg-red-50"
                    : "cursor-pointer border-emerald-200 bg-emerald-50/50 hover:border-emerald-400 hover:bg-emerald-50",
                  isBusy && "pointer-events-none opacity-60"
                )}
              >
                {slot.isCustom && !isBooked && (
                  <button
                    type="button"
                    aria-label={`Remove ${slot.time}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCustom(slot);
                    }}
                    className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-charcoal/50 shadow-sm transition-colors hover:bg-red-50 hover:text-red-500"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 font-serif text-base font-semibold text-luxury-black">
                    {slot.time}
                    {slot.isCustom && <Sparkles className="h-3.5 w-3.5 text-gold" />}
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
