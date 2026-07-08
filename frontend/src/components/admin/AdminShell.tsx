"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import {
  LayoutDashboard,
  CalendarCheck,
  CalendarClock,
  Scissors,
  Images,
  MessageSquareQuote,
  Mail,
  LogOut,
  Crown,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { playNotificationSound } from "@/lib/notify-sound";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/appointments", label: "Appointments", icon: CalendarCheck },
  { href: "/admin/availability", label: "Availability", icon: CalendarClock },
  { href: "/admin/services", label: "Services", icon: Scissors },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/messages", label: "Messages", icon: Mail },
];

const POLL_INTERVAL_MS = 20_000;

/** Polls appointments + messages in the background and alerts the admin
 * (sound + toast + sidebar badge) when new pending appointments or unread
 * messages show up — without needing to leave/refresh the current tab. */
function useAdminNotifications() {
  const [pendingCount, setPendingCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const pendingRef = useRef(0);
  const unreadRef = useRef(0);
  const initializedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      try {
        const [bookingsRes, messagesRes] = await Promise.all([
          fetch("/api/bookings", { cache: "no-store" }),
          fetch("/api/messages", { cache: "no-store" }),
        ]);
        if (cancelled || !bookingsRes.ok || !messagesRes.ok) return;
        const [bookingsData, messagesData]: [
          { appointments?: { status: string }[] },
          { messages?: { read?: boolean }[] },
        ] = await Promise.all([bookingsRes.json(), messagesRes.json()]);
        if (cancelled) return;

        const newPending = (bookingsData.appointments || []).filter(
          (a) => a.status === "pending"
        ).length;
        const newUnread = (messagesData.messages || []).filter((m) => !m.read).length;

        if (initializedRef.current) {
          if (newPending > pendingRef.current) {
            playNotificationSound();
            toast.success("New appointment booked!");
          }
          if (newUnread > unreadRef.current) {
            playNotificationSound();
            toast.success("New message received!");
          }
        }
        initializedRef.current = true;
        pendingRef.current = newPending;
        unreadRef.current = newUnread;
        setPendingCount(newPending);
        setUnreadCount(newUnread);
      } catch {
        // Transient network error — the next poll will retry.
      }
    }

    poll();
    const id = setInterval(poll, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return { pendingCount, unreadCount };
}

function NavBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[0.65rem] font-bold text-white">
      {count > 99 ? "99+" : count}
    </span>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { pendingCount, unreadCount } = useAdminNotifications();

  return (
    <div className="min-h-screen bg-cream">
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-border bg-white px-4 py-3 lg:hidden">
        <span className="flex items-center gap-2 font-serif text-lg font-semibold">
          <Crown className="h-5 w-5 text-brown" /> Admin
        </span>
        <button onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 flex w-64 transform flex-col border-r border-border bg-luxury-black text-white transition-transform lg:static lg:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex shrink-0 items-center gap-3 border-b border-white/10 px-6 py-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brown-gradient text-white">
              <Crown className="h-5 w-5" />
            </span>
            <div className="leading-none">
              <p className="font-serif text-base">Royal Beauty</p>
              <p className="text-[0.6rem] uppercase tracking-[0.3em] text-gold">Admin</p>
            </div>
          </div>

          <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-4">
            {links.map((link) => {
              const active =
                link.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(link.href);
              const badgeCount =
                link.href === "/admin/appointments"
                  ? pendingCount
                  : link.href === "/admin/messages"
                    ? unreadCount
                    : 0;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-brown-gradient text-white"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                  <NavBadge count={badgeCount} />
                </Link>
              );
            })}
          </nav>

          <div className="shrink-0 border-t border-white/10 p-4">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            >
              <ExternalLink className="h-4 w-4" /> View Site
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-brown-300"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>
        </aside>

        {open && (
          <div
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        {/* Content */}
        <main className="flex-1 p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
