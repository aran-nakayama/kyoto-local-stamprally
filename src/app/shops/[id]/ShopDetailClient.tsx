"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { useStamps } from "@/hooks/useStamps";
import { useI18n } from "@/contexts/I18nContext";
import { useShopTranslation } from "@/hooks/useShopTranslation";
import { shops } from "@/data/shops";
import { ShopCategory } from "@/lib/types";

export function ShopDetailClient({ id }: { id: string }) {
  const rawShop = shops.find((s) => s.id === id);
  const { hasStamp, isLoaded } = useStamps();
  const { t } = useI18n();
  const { translateShop } = useShopTranslation();

  if (!rawShop) notFound();
  const shop = translateShop(rawShop);

  const categoryLabel: Record<ShopCategory, string> = {
    cafe: t.category.cafe,
    bar: t.category.bar,
    restaurant: t.category.restaurant,
  };

  const acquired = isLoaded && hasStamp(shop.id);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${shop.lat},${shop.lng}`;

  return (
    <>
      <Header title={shop.name} subtitle={categoryLabel[shop.category]} />
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* スタンプ状態 */}
        <div
          className={`flex items-center gap-3 p-4 rounded-xl border ${
            acquired
              ? "bg-primary/5 border-primary/20"
              : "bg-card border-border"
          }`}
        >
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center border-2 text-xl ${
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
        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-medium text-muted mb-1">{t.shopDetail.introduction}</h2>
            <p className="text-foreground">{shop.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-sm font-medium text-muted mb-1">{t.shopDetail.openingHours}</h2>
              <p className="text-foreground">{shop.openingHours}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-muted mb-1">{t.shopDetail.closedDays}</h2>
              <p className="text-foreground">{shop.closedDays}</p>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-medium text-muted mb-1">{t.shopDetail.address}</h2>
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

        <Link
          href="/shops"
          className="block text-center text-sm text-primary hover:underline"
        >
          {t.shopDetail.backToList}
        </Link>
      </div>
    </>
  );
}
