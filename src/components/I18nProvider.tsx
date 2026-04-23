"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  getDictionary,
  type Dictionary,
  type Locale,
} from "@/lib/i18n";

type Ctx = {
  locale: Locale;
  t: Dictionary;
  setLocale: (next: Locale) => void;
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // Sync to server-provided locale when the cookie was set elsewhere
  // (e.g., a fresh tab) and the layout RSC re-renders with a new value.
  useEffect(() => {
    setLocaleState(initialLocale);
  }, [initialLocale]);

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      document.cookie = `${LOCALE_COOKIE}=${next}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`;
      try {
        localStorage.setItem(LOCALE_COOKIE, next);
      } catch {}
      setLocaleState(next);
      document.documentElement.lang = next;
      router.refresh();
    },
    [locale, router],
  );

  const value = useMemo<Ctx>(
    () => ({ locale, t: getDictionary(locale), setLocale }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): Ctx {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    return {
      locale: DEFAULT_LOCALE,
      t: getDictionary(DEFAULT_LOCALE),
      setLocale: () => {},
    };
  }
  return ctx;
}

export function useT(): Dictionary {
  return useI18n().t;
}
