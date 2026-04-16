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
    avatarColor: "from-blossom-pink to-pink-400",
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
    fromAvatar: "bg-blossom-pink",
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
      blooming: "from-blooming to-emerald-600",
      warning: "from-warning to-amber-600",
      wilting: "from-wilting to-red-600",
    };
    return colors[state as keyof typeof colors] || colors.blooming;
  };

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

          {/* Tab Navigation */}
          <div className="hidden md:flex items-center gap-2 bg-surface-secondary rounded-full p-1">
            <button
              onClick={() => setActiveTab("family")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "family"
                  ? "bg-blossom-pink text-white"
                  : "text-muted-foreground hover:bg-surface"
              }`}
            >
              Family
            </button>
            <button
              onClick={() => setActiveTab("chats")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "chats"
                  ? "bg-blossom-pink text-white"
                  : "text-muted-foreground hover:bg-surface"
              }`}
            >
              Chats
            </button>
            <button
              onClick={() => setActiveTab("direct")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "direct"
                  ? "bg-blossom-pink text-white"
                  : "text-muted-foreground hover:bg-surface"
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
            <div className="w-1/3 border-r border-border flex flex-col">
              <div className="p-4 border-b border-border bg-surface-secondary/30">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  family hub
                </p>
                <h2 className="text-lg font-bold text-foreground">Messages</h2>
              </div>

              {/* Chat Threads */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {CHAT_THREADS.map((thread) => (
                  <div
                    key={thread.id}
                    className={`glass-card rounded-xl p-4 cursor-pointer transition-all hover:bg-surface-secondary ${
                      thread.unread ? "border-l-2 border-blossom-pink" : "border border-border"
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
                          <span className="font-semibold text-foreground">{thread.from}</span>
                          <span className="text-xs text-muted-foreground">{thread.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {thread.lastMessage}
                        </p>
                      </div>

                      {/* Unread Badge */}
                      {thread.unread && (
                        <div className="w-6 h-6 rounded-full bg-blossom-pink flex items-center justify-center text-white text-xs font-bold">
                          {thread.unread}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Family Members & Garden Section */}
            <div className="flex-1 flex flex-col bg-gradient-to-b from-blossom-pink-pale/20 to-transparent">
              {/* Family Standing */}
              <div className="p-4 border-b border-border bg-white/50">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  family standing
                </p>
                <h2 className="text-lg font-bold text-foreground">Tap to explore</h2>
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
                      <div className="font-semibold text-foreground">{member.name}</div>
                      {member.role === "child" && (
                        <div className="text-xs text-muted-foreground">my kid</div>
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
                        className={`w-2 h-2 rounded-full ${member.status === "online" ? "bg-blooming" : "bg-muted-foreground"}`}
                      />
                      <span className="text-xs text-muted-foreground">{member.status}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Family Garden */}
              {selectedMember && (
                <div className="flex-1 p-4 border-t border-border bg-white/70">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      family garden
                    </p>
                    <button
                      onClick={() => setSelectedMember(null)}
                      className="text-sm text-muted-foreground hover:text-blossom-pink transition-colors"
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
                            <h3 className="text-lg font-semibold text-foreground">Screen Time Today</h3>
                            <span className="text-xs px-2 py-1 rounded-full bg-blossom-pink/10 text-blossom-pink">
                              {member.screenTimeToday ?? 0} min
                            </span>
                          </div>
                          <div className="h-3 bg-surface-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blooming to-emerald-400"
                              style={{ width: `${((member.screenTimeToday ?? 0) / (member.dailyLimit ?? 1)) * 100}%` }}
                            />
                          </div>
                          <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
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
                            <div className="text-sm font-medium text-foreground">Healthy</div>
                          </div>
                          <div className="glass-card rounded-xl p-4 text-center">
                            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getFlowerColor(
                              "warning"
                            )} mx-auto mb-2 flex items-center justify-center`}>
                              <span className="text-white text-2xl">🌸</span>
                            </div>
                            <div className="text-sm font-medium text-foreground">Attention</div>
                          </div>
                          <div className="glass-card rounded-xl p-4 text-center">
                            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getFlowerColor(
                              "wilting"
                            )} mx-auto mb-2 flex items-center justify-center`}>
                              <span className="text-white text-2xl">🌸</span>
                            </div>
                            <div className="text-sm font-medium text-foreground">Exceeded</div>
                          </div>
                        </div>

                        {/* Weekly Chart (Simplified) */}
                        <div className="glass-card rounded-2xl p-6">
                          <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Progress</h3>
                          <div className="flex items-end justify-between h-24 gap-1">
                            {[60, 120, 90, 150, 140, 110, 80].map((height, i) => (
                              <div
                                key={i}
                                className="flex-1 bg-gradient-to-t from-blossom-pink/20 to-blossom-pink/5 rounded-t"
                                style={{ height: `${height}px` }}
                              />
                            ))}
                          </div>
                          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
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
                <div className="p-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>lower</span>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-surface-secondary/50 rounded" />
                    <div className="w-4 h-0.5 bg-surface-secondary/50 rounded" />
                    <div className="w-4 h-0.5 bg-surface-secondary/50 rounded" />
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
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                chats
              </p>
              <h2 className="text-2xl font-bold text-foreground">Family Garden</h2>
            </div>

            {/* Chats List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CHAT_THREADS.map((thread) => (
                <div
                  key={thread.id}
                  className={`glass-card rounded-2xl p-6 cursor-pointer transition-all hover:scale-105 ${
                    thread.unread ? "border-l-2 border-blossom-pink" : "border border-border"
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
                        <span className="font-semibold text-lg text-foreground">{thread.from}</span>
                        <span className="text-sm text-muted-foreground">{thread.timestamp}</span>
                      </div>
                      {thread.unread && (
                        <div className="w-8 h-8 rounded-full bg-blossom-pink flex items-center justify-center text-white font-bold">
                          {thread.unread}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <p className="text-muted-foreground leading-relaxed">{thread.lastMessage}</p>

                  {/* Family Context Badge */}
                  {thread.familyContext && (
                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blooming/10 text-blooming text-sm">
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
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                direct
              </p>
              <h2 className="text-2xl font-bold text-foreground">Direct Messages</h2>
            </div>

            {/* Direct Messages */}
            <div className="space-y-4 max-w-2xl mx-auto">
              {DIRECT_MESSAGES.map((msg) => (
                <div
                  key={msg.id}
                  className={`glass-card rounded-2xl p-6 transition-all hover:scale-105 ${
                    msg.unread ? "border-l-2 border-blossom-pink" : "border border-border"
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
                          <span className="font-semibold text-lg text-foreground">{msg.from}</span>
                          <span className="text-sm text-muted-foreground ml-2">{msg.timestamp}</span>
                        </div>
                        {msg.unread && (
                          <div className="w-3 h-3 rounded-full bg-blossom-pink" />
                        )}
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{msg.message}</p>
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
