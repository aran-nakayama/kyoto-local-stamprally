"use client";

import { useI18n } from "@/contexts/I18nContext";

interface ProgressBarProps {
  acquired: number;
  total: number;
}

export function ProgressBar({ acquired, total }: ProgressBarProps) {
  const { t } = useI18n();
  const percentage = total > 0 ? (acquired / total) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <span className="text-sm font-medium text-muted">{t.progress.label}</span>
        <span className="text-lg font-bold text-foreground">
          <span className="text-primary">{acquired}</span>
          <span className="text-muted"> / {total}</span>
        </span>
      </div>
      <div className="h-3 bg-stamp-empty rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
