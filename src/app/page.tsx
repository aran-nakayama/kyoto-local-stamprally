"use client";

import { Header } from "@/components/Header";
import { StampGrid } from "@/components/StampGrid";
import { useI18n } from "@/contexts/I18nContext";

export default function Home() {
  const { t } = useI18n();

  return (
    <>
      <Header title={t.home.title} subtitle={t.home.subtitle} />
      <div className="max-w-lg mx-auto px-4 py-6">
        <StampGrid />
      </div>
    </>
  );
}
