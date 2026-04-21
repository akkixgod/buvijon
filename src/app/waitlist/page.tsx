"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { addEntry, isDuplicate, UZBEK_CITIES } from "@/lib/waitlistStorage";

type FormState = {
  fullName: string;
  telegramUsername: string;
  gmail: string;
  city: string;
  agreed: boolean;
};

const EMPTY: FormState = {
  fullName: "",
  telegramUsername: "",
  gmail: "",
  city: "",
  agreed: false,
};

export default function WaitlistPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const update = (k: keyof FormState, v: string | boolean) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required";
    if (!form.telegramUsername.trim()) next.telegramUsername = "Telegram username is required";
    if (!form.gmail.trim() || !form.gmail.includes("@gmail.com")) next.gmail = "Please enter a valid Gmail address";
    if (!form.city) next.city = "Please select your city";
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    if (isDuplicate(form.gmail, form.telegramUsername)) {
      setErrors({ gmail: "This email or Telegram username is already registered" });
      return;
    }
    addEntry({
      fullName: form.fullName,
      telegramUsername: form.telegramUsername,
      gmail: form.gmail,
      city: form.city,
    });
    setForm(EMPTY);
    setErrors({});
    setSuccess(true);
    setTimeout(() => setSuccess(false), 6000);
  };

  return (
    <>
      <Nav cta={false} />

      <main className="section-hero pt-[120px] min-h-screen">
        <div className="container-1100 max-w-[640px]">
          <div className="text-center mb-12">
            <p className="eyebrow mb-5">Join the waitlist</p>
            <h1 className="mb-6">
              Be the first to <span className="gradient-text">grow together</span>.
            </h1>
            <p className="lead mx-auto">
              Early access opens on <span className="text-[var(--text-primary)] font-medium">May 15</span>. We&apos;ll reach out the moment Buvijon launches.
            </p>
          </div>

          <div className="card border-[var(--border-violet)]">
            {success && (
              <div className="mb-8 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white text-lg flex-shrink-0">✓</div>
                <div>
                  <div className="font-semibold text-emerald-800 mb-0.5">You&apos;re on the list.</div>
                  <div className="text-sm text-emerald-700">We&apos;ll write to you when Buvijon opens for early access.</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <Field label="Full name" error={errors.fullName}>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  placeholder="Your name"
                  className={`input ${errors.fullName ? "error" : ""}`}
                />
              </Field>

              <Field label="Telegram username" error={errors.telegramUsername}>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-base pointer-events-none">@</span>
                  <input
                    type="text"
                    value={form.telegramUsername}
                    onChange={(e) => update("telegramUsername", e.target.value.replace(/^@+/, ""))}
                    placeholder="username"
                    className={`input pl-9 ${errors.telegramUsername ? "error" : ""}`}
                  />
                </div>
              </Field>

              <Field label="Gmail address" error={errors.gmail}>
                <input
                  type="email"
                  value={form.gmail}
                  onChange={(e) => update("gmail", e.target.value)}
                  placeholder="you@gmail.com"
                  className={`input ${errors.gmail ? "error" : ""}`}
                />
              </Field>

              <Field label="City (Uzbekistan)" error={errors.city}>
                <select
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  className={`input ${errors.city ? "error" : ""}`}
                >
                  <option value="">Select your city</option>
                  {UZBEK_CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>

              <label className="flex items-start gap-3 pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.agreed}
                  onChange={(e) => update("agreed", e.target.checked)}
                  className="mt-1 w-5 h-5 rounded accent-[var(--brand-primary)] cursor-pointer"
                />
                <span className="text-[14px] leading-[1.5] text-[var(--text-secondary)]">
                  I agree to receive updates about Buvijon&apos;s launch. I can unsubscribe anytime.
                </span>
              </label>

              <button
                type="submit"
                disabled={!form.agreed}
                className="btn-primary w-full mt-2 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ height: 56 }}
              >
                {form.agreed ? "Join waitlist" : "Please agree to continue"}
              </button>
            </form>

            <div className="text-center mt-8">
              <Link href="/" className="text-[14px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                ← Back to home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[13px] font-medium mb-2 text-[var(--text-primary)]">
        {label}
      </label>
      {children}
      {error && <p className="mt-2 text-[13px] text-[var(--wilting)]">{error}</p>}
    </div>
  );
}
