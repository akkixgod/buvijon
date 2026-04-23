"use client";

import { Flower } from "./Flower";
import { useT } from "./I18nProvider";

const APP_KEYS = ["youtube", "games", "school"] as const;
const APP_META = {
  youtube: { time: "45m", grad: "from-rose-400 to-pink-500", icon: "▶" },
  games:   { time: "30m", grad: "from-violet-400 to-indigo-500", icon: "◆" },
  school:  { time: "1h",  grad: "from-emerald-400 to-cyan-500", icon: "✎" },
};
const INSIGHT_TONES = ["emerald", "violet"] as const;

export function PhoneMockup() {
  const t = useT();
  return (
    <div className="relative mx-auto w-full max-w-[340px] md:max-w-[380px]">
      <div className="absolute -inset-6 -z-10 rounded-[3rem] opacity-60 blur-3xl"
           style={{ background: "radial-gradient(circle at 30% 20%, rgba(124,58,237,0.35), transparent 60%), radial-gradient(circle at 80% 80%, rgba(236,72,153,0.28), transparent 55%)" }} />

      <div className="rounded-[3rem] p-[3px] bg-gradient-to-br from-violet-500 via-violet-600 to-pink-500 shadow-[0_40px_100px_rgba(109,40,217,0.35)]">
        <div className="rounded-[2.85rem] bg-white overflow-hidden border border-violet-100 relative">
          <div className="absolute top-0 inset-x-0 h-8 flex items-center justify-between px-7 pt-3 text-[10px] font-semibold text-[#1D1D1F] z-10">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-3 h-[6px] rounded-[1px] border border-[#1D1D1F]" />
              <span className="inline-block w-4 h-[7px] rounded-[2px] border border-[#1D1D1F] relative">
                <span className="absolute inset-[1px] right-1 bg-[#1D1D1F] rounded-[1px]" />
              </span>
            </span>
          </div>

          <div className="aspect-[9/18] flex flex-col px-5 pt-10 pb-5">
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-[5px] rounded-full bg-[#1D1D1F]" />

            <div className="mt-2 text-center">
              <div className="text-[10px] tracking-[0.22em] uppercase text-[#86868B]">{t.phone.today}</div>
              <div className="text-[18px] font-semibold text-[#1D1D1F] mt-0.5 tracking-tight">
                {t.phone.childGarden}
              </div>
            </div>

            <div className="relative mt-2 flex items-center justify-center h-[150px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[160px] h-[160px] rounded-full bg-gradient-to-br from-violet-100 to-pink-100 blur-2xl opacity-80" />
              </div>
              <Flower variant="violet" size={140} progress={0.78} />
            </div>

            <div className="text-center mt-1 mb-3">
              <div className="text-[14px] font-semibold text-[#1D1D1F]">{t.phone.blooming}</div>
              <div className="text-[11px] text-[#86868B] mt-0.5">{t.phone.bloomSubtitle}</div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5 text-[11px] text-[#6E6E73]">
                <span>{t.phone.screenTime}</span>
                <span className="font-medium text-[#1D1D1F] tabular-nums">2h 15m / 3h</span>
              </div>
              <div className="h-[7px] bg-violet-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "75%",
                    background: "linear-gradient(90deg, #7C3AED, #EC4899)",
                  }}
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {APP_KEYS.map((key) => {
                const meta = APP_META[key];
                return (
                  <div
                    key={key}
                    className="rounded-xl border border-violet-100 bg-violet-50/60 p-2.5 text-center"
                  >
                    <div
                      className={`w-7 h-7 mx-auto mb-1.5 rounded-lg bg-gradient-to-br ${meta.grad} flex items-center justify-center text-white text-[11px] shadow-sm`}
                    >
                      {meta.icon}
                    </div>
                    <div className="text-[10px] font-medium text-[#1D1D1F] leading-none">
                      {t.phone.apps[key]}
                    </div>
                    <div className="text-[10px] text-[#86868B] mt-0.5">{meta.time}</div>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 space-y-1.5">
              {t.phone.insights.map((text, i) => {
                const tone = INSIGHT_TONES[i] ?? "violet";
                return (
                  <div
                    key={i}
                    className="flex items-start gap-2 rounded-lg px-2.5 py-1.5"
                    style={{
                      background:
                        tone === "emerald"
                          ? "rgba(16,185,129,0.08)"
                          : "rgba(124,58,237,0.06)",
                    }}
                  >
                    <span
                      className="mt-[3px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: tone === "emerald" ? "#10B981" : "#7C3AED" }}
                    />
                    <span className="text-[10px] text-[#3A3A3C] leading-[1.35]">{text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
