"use client";

import { useState, useEffect, useCallback } from "react";
import { StampRecord } from "@/lib/types";
import { getStamps, addStamp as addStampToStorage, hasStamp as checkHasStamp } from "@/lib/stamps";
import { shops } from "@/data/shops";

export function useStamps() {
  const [stamps, setStamps] = useState<StampRecord[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setStamps(getStamps());
    setIsLoaded(true);
  }, []);

  const addStamp = useCallback((shopId: string): boolean => {
    const success = addStampToStorage(shopId);
    if (success) {
      setStamps(getStamps());
    }
    return success;
  }, []);

  const hasStamp = useCallback(
    (shopId: string): boolean => {
      return stamps.some((s) => s.shopId === shopId);
    },
    [stamps]
  );

  const progress = {
    acquired: stamps.length,
    total: shops.length,
  };

  const isComplete = stamps.length === shops.length;

  return { stamps, isLoaded, addStamp, hasStamp, progress, isComplete };
}
