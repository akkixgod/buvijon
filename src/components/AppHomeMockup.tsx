"use client";

// High-fidelity recreation of the Buvijon app home screen (the "Bog'im" feed),
// rendered as crisp DOM inside a phone frame so it stays sharp at any size —
// a cleaner stand-in for a raster screenshot. Content is intentionally in
// Uzbek to match the real product screen.

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-3 text-[10px] font-semibold text-[#1D1D1F]">
      <span>11:05</span>
      <span className="flex items-center gap-1.5">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2l6 6-6 6V2zm0 20l-6-6 6-6v12z" opacity="0.9" />
        </svg>
        <span className="flex items-end gap-[1px]">
          <span className="w-[2px] h-[4px] bg-[#1D1D1F] rounded-[1px]" />
          <span className="w-[2px] h-[6px] bg-[#1D1D1F] rounded-[1px]" />
          <span className="w-[2px] h-[8px] bg-[#1D1D1F] rounded-[1px]" />
          <span className="w-[2px] h-[10px] bg-[#1D1D1F] rounded-[1px]" />
        </span>
        <span className="inline-block w-4 h-[8px] rounded-[2px] border border-[#1D1D1F] relative">
          <span className="absolute inset-[1px] right-1.5 bg-[#1D1D1F] rounded-[1px]" />
        </span>
      </span>
    </div>
  );
}

function AppIcon({ kind }: { kind: "youtube" | "minecraft" }) {
  if (kind === "youtube") {
    return (
      <span className="w-8 h-8 rounded-[9px] bg-[#FF0000] flex items-center justify-center flex-shrink-0 shadow-sm">
        <span className="text-white text-[11px] translate-x-[1px]">▶</span>
      </span>
    );
  }
  return (
    <span className="w-8 h-8 rounded-[9px] overflow-hidden flex-shrink-0 shadow-sm bg-[#7BB661] flex flex-col">
      <span className="h-1/2 bg-[#8FCE6B]" />
      <span className="h-1/2 bg-[#6B4A2B]" />
    </span>
  );
}

