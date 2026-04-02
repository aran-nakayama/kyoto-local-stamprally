"use client";

import { useState, useRef } from "react";
import { useI18n } from "@/contexts/I18nContext";
import { getAdminShops, saveAdminShops, resetToDefaults } from "@/lib/adminShops";
import { Shop } from "@/lib/types";

export function AdminExportImport() {
  const { t } = useI18n();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = JSON.stringify(getAdminShops(), null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "shops.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text) as Shop[];
      if (!Array.isArray(data) || !data.every((s) => s.id && s.name && s.category)) {
        throw new Error("Invalid format");
      }
      saveAdminShops(data);
      setMessage({ type: "success", text: `${data.length} shops imported` });
    } catch {
      setMessage({ type: "error", text: "Invalid JSON file" });
    }

    if (fileRef.current) fileRef.current.value = "";
  };

  const handleReset = () => {
    resetToDefaults();
    setConfirmReset(false);
    setMessage({ type: "success", text: "Reset to defaults" });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{t.admin.exportImport}</h2>

      {message && (
        <div className={`p-3 rounded-lg text-sm ${
          message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
        }`}>
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        {/* Export */}
        <div>
          <h3 className="font-medium mb-2">{t.admin.export}</h3>
          <button
            onClick={handleExport}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            {t.admin.export} JSON
          </button>
        </div>

        {/* Import */}
        <div>
          <h3 className="font-medium mb-2">{t.admin.import}</h3>
          <input
            ref={fileRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
        </div>

        {/* Reset */}
        <div>
          <h3 className="font-medium mb-2">{t.admin.reset}</h3>
          {confirmReset ? (
            <div className="flex items-center gap-3">
              <p className="text-sm text-red-600">{t.admin.resetConfirm}</p>
              <button
                onClick={handleReset}
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
              >
                OK
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="text-sm text-gray-500 hover:text-gray-700 px-2 py-1"
              >
                {t.admin.cancel}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmReset(true)}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              {t.admin.reset}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
