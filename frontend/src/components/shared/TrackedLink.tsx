"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackEvent, type ConversionEvent } from "@/lib/analytics";

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  event: ConversionEvent;
  params?: Record<string, unknown>;
  children: ReactNode;
}

/**
 * An `<a>` that fires a conversion event on click. Lets server components
 * (e.g. the service detail page) get click tracking without becoming
 * client components themselves.
 */
export function TrackedLink({ event, params, onClick, children, ...rest }: TrackedLinkProps) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        trackEvent(event, params);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
