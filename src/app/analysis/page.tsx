"use client";

import { useState, type CSSProperties } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { useT } from "@/components/I18nProvider";

type Period = "today" | "week" | "month";

const STAT_TONES = ["violet", "emerald", "amber", "rose"] as const;

type Bar = { label: string; h: number; today?: boolean };
type AppRow = { app: string; time: string; pct: number };

const PERIOD_DATA: Record<Period, { bars: Bar[]; trend: number[]; apps: AppRow[] }> = {
  today: {
    bars: [
      { label: "06", h: 8 },
      { label: "09", h: 30 },
      { label: "12", h: 55 },
      { label: "15", h: 70, today: true },
      { label: "18", h: 85 },
      { label: "21", h: 60 },
      { label: "24", h: 22 },
    ],
    trend: [10, 25, 40, 60, 80, 90, 70, 55, 40, 28, 18, 10],
    apps: [
      { app: "Instagram", time: "45m", pct: 35 },
      { app: "TikTok",    time: "30m", pct: 24 },
      { app: "YouTube",   time: "25m", pct: 20 },
      { app: "Roblox",    time: "15m", pct: 12 },
      { app: "WhatsApp",  time: "10m", pct: 8 },
    ],
  },
  week: {
    bars: [
      { label: "M", h: 65 },
      { label: "T", h: 80 },
      { label: "W", h: 45 },
      { label: "T", h: 90 },
      { label: "F", h: 75, today: true },
      { label: "S", h: 60 },
      { label: "S", h: 85 },
    ],
    trend: [45, 70, 60, 80, 75, 65, 85, 50, 90, 72, 55, 78],
    apps: [
      { app: "Instagram", time: "3h 10m", pct: 28 },
      { app: "TikTok",    time: "2h 45m", pct: 24 },
      { app: "YouTube",   time: "2h 20m", pct: 21 },
      { app: "Roblox",    time: "1h 50m", pct: 16 },
      { app: "WhatsApp",  time: "1h 15m", pct: 11 },
    ],
  },
  month: {
    bars: [
      { label: "1", h: 55 },
      { label: "2", h: 72 },
      { label: "3", h: 60 },
      { label: "4", h: 84, today: true },
    ],
    trend: [40, 55, 65, 60, 78, 82, 70, 88, 76, 72, 80, 84],
    apps: [
      { app: "Instagram", time: "12h 40m", pct: 26 },
      { app: "TikTok",    time: "11h 05m", pct: 22 },
      { app: "YouTube",   time: "10h 20m", pct: 20 },
      { app: "Roblox",    time: "8h 50m",  pct: 17 },
      { app: "WhatsApp",  time: "7h 25m",  pct: 15 },
    ],
  },
};

function toneColor(tone: string) {
  switch (tone) {
    case "emerald": return "var(--blooming)";
    case "amber":   return "var(--warning)";
    case "rose":    return "var(--wilting)";
    default:        return "var(--brand-primary)";
  }
}

