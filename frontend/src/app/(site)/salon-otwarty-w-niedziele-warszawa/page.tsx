import { NicheLanding, nicheMetadata } from "@/components/shared/NicheLanding";

const SLUG = "salon-otwarty-w-niedziele-warszawa";
export const metadata = nicheMetadata(SLUG);
export const revalidate = 300;

export default function Page() {
  return <NicheLanding slug={SLUG} />;
}
