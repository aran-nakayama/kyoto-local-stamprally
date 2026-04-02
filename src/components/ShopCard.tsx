"use client";

import { Shop, ShopCategory } from "@/lib/types";
import { useI18n } from "@/contexts/I18nContext";
import { useShopTranslation } from "@/hooks/useShopTranslation";

interface ShopCardProps {
  shop: Shop;
  acquired: boolean;
  onSelect: (shop: Shop) => void;
}

const categoryColor: Record<ShopCategory, string> = {
  cafe: "bg-amber-100 text-amber-800",
  bar: "bg-purple-100 text-purple-800",
  restaurant: "bg-green-100 text-green-800",
};

export function ShopCard({ shop: rawShop, acquired, onSelect }: ShopCardProps) {
  const { t } = useI18n();
  const { translateShop } = useShopTranslation();
  const shop = translateShop(rawShop);

  const categoryLabel: Record<ShopCategory, string> = {
    cafe: t.category.cafe,
    bar: t.category.bar,
    restaurant: t.category.restaurant,
  };

  return (
    <button
      onClick={() => onSelect(rawShop)}
      className="block w-full text-left bg-card rounded-xl border border-border p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center border-2 ${
            acquired
              ? "bg-stamp-acquired border-primary text-white"
              : "bg-stamp-empty border-border text-muted"
          }`}
        >
          {acquired ? "✓" : "?"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-foreground truncate">{shop.name}</h3>
            <span
              className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${categoryColor[shop.category]}`}
            >
              {categoryLabel[shop.category]}
            </span>
          </div>
          <p className="text-sm text-muted line-clamp-2">{shop.description}</p>
          <p className="text-xs text-muted mt-1">{shop.address}</p>
        </div>
      </div>
    </button>
  );
}