export default function AnalysisPage() {
  const t = useT();
  const [period, setPeriod] = useState<Period>("today");
  const data = PERIOD_DATA[period];
  const stats = t.analysis.stats[period];
  const trendCount = data.trend.length;

  return (
    <>
      <Nav />

      <main className="section-hero pt-[130px]">
        <div className="container-1100">
          <div className="mb-12 max-w-[720px]">
            <Reveal as="p" className="eyebrow mb-5">{t.analysis.eyebrow}</Reveal>
            <Reveal delay={0.05}>
              <h1 className="mb-6">
                {t.analysis.title1}{" "}
                <span className="gradient-text">{t.analysis.titleHighlight}</span>
                {t.analysis.titleEnd}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lead">{t.analysis.lead}</p>
            </Reveal>
          </div>

          <Reveal delay={0.14} className="mb-12">
            <div
              className="inline-flex gap-1 p-1 rounded-full"
              style={{ background: "var(--violet-50)", border: "1px solid var(--border-violet)" }}
            >
              {(["today", "week", "month"] as Period[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className="px-6 py-2.5 rounded-full text-[14px] font-medium transition-all duration-300"
                  style={{
                    background: period === p ? "var(--brand-primary)" : "transparent",
                    color: period === p ? "#FFFFFF" : "var(--text-secondary)",
                    boxShadow: period === p ? "0 8px 22px -10px rgba(124,58,237,0.6)" : undefined,
                    transform: period === p ? "translateY(-1px)" : undefined,
                  }}
                >
                  {t.analysis.periods[p]}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Stats — re-mount on period change to retrigger animations */}
          <div key={`stats-${period}`} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="card card-hover h-full anim-fade-up"
                style={{ padding: 28, animationDelay: `${i * 70}ms` } as CSSProperties}
              >
                <div
                  className="text-[40px] font-semibold mb-2 tracking-tight"
                  style={{ color: toneColor(STAT_TONES[i]), letterSpacing: "-0.025em" }}
                >
                  {s.value}
                </div>
                <div className="text-[14px] text-[var(--text-secondary)]">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Reveal>
              <div className="card card-hover h-full">
                <h3 className="mb-8">{t.analysis.activity}</h3>
                <div key={`bars-${period}`} className="space-y-4">
                  {data.bars.map((b, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="w-10 text-[13px] text-[var(--text-muted)]">{b.label}</span>
                      <div
                        className="flex-1 h-10 rounded-xl overflow-hidden"
                        style={{ background: "var(--violet-50)" }}
                      >
                        <div
                          className="h-full rounded-xl anim-bar-h"
                          style={{
                            ["--bar-w" as string]: `${b.h}%`,
                            animationDelay: `${i * 60}ms`,
                            background: b.today
                              ? "linear-gradient(90deg, var(--violet-600), var(--brand-accent))"
                              : "var(--violet-300)",
                          } as CSSProperties}
                        />
                      </div>
                      <span className="w-12 text-[13px] text-right text-[var(--text-secondary)] tabular-nums">
                        {(b.h * 0.018).toFixed(1)}h
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="card card-hover h-full">
                <h3 className="mb-8">{t.analysis.trend}</h3>
                <div key={`trend-${period}`} className="h-56 flex items-end justify-between gap-2">
                  {data.trend.map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center h-full justify-end gap-2">
                      <div
                        className="w-full rounded-t-lg anim-bar-v"
                        style={{
                          ["--bar-h" as string]: `${h}%`,
                          animationDelay: `${i * 35}ms`,
                          background:
                            h > 80 ? "var(--wilting)" :
                            h > 65 ? "var(--warning)" :
                                     "var(--brand-primary)",
                          opacity: h > 80 ? 0.9 : h > 65 ? 0.85 : 0.8,
                        } as CSSProperties}
                      />
                      <span className="text-[11px] text-[var(--text-muted)] tabular-nums">
                        {trendLabel(period, i, trendCount)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-6 mt-6 pt-6 border-t border-[var(--border-subtle)]">
                  <LegendDot color="var(--brand-primary)" label={t.analysis.legend.healthy} />
                  <LegendDot color="var(--warning)" label={t.analysis.legend.borderline} />
                  <LegendDot color="var(--wilting)" label={t.analysis.legend.overLimit} />
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="mb-12">
            <div className="card card-hover">
              <h3 className="mb-8">{t.analysis.appBreakdown}</h3>
              <div key={`apps-${period}`} className="space-y-5">
                {data.apps.map((item, i) => (
                  <div key={item.app} className="flex items-center gap-5">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-[var(--text-primary)]">{item.app}</span>
                        <span className="text-[13px] text-[var(--text-muted)] tabular-nums">
                          {item.time} · {item.pct}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--violet-50)" }}>
                        <div
                          className="h-full rounded-full anim-bar-h"
                          style={{
                            ["--bar-w" as string]: `${item.pct}%`,
                            animationDelay: `${i * 80}ms`,
                            background: "linear-gradient(90deg, var(--violet-600), var(--brand-accent))",
                          } as CSSProperties}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            <Reveal>
              <div className="card card-hover h-full">
                <p
                  className="text-[12px] tracking-[0.22em] uppercase font-medium mb-5"
                  style={{ color: "var(--blooming)" }}
                >
                  {t.analysis.positiveTitle}
                </p>
                <ul className="space-y-4">
                  {t.analysis.positiveItems.map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <span
                        className="mt-1 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[11px]"
                        style={{ background: "var(--blooming)" }}
                      >
                        ✓
                      </span>
                      <span className="text-[16px] text-[var(--text-secondary)] leading-[1.55]">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="card card-hover h-full">
                <p
                  className="text-[12px] tracking-[0.22em] uppercase font-medium mb-5"
                  style={{ color: "var(--warning)" }}
                >
                  {t.analysis.watchTitle}
                </p>
                <ul className="space-y-4">
                  {t.analysis.watchItems.map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <span
                        className="mt-1 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[11px]"
                        style={{ background: "var(--warning)" }}
                      >
                        !
                      </span>
                      <span className="text-[16px] text-[var(--text-secondary)] leading-[1.55]">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

function trendLabel(period: Period, i: number, count: number): string {
  if (period === "today") return `${(i + 1) * 2}`;        // 2-hour blocks: "2","4",...
  if (period === "week")  return `${count - i}d`;          // days back
  return `${count - i}w`;                                  // weeks back
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
      <span className="text-[12px] text-[var(--text-muted)]">{label}</span>
    </div>
  );
}
