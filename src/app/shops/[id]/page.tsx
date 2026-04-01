import { shops } from "@/data/shops";
import { ShopDetailClient } from "./ShopDetailClient";

export function generateStaticParams() {
  return shops.map((shop) => ({ id: shop.id }));
}

export default async function ShopDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ShopDetailClient id={id} />;
}
