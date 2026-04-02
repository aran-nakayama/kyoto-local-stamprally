"use client";

import { useState, useEffect } from "react";
import { isAdminAuthenticated, setAdminAuthenticated, verifyPassword, adminLogout } from "@/lib/admin";
import { useI18n } from "@/contexts/I18nContext";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminShopList } from "@/components/admin/AdminShopList";
import { AdminShopForm } from "@/components/admin/AdminShopForm";
import { AdminQrCodes } from "@/components/admin/AdminQrCodes";
import { AdminTranslations } from "@/components/admin/AdminTranslations";
import { AdminExportImport } from "@/components/admin/AdminExportImport";
import { Shop } from "@/lib/types";

type AdminView = "dashboard" | "shops" | "shopForm" | "qr" | "translations" | "export";

export default function AdminPage() {
  const { t } = useI18n();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [view, setView] = useState<AdminView>("dashboard");
  const [editingShop, setEditingShop] = useState<Shop | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setAuthenticated(isAdminAuthenticated());
  }, []);

  const handleLogin = async () => {
    const valid = await verifyPassword(password);
    if (valid) {
      setAdminAuthenticated();
      setAuthenticated(true);
      setError("");
    } else {
      setError(t.admin.wrongPassword);
    }
  };

  const handleLogout = () => {
    adminLogout();
    setAuthenticated(false);
  };

  const handleEditShop = (shop: Shop) => {
    setEditingShop(shop);
    setView("shopForm");
  };

  const handleAddShop = () => {
    setEditingShop(null);
    setView("shopForm");
  };

  const handleFormDone = () => {
    setEditingShop(null);
    setView("shops");
  };

  if (!mounted) return null;

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-center mb-2">{t.admin.login}</h1>
          <p className="text-sm text-gray-500 text-center mb-6">{t.admin.title}</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder={t.admin.password}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <button
            onClick={handleLogin}
            className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            {t.admin.loginButton}
          </button>
        </div>
      </div>
    );
  }

  const navItems: { key: AdminView; label: string }[] = [
    { key: "dashboard", label: t.admin.dashboard },
    { key: "shops", label: t.admin.shopManagement },
    { key: "qr", label: t.admin.qrCodes },
    { key: "translations", label: t.admin.translations },
    { key: "export", label: t.admin.exportImport },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 text-white px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-lg font-bold">{t.admin.title}</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            {t.admin.logout}
          </button>
        </div>
      </header>

      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 overflow-x-auto">
        <div className="max-w-5xl mx-auto flex">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setView(item.key)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                view === item.key || (view === "shopForm" && item.key === "shops")
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        {view === "dashboard" && <AdminDashboard />}
        {view === "shops" && (
          <AdminShopList onEdit={handleEditShop} onAdd={handleAddShop} />
        )}
        {view === "shopForm" && (
          <AdminShopForm shop={editingShop} onDone={handleFormDone} />
        )}
        {view === "qr" && <AdminQrCodes />}
        {view === "translations" && <AdminTranslations />}
        {view === "export" && <AdminExportImport />}
      </main>
    </div>
  );
}
