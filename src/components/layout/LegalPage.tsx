import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="bg-cream pt-32">
        <div className="container-luxury max-w-3xl pb-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-brown hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <h1 className="mt-6 font-serif text-4xl font-semibold text-luxury-black">{title}</h1>
          <p className="mt-2 text-sm text-charcoal/50">Last updated: {updated}</p>
          <div className="prose-luxury mt-8 space-y-5 text-charcoal/75 [&_h2]:mt-8 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-luxury-black [&_p]:leading-relaxed">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
