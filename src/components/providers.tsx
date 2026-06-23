"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="top-center"
        richColors
        toastOptions={{
          style: { fontFamily: "var(--font-jost)", borderRadius: "0.75rem" },
        }}
      />
    </SessionProvider>
  );
}
