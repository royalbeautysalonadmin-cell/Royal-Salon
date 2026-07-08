import { NicheLanding, nicheMetadata } from "@/components/shared/NicheLanding";

const SLUG = "muslim-women-hairdresser-warsaw";
export const metadata = nicheMetadata(SLUG);
export const revalidate = 300;

export default function Page() {
  return <NicheLanding slug={SLUG} />;
}
