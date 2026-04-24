"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { LOCALES, LOCALE_LABELS, LOCALE_SHORT, type Locale } from "@/lib/i18n";
import { useI18n } from "./I18nProvider";

// Dropdown is rendered via createPortal into document.body and positioned
// with `position: fixed` from the trigger's bounding rect. This bypasses
// every stacking context and containing block on the page (Nav backdrop
// filter, page `<main>`'s position:relative+z-index, GSAP transforms left
// on Reveal elements, etc.) — the menu always sits above page content.

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; right: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    if (!open) return;
    const update = () => {
      const btn = btnRef.current;
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      setCoords({ top: r.bottom + 6, right: window.innerWidth - r.right });
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (btnRef.current?.contains(target)) return;
      if (menuRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full text-[12px] font-semibold tracking-wide text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--violet-50)] transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3a14 14 0 0 1 0 18" />
          <path d="M12 3a14 14 0 0 0 0 18" />
        </svg>
        {LOCALE_SHORT[locale]}
      </button>

      {open && coords && typeof document !== "undefined" &&
        createPortal(
          <ul
            ref={menuRef}
            role="listbox"
            style={{
              position: "fixed",
              top: coords.top,
              right: coords.right,
              zIndex: 1000,
            }}
            className="min-w-[140px] py-1.5 rounded-2xl bg-white border border-[var(--border-subtle)] shadow-[0_18px_40px_-12px_rgba(29,29,31,0.18)]"
          >
            {LOCALES.map((l: Locale) => {
              const active = l === locale;
              return (
                <li key={l}>
                  <button
                    type="button"
                    onClick={() => { setLocale(l); setOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-[13px] transition-colors ${
                      active
                        ? "text-[var(--text-primary)] font-semibold bg-[var(--violet-50)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--violet-50)]/60"
                    }`}
                    role="option"
                    aria-selected={active}
                  >
                    <span className="inline-block w-7 text-[11px] tracking-wider opacity-70">{LOCALE_SHORT[l]}</span>
                    {LOCALE_LABELS[l]}
                  </button>
                </li>
              );
            })}
          </ul>,
          document.body,
        )}
    </>
  );
}
