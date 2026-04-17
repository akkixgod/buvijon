"use client";

import { useState } from "react";
import Link from "next/link";

type FamilyMember = {
  id: number;
  name: string;
  role: "parent" | "child";
  avatar: string;
  avatarColor: string;
  status: "online" | "warning" | "wilting";
  screenTimeToday?: number;
  dailyLimit?: number;
};

// Mock data for family members
const FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: 1,
    name: "Zara",
    role: "parent",
    avatar: "ZA",
    avatarColor: "from-emerald-400 to-emerald-600",
    status: "online",
  },
  {
    id: 2,
    name: "Nilufar",
    role: "child",
    avatar: "NL",
    avatarColor: "from-violet-500 to-pink-500",
    status: "online",
    screenTimeToday: 125,
    dailyLimit: 180,
  },
  {
    id: 3,
    name: "Amir",
    role: "child",
    avatar: "AM",
    avatarColor: "from-red-400 to-red-600",
    status: "warning",
    screenTimeToday: 150,
    dailyLimit: 180,
  },
] as const;

const CHAT_THREADS = [
  {
    id: 1,
    from: "Buvijon",
    fromAvatar: "bg-gradient-to-br from-violet-500 to-pink-500",
    timestamp: "now",
    unread: 3,
    lastMessage: "Amir's screen time rising for 3 days. A gentle reminder might help!",
    familyContext: true,
  },
  {
    id: 2,
    from: "Zara",
    fromAvatar: "from-emerald-400",
    timestamp: "2m ago",
    unread: 1,
    lastMessage: "Grandmother: Did Amira finish her homework today?",
    familyContext: true,
  },
  {
    id: 3,
    from: "Kamil",
    fromAvatar: "from-amber-400",
    timestamp: "12m ago",
    unread: 0,
    lastMessage: "I finished all my tasks, can I play now?",
    familyContext: false,
  },
];

const DIRECT_MESSAGES = [
  {
    id: 1,
    from: "Zara",
    fromAvatar: "from-emerald-400",
    timestamp: "12m ago",
    unread: true,
    message: "Can I have 30 more minutes tonight please?",
  },
  {
    id: 2,
    from: "Kamil",
    fromAvatar: "from-amber-400",
    timestamp: "1h ago",
    unread: false,
    message: "I finished all my tasks, can I play now?",
  },
];

