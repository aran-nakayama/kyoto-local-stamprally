"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { shops } from "@/data/shops";
import { ShopCategory } from "@/lib/types";
import { useI18n } from "@/contexts/I18nContext";
import { useShopTranslation } from "@/hooks/useShopTranslation";
import Link from "next/link";

interface ShopMapProps {
  acquiredShopIds: Set<string>;
}

const markerColors: Record<ShopCategory, string> = {
  cafe: "#d97706",
  bar: "#7c3aed",
  restaurant: "#16a34a",
};

function createIcon(category: ShopCategory, acquired: boolean) {
  const color = acquired ? markerColors[category] : "#a8a29e";
  return L.divIcon({
    className: "",
    html: `<div style="width:28px;height:28px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

export function ShopMap({ acquiredShopIds }: ShopMapProps) {
  const { t } = useI18n();
  const { translateShop } = useShopTranslation();

  const categoryLabel: Record<ShopCategory, string> = {
    cafe: t.category.cafe,
    bar: t.category.bar,
    restaurant: t.category.restaurant,
  };

  return (
    <MapContainer
      center={[35.0116, 135.7681]}
      zoom={13}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {shops.map((rawShop) => {
        const shop = translateShop(rawShop);
        const acquired = acquiredShopIds.has(shop.id);
        return (
          <Marker
            key={shop.id}
            position={[shop.lat, shop.lng]}
            icon={createIcon(shop.category, acquired)}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-bold">{shop.name}</p>
                <p className="text-gray-500">
                  {categoryLabel[shop.category]}
                  {acquired ? ` ✅ ${t.map.acquired}` : ""}
                </p>
                <Link
                  href={`/shops/${shop.id}`}
                  className="text-blue-600 hover:underline text-xs"
                >
                  {t.map.viewDetail}
                </Link>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
