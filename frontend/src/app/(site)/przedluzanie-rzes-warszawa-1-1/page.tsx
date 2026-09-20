import { NicheLanding, nicheMetadata } from "@/components/shared/NicheLanding";

const SLUG = "przedluzanie-rzes-warszawa-1-1";
export const metadata = nicheMetadata(SLUG);
export const revalidate = 300;

export default function Page() {
  return <NicheLanding slug={SLUG} />;
}
