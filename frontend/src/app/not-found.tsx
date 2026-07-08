import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-4 text-center">
      <p className="font-serif text-8xl font-semibold text-gradient-brown">404</p>
      <h1 className="mt-4 font-serif text-2xl font-semibold text-luxury-black">
        This page took a beauty break
      </h1>
      <p className="mt-2 max-w-md text-charcoal/70">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to the glamour.
      </p>
      <Button variant="gold" className="mt-8" asChild>
        <Link href="/">
          <Home className="h-4 w-4" /> Back to Home
        </Link>
      </Button>
    </div>
  );
}
