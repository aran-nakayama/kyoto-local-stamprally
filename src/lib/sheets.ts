import { Shop, ShopCategory } from "./types";

const CACHE_KEY = "kyoto-stamprally-sheets-cache";
const CACHE_TTL = 5 * 60 * 1000; // 5分

interface CacheEntry {
  data: Shop[];
  translations: SheetTranslations;
  timestamp: number;
}

export interface SheetTranslation {
  name: string;
  description: string;
  address: string;
  closedDays: string;
}

export type SheetTranslations = Record<
  string,
  Partial<Record<"en", Partial<SheetTranslation>>>
>;

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (inQuotes) {
      if (char === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ",") {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
  }
  result.push(current.trim());
  return result;
}

function parseCSV(csv: string): Record<string, string>[] {
  const lines = csv.split("\n").filter((line) => line.trim() !== "");
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseCSVLine(line);
    const row: Record<string, string> = {};
    headers.forEach((header, i) => {
      row[header] = values[i] || "";
    });
    return row;
  });
}

function rowToShop(row: Record<string, string>): Shop | null {
  const id = row["id"];
  const name = row["name"];
  const category = row["category"] as ShopCategory;
  if (!id || !name || !["cafe", "bar", "restaurant"].includes(category)) {
    return null;
  }

  return {
    id,
    name,
    category,
    description: row["description"] || "",
    address: row["address"] || "",
    lat: parseFloat(row["lat"]) || 0,
    lng: parseFloat(row["lng"]) || 0,
    openingHours: row["openingHours"] || "",
    closedDays: row["closedDays"] || "",
    image: row["image"] || "",
    stampToken: row["stampToken"] || "",
  };
}

function extractTranslations(
  rows: Record<string, string>[]
): SheetTranslations {
  const translations: SheetTranslations = {};
  const locales = ["en"] as const;

  for (const row of rows) {
    const id = row["id"];
    if (!id) continue;

    const shopTranslations: Partial<
      Record<"en", Partial<SheetTranslation>>
    > = {};

    for (const locale of locales) {
      const t: Partial<SheetTranslation> = {};
      if (row[`name_${locale}`]) t.name = row[`name_${locale}`];
      if (row[`description_${locale}`])
        t.description = row[`description_${locale}`];
      if (row[`address_${locale}`]) t.address = row[`address_${locale}`];
      if (row[`closedDays_${locale}`])
        t.closedDays = row[`closedDays_${locale}`];

      if (Object.keys(t).length > 0) {
        shopTranslations[locale] = t;
      }
    }

    if (Object.keys(shopTranslations).length > 0) {
      translations[id] = shopTranslations;
    }
  }

  return translations;
}

function getCache(): CacheEntry | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry: CacheEntry = JSON.parse(raw);
    if (Date.now() - entry.timestamp > CACHE_TTL) return null;
    return entry;
  } catch {
    return null;
  }
}

function setCache(data: Shop[], translations: SheetTranslations): void {
  try {
    const entry: CacheEntry = { data, translations, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {}
}

export function getCachedTranslations(): SheetTranslations | null {
  const cache = getCache();
  return cache?.translations ?? null;
}

export async function fetchShopsFromSheet(
  sheetId: string
): Promise<{ shops: Shop[]; translations: SheetTranslations } | null> {
  // キャッシュチェック
  const cache = getCache();
  if (cache) return { shops: cache.data, translations: cache.translations };

  try {
    const url = `https://docs.google.com/spreadsheets/d/e/${sheetId}/pub?gid=0&single=true&output=csv`;
    const res = await fetch(url);
    if (!res.ok) return null;

    const csv = await res.text();
    const rows = parseCSV(csv);
    const shops = rows.map(rowToShop).filter((s): s is Shop => s !== null);
    const translations = extractTranslations(rows);

    if (shops.length === 0) return null;

    setCache(shops, translations);
    return { shops, translations };
  } catch {
    return null;
  }
}
