"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/#story", label: "Story", match: "/" },
  { href: "/#features", label: "Features", match: "/" },
  { href: "/#how", label: "How", match: "/" },
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
      className="fixed top-0 inset-x-0 z-50 transition-[background,border-color,backdrop-filter] duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0)",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(29,29,31,0.06)" : "1px solid transparent",
      }}
    >
      <div className="container-1100 h-12 flex items-center justify-between">
        <Link
          href="/"
          className="text-[15px] font-semibold tracking-[-0.02em] text-[var(--text-primary)]"
        >
          Buvijon
        </Link>

        <div className="hidden md:flex items-center gap-7 text-[13px] text-[var(--text-secondary)] absolute left-1/2 -translate-x-1/2">
          {LINKS.map((l) => {
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

        {cta && (
          <Link
            href="/waitlist"
            className="text-[13px] font-medium text-[var(--text-primary)] hover:text-[var(--brand-primary)] transition-colors"
          >
            Join waitlist
          </Link>
        )}
      </div>
    </nav>
  );
}
