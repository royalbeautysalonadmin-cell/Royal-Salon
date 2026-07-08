import { Badge } from "@/components/ui/badge";

const map: Record<string, { label: string; variant: "warning" | "success" | "danger" | "default" }> = {
  pending: { label: "Pending", variant: "warning" },
  approved: { label: "Approved", variant: "success" },
  completed: { label: "Completed", variant: "default" },
  rejected: { label: "Rejected", variant: "danger" },
};

export function StatusBadge({ status }: { status: string }) {
  const s = map[status] ?? { label: status, variant: "default" as const };
  return <Badge variant={s.variant}>{s.label}</Badge>;
}
