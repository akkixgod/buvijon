"use client";

import { useState } from "react";
import Link from "next/link";

export default function AnalysisPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<"today" | "week" | "month">("today");

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 px-6 py-4 bg-white/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blossom-pink to-pink-400 flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="font-bold text-xl text-foreground">Buvijon</span>
          </Link>
          <Link
            href="/family"
            className="bg-blossom-pink text-white px-6 py-2.5 rounded-full font-medium hover:bg-blossom-pink-light transition-colors"
          >
            Family
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-6 py-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
            Screen Time Analysis
          </h1>
          <p className="text-muted-foreground">Monitor and understand your child's digital habits</p>
        </div>

        {/* Period Selector */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex gap-2 bg-surface-secondary rounded-full p-1 w-fit">
            <button
              onClick={() => setSelectedPeriod("today")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedPeriod === "today"
                  ? "bg-blossom-pink text-white"
                  : "text-muted-foreground hover:bg-surface"
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setSelectedPeriod("week")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedPeriod === "week"
                  ? "bg-blossom-pink text-white"
                  : "text-muted-foreground hover:bg-surface"
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setSelectedPeriod("month")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedPeriod === "month"
                  ? "bg-blossom-pink text-white"
                  : "text-muted-foreground hover:bg-surface"
              }`}
            >
              This Month
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-blossom-pink to-pink-400 flex items-center justify-center">
              <span className="text-white text-2xl">⏱</span>
            </div>
            <div className="text-3xl font-bold mb-1 gradient-text">2h 15m</div>
            <div className="text-sm text-muted-foreground">Total Today</div>
          </div>

          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-blooming to-emerald-400 flex items-center justify-center">
              <span className="text-white text-2xl">🎯</span>
            </div>
            <div className="text-3xl font-bold mb-1 text-blooming">75%</div>
            <div className="text-sm text-muted-foreground">Daily Goal</div>
          </div>

          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-warning to-amber-400 flex items-center justify-center">
              <span className="text-white text-2xl">📱</span>
            </div>
            <div className="text-3xl font-bold mb-1 text-warning">12</div>
            <div className="text-sm text-muted-foreground">Apps Used</div>
          </div>

          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-wilting to-red-400 flex items-center justify-center">
              <span className="text-white text-2xl">📅</span>
            </div>
            <div className="text-3xl font-bold mb-1 text-wilting">-15m</div>
            <div className="text-sm text-muted-foreground">vs Yesterday</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 mb-8">
          {/* Daily Progress */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Daily Progress</h3>
            <div className="space-y-3">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                const heights = [65, 80, 45, 90, 75, 60, 85];
                const height = heights[i];
                const isToday = day === "Mon";

                return (
                  <div key={day} className="flex items-center gap-3">
                    <span className="w-12 text-sm text-muted-foreground">{day}</span>
                    <div className="flex-1 h-16 bg-surface-secondary rounded-lg overflow-hidden relative">
                      <div
                        className={`absolute bottom-0 w-full bg-gradient-to-t ${isToday ? "from-blossom-pink to-pink-400" : "from-blooming/30 to-blooming/70"}`}
                        style={{ height: `${height}%` }}
                      />
                      {isToday && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
                            <span className="text-lg">🌸</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <span className="w-16 text-sm text-right">
                      {Math.floor(height * 0.018)}h
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weekly Trend */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Weekly Trend</h3>
            <div className="h-48 flex items-end justify-between gap-2 px-4">
              {[45, 70, 60, 80, 75, 65, 85, 50, 90, 72, 55, 78].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center"
                >
                  <div
                    className={`w-full rounded-t transition-all ${
                      height > 70 ? "from-wilting to-red-400" : height > 50 ? "from-warning to-amber-400" : "from-blooming to-emerald-400"
                    }`}
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-muted-foreground mt-1">
                    {["M", "T", "W", "T", "F", "S", "S", "S", "M", "T", "W", "T", "F", "S"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* App Usage Breakdown */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground">App Usage Breakdown</h3>
            <div className="space-y-3">
              {[
                { app: "Instagram", time: "45m", percentage: 35, color: "from-pink-500 to-pink-600" },
                { app: "TikTok", time: "30m", percentage: 24, color: "from-purple-500 to-purple-600" },
                { app: "YouTube", time: "25m", percentage: 20, color: "from-red-500 to-red-600" },
                { app: "Roblox", time: "15m", percentage: 12, color: "from-orange-500 to-orange-600" },
                { app: "WhatsApp", time: "10m", percentage: 8, color: "from-emerald-500 to-emerald-600" },
              ].map((item) => (
                <div key={item.app} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white">
                    {item.app === "Instagram" && "📷"}
                    {item.app === "TikTok" && "🎵"}
                    {item.app === "YouTube" && "▶️"}
                    {item.app === "Roblox" && "🎮"}
                    {item.app === "WhatsApp" && "💬"}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-foreground">{item.app}</span>
                      <span className="text-muted-foreground">{item.time}</span>
                    </div>
                    <div className="h-2 bg-surface-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${item.color}`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights Section */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-blooming">💡 Positive Insights</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-blooming">✓</span>
                  <span>Social media usage decreased by 20% this week</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blooming">✓</span>
                  <span>Educational apps usage increased - good sign of balance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blooming">✓</span>
                  <span>Daily limit consistently achieved (75% of goal)</span>
                </li>
              </ul>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-warning">⚠️ Areas to Watch</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-warning">!</span>
                  <span>Gaming spikes on weekend days (3+ hours)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-warning">!</span>
                  <span>Late night usage after 10 PM</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 text-center text-sm text-muted-foreground border-t border-border">
        <p>© 2026 Buvijon. All rights reserved.</p>
      </footer>
    </div>
  );
}
