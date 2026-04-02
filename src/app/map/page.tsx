"use client";

import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { useStamps } from "@/hooks/useStamps";
import { useShops } from "@/hooks/useShops";
import { useI18n } from "@/contexts/I18nContext";

const ShopMap = dynamic(
  () => import("@/components/ShopMap").then((mod) => mod.ShopMap),
  { ssr: false }
);

export default function MapPage() {
  const { shops } = useShops();
  const { stamps, isLoaded } = useStamps(shops);
  const { t } = useI18n();
  const acquiredShopIds = new Set(stamps.map((s) => s.shopId));

  return (
    <>
      <Header title={t.map.title} subtitle={t.map.subtitle} />
      <div className="h-[calc(100vh-10rem)]">
        {isLoaded && <ShopMap shops={shops} acquiredShopIds={acquiredShopIds} />}
      </div>
    </>
  );
}
