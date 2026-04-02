"use client";

import { useMemo } from "react";
import { useI18n } from "@/contexts/I18nContext";
import { defaultShopTranslations, ShopTranslation } from "@/i18n/shopTranslations";
import { Shop } from "@/lib/types";
import { Locale } from "@/i18n/types";

const SHOP_TRANSLATIONS_KEY = "kyoto-stamprally-shop-translations";

function getCustomTranslations(): Record<string, Partial<Record<Locale, Partial<ShopTranslation>>>> {
  if (typeof window === "undefined") return {};
  try {
    const data = localStorage.getItem(SHOP_TRANSLATIONS_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export function useShopTranslation() {
  const { locale } = useI18n();

  const translateShop = useMemo(() => {
    const custom = getCustomTranslations();

    return (shop: Shop): Shop => {
      if (locale === "ja") return shop;

      const customT = custom[shop.id]?.[locale];
      const defaultT = defaultShopTranslations[shop.id]?.[locale];
      const merged = { ...defaultT, ...customT };

      return {
        ...shop,
        name: merged.name || shop.name,
        description: merged.description || shop.description,
        address: merged.address || shop.address,
        closedDays: merged.closedDays || shop.closedDays,
      };
    };
  }, [locale]);

  return { translateShop };
}
