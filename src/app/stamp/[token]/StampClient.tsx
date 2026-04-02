"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { findShopByToken } from "@/lib/stamps";
import { useStamps } from "@/hooks/useStamps";
import { useI18n } from "@/contexts/I18nContext";
import { Shop } from "@/lib/types";

type StampResult = "success" | "already" | "invalid";

export function StampClient({ token }: { token: string }) {
  const router = useRouter();
  const { addStamp, hasStamp, isLoaded } = useStamps();
  const { t } = useI18n();
  const [result, setResult] = useState<StampResult | null>(null);
  const [shop, setShop] = useState<Shop | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const found = findShopByToken(token);
    if (!found) {
      setResult("invalid");
      return;
    }

    setShop(found);

    if (hasStamp(found.id)) {
      setResult("already");
    } else {
      addStamp(found.id);
      setResult("success");
    }
  }, [token, isLoaded, addStamp, hasStamp]);

  useEffect(() => {
    if (result === "success" || result === "already") {
      const timer = setTimeout(() => router.push("/"), 3000);
      return () => clearTimeout(timer);
    }
  }, [result, router]);

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-muted">{t.stamp.checking}</p>
        </div>
      </div>
    );
  }

  if (result === "invalid") {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-4">❌</div>
          <h1 className="text-xl font-bold mb-2">{t.stamp.invalid}</h1>
          <p className="text-muted mb-6">{t.stamp.invalidDesc}</p>
          <button
            onClick={() => router.push("/")}
            className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary-light transition-colors"
          >
            {t.stamp.backToTop}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="text-center max-w-sm">
        {result === "success" ? (
          <>
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h1 className="text-2xl font-bold mb-2">{t.stamp.success}</h1>
            <p className="text-lg font-medium text-primary mb-1">
              {shop?.name}
            </p>
            <p className="text-muted mb-6">{t.stamp.successDesc}</p>
          </>
        ) : (
          <>
            <div className="text-5xl mb-4">✅</div>
            <h1 className="text-xl font-bold mb-2">{t.stamp.already}</h1>
            <p className="text-lg font-medium text-primary mb-1">
              {shop?.name}
            </p>
            <p className="text-muted mb-6">{t.stamp.alreadyDesc}</p>
          </>
        )}
        <p className="text-sm text-muted">{t.stamp.redirecting}</p>
      </div>
    </div>
  );
}
