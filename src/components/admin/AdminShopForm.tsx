"use client";

import { useState } from "react";
import { useI18n } from "@/contexts/I18nContext";
import { addShop, updateShop } from "@/lib/adminShops";
import { Shop, ShopCategory } from "@/lib/types";

interface AdminShopFormProps {
  shop: Shop | null;
  onDone: () => void;
}

export function AdminShopForm({ shop, onDone }: AdminShopFormProps) {
  const { t } = useI18n();
  const isEdit = !!shop;

  const [form, setForm] = useState({
    name: shop?.name ?? "",
    category: shop?.category ?? ("cafe" as ShopCategory),
    description: shop?.description ?? "",
    address: shop?.address ?? "",
    lat: shop?.lat ?? 35.01,
    lng: shop?.lng ?? 135.76,
    openingHours: shop?.openingHours ?? "",
    closedDays: shop?.closedDays ?? "",
    stampToken: shop?.stampToken ?? crypto.randomUUID(),
    image: shop?.image ?? "",
  });

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    const shopData: Shop = {
      id: shop?.id ?? `shop-${Date.now()}`,
      ...form,
    };

    if (isEdit) {
      updateShop(shop.id, shopData);
    } else {
      addShop(shopData);
    }
    onDone();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        {isEdit ? t.admin.editShop : t.admin.addShop}
      </h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label={shop ? t.admin.editShop.replace("編集", "名前") : "Name"} fallbackLabel="店舗名">
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </Field>

          <Field label={t.category.all.replace("すべて", "カテゴリ")} fallbackLabel="Category">
            <select
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="cafe">{t.category.cafe}</option>
              <option value="bar">{t.category.bar}</option>
              <option value="restaurant">{t.category.restaurant}</option>
            </select>
          </Field>
        </div>

        <Field label={t.shopDetail.introduction} fallbackLabel={t.shopDetail.introduction}>
          <textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </Field>

        <Field label={t.shopDetail.address} fallbackLabel={t.shopDetail.address}>
          <input
            type="text"
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Lat" fallbackLabel="Lat">
            <input
              type="number"
              step="0.0001"
              value={form.lat}
              onChange={(e) => handleChange("lat", parseFloat(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </Field>
          <Field label="Lng" fallbackLabel="Lng">
            <input
              type="number"
              step="0.0001"
              value={form.lng}
              onChange={(e) => handleChange("lng", parseFloat(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label={t.shopDetail.openingHours} fallbackLabel={t.shopDetail.openingHours}>
            <input
              type="text"
              value={form.openingHours}
              onChange={(e) => handleChange("openingHours", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </Field>
          <Field label={t.shopDetail.closedDays} fallbackLabel={t.shopDetail.closedDays}>
            <input
              type="text"
              value={form.closedDays}
              onChange={(e) => handleChange("closedDays", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </Field>
        </div>

        <Field label="Stamp Token" fallbackLabel="Stamp Token">
          <div className="flex gap-2">
            <input
              type="text"
              value={form.stampToken}
              onChange={(e) => handleChange("stampToken", e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              type="button"
              onClick={() => handleChange("stampToken", crypto.randomUUID())}
              className="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition-colors"
            >
              {t.admin.generate}
            </button>
          </div>
        </Field>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            {t.admin.save}
          </button>
          <button
            type="button"
            onClick={onDone}
            className="px-6 py-2 rounded-lg font-medium text-gray-500 hover:bg-gray-100 transition-colors"
          >
            {t.admin.cancel}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, fallbackLabel, children }: { label: string; fallbackLabel: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label || fallbackLabel}
      </label>
      {children}
    </div>
  );
}
