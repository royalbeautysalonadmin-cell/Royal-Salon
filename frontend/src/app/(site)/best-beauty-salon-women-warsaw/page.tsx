import { NicheLanding, nicheMetadata } from "@/components/shared/NicheLanding";

const SLUG = "best-beauty-salon-women-warsaw";
export const metadata = nicheMetadata(SLUG);
export const revalidate = 300;

export default function Page() {
  return <NicheLanding slug={SLUG} />;
}
