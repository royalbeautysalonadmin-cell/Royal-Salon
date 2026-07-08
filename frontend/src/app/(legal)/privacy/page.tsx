import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Royal Beauty Salon in Warsaw collects, uses and protects your personal information.",
  alternates: { canonical: `${siteConfig.url}/privacy` },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="June 2026">
      <p>
        At Royal Beauty Salon, your privacy is paramount. This policy explains how we collect, use
        and protect your personal information when you visit our website or book our services.
      </p>
      <h2>Information We Collect</h2>
      <p>
        We collect the details you provide when booking an appointment or contacting us — your name,
        email, phone number and any notes you share. This information is used solely to manage your
        appointment and communicate with you.
      </p>
      <h2>How We Use Your Data</h2>
      <p>
        Your information is used to confirm bookings, send appointment notifications, and improve our
        services. We never sell or share your personal data with third parties for marketing.
      </p>
      <h2>Data Security</h2>
      <p>
        We apply industry-standard measures to safeguard your information. You may request access to
        or deletion of your data at any time by contacting us.
      </p>
    </LegalPage>
  );
}
