"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { StampGrid } from "@/components/StampGrid";
import { ShopDetailModal } from "@/components/ShopDetailModal";
import { useShops } from "@/hooks/useShops";
import { useStamps } from "@/hooks/useStamps";
import { useI18n } from "@/contexts/I18nContext";
import { Shop } from "@/lib/types";

export default function Home() {
  const { t } = useI18n();
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const { shops } = useShops();
  const { hasStamp, isLoaded } = useStamps(shops);

  return (
    <>
      <Header title={t.home.title} subtitle={t.home.subtitle} />
      <div className="max-w-lg mx-auto px-4 py-6">
        <StampGrid onSelectShop={setSelectedShop} />
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
