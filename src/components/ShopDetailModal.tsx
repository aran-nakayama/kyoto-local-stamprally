"use client";

import { useEffect } from "react";
import { Shop, ShopCategory } from "@/lib/types";
import { useI18n } from "@/contexts/I18nContext";
import { useShopTranslation } from "@/hooks/useShopTranslation";

interface ShopDetailModalProps {
  shop: Shop;
  acquired: boolean;
  onClose: () => void;
}

export function ShopDetailModal({ shop: rawShop, acquired, onClose }: ShopDetailModalProps) {
  const { t } = useI18n();
  const { translateShop } = useShopTranslation();
  const shop = translateShop(rawShop);

  const categoryLabel: Record<ShopCategory, string> = {
    cafe: t.category.cafe,
    bar: t.category.bar,
    restaurant: t.category.restaurant,
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${shop.lat},${shop.lng}`;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[10001] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl">
        {/* ヘッダー */}
        <div className="sticky top-0 bg-primary text-white px-4 py-4 rounded-t-2xl sm:rounded-t-2xl flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">{shop.name}</h2>
            <p className="text-sm text-white/80">{categoryLabel[shop.category]}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
          >
            ✕
          </button>
        </div>

        <div className="px-4 py-5 space-y-5">
          {/* スタンプ状態 */}
          <div
            className={`flex items-center gap-3 p-4 rounded-xl border ${
              acquired
                ? "bg-primary/5 border-primary/20"
                : "bg-card border-border"
            }`}
          >
            <div
              className={`w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center border-2 text-xl ${
                acquired
                  ? "bg-stamp-acquired border-primary text-white"
                  : "bg-stamp-empty border-border text-muted"
              }`}
            >
              {acquired ? "✓" : "?"}
            </div>
            <div>
              <p className="font-bold">
                {acquired ? t.shopDetail.stampAcquired : t.shopDetail.stampNotAcquired}
              </p>
              <p className="text-sm text-muted">
                {acquired
                  ? t.shopDetail.stampAcquiredDesc
                  : t.shopDetail.stampNotAcquiredDesc}
              </p>
            </div>
          </div>

          {/* 店舗情報 */}
          <div>
            <h3 className="text-sm font-medium text-muted mb-1">{t.shopDetail.introduction}</h3>
            <p className="text-foreground">{shop.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted mb-1">{t.shopDetail.openingHours}</h3>
              <p className="text-foreground">{shop.openingHours}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted mb-1">{t.shopDetail.closedDays}</h3>
              <p className="text-foreground">{shop.closedDays}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted mb-1">{t.shopDetail.address}</h3>
            <p className="text-foreground">{shop.address}</p>
          </div>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-card border border-border rounded-xl py-3 font-medium hover:bg-border/30 transition-colors"
          >
            {t.shopDetail.openInGoogleMaps}
          </a>
        </div>
      </div>
    </div>
  );
}
