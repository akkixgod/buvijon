"use client";

// Interactive screen-time analysis demo. Extracted from the former /analysis
// page so it can be embedded inside the /features page as a live example of
// the "Screen-time analysis" function. Uses only sample data.

import { useState, type CSSProperties } from "react";
import { CountUp } from "@/components/CountUp";
import { SegmentedControl } from "@/components/product/SegmentedControl";
import { useT } from "@/components/I18nProvider";

type Period = "today" | "week" | "month";

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
      { app: "TikTok", time: "30m", pct: 24 },
      { app: "YouTube", time: "25m", pct: 20 },
      { app: "Roblox", time: "15m", pct: 12 },
      { app: "WhatsApp", time: "10m", pct: 8 },
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
      { app: "TikTok", time: "2h 45m", pct: 24 },
      { app: "YouTube", time: "2h 20m", pct: 21 },
      { app: "Roblox", time: "1h 50m", pct: 16 },
      { app: "WhatsApp", time: "1h 15m", pct: 11 },
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
      { app: "TikTok", time: "11h 05m", pct: 22 },
      { app: "YouTube", time: "10h 20m", pct: 20 },
      { app: "Roblox", time: "8h 50m", pct: 17 },
      { app: "WhatsApp", time: "7h 25m", pct: 15 },
    ],
  },
};

export function AnalysisDemo() {
  const t = useT();
  const [period, setPeriod] = useState<Period>("today");
  const data = PERIOD_DATA[period];
  const stats = t.analysis.stats[period];
  const trendCount = data.trend.length;

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <div className="-mx-1 overflow-x-auto sm:overflow-visible">
          <div className="px-1">
            <SegmentedControl
              value={period}
              onChange={setPeriod}
              ariaLabel={t.analysis.eyebrow}
              options={(["today", "week", "month"] as Period[]).map((p) => ({
                value: p,
                label: t.analysis.periods[p],
              }))}
            />
          </div>
        </div>
      </div>

      <div
        key={`stats-${period}`}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 mb-8 sm:mb-10"
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="kpi-card anim-fade-up"
            style={{ animationDelay: `${i * 70}ms` } as CSSProperties}
          >
            <div className="kpi-card__value tabular-nums">
              <CountUp value={s.value} />
            </div>
            <div className="kpi-card__label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-6">
        <div className="panel panel-interactive h-full">
          <h3 className="mb-6 sm:mb-8">{t.analysis.activity}</h3>
          <div key={`bars-${period}`} className="space-y-3 sm:space-y-4">
            {data.bars.map((b, i) => (
              <div key={i} className="flex items-center gap-3 sm:gap-4">
                <span className="w-7 sm:w-10 text-[12px] sm:text-[13px] text-[var(--text-muted)] tabular-nums">
                  {b.label}
                </span>
                <div
                  className="flex-1 h-2 rounded-full overflow-hidden"
                  style={{ background: "var(--violet-50)" }}
                >
                  <div
                    className="h-full rounded-full anim-bar-h"
                    style={{
                      ["--bar-w" as string]: `${b.h}%`,
                      animationDelay: `${i * 60}ms`,
                      background: b.today ? "var(--brand-primary)" : "var(--violet-200)",
                    } as CSSProperties}
                  />
                </div>
                <span className="w-10 sm:w-12 text-[12px] sm:text-[13px] text-right text-[var(--text-secondary)] tabular-nums">
                  {(b.h * 0.018).toFixed(1)}h
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel panel-interactive h-full">
          <h3 className="mb-6 sm:mb-8">{t.analysis.trend}</h3>
          <div
            key={`trend-${period}`}
            className="h-48 sm:h-56 flex items-end justify-between gap-1 sm:gap-2"
          >
            {data.trend.map((h, i) => (
              <div
                key={i}
                className="flex-1 flex flex-col items-center h-full justify-end gap-1.5 sm:gap-2 min-w-0"
              >
                <div
                  className="w-full rounded-md anim-bar-v"
                  style={{
                    ["--bar-h" as string]: `${h}%`,
                    animationDelay: `${i * 35}ms`,
                    background:
                      h > 80 ? "var(--violet-600)" : h > 65 ? "var(--violet-400)" : "var(--violet-200)",
                  } as CSSProperties}
                />
                <span className="text-[10px] sm:text-[11px] text-[var(--text-muted)] tabular-nums">
                  {trendLabel(period, i, trendCount)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center flex-wrap gap-x-4 gap-y-2 sm:gap-x-6 mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-[var(--border-subtle)]">
            <LegendDot color="var(--violet-200)" label={t.analysis.legend.healthy} />
            <LegendDot color="var(--violet-400)" label={t.analysis.legend.borderline} />
            <LegendDot color="var(--violet-600)" label={t.analysis.legend.overLimit} />
          </div>
        </div>
      </div>

      <div className="panel panel-interactive">
        <h3 className="mb-6 sm:mb-8">{t.analysis.appBreakdown}</h3>
        <div key={`apps-${period}`} className="space-y-4 sm:space-y-5">
          {data.apps.map((item, i) => (
            <div key={item.app}>
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="font-medium text-[14px] sm:text-[15px] text-[var(--text-primary)] truncate">
                  {item.app}
                </span>
                <span className="text-[12px] sm:text-[13px] text-[var(--text-muted)] tabular-nums flex-shrink-0">
                  {item.time} · {item.pct}%
                </span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--violet-50)" }}>
                <div
                  className="h-full rounded-full anim-bar-h"
                  style={{
                    ["--bar-w" as string]: `${item.pct}%`,
                    animationDelay: `${i * 80}ms`,
                    background: "var(--brand-primary)",
                  } as CSSProperties}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function trendLabel(period: Period, i: number, count: number): string {
  if (period === "today") return `${(i + 1) * 2}`;
  if (period === "week") return `${count - i}d`;
  return `${count - i}w`;
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
      <span className="text-[12px] text-[var(--text-muted)]">{label}</span>
    </div>
  );
}
