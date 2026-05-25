"use client";

import { useCallback, useState, type ReactNode } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { addEntry, isDuplicate, UZBEK_CITIES } from "@/lib/waitlistStorage";
import { useT } from "@/components/I18nProvider";

type FormState = {
  fullName: string;
  telegramUsername: string;
  gmail: string;
  city: string;
  agreed: boolean;
};

type FieldKey = keyof Omit<FormState, "agreed">;

const EMPTY: FormState = {
  fullName: "",
  telegramUsername: "",
  gmail: "",
  city: "",
  agreed: false,
};

export default function WaitlistPage() {
  const t = useT();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<FieldKey | "agreed", string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FieldKey | "agreed", boolean>>>({});
  const [success, setSuccess] = useState(false);

  const validate = useCallback(
    (key: FieldKey | "agreed", values: FormState = form): string | undefined => {
      switch (key) {
        case "fullName":
          return values.fullName.trim() ? undefined : t.waitlist.fullNameError;
        case "telegramUsername":
          return values.telegramUsername.trim() ? undefined : t.waitlist.telegramError;
        case "gmail":
          return values.gmail.trim() && values.gmail.includes("@gmail.com")
            ? undefined
            : t.waitlist.gmailError;
        case "city":
          return values.city ? undefined : t.waitlist.cityError;
        case "agreed":
          return values.agreed ? undefined : t.waitlist.agreeError;
        default:
          return undefined;
      }
    },
    [form, t],
  );

  const update = (k: keyof FormState, v: string | boolean) => {
    const next = { ...form, [k]: v };
    setForm(next);
    if (k !== "agreed" && touched[k as FieldKey]) {
      setErrors((e) => ({ ...e, [k]: validate(k as FieldKey, next) }));
    }
    if (k === "agreed" && touched.agreed) {
      setErrors((e) => ({ ...e, agreed: validate("agreed", next) }));
    }
  };

  const blur = (k: FieldKey | "agreed") => {
    setTouched((tch) => ({ ...tch, [k]: true }));
    setErrors((e) => ({ ...e, [k]: validate(k) }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const keys: (FieldKey | "agreed")[] = [
      "fullName",
      "telegramUsername",
      "gmail",
      "city",
      "agreed",
    ];
    const next: Partial<Record<FieldKey | "agreed", string>> = {};
    keys.forEach((k) => {
      const err = validate(k);
      if (err) next[k] = err;
    });
    setTouched(Object.fromEntries(keys.map((k) => [k, true])) as typeof touched);
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    if (isDuplicate(form.gmail, form.telegramUsername)) {
      setErrors({ gmail: t.waitlist.duplicate });
      setTouched((tch) => ({ ...tch, gmail: true }));
      return;
    }
    addEntry({
      fullName: form.fullName.trim(),
      telegramUsername: form.telegramUsername.trim(),
      gmail: form.gmail.trim(),
      city: form.city,
    });
    setForm(EMPTY);
    setErrors({});
    setTouched({});
    setSuccess(true);
    setTimeout(() => setSuccess(false), 6000);
  };

  return (
    <>
      <Nav cta={false} />

      <main className="section-hero min-h-[100svh]">
        <div className="container-1100 max-w-[640px]">
          <div className="text-center mb-8 sm:mb-12">
            <p className="eyebrow mb-4 sm:mb-5">{t.waitlist.eyebrow}</p>
            <h1 className="mb-5 sm:mb-6">
              {t.waitlist.title1}{" "}
              <span className="gradient-text">{t.waitlist.titleHighlight}</span>
              {t.waitlist.titleEnd}
            </h1>
            <p className="lead mx-auto">
              {t.waitlist.leadPart1}{" "}
              <span className="text-[var(--text-primary)] font-medium">{t.waitlist.leadDate}</span>
              {t.waitlist.leadPart2}
            </p>
          </div>

          <div className="panel border-[var(--border-violet)]">
            {success && (
              <div
                className="mb-6 sm:mb-8 p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 sm:gap-4"
                role="status"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white text-lg flex-shrink-0">
                  ✓
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-emerald-800 mb-0.5">{t.waitlist.successTitle}</div>
                  <div className="text-sm text-emerald-700">{t.waitlist.successBody}</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
              <Field
                id="fullName"
                label={t.waitlist.fullName}
                error={touched.fullName ? errors.fullName : undefined}
              >
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  onBlur={() => blur("fullName")}
                  placeholder={t.waitlist.fullNamePlaceholder}
                  aria-invalid={!!(errors.fullName && touched.fullName)}
                  className={`input ${errors.fullName && touched.fullName ? "error" : ""}`}
                />
              </Field>

              <Field
                id="telegram"
                label={t.waitlist.telegram}
                error={touched.telegramUsername ? errors.telegramUsername : undefined}
              >
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-base pointer-events-none">
                    @
                  </span>
                  <input
                    id="telegram"
                    name="telegram"
                    type="text"
                    autoComplete="username"
                    required
                    value={form.telegramUsername}
                    onChange={(e) =>
                      update("telegramUsername", e.target.value.replace(/^@+/, ""))
                    }
                    onBlur={() => blur("telegramUsername")}
                    placeholder={t.waitlist.telegramPlaceholder}
                    aria-invalid={!!(errors.telegramUsername && touched.telegramUsername)}
                    className={`input pl-9 ${errors.telegramUsername && touched.telegramUsername ? "error" : ""}`}
                  />
                </div>
              </Field>

              <Field
                id="gmail"
                label={t.waitlist.gmail}
                error={touched.gmail ? errors.gmail : undefined}
              >
                <input
                  id="gmail"
                  name="gmail"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.gmail}
                  onChange={(e) => update("gmail", e.target.value)}
                  onBlur={() => blur("gmail")}
                  placeholder={t.waitlist.gmailPlaceholder}
                  aria-invalid={!!(errors.gmail && touched.gmail)}
                  className={`input ${errors.gmail && touched.gmail ? "error" : ""}`}
                />
              </Field>

              <Field
                id="city"
                label={t.waitlist.city}
                error={touched.city ? errors.city : undefined}
              >
                <select
                  id="city"
                  name="city"
                  required
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  onBlur={() => blur("city")}
                  aria-invalid={!!(errors.city && touched.city)}
                  className={`input ${errors.city && touched.city ? "error" : ""}`}
                >
                  <option value="">{t.waitlist.citySelect}</option>
                  {UZBEK_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>

              <div>
                <label className="flex items-start gap-3 pt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.agreed}
                    onChange={(e) => update("agreed", e.target.checked)}
                    onBlur={() => blur("agreed")}
                    aria-invalid={!!(errors.agreed && touched.agreed)}
                    className="mt-1 w-5 h-5 rounded accent-[var(--brand-primary)] cursor-pointer"
                  />
                  <span className="text-[14px] leading-[1.5] text-[var(--text-secondary)]">
                    {t.waitlist.agree}
                  </span>
                </label>
                {touched.agreed && errors.agreed && (
                  <p className="mt-2 text-[13px] text-[var(--wilting)]" role="alert">
                    {errors.agreed}
                  </p>
                )}
              </div>

              <button type="submit" className="btn-primary w-full mt-2" style={{ height: 56 }}>
                {t.waitlist.submit}
              </button>
            </form>

            <div className="text-center mt-8">
              <Link
                href="/"
                className="text-[14px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                {t.waitlist.backHome}
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
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="block text-[13px] font-medium mb-2 text-[var(--text-primary)]">
        {label}
      </label>
      <div aria-describedby={error ? errorId : undefined}>{children}</div>
      {error && (
        <p id={errorId} className="mt-2 text-[13px] text-[var(--wilting)]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
