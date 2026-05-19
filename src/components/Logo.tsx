import Link from "next/link";

export function Logo({
  size = 28,
  href = "/",
}: {
  size?: number;
  href?: string | null;
}) {
  const inner = (
    <span
      className="font-semibold tracking-[-0.02em] text-[var(--text-primary)]"
      style={{ fontSize: Math.round(size * 0.58) }}
    >
      Buvijon
    </span>
  );
  if (!href) return inner;
  return (
    <Link href={href} aria-label="Buvijon — home" className="inline-flex items-center">
      {inner}
    </Link>
  );
}
