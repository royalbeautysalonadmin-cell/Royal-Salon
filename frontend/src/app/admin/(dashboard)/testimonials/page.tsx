import { TestimonialsManager } from "@/components/admin/TestimonialsManager";

export default function TestimonialsAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-luxury-black">Testimonials</h1>
        <p className="text-charcoal/70">Manage client reviews shown on the website.</p>
      </div>
      <TestimonialsManager />
    </div>
  );
}
