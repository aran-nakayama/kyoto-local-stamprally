"use client";

import { Shop, ShopCategory } from "@/lib/types";
import { useShopTranslation } from "@/hooks/useShopTranslation";

interface StampSlotProps {
  shop: Shop;
  acquired: boolean;
  onSelect: (shop: Shop) => void;
}

const categoryEmoji: Record<ShopCategory, string> = {
  cafe: "☕",
  bar: "🍸",
  restaurant: "🍽",
};

export function StampSlot({ shop: rawShop, acquired, onSelect }: StampSlotProps) {
  const { translateShop } = useShopTranslation();
  const shop = translateShop(rawShop);

  return (
    <button onClick={() => onSelect(rawShop)} className="flex flex-col items-center gap-1">
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
          acquired
            ? "bg-stamp-acquired border-primary text-white shadow-lg shadow-primary/30 scale-100"
            : "bg-stamp-empty border-border text-muted scale-95 opacity-60"
        }`}
      >
        {acquired ? (
          <span className="text-2xl">{categoryEmoji[shop.category]}</span>
        ) : (
          <span className="text-xs text-center leading-tight px-1">?</span>
        )}
      </div>
      <span
        className={`text-xs text-center leading-tight max-w-[72px] line-clamp-2 ${
          acquired ? "text-foreground font-medium" : "text-muted"
        }`}
      >
        {shop.name}
      </span>
    </button>
  );
}
