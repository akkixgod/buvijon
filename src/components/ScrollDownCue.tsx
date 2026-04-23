"use client";

import { useT } from "./I18nProvider";

export function ScrollDownCue() {
  const t = useT();
  return (
    <button
      type="button"
      onClick={() => {
        const el = document.getElementById("story");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
      aria-label={t.hero.scrollDown}
      className="group inline-flex flex-col items-center gap-2 mt-12 text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors"
    >
      <span className="text-[11px] tracking-[0.22em] uppercase font-medium">
        {t.hero.scrollDown}
      </span>
      <span className="relative w-5 h-8 rounded-full border border-current/40 flex justify-center pt-1.5">
        <span className="block w-1 h-1.5 rounded-full bg-current animate-scroll-dot" />
      </span>
    </button>
  );
}
