"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ShopCard } from "@/components/ShopCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { useStamps } from "@/hooks/useStamps";
import { useShops } from "@/hooks/useShops";
import { useI18n } from "@/contexts/I18nContext";
import { ShopCategory } from "@/lib/types";

type FilterOption = "all" | ShopCategory;

export default function ShopsPage() {
  const [filter, setFilter] = useState<FilterOption>("all");
  const { shops } = useShops();
  const { hasStamp, isLoaded } = useStamps(shops);
  const { t } = useI18n();

  const filtered =
    filter === "all" ? shops : shops.filter((s) => s.category === filter);

  return (
    <>
      <Header
        title={t.shops.title}
        subtitle={t.shops.count.replace("{count}", String(shops.length))}
      />
      <div className="max-w-lg mx-auto px-4 py-4 space-y-4">
        <CategoryFilter selected={filter} onChange={setFilter} />
        <div className="space-y-3">
          {filtered.map((shop) => (
            <ShopCard
              key={shop.id}
              shop={shop}
              acquired={isLoaded ? hasStamp(shop.id) : false}
            />
          ))}
        </div>
      </div>
    </>
  );
}
