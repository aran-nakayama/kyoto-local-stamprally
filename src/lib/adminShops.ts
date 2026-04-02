import { Shop } from "./types";
import { shops as defaultShops } from "@/data/shops";

const ADMIN_SHOPS_KEY = "kyoto-stamprally-admin-shops";

export function getAdminShops(): Shop[] {
  if (typeof window === "undefined") return defaultShops;
  try {
    const data = localStorage.getItem(ADMIN_SHOPS_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  return defaultShops;
}

export function saveAdminShops(shops: Shop[]): void {
  localStorage.setItem(ADMIN_SHOPS_KEY, JSON.stringify(shops));
}

export function addShop(shop: Shop): void {
  const shops = getAdminShops();
  shops.push(shop);
  saveAdminShops(shops);
}

export function updateShop(id: string, updates: Partial<Shop>): void {
  const shops = getAdminShops();
  const idx = shops.findIndex((s) => s.id === id);
  if (idx >= 0) {
    shops[idx] = { ...shops[idx], ...updates };
    saveAdminShops(shops);
  }
}

export function deleteShop(id: string): void {
  const shops = getAdminShops().filter((s) => s.id !== id);
  saveAdminShops(shops);
}

export function resetToDefaults(): void {
  localStorage.removeItem(ADMIN_SHOPS_KEY);
}
