"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// Animated Flower with purple-tinted palette
const AnimatedFlower = ({
  variant = "violet",
  size = "md",
  className = "",
}: {
  variant?: "violet" | "lavender" | "magenta" | "indigo" | "rose";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) => {
  const sizeMap = {
    sm: { width: 40, height: 40 },
    md: { width: 80, height: 80 },
    lg: { width: 120, height: 120 },
    xl: { width: 180, height: 180 },
  };

  const colors = {
    violet:   { primary: "#8B5CF6", secondary: "#C4B5FD", glow: "#A78BFA" },
    lavender: { primary: "#A78BFA", secondary: "#DDD6FE", glow: "#C4B5FD" },
    magenta:  { primary: "#D946EF", secondary: "#F0ABFC", glow: "#E879F9" },
    indigo:   { primary: "#6366F1", secondary: "#A5B4FC", glow: "#818CF8" },
    rose:     { primary: "#EC4899", secondary: "#F9A8D4", glow: "#F472B6" },
  };

  const { width, height } = sizeMap[size];
  const { primary, secondary, glow } = colors[variant];

  const petalPositions = [
    { cx: 52, cy: 40, rotate: 0 },
    { cx: 46, cy: 50.39, rotate: 60 },
    { cx: 34, cy: 50.39, rotate: 120 },
    { cx: 28, cy: 40, rotate: 180 },
    { cx: 34, cy: 29.61, rotate: 240 },
    { cx: 46, cy: 29.61, rotate: 300 },
  ];

  const gradientId = `petal-${variant}-${width}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: `drop-shadow(0 0 16px ${glow}66)` }}
    >
      <defs>
        <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={secondary} stopOpacity="0.95" />
          <stop offset="100%" stopColor={primary} stopOpacity="1" />
        </radialGradient>
      </defs>
      {/* Stem */}
      <path d="M40 45 Q38 55 40 65" stroke="#34D399" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.9" />
      {/* Leaves */}
      <ellipse cx="32" cy="52" rx="8" ry="4" fill="#34D399" transform="rotate(-30 32 52)" opacity="0.85" />
      <ellipse cx="48" cy="55" rx="8" ry="4" fill="#34D399" transform="rotate(30 48 55)" opacity="0.85" />
      {/* Petals */}
      {petalPositions.map((petal, i) => (
        <ellipse
          key={i}
          cx={petal.cx}
          cy={petal.cy}
          rx="12"
          ry="20"
          fill={`url(#${gradientId})`}
          transform={`rotate(${petal.rotate} ${petal.cx} ${petal.cy})`}
          opacity="0.92"
        />
      ))}
      {/* Center */}
      <circle cx="40" cy="40" r="9" fill={secondary} />
      <circle cx="40" cy="40" r="5" fill={primary} opacity="0.8" />
    </svg>
  );
};

// Feature Card
const FeatureCard = ({
  icon,
  title,
  description,
  delay = 0,
  accent = "violet",
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
  accent?: "violet" | "pink" | "indigo" | "cyan";
}) => {
  const accentMap: Record<string, string> = {
    violet: "from-violet-500/30 to-violet-700/10",
    pink: "from-pink-500/30 to-violet-700/10",
    indigo: "from-indigo-500/30 to-violet-700/10",
    cyan: "from-cyan-400/25 to-violet-700/10",
  };
  const iconBgMap: Record<string, string> = {
    violet: "bg-violet-500/15 text-violet-600",
    pink: "bg-pink-500/15 text-pink-600",
    indigo: "bg-indigo-500/15 text-indigo-600",
    cyan: "bg-cyan-500/15 text-cyan-600",
  };

  return (
    <div
      className="reveal magnetic-card shine-on-hover glass-card rounded-3xl p-8 relative overflow-hidden group"
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className={`pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br ${accentMap[accent]} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
      <div className="relative z-10">
        <div className={`mb-6 flex items-center justify-center w-14 h-14 rounded-2xl ${iconBgMap[accent]} group-hover:scale-110 transition-transform duration-500`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-violet-900">{title}</h3>
        <p className="text-[color:var(--text-muted)] leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

// Flower State
const FlowerState = ({ state, label, sub }: { state: "blooming" | "warning" | "wilting"; label: string; sub: string }) => {
  const colors = {
    blooming: "from-emerald-400 to-emerald-600 shadow-emerald-500/40",
    warning: "from-amber-300 to-orange-500 shadow-amber-500/40",
    wilting: "from-rose-400 to-rose-600 shadow-rose-500/40",
  };

  return (
    <div className="reveal glass-card flex items-center gap-4 p-6 rounded-2xl">
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors[state]} flex items-center justify-center shadow-lg`}>
        <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
      </div>
      <div>
        <div className="font-semibold text-lg text-violet-900">{label}</div>
        <div className="text-sm text-[color:var(--text-muted)]">{sub}</div>
      </div>
    </div>
  );
};

