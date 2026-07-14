"use client";

import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { AppHomeMockup } from "@/components/AppHomeMockup";
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
      className="hidden sm:flex w-8 h-8 flex-shrink-0 items-center justify-center rounded-full text-[15px] select-none ring-1 ring-[var(--border-violet)] shadow-[0_6px_16px_-10px_rgba(124,58,237,0.5)]"
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

export function ProblemDialogue() {
  const t = useT();
  const p = t.problem;

  return (
    <section id="problem" className="section-hero relative">
      {/* Soft decorative aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 left-1/2 top-1/4 -translate-x-1/2 w-[85%] h-[55%] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 25% 30%, rgba(124,58,237,0.10), transparent 60%), radial-gradient(circle at 80% 70%, rgba(236,72,153,0.08), transparent 60%)",
        }}
      />

      <div className="container-1100">
        <Reveal as="p" className="eyebrow mb-4">
          {p.eyebrow}
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mb-10 sm:mb-12 max-w-[18ch] text-[clamp(1.5rem,3.4vw,2.6rem)] font-semibold leading-[1.14] tracking-[-0.025em] text-[var(--text-primary)]">
            {p.title}
          </h1>
        </Reveal>

        <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12 xl:gap-16 lg:items-start">
          {/* Dialogue timeline (left) */}
          <div className="order-2 lg:order-1 space-y-8 sm:space-y-9">
            {p.rows.map((row, i) => (
              <Reveal key={row.age} delay={Math.min(i * 0.05, 0.25)}>
                <div>
                  <span
                    className="float-soft inline-flex items-center justify-center rounded-full text-white text-[11px] font-semibold px-3.5 py-2 mb-3 whitespace-nowrap ring-1 ring-white/30 shadow-[0_12px_26px_-12px_rgba(124,58,237,0.75)]"
                    style={{
                      background: "linear-gradient(135deg, #7C3AED, #A855F7)",
                      animationDelay: `${i * 0.5}s`,
                    }}
                  >
                    {row.age}
                  </span>

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

                  {/* takeaway card */}
                  <div
                    className="float-soft group mt-3.5 rounded-2xl border border-[var(--border-violet)] bg-gradient-to-b from-white to-[#FBFAFF] px-4 py-3.5 shadow-[0_18px_40px_-26px_rgba(124,58,237,0.5)] transition-shadow duration-300 hover:shadow-[0_28px_56px_-26px_rgba(124,58,237,0.6)]"
                    style={{ animationDelay: `${i * 0.5 + 0.25}s` } as CSSProperties}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-8 h-8 flex-shrink-0 rounded-full bg-[var(--violet-50)] ring-1 ring-[var(--border-violet)] flex items-center justify-center text-[16px] select-none transition-transform duration-300 group-hover:scale-110">
                        {row.emoji}
                      </span>
                      <p className="text-[13.5px] leading-[1.5] text-[var(--text-primary)]">
                        {renderNote(row.note)}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* App screenshot phone (right, sticky on desktop) */}
          <Reveal
            delay={0.1}
            className="order-1 lg:order-2 mb-10 lg:mb-0 lg:sticky lg:top-24 w-full flex justify-center"
          >
            <div className="float-slow w-full max-w-[290px] sm:max-w-[320px] lg:max-w-none">
              <AppHomeMockup />
            </div>
          </Reveal>
        </div>

        {/* Legend */}
        <Reveal delay={0.1}>
          <div className="mt-12 sm:mt-14 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
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
