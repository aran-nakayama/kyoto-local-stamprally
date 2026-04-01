"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Header } from "@/components/Header";

const QrScanner = dynamic(
  () => import("@/components/QrScanner").then((mod) => mod.QrScanner),
  { ssr: false }
);

export default function ScanPage() {
  const router = useRouter();

  const handleScan = useCallback(
    (text: string) => {
      try {
        const url = new URL(text);
        // basePath付き・なし両方に対応
        const match = url.pathname.match(/(?:\/kyoto-local-stamprally)?\/stamp\/(.+)$/);
        if (match) {
          router.push(`/stamp/${match[1]}`);
          return;
        }
      } catch {}

      // トークンが直接含まれている場合のフォールバック
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
      <Header title="QRスキャン" subtitle="お店のQRコードを読み取ろう" />
      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
        <QrScanner onScan={handleScan} />
        <p className="text-center text-sm text-muted">
          お店に設置されたQRコードにカメラを向けてください
        </p>
      </div>
    </>
  );
}
