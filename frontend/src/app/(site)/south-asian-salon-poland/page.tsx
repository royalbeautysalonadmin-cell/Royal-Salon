import { NicheLanding, nicheMetadata } from "@/components/shared/NicheLanding";

const SLUG = "south-asian-salon-poland";
export const metadata = nicheMetadata(SLUG);
export const revalidate = 300;

export default function Page() {
  return <NicheLanding slug={SLUG} />;
}
