import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { ScrollLine } from "@/components/shared/ScrollLine";
import { BookingDialog } from "@/components/booking/BookingDialog";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-luxury-black focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-white focus:shadow-luxury"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="relative">
        {children}
        <ScrollLine />
      </main>
      <Footer />
      <FloatingActions />
      <BookingDialog />
    </>
  );
}
