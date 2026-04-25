"use client";

import { useEffect, useState } from "react";
import { useT } from "./I18nProvider";

const TARGET_MS = Date.parse("2026-05-15T00:00:00+05:00");

type Remaining = { days: number; hours: number; minutes: number } | null;

function compute(): Remaining {
  const diff = TARGET_MS - Date.now();
  if (diff <= 0) return null;
  const minutes = Math.floor(diff / 60_000) % 60;
  const hours = Math.floor(diff / 3_600_000) % 24;
  const days = Math.floor(diff / 86_400_000);
  return { days, hours, minutes };
}

export function Countdown() {
  const t = useT();
  const [remaining, setRemaining] = useState<Remaining>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setRemaining(compute());
    const id = setInterval(() => setRemaining(compute()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;

  const c = t.hero.countdown;
  if (remaining === null) {
    return <>{c.prefix} · {c.liveLabel}</>;
  }
  return (
    <>
      {c.prefix} · {remaining.days}{c.days} {remaining.hours}{c.hours} {remaining.minutes}{c.minutes} {c.suffix}
    </>
  );
}
