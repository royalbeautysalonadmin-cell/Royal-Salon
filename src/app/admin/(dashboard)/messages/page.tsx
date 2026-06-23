import { connectDB, isDbConfigured } from "@/lib/db";
import { ContactMessage } from "@/models/index";
import { MessagesManager, type AdminMessage } from "@/components/admin/MessagesManager";

export const dynamic = "force-dynamic";

async function getData(): Promise<{ items: AdminMessage[]; configured: boolean }> {
  if (!isDbConfigured) return { items: [], configured: false };
  await connectDB();
  const items = JSON.parse(
    JSON.stringify(await ContactMessage.find().sort({ createdAt: -1 }).lean())
  ) as AdminMessage[];
  return { items, configured: true };
}

export default async function MessagesAdminPage() {
  const { items, configured } = await getData();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-luxury-black">Messages</h1>
        <p className="text-charcoal/60">Inquiries submitted through the contact form.</p>
      </div>
      {!configured && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-700">
          <strong>Demo mode:</strong> connect <code>MONGODB_URI</code> to view inquiries.
        </div>
      )}
      <MessagesManager initial={items} />
    </div>
  );
}
