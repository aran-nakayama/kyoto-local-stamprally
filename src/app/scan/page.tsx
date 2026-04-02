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
      try {
        const url = new URL(text);
        const match = url.pathname.match(/(?:\/kyoto-local-stamprally)?\/stamp\/(.+)$/);
        if (match) {
          router.push(`/stamp/${match[1]}`);
          return;
        }
      } catch {}

      if (text.includes("/stamp/")) {
        const token = text.split("/stamp/").pop();
        if (token) {
          router.push(`/stamp/${token}`);
          return;
        }
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