export function AppHomeMockup() {
  return (
    <div className="relative mx-auto w-full">
      <div
        className="absolute -inset-6 -z-10 rounded-[3rem] opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(124,58,237,0.35), transparent 60%), radial-gradient(circle at 80% 80%, rgba(236,72,153,0.28), transparent 55%)",
        }}
      />

      <div className="rounded-[3rem] p-[3px] bg-gradient-to-br from-violet-500 via-violet-600 to-pink-500 shadow-[0_40px_100px_rgba(109,40,217,0.35)]">
        <div className="rounded-[2.85rem] bg-[#FBFAFF] overflow-hidden border border-violet-100 relative">
          {/* notch */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-[5px] rounded-full bg-[#1D1D1F]/80 z-10" />

          <div className="aspect-[9/19] flex flex-col">
            <StatusBar />

            {/* App header */}
            <div className="flex items-center justify-between px-4 pt-2 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-white border border-violet-100 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" stroke="#1D1D1F" strokeWidth="2" strokeLinecap="round" fill="none" aria-hidden>
                    <path d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                </span>
                <div className="leading-none">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] font-bold text-[#7C3AED]">BV</span>
                    <span className="text-[15px] font-bold text-[#1D1D1F] tracking-tight">Buvijon</span>
                  </div>
                  <div className="text-[10px] text-[#86868B] mt-1">Bog&apos;im 🌿</div>
                </div>
              </div>
              <span className="w-9 h-7 rounded-full bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center shadow-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" aria-hidden>
                  <circle cx="10" cy="8" r="3" /><path d="M4 19a6 6 0 0 1 12 0" /><path d="M19 8v6M22 11h-6" />
                </svg>
              </span>
            </div>

            {/* Child chips */}
            <div className="px-4 flex gap-2">
              {["Azizbek", "Fotima"].map((name) => (
                <div key={name} className="flex-1 min-w-0 rounded-2xl bg-[#FFF7E8] border border-[#F6E7C2] px-3 py-2.5">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-[#1D1D1F]">
                    <span className="tracking-widest text-[#C9A227] text-[8px]">⠿</span>
                    {name}
                  </div>
                  <div className="text-[9px] text-[#A98C4B] leading-tight mt-0.5 truncate">
                    Nazorat uchun ilovalar qo&apos;shing
                  </div>
                </div>
              ))}
            </div>

            {/* Today · family card */}
            <div className="px-4 mt-3">
              <div className="rounded-2xl bg-white border border-violet-100 p-3.5 shadow-[0_10px_30px_-22px_rgba(124,58,237,0.4)]">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <div className="text-[9px] tracking-[0.14em] text-[#86868B] font-medium">BUGUN · OILA</div>
                    <div className="text-[26px] leading-none font-bold text-[#1D1D1F] mt-1.5 tracking-tight">
                      5 <span className="text-[15px] font-semibold">soat</span> 12 <span className="text-[15px] font-semibold">daq</span>
                    </div>
                    <div className="text-[10px] text-[#86868B] mt-1">— — kechaga nisbatan</div>
                  </div>
                  <div className="text-right min-w-0">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-semibold px-2 py-1">
                      ✓ Hammasi yaxshi
                    </span>
                    <div className="text-[8px] tracking-[0.12em] text-[#86868B] font-medium mt-2">TOP-ILOVA</div>
                    <div className="mt-1 space-y-1.5">
                      <div className="flex items-center gap-1.5 justify-end">
                        <AppIcon kind="youtube" />
                        <span className="text-[9px] text-[#1D1D1F] leading-tight text-left">
                          YouTube:<br />2 soat 15 daq
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 justify-end">
                        <AppIcon kind="minecraft" />
                        <span className="text-[9px] text-[#1D1D1F] leading-tight text-left">
                          Minecraft:<br />1 soat 12 daq
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center text-[10px] font-semibold text-[#7C3AED] mt-3">Batafsil →</div>
              </div>
            </div>

            <div className="px-4 mt-3 text-[10px] font-semibold text-[#1D1D1F] leading-snug">
              Bugun Oila umumiy: 5 soat 12 daq{" "}
              <span className="font-normal text-[#86868B]">(kechaga nisbatan barqaror)</span>
            </div>

            {/* Feed post */}
            <div className="px-4 mt-3 flex-1 min-h-0">
              <div className="rounded-2xl bg-white border border-violet-100 p-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-violet-100 text-[#7C3AED] text-[11px] font-bold flex items-center justify-center">T</span>
                  <div className="leading-tight">
                    <div className="text-[10px] font-semibold text-[#1D1D1F]">Tohir (Abduvaliyevlar oilasi)</div>
                    <div className="text-[9px] text-[#86868B]">2 soat oldin</div>
                  </div>
                </div>
                <p className="text-[9.5px] text-[#3A3A3C] leading-[1.45] mt-2">
                  Imronjon bugun bog&apos;chada o&apos;zining birinchi rasmini olib keldi. Uyimizni chizishga urinibdi. Voyy asalim 😘
                </p>
                {/* child's drawing — stylised crayon doodle */}
                <div className="mt-2 rounded-xl overflow-hidden border border-violet-100 bg-[#FFFDF6]">
                  <svg viewBox="0 0 200 96" className="w-full h-auto" aria-hidden>
                    <circle cx="52" cy="42" r="24" fill="none" stroke="#2EA36B" strokeWidth="6" strokeLinecap="round" />
                    <path d="M52 66v18" stroke="#6B4A2B" strokeWidth="5" strokeLinecap="round" />
                    <circle cx="132" cy="34" r="12" fill="#F4C430" />
                    <g stroke="#F08C2E" strokeWidth="3" strokeLinecap="round">
                      <path d="M132 14v-7M132 61v7M110 34h-7M154 34h7M116 18l-5-5M148 50l5 5M148 18l5-5M116 50l-5 5" />
                    </g>
                    <path d="M150 84V58h34v26" fill="none" stroke="#E0483D" strokeWidth="5" strokeLinejoin="round" />
                    <path d="M148 60l19-12 19 12" fill="none" stroke="#E0483D" strokeWidth="5" strokeLinejoin="round" />
                    <path d="M14 86h172" stroke="#9B7BE8" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="flex items-center gap-2 text-[9px] text-[#86868B] mt-2">
                  <span>3 likes</span><span>·</span><span>7 izohlar</span>
                </div>
              </div>
            </div>

            {/* Bottom tab bar */}
            <div className="mt-auto border-t border-violet-100 bg-white/90 px-6 py-2.5 flex items-center justify-between">
              {[
                { label: "Bosh", active: true, icon: <path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-8Z" /> },
                { label: "Oila", active: false, icon: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.4" /><path d="M3 19a6 6 0 0 1 12 0M15 19a5 5 0 0 1 6-3.5" /></> },
                { label: "Tahlil", active: false, icon: <><path d="M5 20V8M12 20V4M19 20v-9" /></> },
              ].map((tab) => (
                <div key={tab.label} className="flex flex-col items-center gap-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={tab.active ? "#7C3AED" : "#B7B7BE"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    {tab.icon}
                  </svg>
                  <span className={`text-[9px] font-medium ${tab.active ? "text-[#7C3AED]" : "text-[#B7B7BE]"}`}>{tab.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