export default function FamilyPage() {
  const [activeTab, setActiveTab] = useState<"family" | "chats" | "direct">("family");
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  const getFlowerState = (member: FamilyMember) => {
    if (!member.screenTimeToday || !member.dailyLimit) return "online";

    const percentage = ((member.screenTimeToday ?? 0) / (member.dailyLimit ?? 1)) * 100;
    if (percentage < 70) return "blooming";
    if (percentage < 90) return "warning";
    return "wilting";
  };

  const getFlowerColor = (state: string) => {
    const colors = {
      blooming: "from-emerald-400 to-emerald-600",
      warning: "from-amber-300 to-orange-500",
      wilting: "from-rose-400 to-rose-600",
    };
    return colors[state as keyof typeof colors] || colors.blooming;
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Ambient orbs */}
      <div className="orb" style={{ width: 420, height: 420, top: -120, left: -100, background: "radial-gradient(circle, rgba(139,92,246,0.45), transparent 65%)" }} />
      <div className="orb" style={{ width: 460, height: 460, bottom: -140, right: -120, background: "radial-gradient(circle, rgba(236,72,153,0.28), transparent 65%)", animationDelay: "2s" }} />
      {/* Navigation */}
      <nav className="sticky top-0 px-6 py-4 backdrop-blur-xl bg-white/70 border-b border-violet-500/25" style={{ zIndex: 50 }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 via-violet-600 to-pink-500 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.6)]">
              <span className="text-white font-bold">B</span>
            </div>
            <span className="font-bold text-lg">Buvijon</span>
          </Link>

          {/* Tab Navigation */}
          <div className="hidden md:flex items-center gap-2 glass-card rounded-full p-1">
            <button
              onClick={() => setActiveTab("family")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "family"
                  ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-[0_0_18px_rgba(139,92,246,0.5)]"
                  : "text-violet-600/80 hover:bg-violet-500/10"
              }`}
            >
              Family
            </button>
            <button
              onClick={() => setActiveTab("chats")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "chats"
                  ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-[0_0_18px_rgba(139,92,246,0.5)]"
                  : "text-violet-600/80 hover:bg-violet-500/10"
              }`}
            >
              Chats
            </button>
            <button
              onClick={() => setActiveTab("direct")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "direct"
                  ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-[0_0_18px_rgba(139,92,246,0.5)]"
                  : "text-violet-600/80 hover:bg-violet-500/10"
              }`}
            >
              Direct
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {/* Family Tab */}
        {activeTab === "family" && (
          <div className="h-full flex">
            {/* Family Standing Section */}
            <div className="w-1/3 border-r border-violet-500/25 flex flex-col">
              <div className="p-4 border-b border-violet-500/25 bg-violet-500/10/30">
                <p className="text-xs font-medium text-violet-500 uppercase tracking-wider mb-2">
                  family hub
                </p>
                <h2 className="text-lg font-bold text-violet-900">Messages</h2>
              </div>

              {/* Chat Threads */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {CHAT_THREADS.map((thread) => (
                  <div
                    key={thread.id}
                    className={`glass-card rounded-xl p-4 cursor-pointer transition-all hover:bg-violet-500/10 ${
                      thread.unread ? "border-l-2 border-violet-400" : "border border-violet-500/25"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div
                        className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold ${thread.fromAvatar}`}
                      >
                        {thread.fromAvatar.includes("bg-") ? "B" : thread.from.substring(0, 2)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-violet-900">{thread.from}</span>
                          <span className="text-xs text-violet-500">{thread.timestamp}</span>
                        </div>
                        <p className="text-sm text-violet-500 line-clamp-2">
                          {thread.lastMessage}
                        </p>
                      </div>

                      {/* Unread Badge */}
                      {thread.unread && (
                        <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs font-bold">
                          {thread.unread}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Family Members & Garden Section */}
            <div className="flex-1 flex flex-col bg-gradient-to-b from-violet-900/15 to-transparent">
              {/* Family Standing */}
              <div className="p-4 border-b border-violet-500/25 bg-white/[0.03]">
                <p className="text-xs font-medium text-violet-500 uppercase tracking-wider mb-2">
                  family standing
                </p>
                <h2 className="text-lg font-bold text-violet-900">Tap to explore</h2>
              </div>

              {/* Family Members */}
              <div className="grid grid-cols-2 gap-4 p-4">
                {FAMILY_MEMBERS.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => setSelectedMember(member.id)}
                    className={`glass-card rounded-2xl p-4 text-center transition-all hover:scale-105 ${
                      selectedMember === member.id ? "ring-2 ring-blossom-pink" : ""
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold ${member.avatarColor}`}
                    >
                      {member.avatar}
                    </div>

                    {/* Name */}
                    <div className="mt-2">
                      <div className="font-semibold text-violet-900">{member.name}</div>
                      {member.role === "child" && (
                        <div className="text-xs text-violet-500">my kid</div>
                      )}
                    </div>

                    {/* Flower Status for Children */}
                    {member.role === "child" && member.screenTimeToday !== undefined && member.dailyLimit !== undefined && (
                      <div className="mt-3">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getFlowerColor(
                          getFlowerState(member)
                        )} flex items-center justify-center`}>
                          <span className="text-white text-lg">🌸</span>
                        </div>
                      </div>
                    )}

                    {/* Online Status */}
                    <div className="mt-2 flex items-center justify-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${member.status === "online" ? "bg-emerald-400" : "bg-muted-foreground"}`}
                      />
                      <span className="text-xs text-violet-500">{member.status}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Family Garden */}
              {selectedMember && (
                <div className="flex-1 p-4 border-t border-violet-500/25 bg-white/[0.04]">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-medium text-violet-500 uppercase tracking-wider">
                      family garden
                    </p>
                    <button
                      onClick={() => setSelectedMember(null)}
                      className="text-sm text-violet-500 hover:text-violet-600 transition-colors"
                    >
                      Close
                    </button>
                  </div>

                  {(() => {
                    const member = FAMILY_MEMBERS.find((m) => m.id === selectedMember);
                    if (!member) return null;

                    return (
                      <div className="space-y-4">
                        {/* Screen Time Card */}
                        <div className="glass-card rounded-2xl p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-violet-900">Screen Time Today</h3>
                            <span className="text-xs px-2 py-1 rounded-full bg-violet-500/10 text-violet-600">
                              {member.screenTimeToday ?? 0} min
                            </span>
                          </div>
                          <div className="h-3 bg-violet-500/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blooming to-emerald-400"
                              style={{ width: `${((member.screenTimeToday ?? 0) / (member.dailyLimit ?? 1)) * 100}%` }}
                            />
                          </div>
                          <div className="flex items-center justify-between mt-2 text-sm text-violet-500">
                            <span>{(member.dailyLimit ?? 0) - (member.screenTimeToday ?? 0)} min remaining</span>
                            <span>Limit: {Math.floor((member.dailyLimit ?? 0) / 60)}h</span>
                          </div>
                        </div>

                        {/* Flower State */}
                        <div className="grid grid-cols-3 gap-3">
                          <div className="glass-card rounded-xl p-4 text-center">
                            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getFlowerColor(
                              "blooming"
                            )} mx-auto mb-2 flex items-center justify-center`}>
                              <span className="text-white text-2xl">🌸</span>
                            </div>
                            <div className="text-sm font-medium text-violet-900">Healthy</div>
                          </div>
                          <div className="glass-card rounded-xl p-4 text-center">
                            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getFlowerColor(
                              "warning"
                            )} mx-auto mb-2 flex items-center justify-center`}>
                              <span className="text-white text-2xl">🌸</span>
                            </div>
                            <div className="text-sm font-medium text-violet-900">Attention</div>
                          </div>
                          <div className="glass-card rounded-xl p-4 text-center">
                            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getFlowerColor(
                              "wilting"
                            )} mx-auto mb-2 flex items-center justify-center`}>
                              <span className="text-white text-2xl">🌸</span>
                            </div>
                            <div className="text-sm font-medium text-violet-900">Exceeded</div>
                          </div>
                        </div>

                        {/* Weekly Chart (Simplified) */}
                        <div className="glass-card rounded-2xl p-6">
                          <h3 className="text-lg font-semibold text-violet-900 mb-4">Weekly Progress</h3>
                          <div className="flex items-end justify-between h-24 gap-1">
                            {[60, 120, 90, 150, 140, 110, 80].map((height, i) => (
                              <div
                                key={i}
                                className="flex-1 bg-gradient-to-t from-blossom-pink/20 to-blossom-pink/5 rounded-t"
                                style={{ height: `${height}px` }}
                              />
                            ))}
                          </div>
                          <div className="flex items-center justify-between mt-2 text-xs text-violet-500">
                            <span>Mon</span>
                            <span>Tue</span>
                            <span>Wed</span>
                            <span>Thu</span>
                            <span>Fri</span>
                            <span>Sat</span>
                            <span>Sun</span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Scroll Arrows */}
              {!selectedMember && (
                <div className="p-4 flex items-center justify-between text-xs text-violet-500">
                  <span>lower</span>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-violet-500/10/50 rounded" />
                    <div className="w-4 h-0.5 bg-violet-500/10/50 rounded" />
                    <div className="w-4 h-0.5 bg-violet-500/10/50 rounded" />
                  </div>
                  <span>higher →</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Chats Tab */}
        {activeTab === "chats" && (
          <div className="h-full p-6">
            <div className="mb-6">
              <p className="text-xs font-medium text-violet-500 uppercase tracking-wider mb-2">
                chats
              </p>
              <h2 className="text-2xl font-bold text-violet-900">Family Garden</h2>
            </div>

            {/* Chats List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CHAT_THREADS.map((thread) => (
                <div
                  key={thread.id}
                  className={`glass-card rounded-2xl p-6 cursor-pointer transition-all hover:scale-105 ${
                    thread.unread ? "border-l-2 border-violet-400" : "border border-violet-500/25"
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold ${thread.fromAvatar}`}
                    >
                      {thread.fromAvatar.includes("bg-") ? "B" : thread.from.substring(0, 2)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-lg text-violet-900">{thread.from}</span>
                        <span className="text-sm text-violet-500">{thread.timestamp}</span>
                      </div>
                      {thread.unread && (
                        <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center text-white font-bold">
                          {thread.unread}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <p className="text-violet-500 leading-relaxed">{thread.lastMessage}</p>

                  {/* Family Context Badge */}
                  {thread.familyContext && (
                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-400/10 text-emerald-600 text-sm">
                      <span>👨‍👩‍👧‍👦</span>
                      <span>Family Garden</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Direct Tab */}
        {activeTab === "direct" && (
          <div className="h-full p-6">
            <div className="mb-6">
              <p className="text-xs font-medium text-violet-500 uppercase tracking-wider mb-2">
                direct
              </p>
              <h2 className="text-2xl font-bold text-violet-900">Direct Messages</h2>
            </div>

            {/* Direct Messages */}
            <div className="space-y-4 max-w-2xl mx-auto">
              {DIRECT_MESSAGES.map((msg) => (
                <div
                  key={msg.id}
                  className={`glass-card rounded-2xl p-6 transition-all hover:scale-105 ${
                    msg.unread ? "border-l-2 border-violet-400" : "border border-violet-500/25"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold ${msg.fromAvatar}`}
                    >
                      {msg.fromAvatar.includes("from-") ? "B" : msg.from.substring(0, 2)}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="font-semibold text-lg text-violet-900">{msg.from}</span>
                          <span className="text-sm text-violet-500 ml-2">{msg.timestamp}</span>
                        </div>
                        {msg.unread && (
                          <div className="w-3 h-3 rounded-full bg-violet-500" />
                        )}
                      </div>
                      <p className="text-violet-500 leading-relaxed">{msg.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
