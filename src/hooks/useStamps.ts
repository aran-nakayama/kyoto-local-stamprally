"use client";

import { useState, useEffect, useCallback } from "react";
import { StampRecord, Shop } from "@/lib/types";
import { getStamps, addStamp as addStampToStorage } from "@/lib/stamps";

export function useStamps(shops: Shop[]) {
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
