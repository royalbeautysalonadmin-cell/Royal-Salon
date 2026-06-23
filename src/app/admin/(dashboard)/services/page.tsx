import { connectDB, isDbConfigured } from "@/lib/db";
import { ServiceModel } from "@/models/Service";
import { ServicesManager, type AdminService } from "@/components/admin/ServicesManager";

export const dynamic = "force-dynamic";

async function getData(): Promise<{ items: AdminService[]; configured: boolean }> {
  if (!isDbConfigured) return { items: [], configured: false };
  await connectDB();
  const items = JSON.parse(
    JSON.stringify(await ServiceModel.find().sort({ createdAt: -1 }).lean())
  ) as AdminService[];
  return { items, configured: true };
}

export default async function ServicesAdminPage() {
  const { items, configured } = await getData();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-luxury-black">Services</h1>
        <p className="text-charcoal/60">Add, edit and remove the treatments offered.</p>
      </div>
      {!configured && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-700">
          <strong>Demo mode:</strong> connect <code>MONGODB_URI</code> and run <code>npm run seed</code> to manage services.
        </div>
      )}
      <ServicesManager initial={items} disabled={!configured} />
    </div>
  );
}
