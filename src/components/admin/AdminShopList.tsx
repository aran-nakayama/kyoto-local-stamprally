"use client";

import { useState } from "react";
import { useI18n } from "@/contexts/I18nContext";
import { getAdminShops, deleteShop } from "@/lib/adminShops";
import { Shop, ShopCategory } from "@/lib/types";

interface AdminShopListProps {
  onEdit: (shop: Shop) => void;
  onAdd: () => void;
}

const categoryColor: Record<ShopCategory, string> = {
  cafe: "bg-amber-100 text-amber-800",
  bar: "bg-purple-100 text-purple-800",
  restaurant: "bg-green-100 text-green-800",
};

export function AdminShopList({ onEdit, onAdd }: AdminShopListProps) {
  const { t } = useI18n();
  const [shops, setShops] = useState(getAdminShops);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const categoryLabel: Record<ShopCategory, string> = {
    cafe: t.category.cafe,
    bar: t.category.bar,
    restaurant: t.category.restaurant,
  };

  const handleDelete = (id: string) => {
    deleteShop(id);
    setShops(getAdminShops());
    setDeleteId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{t.admin.shopManagement}</h2>
        <button
          onClick={onAdd}
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          + {t.admin.addShop}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {shops.map((shop, i) => (
          <div
            key={shop.id}
            className={`flex items-center justify-between p-4 ${
              i < shops.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${categoryColor[shop.category]}`}>
                {categoryLabel[shop.category]}
              </span>
              <span className="font-medium truncate">{shop.name}</span>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => onEdit(shop)}
                className="text-sm text-blue-600 hover:text-blue-800 px-2 py-1"
              >
                {t.admin.editShop}
              </button>
              {deleteId === shop.id ? (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleDelete(shop.id)}
                    className="text-sm text-red-600 hover:text-red-800 px-2 py-1 font-medium"
                  >
                    OK
                  </button>
                  <button
                    onClick={() => setDeleteId(null)}
                    className="text-sm text-gray-500 hover:text-gray-700 px-2 py-1"
                  >
                    {t.admin.cancel}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setDeleteId(shop.id)}
                  className="text-sm text-red-500 hover:text-red-700 px-2 py-1"
                >
                  {t.admin.deleteShop}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
