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
  // For non-home routes: the pathname to match. For home anchors: undefined.
  pathMatch?: string;
  // For home anchors: the section id to track in viewport. Undefined for routes.
  section?: string;
};

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

  const links = useMemo<LinkSpec[]>(
    () => [
      { href: "/#story",    label: t.nav.story,    section: "story" },
      { href: "/#features", label: t.nav.features, section: "features" },
      { href: "/#how",      label: t.nav.how,      section: "how" },
      { href: "/family",    label: t.nav.family,   pathMatch: "/family" },
      { href: "/analysis",  label: t.nav.analysis, pathMatch: "/analysis" },
    ],
    [t],
  );

  // ── Active link tracking ────────────────────────────────────────────────
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // For non-home routes, derive active from pathname directly.
  useEffect(() => {
    if (pathname === "/") return; // handled by IntersectionObserver below
    const idx = links.findIndex((l) => l.pathMatch === pathname);
    setActiveIndex(idx === -1 ? null : idx);
  }, [pathname, links]);

  // For home page, observe section visibility and pick the most-visible one.
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
      // Mid-viewport band: a section "owns" the highlight while its body
      // sits behind the nav band.
      rootMargin: "-30% 0px -55% 0px",
      threshold: [0, 0.05, 0.12, 0.25, 0.5, 0.75, 1],
    });
    sectionEntries.forEach(({ el }) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname, links]);

  // ── Liquid pill positioning ─────────────────────────────────────────────
  const linkContainerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Hover takes precedence; otherwise rest at the section/route the user is on.
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

        <div
          ref={linkContainerRef}
          className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2"
          onMouseLeave={() => setHoverIndex(null)}
        >
          {/* Liquid pill background */}
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
              className="inline-flex items-center h-9 px-5 rounded-full bg-[var(--text-primary)] text-white text-[13px] font-semibold tracking-tight hover:bg-black/85 transition-colors shadow-[0_6px_18px_-6px_rgba(29,29,31,0.45)]"
            >
              {t.nav.joinWaitlist}
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
