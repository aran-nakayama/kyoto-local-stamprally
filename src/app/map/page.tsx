"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { ShopDetailModal } from "@/components/ShopDetailModal";
import { useStamps } from "@/hooks/useStamps";
import { useShops } from "@/hooks/useShops";
import { useI18n } from "@/contexts/I18nContext";
import { Shop } from "@/lib/types";

const ShopMap = dynamic(
  () => import("@/components/ShopMap").then((mod) => mod.ShopMap),
  { ssr: false }
);

export default function MapPage() {
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const { shops } = useShops();
  const { stamps, hasStamp, isLoaded } = useStamps(shops);
  const { t } = useI18n();
  const acquiredShopIds = new Set(stamps.map((s) => s.shopId));

  return (
    <>
      <Header title={t.map.title} subtitle={t.map.subtitle} />
      <div className="h-[calc(100vh-10rem)]">
        {isLoaded && (
          <ShopMap
            shops={shops}
            acquiredShopIds={acquiredShopIds}
            onSelectShop={setSelectedShop}
          />
        )}
      </div>

      {selectedShop && (
        <ShopDetailModal
          shop={selectedShop}
          acquired={isLoaded ? hasStamp(selectedShop.id) : false}
          onClose={() => setSelectedShop(null)}
        />
      )}
    </>
  );
}
