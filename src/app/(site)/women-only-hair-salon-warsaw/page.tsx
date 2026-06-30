import { NicheLanding, nicheMetadata } from "@/components/shared/NicheLanding";

const SLUG = "women-only-hair-salon-warsaw";
export const metadata = nicheMetadata(SLUG);

export default function Page() {
  return <NicheLanding slug={SLUG} />;
}
