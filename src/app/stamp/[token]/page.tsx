import { shops } from "@/data/shops";
import { StampClient } from "./StampClient";

export function generateStaticParams() {
  return shops.map((shop) => ({ token: shop.stampToken }));
}

export default async function StampPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <StampClient token={token} />;
}
