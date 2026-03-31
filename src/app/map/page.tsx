"use client";

import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { useStamps } from "@/hooks/useStamps";

const ShopMap = dynamic(
  () => import("@/components/ShopMap").then((mod) => mod.ShopMap),
  { ssr: false }
);

export default function MapPage() {
  const { stamps, isLoaded } = useStamps();
  const acquiredShopIds = new Set(stamps.map((s) => s.shopId));

  return (
    <>
      <Header title="マップ" subtitle="お店の場所を確認しよう" />
      <div className="h-[calc(100vh-10rem)]">
        {isLoaded && <ShopMap acquiredShopIds={acquiredShopIds} />}
      </div>
    </>
  );
}
