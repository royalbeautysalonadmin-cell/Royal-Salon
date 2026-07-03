import { connectDB, isDbConfigured } from "@/lib/db";
import { Testimonial } from "@/models/index";
import { TestimonialsManager, type AdminTestimonial } from "@/components/admin/TestimonialsManager";

export const dynamic = "force-dynamic";

async function getData(): Promise<{ items: AdminTestimonial[]; configured: boolean }> {
  if (!isDbConfigured) return { items: [], configured: false };
  await connectDB();
  const items = JSON.parse(
    JSON.stringify(await Testimonial.find().sort({ createdAt: -1 }).lean())
  ) as AdminTestimonial[];
  return { items, configured: true };
}

export default async function TestimonialsAdminPage() {
  const { items, configured } = await getData();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-luxury-black">Testimonials</h1>
        <p className="text-charcoal/70">Manage client reviews shown on the website.</p>
      </div>
      {!configured && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-700">
          <strong>Demo mode:</strong> connect <code>MONGODB_URI</code> to manage testimonials.
        </div>
      )}
      <TestimonialsManager initial={items} disabled={!configured} />
    </div>
  );
}
