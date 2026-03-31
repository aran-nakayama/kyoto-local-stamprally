"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface QrScannerProps {
  onScan: (decodedText: string) => void;
}

export function QrScanner({ onScan }: QrScannerProps) {
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const startedRef = useRef(false);

  const onScanRef = useRef(onScan);
  onScanRef.current = onScan;

  useEffect(() => {
    let cancelled = false;
    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          if (!startedRef.current) return;
          startedRef.current = false;
          scanner.stop().catch(() => {});
          onScanRef.current(decodedText);
        },
        () => {}
      )
      .then(() => {
        if (cancelled) {
          scanner.stop().catch(() => {});
        } else {
          startedRef.current = true;
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(
            "カメラを起動できませんでした。カメラの使用を許可してください。"
          );
        }
      });

    return () => {
      cancelled = true;
      if (startedRef.current) {
        startedRef.current = false;
        scanner.stop().catch(() => {});
      }
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
