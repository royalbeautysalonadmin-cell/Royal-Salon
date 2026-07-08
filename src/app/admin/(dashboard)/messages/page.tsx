import { MessagesManager } from "@/components/admin/MessagesManager";

export default function MessagesAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-luxury-black">Messages</h1>
        <p className="text-charcoal/70">Inquiries submitted through the contact form.</p>
      </div>
      <MessagesManager />
    </div>
  );
}
