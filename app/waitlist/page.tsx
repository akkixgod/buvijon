"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const UZBEK_CITIES = [
  "Toshkent", "Samarqand", "Namangan", "Andijon", "Farg'ona", "Jizzax",
  "Sirdaryo", "Qashqadaryo", "Navoiy", "Buxoro", "Xiva", "Guliston",
  "Termiz", "Qo'qon", "Nukus",
];

type WaitlistEntry = {
  id: number;
  fullName: string;
  telegramUsername: string;
  gmail: string;
  city: string;
  submittedAt: string;
};

export default function WaitlistPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    telegramUsername: "",
    gmail: "",
    city: "",
    agreed: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  // Cursor glow
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

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.telegramUsername.trim()) newErrors.telegramUsername = "Telegram username is required";
    if (!formData.gmail.trim() || !formData.gmail.includes("@gmail.com")) {
      newErrors.gmail = "Please enter a valid Gmail address";
    }
    if (!formData.city) newErrors.city = "Please select your city";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const existing: WaitlistEntry[] = JSON.parse(localStorage.getItem("buvijon_waitlist") || "[]");
    if (existing.some((item) => item.gmail === formData.gmail || item.telegramUsername === formData.telegramUsername)) {
      setErrors({ gmail: "This email or Telegram username is already registered" });
      return;
    }

    existing.push({
      id: Date.now(),
      fullName: formData.fullName,
      telegramUsername: formData.telegramUsername,
      gmail: formData.gmail,
      city: formData.city,
      submittedAt: new Date().toISOString(),
    });
    localStorage.setItem("buvijon_waitlist", JSON.stringify(existing));

    setFormData({ fullName: "", telegramUsername: "", gmail: "", city: "", agreed: false });
    setErrors({});
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl outline-none transition-all bg-white/80 backdrop-blur border ${
      hasError
        ? "border-rose-400/80 focus:border-rose-500"
        : "border-violet-500/30 focus:border-violet-500 focus:bg-white"
    } text-violet-900 placeholder:text-violet-400`;

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Ambient orbs */}
      <div className="orb" style={{ width: 420, height: 420, top: -120, left: -100, background: "radial-gradient(circle, rgba(139,92,246,0.55), transparent 65%)" }} />
      <div className="orb" style={{ width: 460, height: 460, bottom: -140, right: -120, background: "radial-gradient(circle, rgba(236,72,153,0.35), transparent 65%)", animationDelay: "2s" }} />

      {/* Navigation */}
      <nav className="sticky top-0 px-4 md:px-6 py-4 backdrop-blur-xl bg-background/60 border-b border-violet-500/25" style={{ zIndex: 50 }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 via-violet-600 to-pink-500 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.7)]">
              <span className="text-white font-bold">B</span>
            </div>
            <span className="font-bold text-lg">Buvijon</span>
          </Link>
          <Link href="/family" className="premium-button btn-ghost rounded-full px-5 py-2.5 text-sm font-medium">
            Family Dashboard
          </Link>
        </div>
      </nav>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-6 py-12 relative">
        <div className="relative w-full max-w-2xl mx-auto" style={{ zIndex: 3 }}>
          {/* Header */}
          <div className="text-center mb-10">
            <div className="fade-in-up inline-block mb-5 ring-glow rounded-full">
              <div className="px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-violet-500/30 text-sm text-violet-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                Join the Waitlist
              </div>
            </div>
            <h1 className="fade-in-up delay-100 text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Be the First to <span className="gradient-text">Grow Together</span>
            </h1>
            <p className="fade-in-up delay-200 text-lg text-[color:var(--text-muted)] max-w-xl mx-auto">
              Join our waitlist for early access. App launches on{" "}
              <span className="font-semibold text-violet-300">May 15th at 12:00 PM</span>
            </p>
          </div>

          {/* Form card */}
          <div className="fade-in-up delay-300 glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden">
            {success && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600 text-xl">✓</div>
                <div>
                  <div className="font-semibold text-emerald-200">You&apos;re on the list!</div>
                  <div className="text-sm text-emerald-600/70">We&apos;ll reach out when Buvijon launches.</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-2 text-violet-800">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Enter your full name"
                  className={inputClass(!!errors.fullName)}
                />
                {errors.fullName && <p className="mt-1 text-sm text-rose-600">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="telegramUsername" className="block text-sm font-medium mb-2 text-violet-800">Telegram Username</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-500">@</div>
                  <input
                    type="text"
                    id="telegramUsername"
                    value={formData.telegramUsername}
                    onChange={(e) => setFormData({ ...formData, telegramUsername: e.target.value })}
                    placeholder="username"
                    className={`${inputClass(!!errors.telegramUsername)} pl-10`}
                  />
                </div>
                {errors.telegramUsername && <p className="mt-1 text-sm text-rose-600">{errors.telegramUsername}</p>}
              </div>

              <div>
                <label htmlFor="gmail" className="block text-sm font-medium mb-2 text-violet-800">Gmail Address</label>
                <input
                  type="email"
                  id="gmail"
                  value={formData.gmail}
                  onChange={(e) => setFormData({ ...formData, gmail: e.target.value })}
                  placeholder="yourname@gmail.com"
                  className={inputClass(!!errors.gmail)}
                />
                {errors.gmail && <p className="mt-1 text-sm text-rose-600">{errors.gmail}</p>}
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-2 text-violet-800">City (Uzbekistan)</label>
                <select
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className={`${inputClass(!!errors.city)} cursor-pointer`}
                  style={{ colorScheme: "dark" }}
                >
                  <option value="">Select your city</option>
                  {UZBEK_CITIES.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {errors.city && <p className="mt-1 text-sm text-rose-600">{errors.city}</p>}
              </div>

              <label htmlFor="agreed" className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  id="agreed"
                  checked={formData.agreed}
                  onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                  className="mt-1 w-5 h-5 rounded accent-violet-500 cursor-pointer"
                />
                <span className="text-sm text-[color:var(--text-muted)] leading-relaxed group-hover:text-violet-700 transition-colors">
                  I agree to receive updates about Buvijon&apos;s launch and can change my mind anytime.
                </span>
              </label>

              <button
                type="submit"
                disabled={!formData.agreed}
                className="premium-button btn-primary w-full py-4 rounded-xl font-semibold text-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:transform-none"
              >
                {formData.agreed ? "Join Waitlist" : "Please agree to continue"}
              </button>
            </form>

            <div className="text-center mt-6">
              <Link href="/" className="text-sm text-[color:var(--text-muted)] hover:text-violet-700 transition-colors">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-sm text-[color:var(--text-muted)] relative" style={{ zIndex: 3 }}>
        <p>© 2026 Buvijon. All rights reserved.</p>
        <p className="mt-2">Made with love for families in Uzbekistan</p>
      </footer>
    </div>
  );
}
