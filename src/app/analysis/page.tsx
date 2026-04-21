"use client";

import { useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

type Period = "today" | "week" | "month";

const STATS = [
  { value: "2h 15m", label: "Total today", tone: "violet" },
  { value: "75%", label: "Daily goal", tone: "emerald" },
  { value: "12", label: "Apps used", tone: "amber" },
  { value: "−15m", label: "vs yesterday", tone: "rose" },
];

const DAYS = [
  { d: "Mon", h: 65, today: true },
  { d: "Tue", h: 80 },
  { d: "Wed", h: 45 },
  { d: "Thu", h: 90 },
  { d: "Fri", h: 75 },
  { d: "Sat", h: 60 },
  { d: "Sun", h: 85 },
];

const TREND = [45, 70, 60, 80, 75, 65, 85, 50, 90, 72, 55, 78];

const APPS = [
  { app: "Instagram", time: "45m", pct: 35 },
  { app: "TikTok", time: "30m", pct: 24 },
  { app: "YouTube", time: "25m", pct: 20 },
  { app: "Roblox", time: "15m", pct: 12 },
  { app: "WhatsApp", time: "10m", pct: 8 },
];

const POSITIVES = [
  "Social media usage decreased by 20% this week.",
  "Educational apps time is up — a good sign of balance.",
  "Daily limit consistently met (75% of goal).",
];

const WATCH = [
  "Gaming spikes on weekend days (3+ hours).",
  "Late-night usage after 10 PM.",
];

function toneColor(tone: string) {
  switch (tone) {
    case "emerald":
      return "var(--blooming)";
    case "amber":
      return "var(--warning)";
    case "rose":
      return "var(--wilting)";
    default:
      return "var(--brand-primary)";
  }
}

export default function AnalysisPage() {
  const [period, setPeriod] = useState<Period>("today");

  return (
    <>
      <Nav />

      <main className="section-hero pt-[120px]">
        <div className="container-1100">
          <div className="mb-12 max-w-[720px]">
            <Reveal as="p" className="eyebrow mb-5">Screen time analysis</Reveal>
            <Reveal delay={0.05}>
              <h1 className="mb-6">
                Understand the <span className="gradient-text">patterns</span>.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lead">
                A quiet, honest look at your family&apos;s digital rhythm — no charts for the sake of charts, just what&apos;s worth seeing.
              </p>
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
                  className="px-6 py-2.5 rounded-full text-[14px] font-medium transition-colors"
                  style={{
                    background: period === p ? "var(--brand-primary)" : "transparent",
                    color: period === p ? "#FFFFFF" : "var(--text-secondary)",
                  }}
                >
                  {p === "today" ? "Today" : p === "week" ? "This week" : "This month"}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <div className="card h-full" style={{ padding: 28 }}>
                  <div
                    className="text-[40px] font-semibold mb-2 tracking-tight"
                    style={{ color: toneColor(s.tone), letterSpacing: "-0.025em" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-[14px] text-[var(--text-secondary)]">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Reveal>
              <div className="card h-full">
                <h3 className="mb-8">Daily progress</h3>
                <div className="space-y-4">
                  {DAYS.map((day) => (
                    <div key={day.d} className="flex items-center gap-4">
                      <span className="w-10 text-[13px] text-[var(--text-muted)]">{day.d}</span>
                      <div
                        className="flex-1 h-10 rounded-xl overflow-hidden"
                        style={{ background: "var(--violet-50)" }}
                      >
                        <div
                          className="h-full rounded-xl transition-all"
                          style={{
                            width: `${day.h}%`,
                            background: day.today
                              ? "linear-gradient(90deg, var(--violet-600), var(--brand-accent))"
                              : "var(--violet-300)",
                          }}
                        />
                      </div>
                      <span className="w-12 text-[13px] text-right text-[var(--text-secondary)]">
                        {(day.h * 0.018).toFixed(1)}h
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="card h-full">
                <h3 className="mb-8">Weekly trend</h3>
                <div className="h-56 flex items-end justify-between gap-2">
                  {TREND.map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center h-full justify-end gap-2">
                      <div
                        className="w-full rounded-t-lg"
                        style={{
                          height: `${h}%`,
                          background:
                            h > 80
                              ? "var(--wilting)"
                              : h > 65
                              ? "var(--warning)"
                              : "var(--brand-primary)",
                          opacity: h > 80 ? 0.9 : h > 65 ? 0.85 : 0.8,
                        }}
                      />
                      <span className="text-[11px] text-[var(--text-muted)]">
                        {["M", "T", "W", "T", "F", "S", "S", "S", "M", "T", "W", "T"][i]}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-6 mt-6 pt-6 border-t border-[var(--border-subtle)]">
                  <LegendDot color="var(--brand-primary)" label="Healthy" />
                  <LegendDot color="var(--warning)" label="Borderline" />
                  <LegendDot color="var(--wilting)" label="Over limit" />
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="mb-12">
            <div className="card">
              <h3 className="mb-8">App usage breakdown</h3>
              <div className="space-y-5">
                {APPS.map((item) => (
                  <div key={item.app} className="flex items-center gap-5">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-[var(--text-primary)]">{item.app}</span>
                        <span className="text-[13px] text-[var(--text-muted)]">
                          {item.time} · {item.pct}%
                        </span>
                      </div>
                      <div
                        className="h-2 rounded-full overflow-hidden"
                        style={{ background: "var(--violet-50)" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${item.pct}%`,
                            background: "linear-gradient(90deg, var(--violet-600), var(--brand-accent))",
                          }}
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
              <div className="card h-full">
                <p
                  className="text-[12px] tracking-[0.22em] uppercase font-medium mb-5"
                  style={{ color: "var(--blooming)" }}
                >
                  Positive insights
                </p>
                <ul className="space-y-4">
                  {POSITIVES.map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <span
                        className="mt-1 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[11px]"
                        style={{ background: "var(--blooming)" }}
                      >
                        ✓
                      </span>
                      <span className="text-[16px] text-[var(--text-secondary)] leading-[1.55]">
                        {line}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="card h-full">
                <p
                  className="text-[12px] tracking-[0.22em] uppercase font-medium mb-5"
                  style={{ color: "var(--warning)" }}
                >
                  Areas to watch
                </p>
                <ul className="space-y-4">
                  {WATCH.map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <span
                        className="mt-1 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[11px]"
                        style={{ background: "var(--warning)" }}
                      >
                        !
                      </span>
                      <span className="text-[16px] text-[var(--text-secondary)] leading-[1.55]">
                        {line}
                      </span>
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

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
      <span className="text-[12px] text-[var(--text-muted)]">{label}</span>
    </div>
  );
}
