"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Logo } from "./Logo";
import { NavLink } from "./NavLink";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useT } from "./I18nProvider";

type LinkSpec = {
  href: string;
  label: string;
  pathMatch?: string;
  section?: string;
};

export function Nav({ cta = true }: { cta?: boolean }) {
  const pathname = usePathname();
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const links = useMemo<LinkSpec[]>(
    () => [
      { href: "/#story", label: t.nav.story, section: "story" },
      { href: "/#features", label: t.nav.features, section: "features" },
      { href: "/#how", label: t.nav.how, section: "how" },
      { href: "/family", label: t.nav.family, pathMatch: "/family" },
      { href: "/analysis", label: t.nav.analysis, pathMatch: "/analysis" },
    ],
    [t],
  );

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (pathname === "/") return;
    const idx = links.findIndex((l) => l.pathMatch === pathname);
    setActiveIndex(idx === -1 ? null : idx);
  }, [pathname, links]);

  useEffect(() => {
    if (pathname !== "/") return;
    const sectionEntries = links
      .map((l, i) => (l.section ? { i, el: document.getElementById(l.section) } : null))
      .filter((x): x is { i: number; el: HTMLElement } => !!x && !!x.el);

    if (sectionEntries.length === 0) {
      setActiveIndex(null);
      return;
    }

    const visibility = new Map<number, number>();
    sectionEntries.forEach(({ i }) => visibility.set(i, 0));

    const onChange = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const match = sectionEntries.find((s) => s.el === entry.target);
        if (!match) return;
        visibility.set(match.i, entry.intersectionRatio);
      });
      let bestI: number | null = null;
      let bestRatio = 0;
      visibility.forEach((ratio, i) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestI = i;
        }
      });
      setActiveIndex(bestRatio < 0.12 ? null : bestI);
    };

    const observer = new IntersectionObserver(onChange, {
      rootMargin: "-30% 0px -55% 0px",
      threshold: [0, 0.05, 0.12, 0.25, 0.5, 0.75, 1],
    });
    sectionEntries.forEach(({ el }) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname, links]);

  const linkContainerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const focusedIndex = hoverIndex ?? activeIndex;

  useLayoutEffect(() => {
    const measure = () => {
      const container = linkContainerRef.current;
      if (!container) return;
      if (focusedIndex === null) {
        setPillStyle((prev) => ({ ...prev, opacity: 0 }));
        return;
      }
      const el = linkRefs.current[focusedIndex];
      if (!el) {
        setPillStyle((prev) => ({ ...prev, opacity: 0 }));
        return;
      }
      const elRect = el.getBoundingClientRect();
      const parentRect = container.getBoundingClientRect();
      setPillStyle({
        left: elRect.left - parentRect.left,
        width: elRect.width,
        opacity: 1,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [focusedIndex, t]);

  const navSurface = scrolled
    ? "rgba(255,255,255,0.88)"
    : "rgba(255,255,255,0.72)";

  return (
    <>
      <nav
        className="fixed top-0 inset-x-0 z-50 transition-[background,border-color,backdrop-filter] duration-300"
        style={{
          background: mobileOpen ? navSurface : scrolled ? navSurface : "rgba(255,255,255,0)",
          backdropFilter: scrolled || mobileOpen ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled || mobileOpen ? "blur(20px) saturate(180%)" : "none",
          borderBottom:
            scrolled || mobileOpen
              ? "1px solid rgba(29,29,31,0.06)"
              : "1px solid transparent",
        }}
      >
        <div className="container-1100 h-14 flex items-center justify-between gap-3">
          <Logo size={28} />

          <div
            ref={linkContainerRef}
            className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2"
            onMouseLeave={() => setHoverIndex(null)}
          >
            <span
              aria-hidden
              className="absolute top-1/2 -translate-y-1/2 rounded-full pointer-events-none"
              style={{
                left: pillStyle.left,
                width: pillStyle.width,
                height: 32,
                opacity: pillStyle.opacity,
                background:
                  "linear-gradient(135deg, rgba(124,58,237,0.10), rgba(236,72,153,0.10))",
                border: "1px solid rgba(124,58,237,0.18)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                transition:
                  "left 0.45s cubic-bezier(0.22,1,0.36,1), width 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease",
              }}
            />
            {links.map((l, i) => {
              const active = activeIndex === i;
              const focused = focusedIndex === i;
              return (
                <NavLink
                  key={l.href}
                  href={l.href}
                  ref={(node) => {
                    linkRefs.current[i] = node;
                  }}
                  onClick={() => setHoverIndex(null)}
                  onMouseEnter={() => setHoverIndex(i)}
                  className="relative px-3.5 py-2 text-[13px] transition-colors"
                  style={{
                    color: focused || active ? "var(--text-primary)" : "var(--text-secondary)",
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {l.label}
                </NavLink>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            {cta && (
              <NavLink
                href="/waitlist"
                className="hidden sm:inline-flex items-center h-9 px-5 rounded-full bg-[var(--text-primary)] text-white text-[13px] font-semibold tracking-tight hover:bg-black/85 transition-colors shadow-[0_6px_18px_-6px_rgba(29,29,31,0.45)]"
              >
                {t.nav.joinWaitlist}
              </NavLink>
            )}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--surface-inset)] transition-colors"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
              onClick={() => setMobileOpen((o) => !o)}
            >
              <span className="sr-only">{mobileOpen ? t.nav.closeMenu : t.nav.openMenu}</span>
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </nav>

      <div
        id="mobile-nav-panel"
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          className="absolute inset-0 bg-[rgba(29,29,31,0.35)] backdrop-blur-[2px]"
          aria-label={t.nav.closeMenu}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-14 inset-x-0 bottom-0 bg-[var(--bg-primary)] border-t border-[var(--border-subtle)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            mobileOpen ? "translate-y-0" : "-translate-y-3"
          }`}
        >
          <div
            className="container-1100 py-6 flex flex-col gap-1 h-full overflow-y-auto"
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 24px)" }}
          >
            {links.map((l, i) => {
              const active = activeIndex === i;
              return (
                <NavLink
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center min-h-[52px] px-4 rounded-2xl text-[16px] font-medium transition-colors"
                  style={{
                    color: active ? "var(--brand-primary)" : "var(--text-primary)",
                    background: active ? "var(--violet-50)" : "transparent",
                  }}
                >
                  {l.label}
                </NavLink>
              );
            })}
            {cta && (
              <NavLink
                href="/waitlist"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full mt-6"
                style={{ height: 52 }}
              >
                {t.nav.joinWaitlist}
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
