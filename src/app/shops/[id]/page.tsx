"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { useStamps } from "@/hooks/useStamps";
import { shops } from "@/data/shops";
import { ShopCategory } from "@/lib/types";

const categoryLabel: Record<ShopCategory, string> = {
  cafe: "カフェ",
  bar: "バー",
  restaurant: "レストラン",
};

export default function ShopDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const shop = shops.find((s) => s.id === id);
  const { hasStamp, isLoaded } = useStamps();

  if (!shop) notFound();

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
              {acquired ? "スタンプ獲得済み！" : "未獲得"}
            </p>
            <p className="text-sm text-muted">
              {acquired
                ? "このお店のスタンプは取得済みです"
                : "お店でQRコードを読み取ってスタンプを獲得しよう"}
            </p>
          </div>
        </div>

        {/* 店舗情報 */}
        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-medium text-muted mb-1">紹介</h2>
            <p className="text-foreground">{shop.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-sm font-medium text-muted mb-1">営業時間</h2>
              <p className="text-foreground">{shop.openingHours}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-muted mb-1">定休日</h2>
              <p className="text-foreground">{shop.closedDays}</p>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-medium text-muted mb-1">住所</h2>
            <p className="text-foreground">{shop.address}</p>
          </div>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-card border border-border rounded-xl py-3 font-medium hover:bg-border/30 transition-colors"
          >
            📍 Google Maps で開く
          </a>
        </div>

        <Link
          href="/shops"
          className="block text-center text-sm text-primary hover:underline"
        >
          ← お店一覧に戻る
        </Link>
      </div>
    </>
  );
}
