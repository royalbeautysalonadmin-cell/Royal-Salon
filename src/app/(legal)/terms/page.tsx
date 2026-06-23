import { LegalPage } from "@/components/layout/LegalPage";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="June 2026">
      <p>
        Welcome to Royal Beauty Salon. By booking our services or using our website, you agree to
        the following terms.
      </p>
      <h2>Appointments</h2>
      <p>
        Appointment requests are confirmed by our team. We may contact you to verify availability.
        Please arrive on time to enjoy your full treatment experience.
      </p>
      <h2>Cancellations</h2>
      <p>
        Appointments may be rescheduled or cancelled up to 24 hours in advance at no charge. Bridal
        bookings are subject to a separate deposit and cancellation policy.
      </p>
      <h2>Pricing</h2>
      <p>
        All prices are listed in PLN (zł) and may vary based on hair length, complexity and additional
        requests. Final pricing is confirmed at consultation.
      </p>
      <h2>Liability</h2>
      <p>
        Please inform us of any allergies or sensitivities before your treatment. Royal Beauty
        Salon is not liable for reactions arising from undisclosed conditions.
      </p>
    </LegalPage>
  );
}
