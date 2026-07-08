import { NicheLanding, nicheMetadata } from "@/components/shared/NicheLanding";

const SLUG = "indian-parlour-warsaw";
export const metadata = nicheMetadata(SLUG);
export const revalidate = 86400;

export default function Page() {
  return <NicheLanding slug={SLUG} />;
}
