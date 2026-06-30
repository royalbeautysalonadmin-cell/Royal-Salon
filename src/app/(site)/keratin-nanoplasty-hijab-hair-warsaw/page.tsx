import { NicheLanding, nicheMetadata } from "@/components/shared/NicheLanding";

const SLUG = "keratin-nanoplasty-hijab-hair-warsaw";
export const metadata = nicheMetadata(SLUG);

export default function Page() {
  return <NicheLanding slug={SLUG} />;
}
