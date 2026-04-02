"use client";

import { useState, useRef, useEffect } from "react";
import { useI18n } from "@/contexts/I18nContext";
import { getAdminShops } from "@/lib/adminShops";
import QRCode from "qrcode";

export function AdminQrCodes() {
  const { t } = useI18n();
  const shops = getAdminShops();
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    setBaseUrl(`${window.location.origin}/kyoto-local-stamprally`);
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{t.admin.qrCodes}</h2>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">Base URL</label>
        <input
          type="text"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {shops.map((shop) => (
          <QrCard key={shop.id} name={shop.name} url={`${baseUrl}/stamp/${shop.stampToken}`} generateLabel={t.admin.generate} />
        ))}
      </div>
    </div>
  );
}

function QrCard({ name, url, generateLabel }: { name: string; url: string; generateLabel: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generated, setGenerated] = useState(false);

  const generate = async () => {
    if (!canvasRef.current) return;
    await QRCode.toCanvas(canvasRef.current, url, { width: 200, margin: 2 });
    setGenerated(true);
  };

  const download = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `qr-${name.replace(/\s+/g, "-")}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center gap-3">
      <p className="font-medium text-sm text-center">{name}</p>
      <canvas ref={canvasRef} className={generated ? "" : "hidden"} />
      {!generated ? (
        <button
          onClick={generate}
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          {generateLabel}
        </button>
      ) : (
        <button
          onClick={download}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Download PNG
        </button>
      )}
      <p className="text-xs text-gray-400 break-all text-center">{url}</p>
    </div>
  );
}
