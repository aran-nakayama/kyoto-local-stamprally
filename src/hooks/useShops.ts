"use client";

import { useState, useEffect } from "react";
import { Shop } from "@/lib/types";
import { shops as defaultShops } from "@/data/shops";
import { fetchShopsFromSheet } from "@/lib/sheets";

const SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID || "";

export function useShops(): { shops: Shop[]; isLoaded: boolean } {
  const [shops, setShops] = useState<Shop[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!SHEET_ID) {
      // Google Sheets未設定の場合はローカルデータを使用
      setShops(defaultShops);
      setIsLoaded(true);
      return;
    }

    let cancelled = false;

    fetchShopsFromSheet(SHEET_ID).then((result) => {
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
