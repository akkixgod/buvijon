"use client";

import { useEffect, useState } from "react";

type Segment = { type: "num"; value: number } | { type: "text"; value: string };

function parse(input: string): Segment[] {
  const out: Segment[] = [];
  const re = /\d+/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(input))) {
    if (m.index > last) out.push({ type: "text", value: input.slice(last, m.index) });
    out.push({ type: "num", value: parseInt(m[0], 10) });
    last = m.index + m[0].length;
  }
  if (last < input.length) out.push({ type: "text", value: input.slice(last) });
  return out;
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function CountUp({ value, duration = 900 }: { value: string; duration?: number }) {
  const segments = parse(value);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(easeOut(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return (
    <>
      {segments.map((s, i) =>
        s.type === "num" ? (
          <span key={i} className="tabular-nums">{Math.round(s.value * progress)}</span>
        ) : (
          <span key={i}>{s.value}</span>
        ),
      )}
    </>
  );
}
