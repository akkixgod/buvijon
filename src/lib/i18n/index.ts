import en from "./dictionaries/en";
import uz from "./dictionaries/uz";
import ru from "./dictionaries/ru";
import { DEFAULT_LOCALE, LOCALES, type Dictionary, type Locale } from "./types";

const DICTIONARIES: Record<Locale, Dictionary> = { uz, en, ru };

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
}

export { DEFAULT_LOCALE, LOCALES, type Dictionary, type Locale };
export { LOCALE_COOKIE, LOCALE_LABELS, LOCALE_SHORT } from "./types";
