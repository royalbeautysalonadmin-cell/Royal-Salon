import { NicheLanding, nicheMetadata } from "@/components/shared/NicheLanding";

const SLUG = "desi-salon-warsaw";
export const metadata = nicheMetadata(SLUG);

export default function Page() {
  return <NicheLanding slug={SLUG} />;
}
