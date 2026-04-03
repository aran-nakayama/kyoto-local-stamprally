import { shops } from "@/data/shops";
import { RedirectToStamp } from "./RedirectToStamp";

export function generateStaticParams() {
  return shops.map((shop) => ({ token: shop.stampToken }));
}

export default async function StampTokenPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <RedirectToStamp token={token} />;
}
