"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface QrScannerProps {
  onScan: (decodedText: string) => void;
}

/** scanner.stop() を安全に呼ぶヘルパー（同期例外もPromise拒否も両方捕捉） */
function safeStop(scanner: Html5Qrcode | null): void {
  if (!scanner) return;
  try {
    scanner.stop().catch(() => {});
  } catch {
    // "Cannot stop, scanner is not running or paused" 等の同期例外を無視
  }
}

export function QrScanner({ onScan }: QrScannerProps) {
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const stateRef = useRef<"idle" | "starting" | "running" | "stopped">("idle");

  const onScanRef = useRef(onScan);
  onScanRef.current = onScan;

  useEffect(() => {
    let cancelled = false;

    // DOMが確実にレンダリングされるのを待つ
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
            // 既に停止済みなら何もしない
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
          // AbortError はアンマウント時の正常な挙動
          if (err instanceof DOMException && err.name === "AbortError") return;
          setError(
            "カメラを起動できませんでした。カメラの使用を許可してください。"
          );
        });
    }, 100);

    return () => {
      cancelled = true;
      clearTimeout(timerId);
      // 既に停止済み（スキャン成功時等）なら二重停止しない
      if (stateRef.current !== "stopped") {
        stateRef.current = "stopped";
        safeStop(scannerRef.current);
      }
      scannerRef.current = null;
    };
  }, []);

  if (error) {
    return (
      <div className="text-center p-6">
        <p className="text-5xl mb-4">📷</p>
        <p className="text-primary font-medium mb-2">カメラエラー</p>
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
