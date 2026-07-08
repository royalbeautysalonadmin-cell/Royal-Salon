"use client";

import { Toaster } from "sonner";
import { type ReactNode } from "react";

// No SessionProvider here: nothing in this app calls `useSession()` (the
// admin dashboard uses `getServerSession` server-side; login/logout use the
// standalone `signIn`/`signOut` functions, neither of which needs the
// context provider). Mounting it globally used to fire an unnecessary
// /api/auth/session fetch + extra client JS on every public page load.
export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        richColors
        toastOptions={{
          style: { fontFamily: "var(--font-jost)", borderRadius: "0.75rem" },
        }}
      />
    </>
  );
}
