export { ja } from "./ja";
export { en } from "./en";
export type { Locale, TranslationDict } from "./types";

import { ja } from "./ja";
import { en } from "./en";
import { TranslationDict, Locale } from "./types";

export const translations: Record<Locale, TranslationDict> = { ja, en };

export const localeNames: Record<Locale, string> = {
  ja: "日本語",
  en: "English",
};

export const locales: Locale[] = ["ja", "en"];
