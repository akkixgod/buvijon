"use client";

import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { BrandText } from "@/components/BrandText";
import { PhoneFrame } from "@/components/PhoneFrame";
import { useT } from "@/components/I18nProvider";
import oilaShot from "../../../public/features/oila-shajarasi.png";
import tahlilShot from "../../../public/features/tahlil.png";

// Real app screenshots per function, in dictionary order. `null` = not shot yet
// → a neutral "Tez orada" placeholder fills the frame.
const SHOTS: (StaticImageData | null)[] = [oilaShot, tahlilShot, null, null];

// One icon per function, in dictionary order:
// Family tree · Screen-time analysis · In-app connection · Buvijon AI
const ITEM_ICONS = [
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" key="f1">
      <circle cx="12" cy="5" r="2.4" />
      <circle cx="6" cy="18" r="2.4" />
      <circle cx="18" cy="18" r="2.4" />
      <path d="M12 7.4v3.6M12 11H6v4.6M12 11h6v4.6" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" key="f2">
      <path d="M4 20V5" /><path d="M4 20h16" />
      <path d="M8 16v-3" /><path d="M12 16v-7" /><path d="M16 16v-5" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" key="f3">
      <path d="M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 3.5V6a1 1 0 0 1 1-1Z" />
      <path d="M9 10h6M9 12.5h3" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" key="f4">
      <path d="M12 3l1.6 3.9L17.5 8.5 13.6 10 12 14l-1.6-4L6.5 8.5l3.9-1.6L12 3Z" />
      <path d="M18 14l.8 2 .2.8 2 .2-2 .8-.2 2-.8-2-2-.2 2-.2.8-2Z" />
    </svg>
  ),
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="mt-0.5 flex-shrink-0">
      <path d="M4 10.5l3.5 3.5L16 6" />
    </svg>
  );
}

// Neutral "coming soon" screen for functions we don't have a screenshot for yet.
function ComingSoon() {
  return (
    <div
      className="w-full flex flex-col items-center justify-center gap-4 text-center px-6"
      style={{ aspectRatio: "688 / 1528", background: "linear-gradient(160deg, #F5F1FF 0%, #FBFAFF 45%, #FDF2F8 100%)" }}
    >
      <span className="w-16 h-16 rounded-2xl bg-white/80 ring-1 ring-[var(--border-violet)] flex items-center justify-center text-[var(--brand-primary)] shadow-[0_16px_40px_-24px_rgba(124,58,237,0.6)]">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7.5V12l3 2" />
        </svg>
      </span>
      <span className="text-[15px] font-semibold text-[var(--brand-primary)] tracking-tight">Tez orada</span>
      <span className="text-[12px] text-[var(--text-muted)] max-w-[180px] leading-[1.5]">
        Ekran shu yerda paydo bo&apos;ladi
      </span>
    </div>
  );
}

function PhoneColumn({
  shot,
  title,
  category,
  icon,
  chipDelay,
  phoneRight,
}: {
  shot: StaticImageData | null;
  title: string;
  category: string;
  icon: ReactNode;
  chipDelay: string;
  phoneRight: boolean;
}) {
  return (
    <div className={`order-1 ${phoneRight ? "lg:order-2" : "lg:order-1"} mb-10 lg:mb-0 flex justify-center`}>
      <div className="float-slow relative w-full max-w-[280px] sm:max-w-[300px] lg:max-w-[320px]">
        <PhoneFrame>
          {shot ? (
            <Image
              src={shot}
              alt={title}
              className="w-full h-auto block"
              sizes="(max-width: 1024px) 80vw, 320px"
            />
          ) : (
            <ComingSoon />
          )}
        </PhoneFrame>

        {/* floating category tab — drifts independently of the phone */}
        <div
          className={`float-a hidden sm:flex absolute -top-4 ${phoneRight ? "-right-5" : "-left-5"} items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm border border-[var(--border-violet)] pl-2.5 pr-3.5 py-2 shadow-[0_18px_40px_-18px_rgba(124,58,237,0.55)]`}
          style={{ animationDelay: chipDelay }}
        >
          <span className="w-6 h-6 rounded-full bg-[var(--violet-50)] text-[var(--brand-primary)] flex items-center justify-center [&>svg]:w-3.5 [&>svg]:h-3.5">
            {icon}
          </span>
          <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--brand-primary)] whitespace-nowrap">
            {category}
          </span>
        </div>
      </div>
    </div>
  );
}

export function FeatureShowcase() {
  const t = useT();
  const items = t.featuresPage.items;

  return (
    <div className="relative">
      {/* desktop center spine connecting the four functions into one journey */}
      <div
        aria-hidden
        className="hidden lg:block absolute left-1/2 top-6 bottom-6 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-[var(--border-violet)] to-transparent"
      />

      <div className="space-y-20 lg:space-y-28">
        {items.map((item, i) => {
          const phoneRight = i % 2 === 1;
          return (
            <Reveal key={item.title}>
              <div className="relative lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-20 lg:items-center">
                {/* spine node */}
                <span
                  aria-hidden
                  className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[var(--brand-primary)] ring-4 ring-white shadow-[0_0_0_5px_rgba(124,58,237,0.14)]"
                />

                <PhoneColumn
                  shot={SHOTS[i]}
                  title={item.title}
                  category={item.category}
                  icon={ITEM_ICONS[i]}
                  chipDelay={`${(i % 2) * 0.5}s`}
                  phoneRight={phoneRight}
                />

                {/* copy column */}
                <div className={`relative order-2 ${phoneRight ? "lg:order-1" : "lg:order-2"}`}>
                  {/* ghosted index numeral for depth */}
                  <span
                    aria-hidden
                    className="pointer-events-none select-none absolute -z-10 -top-10 sm:-top-14 -left-1 text-[96px] sm:text-[128px] font-bold leading-none text-[var(--violet-50)]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="feature-icon" style={{ marginBottom: 0 }}>
                      {ITEM_ICONS[i]}
                    </span>
                    <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[var(--brand-primary)]">
                      {item.category}
                    </span>
                  </div>

                  <h2 className="mb-4">{item.title}</h2>
                  <p className="text-[15px] sm:text-[16px] leading-[1.6] text-[var(--text-secondary)] mb-6">
                    <BrandText>{item.desc}</BrandText>
                  </p>

                  <ul className="space-y-2.5 pt-5 border-t border-[var(--border-subtle)]">
                    {item.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2.5 text-[14px] leading-[1.5] text-[var(--text-primary)]/85"
                      >
                        <span className="text-[var(--brand-primary)]"><CheckIcon /></span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
