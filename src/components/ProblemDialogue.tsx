"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { useT } from "@/components/I18nProvider";

// Splits a note like "… **highlighted** …" and bolds the highlighted phrase.
function renderNote(note: string): ReactNode {
  return note.split(/\*\*(.+?)\*\*/).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-[var(--brand-primary)]">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

function DashArrow() {
  return (
    <svg
      viewBox="0 0 44 24"
      className="hidden md:block w-full h-6 text-[var(--violet-300)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M2 12h34" strokeDasharray="4 5" />
      <path d="M32 6l6 6-6 6" strokeLinejoin="round" />
    </svg>
  );
}

export function ProblemDialogue() {
  const t = useT();
  const p = t.problem;

  return (
    <section id="problem" className="section-hero pb-0">
      <div className="container-1100">
        <Reveal as="p" className="eyebrow mb-4 sm:mb-5">
          {p.eyebrow}
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mb-10 sm:mb-14 max-w-[20ch]">{p.title}</h2>
        </Reveal>

        <div className="space-y-5 sm:space-y-6">
          {p.rows.map((row, i) => (
            <Reveal key={row.age} delay={Math.min(i * 0.06, 0.3)}>
              <div className="md:grid md:grid-cols-[84px_minmax(0,1fr)_44px_320px] md:items-center gap-3 md:gap-4">
                {/* Age badge */}
                <div className="mb-3 md:mb-0">
                  <span className="inline-flex items-center justify-center rounded-full bg-[var(--brand-primary)] text-white text-[11px] font-semibold px-3 py-1.5 whitespace-nowrap shadow-[0_8px_20px_-10px_rgba(124,58,237,0.6)]">
                    {row.age}
                  </span>
                </div>

                {/* Dialogue bubbles */}
                <div className="space-y-2">
                  <div className="max-w-[88%] rounded-2xl rounded-tl-md border border-[var(--border-violet)] bg-white px-4 py-2.5 text-[13.5px] leading-[1.45] text-[var(--text-primary)] shadow-[0_6px_18px_-14px_rgba(124,58,237,0.35)]">
                    {row.child}
                  </div>
                  <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-md bg-[var(--violet-50)] border border-[var(--border-violet)] px-4 py-2.5 text-[13.5px] leading-[1.45] text-[var(--text-secondary)]">
                    {row.parent}
                  </div>
                </div>

                {/* Dashed connector (desktop only) */}
                <div className="flex items-center justify-center">
                  <DashArrow />
                </div>

                {/* Explanation card */}
                <div className="mt-3 md:mt-0 rounded-2xl border border-[var(--border-violet)] bg-white px-5 py-4 shadow-[0_14px_34px_-26px_rgba(124,58,237,0.4)]">
                  <div className="flex items-start gap-2.5">
                    <span className="text-[18px] leading-none select-none" aria-hidden>
                      {row.emoji}
                    </span>
                    <p className="text-[14px] leading-[1.5] text-[var(--text-primary)]">
                      {renderNote(row.note)}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Legend */}
        <Reveal delay={0.1}>
          <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {p.legend.map((item) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-violet)] bg-white px-3.5 py-2 text-[13px] font-medium text-[var(--text-primary)] shadow-[0_8px_22px_-18px_rgba(124,58,237,0.5)]"
              >
                <span className="text-[15px] leading-none select-none" aria-hidden>
                  {item.emoji}
                </span>
                {item.label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
