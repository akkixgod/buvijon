"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useT } from "./I18nProvider";

export function Nav({ cta = true }: { cta?: boolean }) {
  const pathname = usePathname();
  const t = useT();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#story",    label: t.nav.story,    match: "/" },
    { href: "/#features", label: t.nav.features, match: "/" },
    { href: "/#how",      label: t.nav.how,      match: "/" },
    { href: "/family",    label: t.nav.family,   match: "/family" },
    { href: "/analysis",  label: t.nav.analysis, match: "/analysis" },
  ];

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 transition-[background,border-color,backdrop-filter] duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0)",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(29,29,31,0.06)" : "1px solid transparent",
      }}
    >
      <div className="container-1100 h-14 flex items-center justify-between gap-4">
        <Logo size={28} />

        <div className="hidden md:flex items-center gap-7 text-[13px] text-[var(--text-secondary)] absolute left-1/2 -translate-x-1/2">
          {links.map((l) => {
            const active = pathname === l.match && l.match !== "/";
            return (
              <Link
                key={l.href}
                href={l.href}
                className="transition-colors hover:text-[var(--text-primary)]"
                style={active ? { color: "var(--text-primary)" } : undefined}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          {cta && (
            <Link
              href="/waitlist"
              className="inline-flex items-center h-9 px-5 rounded-full bg-[var(--text-primary)] text-white text-[13px] font-semibold tracking-tight hover:bg-black/85 transition-colors shadow-[0_6px_18px_-6px_rgba(29,29,31,0.45)]"
            >
              {t.nav.joinWaitlist}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
