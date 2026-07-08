import { NicheLanding, nicheMetadata } from "@/components/shared/NicheLanding";

const SLUG = "keratin-nanoplasty-hijab-hair-warsaw";
export const metadata = nicheMetadata(SLUG);
export const revalidate = 300;

export default function Page() {
  return <NicheLanding slug={SLUG} />;
}
