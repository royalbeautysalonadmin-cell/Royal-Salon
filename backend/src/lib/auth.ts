import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB, isDbConfigured } from "./db";
import { User } from "@/models/User";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const email = credentials.email.toLowerCase();

        // DB-backed auth
        if (isDbConfigured) {
          await connectDB();
          const user = await User.findOne({ email }).select("+password").lean<{
            _id: unknown;
            name: string;
            email: string;
            password: string;
            role: string;
          }>();
          if (user && (await bcrypt.compare(credentials.password, user.password))) {
            return { id: String(user._id), name: user.name, email: user.email, role: user.role };
          }
          return null;
        }

        // Fallback demo auth via env (no DB configured)
        if (
          email === (process.env.ADMIN_EMAIL || "").toLowerCase() &&
          credentials.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "demo-admin", name: "Salon Admin", email, role: "admin" };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role || "admin";
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
