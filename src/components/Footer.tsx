"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { useT } from "./I18nProvider";

const FOOTER_LINKS = [
  { href: "/#how", key: "how" as const },
  { href: "/analysis", key: "analysis" as const },
  { href: "/waitlist", key: "joinWaitlist" as const },
];

export function Footer() {
  const t = useT();
  return (
    <footer className="bg-[var(--bg-section)] border-t border-[var(--border-subtle)] py-10 sm:py-14">
      <div className="container-1100 grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-[1fr_auto_auto] lg:items-start">
        <div className="flex flex-col gap-3 sm:gap-4 md:col-span-2 lg:col-span-1">
          <Logo size={28} />
          <p className="text-[13px] text-[var(--text-muted)] max-w-[420px] leading-relaxed">
            {t.footer.copyright}
          </p>
        </div>

        <nav aria-label="Site" className="flex flex-col gap-3">
          <span className="text-[11px] tracking-[0.22em] uppercase font-medium text-[var(--text-muted)]">
            {t.footer.explore}
          </span>
          <ul className="flex flex-col gap-2">
            {FOOTER_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors"
                >
                  {t.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-start lg:items-end gap-3 text-[13px]">
          <span className="text-[11px] tracking-[0.22em] uppercase font-medium text-[var(--text-muted)]">
            {t.footer.contact}
          </span>
          <a
            href={`mailto:${t.footer.gmail}`}
            className="group inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors"
          >
            <MailIcon />
            {t.footer.gmail}
          </a>
          <a
            href={`https://t.me/${t.footer.telegram.replace(/^@/, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors"
          >
            <TelegramIcon />
            {t.footer.telegram}
          </a>
        </div>
      </div>
    </footer>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M9.78 16.61 9.6 13.7l8.05-7.27c.37-.33-.08-.49-.57-.19L7.13 12.7l-4.3-1.36c-.92-.27-.93-.92.21-1.37L19.6 3.5c.78-.36 1.51.18 1.21 1.36l-2.9 13.6c-.21.96-.79 1.2-1.6.74l-4.36-3.22-2.1 2.04c-.24.24-.45.45-.92.45z" />
    </svg>
  );
}
