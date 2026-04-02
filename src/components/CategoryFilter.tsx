"use client";

import { ShopCategory } from "@/lib/types";
import { useI18n } from "@/contexts/I18nContext";

type FilterOption = "all" | ShopCategory;

interface CategoryFilterProps {
  selected: FilterOption;
  onChange: (value: FilterOption) => void;
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  const { t } = useI18n();

  const options: { value: FilterOption; label: string }[] = [
    { value: "all", label: t.category.all },
    { value: "cafe", label: t.category.cafe },
    { value: "bar", label: t.category.bar },
    { value: "restaurant", label: t.category.restaurant },
  ];

  return (
    <div className="flex gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selected === opt.value
              ? "bg-primary text-white"
              : "bg-card text-muted border border-border hover:border-primary/30"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
