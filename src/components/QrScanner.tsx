"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useI18n } from "@/contexts/I18nContext";

interface QrScannerProps {
  onScan: (decodedText: string) => void;
}

function safeStop(scanner: Html5Qrcode | null): void {
  if (!scanner) return;
  try {
    scanner.stop().catch(() => {});
  } catch {
    // ignore
  }
}

export function QrScanner({ onScan }: QrScannerProps) {
  const { t } = useI18n();
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const stateRef = useRef<"idle" | "starting" | "running" | "stopped">("idle");

  const onScanRef = useRef(onScan);
  onScanRef.current = onScan;

  useEffect(() => {
    // ページ遷移時にvideoのplay()が中断されるとブラウザがunhandled rejectionを投げる。
    // html5-qrcodeライブラリ内部のpromiseなのでcatchできないため、ここで抑制する。
    function suppressAbort(e: PromiseRejectionEvent) {
      if (e.reason instanceof DOMException && e.reason.name === "AbortError") {
        e.preventDefault();
      }
    }
    window.addEventListener("unhandledrejection", suppressAbort);

    let cancelled = false;

    const timerId = setTimeout(() => {
      if (cancelled) return;

      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;
      stateRef.current = "starting";

      scanner
        .start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            if (stateRef.current !== "running") return;
            stateRef.current = "stopped";
            safeStop(scanner);
            onScanRef.current(decodedText);
          },
          () => {}
        )
        .then(() => {
          if (cancelled) {
            stateRef.current = "stopped";
            safeStop(scanner);
          } else {
            stateRef.current = "running";
          }
        })
        .catch((err: unknown) => {
          if (cancelled) return;
          if (err instanceof DOMException && err.name === "AbortError") return;
          setError(t.scan.cameraPermission);
        });
    }, 100);

    return () => {
      cancelled = true;
      clearTimeout(timerId);
      if (stateRef.current !== "stopped") {
        stateRef.current = "stopped";
        safeStop(scannerRef.current);
      }
      scannerRef.current = null;
      // ブラウザのAbortErrorはクリーンアップ後に非同期で発生するため、削除を遅延する
      setTimeout(() => {
        window.removeEventListener("unhandledrejection", suppressAbort);
      }, 1000);
    };
  }, []);

  if (error) {
    return (
      <div className="text-center p-6">
        <p className="text-5xl mb-4">📷</p>
        <p className="text-primary font-medium mb-2">{t.scan.cameraError}</p>
        <p className="text-sm text-muted">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div id="qr-reader" className="rounded-xl overflow-hidden" />
    </div>
  );
}
