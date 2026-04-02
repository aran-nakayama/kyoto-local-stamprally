"use client";

import { useState } from "react";
import { useI18n } from "@/contexts/I18nContext";
import { getAdminShops } from "@/lib/adminShops";
import { defaultShopTranslations, ShopTranslation } from "@/i18n/shopTranslations";
import { Locale } from "@/i18n/types";

const SHOP_TRANSLATIONS_KEY = "kyoto-stamprally-shop-translations";
const EDITABLE_LOCALES: { code: Locale; name: string }[] = [
  { code: "en", name: "English" },
  { code: "zh", name: "中文" },
  { code: "ko", name: "한국어" },
];

function getCustomTranslations(): Record<string, Partial<Record<Locale, Partial<ShopTranslation>>>> {
  try {
    const data = localStorage.getItem(SHOP_TRANSLATIONS_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function saveCustomTranslations(data: Record<string, Partial<Record<Locale, Partial<ShopTranslation>>>>) {
  localStorage.setItem(SHOP_TRANSLATIONS_KEY, JSON.stringify(data));
}

export function AdminTranslations() {
  const { t } = useI18n();
  const shops = getAdminShops();
  const [selectedShopId, setSelectedShopId] = useState(shops[0]?.id ?? "");
  const [selectedLocale, setSelectedLocale] = useState<Locale>("en");
  const [custom, setCustom] = useState(getCustomTranslations);

  const shop = shops.find((s) => s.id === selectedShopId);
  if (!shop) return null;

  const defaultT = defaultShopTranslations[selectedShopId]?.[selectedLocale] ?? {};
  const customT = custom[selectedShopId]?.[selectedLocale] ?? {};
  const merged: Partial<ShopTranslation> = { ...defaultT, ...customT };

  const fields: { key: keyof ShopTranslation; label: string; original: string }[] = [
    { key: "name", label: "Name", original: shop.name },
    { key: "description", label: t.shopDetail.introduction, original: shop.description },
    { key: "address", label: t.shopDetail.address, original: shop.address },
    { key: "closedDays", label: t.shopDetail.closedDays, original: shop.closedDays },
  ];

  const handleChange = (key: keyof ShopTranslation, value: string) => {
    const updated = { ...custom };
    if (!updated[selectedShopId]) updated[selectedShopId] = {};
    if (!updated[selectedShopId][selectedLocale]) updated[selectedShopId][selectedLocale] = {};
    updated[selectedShopId][selectedLocale]![key] = value;
    setCustom(updated);
    saveCustomTranslations(updated);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{t.admin.translations}</h2>

      <div className="flex flex-wrap gap-3">
        <select
          value={selectedShopId}
          onChange={(e) => setSelectedShopId(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          {shops.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        <div className="flex gap-1">
          {EDITABLE_LOCALES.map((loc) => (
            <button
              key={loc.code}
              onClick={() => setSelectedLocale(loc.code)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedLocale === loc.code
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {loc.name}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-600 mb-1">{field.label}</label>
            <p className="text-xs text-gray-400 mb-1">JA: {field.original}</p>
            {field.key === "description" ? (
              <textarea
                value={merged[field.key] ?? ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            ) : (
              <input
                type="text"
                value={merged[field.key] ?? ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
