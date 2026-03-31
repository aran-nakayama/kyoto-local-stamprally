import { StampRecord } from "./types";
import { STORAGE_KEY } from "./constants";
import { shops } from "@/data/shops";

export function getStamps(): StampRecord[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as StampRecord[];
  } catch {
    return [];
  }
}

function saveStamps(stamps: StampRecord[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stamps));
}

export function addStamp(shopId: string): boolean {
  const stamps = getStamps();
  if (stamps.some((s) => s.shopId === shopId)) return false;
  stamps.push({ shopId, acquiredAt: new Date().toISOString() });
  saveStamps(stamps);
  return true;
}

export function hasStamp(shopId: string): boolean {
  return getStamps().some((s) => s.shopId === shopId);
}

export function clearStamps(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getProgress(): { acquired: number; total: number } {
  return { acquired: getStamps().length, total: shops.length };
}

export function findShopByToken(token: string) {
  return shops.find((s) => s.stampToken === token) ?? null;
}
