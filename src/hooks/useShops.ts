"use client";

import { useState, useEffect } from "react";
import { Shop } from "@/lib/types";
import { shops as defaultShops } from "@/data/shops";
import { fetchShopsFromSheet } from "@/lib/sheets";

const SHEET_CSV_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_CSV_URL || "";

export function useShops(): { shops: Shop[]; isLoaded: boolean } {
  const [shops, setShops] = useState<Shop[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!SHEET_CSV_URL) {
      // Google Sheets未設定の場合はローカルデータを使用
      setShops(defaultShops);
      setIsLoaded(true);
      return;
    }

    let cancelled = false;

    fetchShopsFromSheet(SHEET_CSV_URL).then((result) => {
      if (cancelled) return;
      if (result) {
        setShops(result.shops);
      } else {
        // フェッチ失敗時はフォールバック
        setShops(defaultShops);
      }
      setIsLoaded(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { shops, isLoaded };
}
