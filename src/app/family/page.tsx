"use client";

import { useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Flower } from "@/components/Flower";
import { useT } from "@/components/I18nProvider";

type FlowerVariant = "violet" | "pink" | "indigo" | "emerald" | "rose" | "amber";

type FamilyMember = {
  id: number;
  name: string;
  role: "parent" | "child";
  initials: string;
  variant: FlowerVariant;
  status: "online" | "away";
  screenTimeToday?: number;
  dailyLimit?: number;
};

const FAMILY: FamilyMember[] = [
  { id: 1, name: "Zara",    role: "parent", initials: "ZA", variant: "emerald", status: "online" },
  { id: 2, name: "Nilufar", role: "child",  initials: "NL", variant: "violet",  status: "online", screenTimeToday: 125, dailyLimit: 180 },
  { id: 3, name: "Amir",    role: "child",  initials: "AM", variant: "rose",    status: "away",   screenTimeToday: 150, dailyLimit: 180 },
];

type Tab = "family" | "chats" | "direct";

export default function FamilyPage() {
  const t = useT();
  const [tab, setTab] = useState<Tab>("family");
  const [selected, setSelected] = useState<number | null>(null);

  const CHATS = [
    { id: 1, from: "Buvijon", initials: "B",  timestamp: "now",    unread: 3, isSystem: true,  message: t.family.standingHint },
    { id: 2, from: "Zara",    initials: "ZA", timestamp: "2m",     unread: 1, isSystem: false, message: "Did Amira finish her homework today?" },
    { id: 3, from: "Kamil",   initials: "KM", timestamp: "12m",    unread: 0, isSystem: false, message: "I finished all my tasks, can I play now?" },
  ];

  const DIRECT = [
    { id: 1, from: "Nilufar", initials: "NL", timestamp: "12m", unread: true,  message: "Can I have 30 more minutes tonight, please?" },
    { id: 2, from: "Amir",    initials: "AM", timestamp: "1h",  unread: false, message: "I finished all my tasks, can I play now?" },
  ];

  const flowerVariantFor = (m: FamilyMember): FlowerVariant => {
    if (!m.screenTimeToday || !m.dailyLimit) return m.variant;
    const pct = (m.screenTimeToday / m.dailyLimit) * 100;
    if (pct < 70) return "emerald";
    if (pct < 90) return "amber";
    return "rose";
  };

  return (
    <>
      <Nav cta={false} />

      <main className="pt-[100px] min-h-screen bg-[var(--bg-section)]">
        <div className="container-1100 py-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
            <div>
              <p className="eyebrow mb-3">{t.family.eyebrow}</p>
              <h1 className="!text-[clamp(2rem,4.5vw,3.5rem)]">{t.family.title}</h1>
            </div>

            <div className="inline-flex p-1 bg-white border border-[var(--border-subtle)] rounded-full">
              {(["family", "chats", "direct"] as Tab[]).map((tk) => (
                <button
                  key={tk}
                  onClick={() => setTab(tk)}
                  className={`px-5 h-10 rounded-full text-[13px] font-medium transition-colors ${
                    tab === tk
                      ? "bg-[var(--text-primary)] text-white"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {t.family.tabs[tk]}
                </button>
              ))}
            </div>
          </div>

          {tab === "family" && (
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8">
              <div className="card !p-6">
                <p className="eyebrow mb-4">{t.family.hub}</p>
                <h3 className="mb-6 !text-[18px]">{t.family.messages}</h3>
                <div className="space-y-3">
                  {CHATS.map((c) => (
                    <div
                      key={c.id}
                      className={`p-4 rounded-2xl border transition-colors hover:bg-[var(--violet-50)] ${
                        c.unread ? "bg-white border-[var(--border-violet)]" : "bg-white border-[var(--border-subtle)]"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar initials={c.initials} system={c.isSystem} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-[14px] text-[var(--text-primary)]">{c.from}</span>
                            <span className="text-[12px] text-[var(--text-muted)]">{c.timestamp}</span>
                          </div>
                          <p className="text-[13px] text-[var(--text-secondary)] line-clamp-2">{c.message}</p>
                        </div>
                        {c.unread > 0 && (
                          <span className="w-6 h-6 rounded-full bg-[var(--brand-primary)] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                            {c.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card !p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="eyebrow mb-2">{t.family.standing}</p>
                    <h3 className="!text-[18px]">{t.family.standingHint}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {FAMILY.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelected(selected === m.id ? null : m.id)}
                      className={`p-5 rounded-2xl border text-center transition-all ${
                        selected === m.id
                          ? "border-[var(--brand-primary)] bg-[var(--violet-50)]"
                          : "border-[var(--border-subtle)] bg-white hover:border-[var(--border-violet)]"
                      }`}
                    >
                      <Avatar initials={m.initials} large />
                      <div className="mt-3 font-semibold text-[14px] text-[var(--text-primary)]">{m.name}</div>
                      <div className="text-[12px] text-[var(--text-muted)]">{t.family.role[m.role]}</div>
                      {m.role === "child" && (
                        <div className="mt-3 flex justify-center">
                          <Flower variant={flowerVariantFor(m)} size={56} />
                        </div>
                      )}
                      <div className="mt-3 flex items-center justify-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${m.status === "online" ? "bg-emerald-500" : "bg-[var(--text-muted)]"}`} />
                        <span className="text-[11px] text-[var(--text-muted)]">{t.family.status[m.status]}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {selected !== null && (() => {
                  const m = FAMILY.find((x) => x.id === selected);
                  if (!m) return null;
                  return (
                    <div className="mt-8 pt-8 border-t border-[var(--border-subtle)]">
                      <p className="eyebrow mb-4">{m.name}{t.family.gardenSuffix}</p>

                      {m.role === "child" && m.screenTimeToday !== undefined && m.dailyLimit !== undefined ? (
                        <>
                          <div className="p-6 rounded-2xl bg-[var(--bg-section)] mb-5">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-[14px] font-medium text-[var(--text-primary)]">{t.family.screenTimeToday}</span>
                              <span className="text-[13px] text-[var(--text-secondary)] tabular-nums">
                                {m.screenTimeToday} / {m.dailyLimit} min
                              </span>
                            </div>
                            <div className="h-2 bg-white rounded-full overflow-hidden border border-[var(--border-subtle)]">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${Math.min(100, (m.screenTimeToday / m.dailyLimit) * 100)}%`,
                                  background:
                                    flowerVariantFor(m) === "emerald" ? "linear-gradient(90deg,#34D399,#059669)" :
                                    flowerVariantFor(m) === "amber"   ? "linear-gradient(90deg,#FBBF24,#D97706)" :
                                                                        "linear-gradient(90deg,#FB7185,#BE123C)",
                                }}
                              />
                            </div>
                            <div className="mt-3 flex items-center justify-between text-[12px] text-[var(--text-muted)]">
                              <span>{m.dailyLimit - m.screenTimeToday} {t.family.minRemaining}</span>
                              <span>{t.family.limit}: {Math.floor(m.dailyLimit / 60)}h</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-3 mb-5">
                            {([
                              { v: "emerald" as const, label: t.family.states.healthy },
                              { v: "amber"   as const, label: t.family.states.attention },
                              { v: "rose"    as const, label: t.family.states.exceeded },
                            ]).map((s) => (
                              <div
                                key={s.label}
                                className={`p-4 rounded-2xl border text-center ${
                                  flowerVariantFor(m) === s.v
                                    ? "border-[var(--brand-primary)] bg-white"
                                    : "border-[var(--border-subtle)] bg-white opacity-60"
                                }`}
                              >
                                <div className="flex justify-center mb-2"><Flower variant={s.v} size={56} /></div>
                                <div className="text-[12px] font-medium text-[var(--text-primary)]">{s.label}</div>
                              </div>
                            ))}
                          </div>

                          <div className="p-6 rounded-2xl bg-[var(--bg-section)]">
                            <h3 className="!text-[16px] mb-4">{t.family.weeklyProgress}</h3>
                            <div className="flex items-end justify-between gap-2 h-28">
                              {[60, 120, 90, 150, 140, 110, 80].map((v, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                  <div
                                    className="w-full rounded-t-lg"
                                    style={{
                                      height: `${(v / 180) * 100}%`,
                                      background:
                                        v > 144 ? "linear-gradient(180deg,#FB7185,#BE123C)" :
                                        v > 120 ? "linear-gradient(180deg,#FBBF24,#D97706)" :
                                                  "linear-gradient(180deg,#A78BFA,#7C3AED)",
                                    }}
                                  />
                                  <span className="text-[11px] text-[var(--text-muted)]">
                                    {[t.days.mon, t.days.tue, t.days.wed, t.days.thu, t.days.fri, t.days.sat, t.days.sun][i]}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="p-6 rounded-2xl bg-[var(--bg-section)] text-center">
                          <p className="text-[14px] text-[var(--text-secondary)]">
                            {m.name} {t.family.parentNote}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {tab === "chats" && (
            <div className="grid md:grid-cols-2 gap-6">
              {CHATS.map((c) => (
                <div key={c.id} className="card !p-6 card-hover">
                  <div className="flex items-start gap-4">
                    <Avatar initials={c.initials} system={c.isSystem} large />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-[15px] text-[var(--text-primary)]">{c.from}</span>
                        <span className="text-[12px] text-[var(--text-muted)]">{c.timestamp}</span>
                      </div>
                      <p className="text-[14px] text-[var(--text-secondary)] leading-[1.5]">{c.message}</p>
                      {c.isSystem && (
                        <span className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full bg-[var(--violet-50)] text-[var(--brand-primary)] text-[12px] font-medium">
                          {t.family.familyGardenBadge}
                        </span>
                      )}
                    </div>
                    {c.unread > 0 && (
                      <span className="w-6 h-6 rounded-full bg-[var(--brand-primary)] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                        {c.unread}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "direct" && (
            <div className="space-y-4 max-w-[640px] mx-auto">
              {DIRECT.map((m) => (
                <div key={m.id} className="card !p-6">
                  <div className="flex items-start gap-4">
                    <Avatar initials={m.initials} large />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-[15px] text-[var(--text-primary)]">{m.from}</span>
                        <span className="text-[12px] text-[var(--text-muted)]">{m.timestamp}</span>
                      </div>
                      <p className="text-[14px] text-[var(--text-secondary)] leading-[1.5]">{m.message}</p>
                    </div>
                    {m.unread && <span className="w-2.5 h-2.5 rounded-full bg-[var(--brand-primary)] mt-2 flex-shrink-0" />}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

function Avatar({
  initials,
  system = false,
  large = false,
}: {
  initials: string;
  system?: boolean;
  large?: boolean;
}) {
  const size = large ? "w-14 h-14 text-[15px]" : "w-11 h-11 text-[13px]";
  const bg = system
    ? "bg-gradient-to-br from-violet-500 to-pink-500"
    : "bg-gradient-to-br from-violet-400 to-violet-600";
  return (
    <div className={`${size} ${bg} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
      {initials}
    </div>
  );
}
