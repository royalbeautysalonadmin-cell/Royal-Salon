"use client";

/**
 * Lightweight, dependency-free client analytics helper.
 *
 * Both GA4 (`window.gtag`) and the Meta Pixel (`window.fbq`) are loaded by
 * `components/analytics.tsx` only when their env IDs are configured. This
 * module is the single place the UI fires *conversion* events from, so the
 * "which button actually drives bookings" question has one answer.
 *
 * Every call is a no-op when the scripts are absent, and is wrapped in a
 * try/catch so a blocked/analytics-tool failure can never break the UI.
 */

export type ConversionEvent =
  | "book_open"
  | "book_success"
  | "whatsapp_click"
  | "call_click"
  | "contact_click";

interface AnalyticsWindow extends Window {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
}

/** Meta Pixel's standard event names for our conversion actions. */
const FB_EVENT_MAP: Record<ConversionEvent, string> = {
  book_open: "InitiateCheckout",
  book_success: "Schedule",
  whatsapp_click: "Contact",
  call_click: "Contact",
  contact_click: "Contact",
};

export function trackEvent(
  name: ConversionEvent,
  params: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;
  const w = window as AnalyticsWindow;
  try {
    w.gtag?.("event", name, params);
    w.fbq?.("track", FB_EVENT_MAP[name], params);
  } catch {
    // Analytics must never break the booking flow.
  }
}

/** Fires a GA4 `page_view` for client-side App Router navigations. */
export function trackPageView(path: string): void {
  if (typeof window === "undefined") return;
  const w = window as AnalyticsWindow;
  try {
    w.gtag?.("event", "page_view", {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
    w.fbq?.("track", "PageView");
  } catch {
    // ignore
  }
}
