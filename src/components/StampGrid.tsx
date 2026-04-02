"use client";

import { useStamps } from "@/hooks/useStamps";
import { useShops } from "@/hooks/useShops";
import { useI18n } from "@/contexts/I18nContext";
import { Shop } from "@/lib/types";
import { StampSlot } from "./StampSlot";
import { ProgressBar } from "./ProgressBar";

interface StampGridProps {
  onSelectShop: (shop: Shop) => void;
}

export function StampGrid({ onSelectShop }: StampGridProps) {
  const { shops } = useShops();
  const { hasStamp, progress, isComplete, isLoaded } = useStamps(shops);
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <ProgressBar acquired={progress.acquired} total={progress.total} />

      {isComplete && (
        <div className="bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/30 rounded-xl p-4 text-center">
          <p className="text-2xl mb-1">🎉</p>
          <p className="font-bold text-foreground">{t.progress.complete}</p>
          <p className="text-sm text-muted mt-1">
            {t.progress.completeMessage}
          </p>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4 justify-items-center">
        {shops.map((shop) => (
          <StampSlot
            key={shop.id}
            shop={shop}
            acquired={isLoaded ? hasStamp(shop.id) : false}
            onSelect={onSelectShop}
          />
        ))}
      </div>
    </div>
  );
}
