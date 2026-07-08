import { NicheLanding, nicheMetadata } from "@/components/shared/NicheLanding";

const SLUG = "salon-kosmetyczny-warszawa";
export const metadata = nicheMetadata(SLUG);

export default function Page() {
  return <NicheLanding slug={SLUG} />;
}
