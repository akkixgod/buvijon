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
  return (
    <img
      src="/logo.png"
      alt=""
      width={size}
      height={size}
      style={{ display: "block", borderRadius: Math.round(size * 0.22) }}
      draggable={false}
    />
  );
}
