import type { NextAuthOptions } from "next-auth";

/**
 * Minimal NextAuth config used ONLY for `getServerSession()` in the admin
 * layout to verify the session cookie server-side (pure JWT decode, no DB,
 * no provider invocation). The actual sign-in flow (CredentialsProvider +
 * DB lookup) lives in the backend and is reached through the `/api/auth/*`
 * rewrite in next.config.ts — this file must never register its own
 * `/api/auth/[...nextauth]` route, or it would shadow that proxy.
 *
 * `secret` MUST match the backend's NEXTAUTH_SECRET exactly, since that's
 * what the JWT was signed with.
 */
export const authOptions: NextAuthOptions = {
  providers: [],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};
