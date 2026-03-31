"use client";

import { ShopCategory } from "@/lib/types";

type FilterOption = "all" | ShopCategory;

interface CategoryFilterProps {
  selected: FilterOption;
  onChange: (value: FilterOption) => void;
}

const options: { value: FilterOption; label: string }[] = [
  { value: "all", label: "すべて" },
  { value: "cafe", label: "カフェ" },
  { value: "bar", label: "バー" },
  { value: "restaurant", label: "レストラン" },
];

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
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