// Stat counter
const Stat = ({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) => (
  <div className="reveal text-center glass-card rounded-2xl py-8 px-4" style={{ transitionDelay: `${delay}s` }}>
    <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{value}</div>
    <div className="text-sm text-[color:var(--text-muted)] uppercase tracking-widest">{label}</div>
  </div>
);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Cursor glow + scroll progress
  useEffect(() => {
    const glow = document.getElementById("cursor-glow");
    const progress = document.getElementById("scroll-progress");

    const handleMouseMove = (e: MouseEvent) => {
      if (glow) {
        glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        glow.style.opacity = "1";
      }
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
      }
    };

    const handleMouseLeave = () => {
      if (glow) glow.style.opacity = "0";
    };

    const handleScroll = () => {
      if (!progress) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progress.style.width = `${pct}%`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll reveal
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Particles
  useEffect(() => {
    const container = document.getElementById("particle-container");
    if (!container) return;
    container.innerHTML = "";

    const particles: HTMLDivElement[] = [];
    const count = 28;
    const palette = [
      "rgba(167, 139, 250, 0.55)",
      "rgba(196, 181, 253, 0.45)",
      "rgba(236, 72, 153, 0.4)",
      "rgba(99, 102, 241, 0.45)",
    ];

    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      const size = Math.random() * 7 + 2;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${Math.random() * 100}%`;
      const color = palette[Math.floor(Math.random() * palette.length)];
      p.style.backgroundColor = color;
      p.style.color = color;
      const duration = Math.random() * 6 + 5;
      p.style.animation = `float ${duration}s ease-in-out infinite`;
      p.style.animationDelay = `${Math.random() * 4}s`;
      container.appendChild(p);
      particles.push(p);
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, []);

  return (
    <>
      {/* Ambient orbs */}
      <div className="orb" style={{ width: 480, height: 480, top: -120, left: -140, background: "radial-gradient(circle, rgba(139,92,246,0.55), transparent 65%)" }} />
      <div className="orb" style={{ width: 520, height: 520, top: 420, right: -180, background: "radial-gradient(circle, rgba(236,72,153,0.38), transparent 65%)", animationDelay: "2s" }} />
      <div className="orb" style={{ width: 400, height: 400, bottom: 120, left: "30%", background: "radial-gradient(circle, rgba(99,102,241,0.4), transparent 65%)", animationDelay: "4s" }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 px-4 md:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between glass-card rounded-full pl-3 pr-2 py-2">
          <Link href="/" className="flex items-center gap-3 pl-2">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 via-violet-600 to-pink-500 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.7)]">
                <span className="text-white font-bold">B</span>
              </div>
              <div className="absolute inset-0 rounded-full bg-violet-400 blur-lg opacity-60 -z-10" />
            </div>
            <span className="font-bold text-lg tracking-tight">Buvijon</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-[color:var(--text-muted)]">
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How it Works</a>
            <a href="#purpose" className="nav-link">Purpose</a>
          </div>
          <Link href="/waitlist" className="premium-button btn-primary rounded-full px-5 py-2.5 text-sm font-medium">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden"
      >
        {/* Floating flowers */}
        <div
          className="absolute top-1/4 left-4 md:left-16 animate-float-slow"
          style={{ transform: `translate(${mousePosition.x * 40}px, ${mousePosition.y * 40}px)` }}
        >
          <AnimatedFlower variant="violet" size="lg" className="animate-bloom-glow" />
        </div>
        <div
          className="absolute top-1/3 right-4 md:right-20 animate-float-reverse"
          style={{ transform: `translate(${mousePosition.x * -28}px, ${mousePosition.y * -28}px)` }}
        >
          <AnimatedFlower variant="magenta" size="md" />
        </div>
        <div
          className="absolute bottom-24 left-1/4 animate-float opacity-80 hidden md:block"
          style={{ transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)` }}
        >
          <AnimatedFlower variant="indigo" size="md" />
        </div>
        <div
          className="absolute bottom-32 right-1/3 animate-float-slow opacity-70 hidden lg:block"
          style={{ transform: `translate(${mousePosition.x * -14}px, ${mousePosition.y * -14}px)` }}
        >
          <AnimatedFlower variant="lavender" size="sm" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="fade-in-up inline-block mb-8 ring-glow rounded-full">
            <div className="px-4 py-2 rounded-full bg-background/70 backdrop-blur border border-violet-500/30 text-sm text-violet-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              Nurturing Digital Wellness
            </div>
          </div>

          <h1 className="fade-in-up delay-100 text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.05] tracking-tight">
            Grow Together,
            <br />
            <span className="gradient-text">Flourish Together</span>
          </h1>

          <p className="fade-in-up delay-200 text-lg md:text-xl text-[color:var(--text-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed">
            Transform screen time management into a beautiful journey. Watch your child&apos;s digital habits bloom
            with our intuitive flower-based tracking system.
          </p>

          <div className="fade-in-up delay-300 flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Link href="/waitlist" className="premium-button btn-primary rounded-full px-8 py-4 font-semibold text-base">
              Join Waitlist
            </Link>
            <Link href="/family" className="premium-button btn-ghost rounded-full px-8 py-4 font-semibold text-base">
              Family Dashboard
            </Link>
          </div>

          {/* App preview card */}
          <div className="fade-in-up delay-400 relative">
            <div className="mx-auto max-w-sm tilt">
              <div className="magnetic-card rounded-[2.5rem] p-2 bg-gradient-to-br from-violet-500/40 via-violet-800/30 to-pink-500/30 shadow-[0_40px_80px_rgba(109,40,217,0.55)]">
                <div className="rounded-[2rem] bg-gradient-to-b from-violet-50 to-white overflow-hidden border border-violet-500/20">
                  <div className="aspect-[9/16] p-8 flex flex-col items-center relative">
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-violet-300" />
                    <div className="mt-6 flex flex-col items-center">
                      <AnimatedFlower variant="magenta" size="xl" className="animate-bloom-glow" />
                      <div className="text-xl font-bold mt-4 text-violet-900">Emma&apos;s Garden</div>
                      <div className="text-xs text-violet-600 mb-6">Today&apos;s Progress</div>
                    </div>
                    <div className="w-full glass-card rounded-2xl p-4 mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-medium text-violet-700">Screen Time</span>
                        <span className="text-xs text-emerald-600 font-semibold">2h 15m / 3h</span>
                      </div>
                      <div className="h-2 bg-violet-500/10 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-emerald-400 to-violet-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
                      </div>
                    </div>
                    <div className="w-full grid grid-cols-3 gap-2">
                      {[
                        { label: "YouTube", time: "45m", color: "from-rose-400 to-pink-500" },
                        { label: "Games", time: "30m", color: "from-violet-400 to-indigo-500" },
                        { label: "School", time: "1h", color: "from-emerald-400 to-cyan-500" },
                      ].map((app) => (
                        <div key={app.label} className="glass-card rounded-xl p-2 text-center">
                          <div className={`w-7 h-7 mx-auto mb-1 rounded-lg bg-gradient-to-br ${app.color}`} />
                          <div className="text-[10px] text-violet-700">{app.label}</div>
                          <div className="text-[10px] text-violet-500">{app.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat value="10K+" label="Families" delay={0.05} />
          <Stat value="98%" label="Happy Parents" delay={0.1} />
          <Stat value="4.9★" label="App Rating" delay={0.15} />
          <Stat value="3" label="Languages" delay={0.2} />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="reveal text-4xl md:text-6xl font-bold mb-4 tracking-tight">
              Features That <span className="gradient-text">Delight</span>
            </h2>
            <p className="reveal text-lg text-[color:var(--text-muted)] max-w-2xl mx-auto" style={{ transitionDelay: "0.1s" }}>
              Thoughtfully designed tools that make parenting in the digital age feel natural and rewarding.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              delay={0.05}
              accent="violet"
              icon={<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              title="Smart Time Limits"
              description="Set personalized daily screen time limits for each child. Our intelligent system helps maintain healthy digital habits without constant policing."
            />
            <FeatureCard
              delay={0.1}
              accent="pink"
              icon={<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}
              title="Flower Growth Tracking"
              description="Watch your child's digital garden bloom in real-time. Each child has a unique flower that reflects their screen time health."
            />
            <FeatureCard
              delay={0.15}
              accent="indigo"
              icon={<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
              title="Detailed Analytics"
              description="Get comprehensive insights into app usage patterns. Understand which apps consume the most time and make informed decisions."
            />
            <FeatureCard
              delay={0.2}
              accent="cyan"
              icon={<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>}
              title="Smart Notifications"
              description="Receive timely alerts when limits are approaching. Stay informed without being overwhelmed by constant notifications."
            />
            <FeatureCard
              delay={0.25}
              accent="violet"
              icon={<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              title="Multi-Language Support"
              description="Available in Russian, Uzbek (Latin & Cyrillic). Connect with families across different linguistic backgrounds."
            />
            <FeatureCard
              delay={0.3}
              accent="pink"
              icon={<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
              title="Family Sharing"
              description="Add multiple children to your account. Each child gets their own flower and personalized settings while you maintain oversight."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="reveal text-4xl md:text-6xl font-bold mb-4 tracking-tight">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="reveal text-lg text-[color:var(--text-muted)] max-w-2xl mx-auto" style={{ transitionDelay: "0.1s" }}>
              Three simple steps to transform your family&apos;s digital wellness journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

            {[
              { n: "1", title: "Add Your Children", desc: "Create profiles for each child with their favorite flower variant and personalized settings.", grad: "from-violet-500 to-indigo-500" },
              { n: "2", title: "Set Healthy Limits", desc: "Define daily screen time limits that work for your family's schedule and values.", grad: "from-pink-500 to-violet-500" },
              { n: "3", title: "Watch Them Bloom", desc: "Monitor progress through beautiful flower visualizations and meaningful insights.", grad: "from-amber-400 to-pink-500" },
            ].map((step, i) => (
              <div key={step.n} className="reveal text-center relative" style={{ transitionDelay: `${i * 0.12}s` }}>
                <div className={`relative w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.grad} flex items-center justify-center text-white text-3xl font-bold shadow-[0_0_30px_rgba(139,92,246,0.6)]`}>
                  <span className="relative z-10">{step.n}</span>
                  <div className="absolute inset-0 rounded-2xl bg-white/10 blur-md -z-10" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-violet-900">{step.title}</h3>
                <p className="text-[color:var(--text-muted)] max-w-xs mx-auto leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Flower states */}
          <div className="mt-20 grid md:grid-cols-3 gap-6">
            <FlowerState state="blooming" label="Blooming Healthy" sub="Within daily limits" />
            <FlowerState state="warning" label="Needs Attention" sub="Approaching limit" />
            <FlowerState state="wilting" label="Limit Exceeded" sub="Time for a break" />
          </div>
        </div>
      </section>

      {/* Purpose */}
      <section id="purpose" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="reveal text-4xl md:text-6xl font-bold mb-4 tracking-tight">
              Our <span className="gradient-text">Purpose</span>
            </h2>
            <p className="reveal text-lg text-[color:var(--text-muted)] max-w-2xl mx-auto" style={{ transitionDelay: "0.1s" }}>
              Empowering families to build healthy digital relationships through thoughtful design.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="reveal glass-card rounded-3xl p-8 magnetic-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z"/><path d="M12 6a1 1 0 00-1 1v5a1 1 0 00.29.71l3 3a1 1 0 001.42-1.42L13 11.59V7a1 1 0 00-1-1z"/></svg>
                </div>
                <h3 className="text-2xl font-semibold text-violet-900">Digital Wellness for Families</h3>
              </div>
              <p className="text-[color:var(--text-muted)] leading-relaxed mb-6">
                In today&apos;s digital-first world, children spend more time than ever on screens. Buvijon helps families navigate this reality with compassion, not control.
              </p>
              <ul className="space-y-3">
                {["Teach balanced screen habits naturally", "Spark conversations about digital time", "Build trust through transparency"].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span className="mt-1 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600">✓</span>
                    <span className="text-violet-800">{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal glass-card rounded-3xl p-8 magnetic-card" style={{ transitionDelay: "0.1s" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-indigo-500 flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </div>
                <h3 className="text-2xl font-semibold text-violet-900">More Than Just Limits</h3>
              </div>
              <p className="text-[color:var(--text-muted)] leading-relaxed mb-6">
                Unlike traditional parental control apps that focus solely on restriction, Buvijon emphasizes growth, understanding, and family connection.
              </p>
              <ul className="space-y-3">
                {["Celebrate healthy digital choices", "Track progress over time", "Support multiple languages and cultures"].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span className="mt-1 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600">✓</span>
                    <span className="text-violet-800">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 relative">
        <div className="max-w-4xl mx-auto text-center glass-card rounded-3xl p-12 md:p-16 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-violet-500/30 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-pink-500/20 blur-3xl" />
          <div className="relative">
            <div className="inline-flex mb-6">
              <AnimatedFlower variant="magenta" size="lg" className="animate-bloom-glow" />
            </div>
            <h2 className="reveal text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Ready to <span className="gradient-text">Grow Together?</span>
            </h2>
            <p className="reveal text-lg text-[color:var(--text-muted)] mb-10 max-w-2xl mx-auto" style={{ transitionDelay: "0.1s" }}>
              Start your family&apos;s journey toward healthy digital habits today.
              Experience the beauty of mindful screen time management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/waitlist" className="premium-button btn-primary rounded-full px-10 py-4 font-semibold text-base">
                Join Waitlist
              </Link>
              <Link href="/family" className="premium-button btn-ghost rounded-full px-10 py-4 font-semibold text-base">
                Explore Dashboard
              </Link>
            </div>
            <p className="mt-6 text-sm text-[color:var(--text-muted)]">Free 14-day trial • No credit card required</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-violet-500/25 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.6)]">
                  <span className="text-white font-bold">B</span>
                </div>
                <span className="font-bold text-lg">Buvijon</span>
              </div>
              <p className="text-sm text-[color:var(--text-muted)]">
                Nurturing digital wellness for families everywhere.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-violet-800">Product</h4>
              <ul className="space-y-2 text-sm text-[color:var(--text-muted)]">
                <li><a href="#features" className="hover:text-violet-700 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-violet-700 transition-colors">How it Works</a></li>
                <li><a href="#purpose" className="hover:text-violet-700 transition-colors">Purpose</a></li>
                <li><Link href="/waitlist" className="hover:text-violet-700 transition-colors">Waitlist</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-violet-800">Company</h4>
              <ul className="space-y-2 text-sm text-[color:var(--text-muted)]">
                <li><a href="#" className="hover:text-violet-700 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-violet-700 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-violet-700 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-violet-700 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-violet-800">Legal</h4>
              <ul className="space-y-2 text-sm text-[color:var(--text-muted)]">
                <li><a href="#" className="hover:text-violet-700 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-violet-700 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-violet-700 transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-violet-500/25">
            <p className="text-sm text-[color:var(--text-muted)]">© 2026 Buvijon. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-[color:var(--text-muted)] hover:text-violet-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="text-[color:var(--text-muted)] hover:text-violet-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
