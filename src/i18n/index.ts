export { ja } from "./ja";
export { en } from "./en";
export { zh } from "./zh";
export { ko } from "./ko";
export type { Locale, TranslationDict } from "./types";

import { ja } from "./ja";
import { en } from "./en";
import { zh } from "./zh";
import { ko } from "./ko";
import { TranslationDict, Locale } from "./types";

export const translations: Record<Locale, TranslationDict> = { ja, en, zh, ko };

export const localeNames: Record<Locale, string> = {
  ja: "日本語",
  en: "English",
  zh: "中文",
  ko: "한국어",
};

export const locales: Locale[] = ["ja", "en", "zh", "ko"];
