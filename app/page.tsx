"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// Animated Flower Component
const AnimatedFlower = ({ variant = "rose", size = "md", className = "" }: { variant?: "rose" | "tulip" | "sunflower" | "daisy" | "lily"; size?: "sm" | "md" | "lg"; className?: string }) => {
  const sizeMap = {
    sm: { width: 40, height: 40 },
    md: { width: 80, height: 80 },
    lg: { width: 120, height: 120 },
  };

  const colors = {
    rose: { primary: "#E91E8C", secondary: "#FF6B9D" },
    tulip: { primary: "#FF6B35", secondary: "#FF9E42" },
    sunflower: { primary: "#FCD34D", secondary: "#F59E0B" },
    daisy: { primary: "#FFFFFF", secondary: "#F0F0F0" },
    lily: { primary: "#10B981", secondary: "#34D399" },
  };

  const { width, height } = sizeMap[size];
  const { primary, secondary } = colors[variant];

  // Pre-calculated petal positions to avoid hydration mismatch
  const petalPositions = [
    { cx: 52, cy: 40, rotate: 0, transformOrigin: "52 40" },
    { cx: 46, cy: 50.39, rotate: 60, transformOrigin: "46 50.39" },
    { cx: 34, cy: 50.39, rotate: 120, transformOrigin: "34 50.39" },
    { cx: 28, cy: 40, rotate: 180, transformOrigin: "28 40" },
    { cx: 34, cy: 29.61, rotate: 240, transformOrigin: "34 29.61" },
    { cx: 46, cy: 29.61, rotate: 300, transformOrigin: "46 29.61" },
  ];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Stem */}
      <path
        d="M40 45 Q38 55 40 65"
        stroke="#10B981"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {/* Leaves */}
      <ellipse cx="32" cy="52" rx="8" ry="4" fill="#10B981" transform="rotate(-30 32 52)" />
      <ellipse cx="48" cy="55" rx="8" ry="4" fill="#10B981" transform="rotate(30 48 55)" />
      {/* Petals */}
      {petalPositions.map((petal, i) => (
        <ellipse
          key={i}
          cx={petal.cx}
          cy={petal.cy}
          rx="12"
          ry="20"
          fill={primary}
          transform={`rotate(${petal.rotate} ${petal.transformOrigin})`}
          opacity="0.9"
        />
      ))}
      {/* Center */}
      <circle cx="40" cy="40" r="8" fill={secondary} />
    </svg>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description, delay = 0 }: { icon: React.ReactNode; title: string; description: string; delay?: number }) => (
  <div
    className={`reveal magnetic-card glass-card rounded-2xl p-8 relative overflow-hidden group`}
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blossom-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">
      <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-2xl bg-blossom-pink/10 group-hover:bg-blossom-pink/20 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  </div>
);

