"use client";

import { useState, useEffect } from "react";
import { isAdminAuthenticated, setAdminAuthenticated, verifyPassword, adminLogout } from "@/lib/admin";
import { useI18n } from "@/contexts/I18nContext";
import { AdminQrCodes } from "@/components/admin/AdminQrCodes";

export default function AdminPage() {
  const { t } = useI18n();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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

  return (
    <div className="min-h-screen bg-gray-50">
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

      <main className="max-w-5xl mx-auto px-4 py-6">
        <AdminQrCodes />
      </main>
    </div>
  );
}
