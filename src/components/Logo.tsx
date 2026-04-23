// To replace this placeholder with a real logo: drop your file into
// /public/logo.svg (or .png/.webp) and switch the <FlowerMark /> below to
// <img src="/logo.svg" alt="Buvijon" height={size} />.

import Link from "next/link";

export function Logo({
  size = 28,
  withWordmark = true,
  href = "/",
}: {
  size?: number;
  withWordmark?: boolean;
  href?: string | null;
}) {
  const inner = (
    <span className="inline-flex items-center gap-2">
      <FlowerMark size={size} />
      {withWordmark && (
        <span
          className="font-semibold tracking-[-0.02em] text-[var(--text-primary)]"
          style={{ fontSize: Math.round(size * 0.58) }}
        >
          Buvijon
        </span>
      )}
    </span>
  );
  if (!href) return inner;
  return (
    <Link href={href} aria-label="Buvijon — home" className="inline-flex items-center">
      {inner}
    </Link>
  );
}

function FlowerMark({ size }: { size: number }) {
  const id = `logo-grad-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse
          key={angle}
          cx="16"
          cy="9"
          rx="4"
          ry="7"
          fill={`url(#${id})`}
          opacity="0.92"
          transform={`rotate(${angle} 16 16)`}
        />
      ))}
      <circle cx="16" cy="16" r="3.2" fill="#FDE68A" />
    </svg>
  );
}