// Flower State Component
const FlowerState = ({ state, label }: { state: "blooming" | "warning" | "wilting"; label: string }) => {
  const colors = {
    blooming: "from-blooming to-emerald-600",
    warning: "from-warning to-amber-600",
    wilting: "from-wilting to-red-600",
  };

  return (
    <div className="reveal flex items-center gap-4 p-6 rounded-2xl bg-surface-secondary/50">
      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${colors[state]} flex items-center justify-center shadow-lg`}>
        <div className={`w-3 h-3 rounded-full bg-white animate-pulse`} />
      </div>
      <div>
        <div className="font-semibold text-lg">{label}</div>
        <div className="text-sm text-muted-foreground">Healthy state</div>
      </div>
    </div>
  );
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Parallax effect on hero
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Particle effect
  useEffect(() => {
    const container = document.getElementById("particle-container");
    if (!container) return;

    const particles: HTMLDivElement[] = [];
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.width = `${Math.random() * 8 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.backgroundColor = "rgba(233, 30, 140, 0.3)";
      particle.style.animation = `float ${Math.random() * 4 + 4}s ease-in-out infinite`;
      particle.style.animationDelay = `${Math.random() * 2}s`;
      container.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, []);

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between glass-card rounded-full px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blossom-pink to-pink-400 flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="font-bold text-xl">Buvijon</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Stories</a>
          </div>
          <button className="premium-button bg-blossom-pink text-white px-6 py-2.5 rounded-full font-medium hover:bg-blossom-pink-light transition-colors">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6 pt-24 overflow-hidden"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blossom-pink-pale/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(233,30,140,0.08),transparent_50%)]" />

        {/* Floating Flowers */}
        <div
          className="absolute top-1/4 left-10 animate-float-slow opacity-60"
          style={{
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
          }}
        >
          <AnimatedFlower variant="rose" size="lg" className="animate-bloom-glow" />
        </div>
        <div
          className="absolute top-1/3 right-16 animate-float-reverse opacity-40"
          style={{
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          }}
        >
          <AnimatedFlower variant="tulip" size="md" />
        </div>
        <div
          className="absolute bottom-1/4 left-1/4 animate-float opacity-30"
          style={{
            transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
          }}
        >
          <AnimatedFlower variant="sunflower" size="md" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="fade-in-up inline-block mb-6 px-4 py-2 rounded-full bg-blossom-pink/10 border border-blossom-pink/20">
            <span className="text-sm font-medium text-blossom-pink">🌸 Nurturing Digital Wellness</span>
          </div>
          <h1 className="fade-in-up delay-100 text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Grow Together,{" "}
            <span className="gradient-text">Flourish Together</span>
          </h1>
          <p className="fade-in-up delay-200 text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Transform screen time management into a beautiful journey. Watch your child's digital habits bloom
            with our intuitive flower-based tracking system.
          </p>
          <div className="fade-in-up delay-300 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/waitlist" className="premium-button bg-blossom-pink text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl">
              Join Waitlist
            </Link>
            <Link href="/family" className="premium-button bg-surface border border-border px-8 py-4 rounded-full font-semibold text-lg hover:bg-surface-secondary">
              Family Dashboard
            </Link>
          </div>

          {/* App Preview */}
          <div className="fade-in-up delay-400 mt-16 relative">
            <div className="magnetic-card mx-auto max-w-md rounded-[2.5rem] bg-gradient-to-b from-surface to-surface-secondary shadow-2xl p-2 border border-border">
              <div className="rounded-[2rem] bg-surface overflow-hidden">
                <div className="aspect-[9/19] bg-gradient-to-b from-blossom-pink-pale to-white p-8 flex flex-col items-center">
                  <div className="text-6xl mb-4">🌷</div>
                  <div className="text-2xl font-bold mb-2">Emma's Garden</div>
                  <div className="text-sm text-muted-foreground mb-8">Today's Progress</div>
                  <div className="w-full bg-white rounded-2xl p-4 shadow-sm mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Screen Time</span>
                      <span className="text-sm text-blooming font-semibold">2h 15m / 3h</span>
                    </div>
                    <div className="h-2 bg-surface-secondary rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-gradient-to-r from-blooming to-emerald-400 rounded-full" />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <AnimatedFlower variant="tulip" size="sm" className="animate-float" />
                    <AnimatedFlower variant="rose" size="sm" className="animate-float-reverse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="fade-in-up text-4xl md:text-5xl font-bold mb-4">
              Features That <span className="gradient-text">Delight</span>
            </h2>
            <p className="fade-in-up delay-100 text-lg text-muted-foreground max-w-2xl mx-auto">
              Thoughtfully designed tools that make parenting in the digital age feel natural and rewarding.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              delay={0.1}
              icon={
                <svg className="w-8 h-8 text-blossom-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="Smart Time Limits"
              description="Set personalized daily screen time limits for each child. Our intelligent system helps maintain healthy digital habits without constant policing."
            />
            <FeatureCard
              delay={0.2}
              icon={
                <svg className="w-8 h-8 text-blossom-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              }
              title="Flower Growth Tracking"
              description="Watch your child's digital garden bloom in real-time. Each child has a unique flower that reflects their screen time health."
            />
            <FeatureCard
              delay={0.3}
              icon={
                <svg className="w-8 h-8 text-blossom-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
              title="Detailed Analytics"
              description="Get comprehensive insights into app usage patterns. Understand which apps consume the most time and make informed decisions."
            />
            <FeatureCard
              delay={0.4}
              icon={
                <svg className="w-8 h-8 text-blossom-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              }
              title="Smart Notifications"
              description="Receive timely alerts when limits are approaching. Stay informed without being overwhelmed by constant notifications."
            />
            <FeatureCard
              delay={0.5}
              icon={
                <svg className="w-8 h-8 text-blossom-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="Multi-Language Support"
              description="Available in Russian, Uzbek (Latin & Cyrillic). Connect with families across different linguistic backgrounds."
            />
            <FeatureCard
              delay={0.6}
              icon={
                <svg className="w-8 h-8 text-blossom-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              title="Family Sharing"
              description="Add multiple children to your account. Each child gets their own flower and personalized settings while you maintain oversight."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 bg-surface-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="fade-in-up text-4xl md:text-5xl font-bold mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="fade-in-up delay-100 text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to transform your family's digital wellness journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="reveal text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blossom-pink to-pink-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Add Your Children</h3>
              <p className="text-muted-foreground">Create profiles for each child with their favorite flower variant and personalized settings.</p>
            </div>
            <div className="reveal text-center" style={{ animationDelay: "0.2s" }}>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blooming to-emerald-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Set Healthy Limits</h3>
              <p className="text-muted-foreground">Define daily screen time limits that work for your family's schedule and values.</p>
            </div>
            <div className="reveal text-center" style={{ animationDelay: "0.4s" }}>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-warning to-amber-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Watch Them Bloom</h3>
              <p className="text-muted-foreground">Monitor progress through beautiful flower visualizations and meaningful insights.</p>
            </div>
          </div>

          {/* Flower States */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <FlowerState state="blooming" label="Blooming Healthy" />
            <FlowerState state="warning" label="Needs Attention" />
            <FlowerState state="wilting" label="Limit Exceeded" />
          </div>
        </div>
      </section>

      {/* Our Purpose Section */}
      <section id="purpose" className="py-24 px-6 bg-surface-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="fade-in-up text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Purpose</span>
            </h2>
            <p className="fade-in-up delay-100 text-lg text-muted-foreground max-w-2xl mx-auto">
              Empowering families to build healthy digital relationships through thoughtful design
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="reveal glass-card rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-4 text-blossom-pink">Digital Wellness for Families</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                In today's digital-first world, children spend more time than ever on screens. Buvijon helps families navigate this reality with compassion, not control. We believe in teaching healthy habits through positive reinforcement and beautiful visualization.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-blooming text-xl">✓</span>
                  <span className="text-foreground">Teach balanced screen habits naturally</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blooming text-xl">✓</span>
                  <span className="text-foreground">Spark conversations about digital time</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blooming text-xl">✓</span>
                  <span className="text-foreground">Build trust through transparency</span>
                </li>
              </ul>
            </div>

            <div className="reveal glass-card rounded-2xl p-8" style={{ animationDelay: "0.2s" }}>
              <h3 className="text-2xl font-semibold mb-4 text-blossom-pink">More Than Just Limits</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Unlike traditional parental control apps that focus solely on restriction, Buvijon emphasizes growth, understanding, and family connection. Our flower metaphor transforms "limit exceeded" from a punishment into an opportunity to learn together.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-blooming text-xl">✓</span>
                  <span className="text-foreground">Celebrate healthy digital choices</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blooming text-xl">✓</span>
                  <span className="text-foreground">Track progress over time</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blooming text-xl">✓</span>
                  <span className="text-foreground">Support multiple languages and cultures</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-blossom-pink-pale to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="fade-in-up text-4xl md:text-5xl font-bold mb-6">
            Ready to Grow Together?
          </h2>
          <p className="fade-in-up delay-100 text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Start your family's journey toward healthy digital habits today.
            Experience the beauty of mindful screen time management.
          </p>
          <div className="fade-in-up delay-200 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/waitlist" className="premium-button bg-blossom-pink text-white px-10 py-5 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl">
              Join Waitlist
            </Link>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">Free 14-day trial • No credit card required</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blossom-pink to-pink-400 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <span className="font-bold text-xl">Buvijon</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Nurturing digital wellness for families everywhere.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Download</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Updates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              © 2026 Buvijon. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
