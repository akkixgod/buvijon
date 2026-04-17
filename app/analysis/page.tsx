"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AnalysisPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<"today" | "week" | "month">("today");

  useEffect(() => {
    const glow = document.getElementById("cursor-glow");
    const handleMove = (e: MouseEvent) => {
      if (glow) {
        glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        glow.style.opacity = "1";
      }
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const periodBtn = (active: boolean) =>
    `px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
      active
        ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-[0_0_18px_rgba(139,92,246,0.5)]"
        : "text-violet-300/80 hover:bg-white/5"
    }`;

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="orb" style={{ width: 420, height: 420, top: -120, left: -100, background: "radial-gradient(circle, rgba(139,92,246,0.45), transparent 65%)" }} />
      <div className="orb" style={{ width: 460, height: 460, bottom: -140, right: -120, background: "radial-gradient(circle, rgba(236,72,153,0.28), transparent 65%)", animationDelay: "2s" }} />

      <nav className="sticky top-0 px-6 py-4 backdrop-blur-xl bg-background/60 border-b border-violet-500/10" style={{ zIndex: 50 }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 via-violet-600 to-pink-500 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.6)]">
              <span className="text-white font-bold">B</span>
            </div>
            <span className="font-bold text-lg">Buvijon</span>
          </Link>
          <Link href="/family" className="premium-button btn-ghost rounded-full px-5 py-2.5 text-sm font-medium">
            Family
          </Link>
        </div>
      </nav>

      <main className="flex-1 px-6 py-10 relative" style={{ zIndex: 3 }}>
        <div className="max-w-6xl mx-auto mb-8">
          <h1 className="fade-in-up text-3xl md:text-5xl font-bold mb-2 tracking-tight">
            Screen Time <span className="gradient-text">Analysis</span>
          </h1>
          <p className="fade-in-up delay-100 text-[color:var(--text-muted)]">Monitor and understand your child&apos;s digital habits</p>
        </div>

        <div className="max-w-6xl mx-auto mb-8">
          <div className="fade-in-up delay-200 inline-flex gap-1 glass-card rounded-full p-1">
            <button onClick={() => setSelectedPeriod("today")} className={periodBtn(selectedPeriod === "today")}>Today</button>
            <button onClick={() => setSelectedPeriod("week")} className={periodBtn(selectedPeriod === "week")}>This Week</button>
            <button onClick={() => setSelectedPeriod("month")} className={periodBtn(selectedPeriod === "month")}>This Month</button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: "⏱", value: "2h 15m", label: "Total Today", grad: "from-violet-500 to-pink-500", value_class: "gradient-text" },
            { icon: "🎯", value: "75%", label: "Daily Goal", grad: "from-emerald-400 to-emerald-600", value_class: "text-emerald-300" },
            { icon: "📱", value: "12", label: "Apps Used", grad: "from-amber-300 to-orange-500", value_class: "text-amber-300" },
            { icon: "📅", value: "-15m", label: "vs Yesterday", grad: "from-rose-400 to-rose-600", value_class: "text-rose-300" },
          ].map((s, i) => (
            <div key={s.label} className="reveal glass-card magnetic-card rounded-2xl p-6 text-center" style={{ transitionDelay: `${i * 0.06}s` }}>
              <div className={`w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${s.grad} flex items-center justify-center shadow-lg`}>
                <span className="text-white text-2xl">{s.icon}</span>
              </div>
              <div className={`text-3xl font-bold mb-1 ${s.value_class}`}>{s.value}</div>
              <div className="text-sm text-[color:var(--text-muted)]">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 mb-8">
          <div className="reveal glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-violet-50">Daily Progress</h3>
            <div className="space-y-3">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                const heights = [65, 80, 45, 90, 75, 60, 85];
                const height = heights[i];
                const isToday = day === "Mon";
                return (
                  <div key={day} className="flex items-center gap-3">
                    <span className="w-12 text-sm text-[color:var(--text-muted)]">{day}</span>
                    <div className="flex-1 h-12 bg-white/5 rounded-lg overflow-hidden relative border border-violet-500/10">
                      <div
                        className={`absolute bottom-0 w-full ${isToday ? "bg-gradient-to-t from-violet-500 to-pink-400 shadow-[inset_0_0_20px_rgba(236,72,153,0.3)]" : "bg-gradient-to-t from-emerald-500/40 to-emerald-400/70"}`}
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <span className="w-16 text-sm text-right text-violet-200">{Math.floor(height * 0.018)}h</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="reveal glass-card rounded-2xl p-6" style={{ transitionDelay: "0.1s" }}>
            <h3 className="text-lg font-semibold mb-4 text-violet-50">Weekly Trend</h3>
            <div className="h-48 flex items-end justify-between gap-2 px-2">
              {[45, 70, 60, 80, 75, 65, 85, 50, 90, 72, 55, 78].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center h-full justify-end">
                  <div
                    className={`w-full rounded-t transition-all bg-gradient-to-t ${
                      height > 80 ? "from-rose-500 to-rose-300" : height > 65 ? "from-amber-500 to-amber-300" : "from-violet-600 to-violet-300"
                    } shadow-[0_0_16px_rgba(139,92,246,0.35)]`}
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-[color:var(--text-muted)] mt-1">
                    {["M","T","W","T","F","S","S","S","M","T","W","T","F","S"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mb-8">
          <div className="reveal glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-violet-50">App Usage Breakdown</h3>
            <div className="space-y-3">
              {[
                { app: "Instagram", time: "45m", percentage: 35, color: "from-pink-500 to-pink-400", icon: "📷" },
                { app: "TikTok", time: "30m", percentage: 24, color: "from-violet-500 to-violet-400", icon: "🎵" },
                { app: "YouTube", time: "25m", percentage: 20, color: "from-rose-500 to-rose-400", icon: "▶️" },
                { app: "Roblox", time: "15m", percentage: 12, color: "from-orange-500 to-amber-400", icon: "🎮" },
                { app: "WhatsApp", time: "10m", percentage: 8, color: "from-emerald-500 to-emerald-400", icon: "💬" },
              ].map((item) => (
                <div key={item.app} className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-md`}>
                    <span className="text-lg">{item.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-violet-100">{item.app}</span>
                      <span className="text-[color:var(--text-muted)] text-sm">{item.time}</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-violet-500/10">
                      <div className={`h-full bg-gradient-to-r ${item.color}`} style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="reveal glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-emerald-300">💡 Positive Insights</h3>
              <ul className="space-y-3 text-[color:var(--text-muted)]">
                {[
                  "Social media usage decreased by 20% this week",
                  "Educational apps usage increased — good sign of balance",
                  "Daily limit consistently achieved (75% of goal)",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span className="mt-1 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300 text-xs">✓</span>
                    <span className="text-violet-100">{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal glass-card rounded-2xl p-6" style={{ transitionDelay: "0.1s" }}>
              <h3 className="text-lg font-semibold mb-4 text-amber-300">⚠️ Areas to Watch</h3>
              <ul className="space-y-3 text-[color:var(--text-muted)]">
                {[
                  "Gaming spikes on weekend days (3+ hours)",
                  "Late night usage after 10 PM",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span className="mt-1 w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-300 text-xs">!</span>
                    <span className="text-violet-100">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 px-6 text-center text-sm text-[color:var(--text-muted)] border-t border-violet-500/10 relative" style={{ zIndex: 3 }}>
        <p>© 2026 Buvijon. All rights reserved.</p>
      </footer>
    </div>
  );
}
