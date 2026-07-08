"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, Trash2, MailOpen, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export interface AdminMessage {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export function MessagesManager() {
  const [items, setItems] = useState<AdminMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/messages")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data: { messages: AdminMessage[] }) => setItems(data.messages || []))
      .catch(() => toast.error("Couldn't load messages."))
      .finally(() => setLoading(false));
  }, []);

  async function markRead(id: string) {
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });
      if (!res.ok) throw new Error();
      setItems((p) => p.map((m) => (m._id === id ? { ...m, read: true } : m)));
    } catch {
      toast.error("Update failed.");
    }
  }

  async function remove(id: string) {
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setItems((p) => p.filter((m) => m._id !== id));
      toast.success("Message deleted.");
    } catch {
      toast.error("Delete failed.");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-white py-16 text-sm text-charcoal/70">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-white py-16 text-center text-sm text-charcoal/70">
        No messages yet.
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {items.map((m) => (
        <div
          key={m._id}
          className={`rounded-2xl border p-5 shadow-soft ${
            m.read ? "border-border bg-white" : "border-brown/30 bg-brown/[0.03]"
          }`}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-serif text-lg font-semibold text-luxury-black">{m.name}</p>
                {!m.read && <Badge variant="default">New</Badge>}
              </div>
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-charcoal/70">
                <a href={`mailto:${m.email}`} className="flex items-center gap-1 hover:text-brown">
                  <Mail className="h-3 w-3" /> {m.email}
                </a>
                {m.phone && (
                  <a href={`tel:${m.phone}`} className="flex items-center gap-1 hover:text-brown">
                    <Phone className="h-3 w-3" /> {m.phone}
                  </a>
                )}
                <span>{formatDate(m.createdAt)}</span>
              </div>
              <p className="mt-3 text-sm text-charcoal/75">{m.message}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              {!m.read && (
                <Button size="sm" variant="outline" onClick={() => markRead(m._id)}>
                  <CheckCircle2 className="h-4 w-4" /> Mark read
                </Button>
              )}
              {m.read && (
                <span className="flex items-center gap-1 text-xs text-charcoal/70">
                  <MailOpen className="h-4 w-4" /> Read
                </span>
              )}
              <Button
                size="sm"
                variant="ghost"
                className="text-red-500 hover:bg-red-50"
                onClick={() => remove(m._id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
