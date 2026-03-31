"use client";

import { shops } from "@/data/shops";
import { useStamps } from "@/hooks/useStamps";
import { StampSlot } from "./StampSlot";
import { ProgressBar } from "./ProgressBar";

export function StampGrid() {
  const { hasStamp, progress, isComplete, isLoaded } = useStamps();

  return (
    <div className="space-y-6">
      <ProgressBar acquired={progress.acquired} total={progress.total} />

      {isComplete && (
        <div className="bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/30 rounded-xl p-4 text-center">
          <p className="text-2xl mb-1">🎉</p>
          <p className="font-bold text-foreground">コンプリート！</p>
          <p className="text-sm text-muted mt-1">
            全てのスタンプを集めました！おめでとうございます！
          </p>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4 justify-items-center">
        {shops.map((shop) => (
          <StampSlot
            key={shop.id}
            shop={shop}
            acquired={isLoaded ? hasStamp(shop.id) : false}
          />
        ))}
      </div>
    </div>
  );
}
