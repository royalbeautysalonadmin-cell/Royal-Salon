import { ServicesManager } from "@/components/admin/ServicesManager";

export default function ServicesAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-luxury-black">Services</h1>
        <p className="text-charcoal/70">Add, edit and remove the treatments offered.</p>
      </div>
      <ServicesManager />
    </div>
  );
}
