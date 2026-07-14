"use client";

import type { CSSProperties, ReactNode } from "react";
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

function Avatar({ kind }: { kind: "child" | "parent" }) {
  return (
    <span
      className="hidden sm:flex w-9 h-9 flex-shrink-0 items-center justify-center rounded-full text-[17px] select-none ring-1 ring-[var(--border-violet)] shadow-[0_6px_16px_-10px_rgba(124,58,237,0.5)]"
      style={{
        background:
          kind === "child"
            ? "linear-gradient(135deg, #EDE9FE, #FFFFFF)"
            : "linear-gradient(135deg, #FCE7F3, #FFFFFF)",
      }}
      aria-hidden
    >
      {kind === "child" ? "🧒" : "👩"}
    </span>
  );
}

function DashArrow() {
  return (
    <svg
      viewBox="0 0 44 24"
      className="hidden md:block w-full h-6 text-[var(--violet-300)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      aria-hidden
    >
      <path className="dash-flow" d="M2 12h34" strokeDasharray="4 5" />
      <path d="M32 6l6 6-6 6" strokeLinejoin="round" />
    </svg>
  );
}

export function ProblemDialogue() {
  const t = useT();
  const p = t.problem;

  return (
    <section id="problem" className="section-hero pb-0 relative overflow-hidden">
      {/* Soft decorative aura behind the timeline */}
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 left-1/2 top-1/3 -translate-x-1/2 w-[80%] h-[60%] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(124,58,237,0.10), transparent 60%), radial-gradient(circle at 75% 70%, rgba(236,72,153,0.08), transparent 60%)",
        }}
      />

      <div className="container-1100">
        <Reveal as="p" className="eyebrow mb-4 sm:mb-5">
          {p.eyebrow}
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mb-10 sm:mb-14 max-w-[20ch]">{p.title}</h2>
        </Reveal>

        <div className="space-y-6 sm:space-y-7">
          {p.rows.map((row, i) => (
            <Reveal key={row.age} delay={Math.min(i * 0.06, 0.3)}>
              <div className="md:grid md:grid-cols-[92px_minmax(0,1fr)_44px_320px] md:items-center gap-3 md:gap-4">
                {/* Age badge */}
                <div className="mb-3 md:mb-0">
                  <span
                    className="float-soft inline-flex items-center justify-center rounded-full text-white text-[11px] font-semibold px-3.5 py-2 whitespace-nowrap ring-1 ring-white/30 shadow-[0_12px_26px_-12px_rgba(124,58,237,0.75)]"
                    style={{
                      background: "linear-gradient(135deg, #7C3AED, #A855F7)",
                      animationDelay: `${i * 0.5}s`,
                    }}
                  >
                    {row.age}
                  </span>
                </div>

                {/* Dialogue bubbles with avatars + tails */}
                <div className="space-y-2.5">
                  <div className="flex items-end gap-2.5">
                    <Avatar kind="child" />
                    <div className="chat-bubble chat-bubble--child max-w-[86%] rounded-2xl rounded-bl-md border border-[var(--border-violet)] bg-white px-4 py-2.5 text-[13.5px] leading-[1.45] text-[var(--text-primary)] shadow-[0_8px_22px_-16px_rgba(124,58,237,0.4)] transition-transform duration-300 hover:-translate-y-0.5">
                      {row.child}
                    </div>
                  </div>
                  <div className="flex items-end gap-2.5 flex-row-reverse">
                    <Avatar kind="parent" />
                    <div className="chat-bubble chat-bubble--parent max-w-[86%] rounded-2xl rounded-br-md bg-[var(--violet-50)] border border-[var(--border-violet)] px-4 py-2.5 text-[13.5px] leading-[1.45] text-[var(--text-secondary)] transition-transform duration-300 hover:-translate-y-0.5">
                      {row.parent}
                    </div>
                  </div>
                </div>

                {/* Animated dashed connector (desktop only) */}
                <div className="flex items-center justify-center">
                  <DashArrow />
                </div>

                {/* Explanation card — floats gently in place, lifts on hover */}
                <div
                  className="float-soft group mt-3 md:mt-0 rounded-2xl border border-[var(--border-violet)] bg-gradient-to-b from-white to-[#FBFAFF] px-5 py-4 shadow-[0_18px_40px_-26px_rgba(124,58,237,0.5)] transition-shadow duration-300 hover:shadow-[0_28px_56px_-26px_rgba(124,58,237,0.6)]"
                  style={{ animationDelay: `${i * 0.5 + 0.25}s` } as CSSProperties}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-9 h-9 flex-shrink-0 rounded-full bg-[var(--violet-50)] ring-1 ring-[var(--border-violet)] flex items-center justify-center text-[18px] select-none transition-transform duration-300 group-hover:scale-110">
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
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-violet)] bg-white px-3.5 py-2 text-[13px] font-medium text-[var(--text-primary)] shadow-[0_8px_22px_-18px_rgba(124,58,237,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--brand-primary)] hover:shadow-[0_14px_30px_-18px_rgba(124,58,237,0.6)]"
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
