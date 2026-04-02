"use client";

import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { useStamps } from "@/hooks/useStamps";
import { useI18n } from "@/contexts/I18nContext";

const ShopMap = dynamic(
  () => import("@/components/ShopMap").then((mod) => mod.ShopMap),
  { ssr: false }
);

export default function MapPage() {
  const { stamps, isLoaded } = useStamps();
  const { t } = useI18n();
  const acquiredShopIds = new Set(stamps.map((s) => s.shopId));

  return (
    <>
      <Header title={t.map.title} subtitle={t.map.subtitle} />
      <div className="h-[calc(100vh-10rem)]">
        {isLoaded && <ShopMap acquiredShopIds={acquiredShopIds} />}
      </div>
    </>
  );
}
