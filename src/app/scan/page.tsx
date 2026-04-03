"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { useI18n } from "@/contexts/I18nContext";

const QrScanner = dynamic(
  () => import("@/components/QrScanner").then((mod) => mod.QrScanner),
  { ssr: false }
);

export default function ScanPage() {
  const router = useRouter();
  const { t } = useI18n();

  const handleScan = useCallback(
    (text: string) => {
      let token: string | null = null;

      try {
        const url = new URL(text);
        // New format: /stamp?token=xxx
        const paramToken = url.searchParams.get("token");
        if (paramToken) {
          token = paramToken;
        } else {
          // Legacy format: /stamp/{token}
          const match = url.pathname.match(/(?:\/kyoto-local-stamprally)?\/stamp\/(.+)$/);
          if (match) token = match[1];
        }
      } catch {
        // Fallback: extract token from non-URL text
        if (text.includes("/stamp/")) {
          token = text.split("/stamp/").pop() || null;
        }
      }

      if (token) {
        router.push(`/stamp?token=${encodeURIComponent(token)}`);
      }
    },
    [router]
  );

  return (
    <>
      <Header title={t.scan.title} subtitle={t.scan.subtitle} />
      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
        <QrScanner onScan={handleScan} />
        <p className="text-center text-sm text-muted">
          {t.scan.instruction}
        </p>
      </div>
    </>
  );
}
