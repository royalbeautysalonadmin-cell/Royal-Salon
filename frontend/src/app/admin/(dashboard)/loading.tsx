import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center gap-2 py-24 text-sm text-charcoal/70">
      <Loader2 className="h-5 w-5 animate-spin" /> Loading...
    </div>
  );
}
