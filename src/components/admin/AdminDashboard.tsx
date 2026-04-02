"use client";

import { useI18n } from "@/contexts/I18nContext";
import { getAdminShops } from "@/lib/adminShops";

export function AdminDashboard() {
  const { t } = useI18n();
  const shops = getAdminShops();

  const cafes = shops.filter((s) => s.category === "cafe").length;
  const bars = shops.filter((s) => s.category === "bar").length;
  const restaurants = shops.filter((s) => s.category === "restaurant").length;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">{t.admin.dashboard}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label={t.admin.shopCount} value={shops.length} color="bg-primary" />
        <StatCard label={t.category.cafe} value={cafes} color="bg-amber-500" />
        <StatCard label={t.category.bar} value={bars} color="bg-purple-500" />
        <StatCard label={t.category.restaurant} value={restaurants} color="bg-green-500" />
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
          {value}
        </div>
        <span className="text-sm font-medium text-gray-600">{label}</span>
      </div>
    </div>
  );
}
