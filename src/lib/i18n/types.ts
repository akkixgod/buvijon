import type en from "./dictionaries/en";

export const LOCALES = ["uz", "en", "ru"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "uz";
export const LOCALE_COOKIE = "NEXT_LOCALE";

export type Dictionary = typeof en;

export const LOCALE_LABELS: Record<Locale, string> = {
  uz: "O'zbekcha",
  en: "English",
  ru: "Русский",
};

export const LOCALE_SHORT: Record<Locale, string> = {
  uz: "UZ",
  en: "EN",
  ru: "RU",
};
