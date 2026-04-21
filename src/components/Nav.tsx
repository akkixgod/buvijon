"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/#story", label: "Story", match: "/" },
  { href: "/#garden", label: "Garden", match: "/" },
  { href: "/#features", label: "Features", match: "/" },
  { href: "/family", label: "Family", match: "/family" },
  { href: "/analysis", label: "Analysis", match: "/analysis" },
];

export function Nav({ cta = true }: { cta?: boolean }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 glass-nav transition-[padding,background] duration-300"
      style={{
        paddingTop: scrolled ? 0 : 4,
        paddingBottom: scrolled ? 0 : 4,
        background: scrolled ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.65)",
      }}
    >
      <div className="container-1100 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[var(--text-primary)] group"
        >
          <span className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center transition-transform duration-500 group-hover:rotate-[18deg] group-hover:scale-110 shadow-[0_6px_18px_rgba(124,58,237,0.35)]">
            <span className="text-white text-[11px] font-bold leading-none">B</span>
          </span>
          <span className="text-[14px] font-semibold tracking-tight">Buvijon</span>
        </Link>

        <div className="hidden md:flex items-center gap-1 text-[13px] text-[var(--text-secondary)]">
          {LINKS.map((l) => {
            const active = pathname === l.match && l.match !== "/";
            return (
              <Link
                key={l.href}
                href={l.href}
                className="nav-link relative px-3 py-2 rounded-full transition-colors"
                data-active={active || undefined}
              >
                <span className="relative z-10">{l.label}</span>
              </Link>
            );
          })}
        </div>

        {cta && (
          <Link
            href="/waitlist"
            className="group relative text-[13px] font-medium px-4 py-2 rounded-full overflow-hidden transition-colors text-[var(--brand-primary)] hover:text-white"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-1">
              Join waitlist
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                ›
              </span>
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
