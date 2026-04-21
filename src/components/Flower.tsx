type FlowerVariant = "violet" | "pink" | "indigo" | "emerald" | "rose" | "amber";

const PALETTE: Record<FlowerVariant, { a: string; b: string; center: string }> = {
  violet:  { a: "#C4B5FD", b: "#7C3AED", center: "#FDE68A" },
  pink:    { a: "#F9A8D4", b: "#DB2777", center: "#FDE68A" },
  indigo:  { a: "#A5B4FC", b: "#4F46E5", center: "#FDE68A" },
  emerald: { a: "#6EE7B7", b: "#059669", center: "#FDE68A" },
  rose:    { a: "#FDA4AF", b: "#BE123C", center: "#FDE68A" },
  amber:   { a: "#FDE68A", b: "#D97706", center: "#FFFBEB" },
};

const PETALS = [0, 60, 120, 180, 240, 300];

export function Flower({
  variant = "violet",
  size = 120,
  progress = 1,
  className = "",
}: {
  variant?: FlowerVariant;
  size?: number;
  progress?: number;
  className?: string;
}) {
  const { a, b, center } = PALETTE[variant];
  const id = `g-${variant}-${size}`;
  const p = Math.min(Math.max(progress, 0), 1);
  const cy = 24 + 16 * p;
  const ry = 17 - 9 * p;
  const rx = 9 + 2 * p;
  const coreOuter = 7 + 7 * p;
  const coreInner = 4 + 4 * p;

  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={a} />
          <stop offset="100%" stopColor={b} />
        </radialGradient>
      </defs>
      {PETALS.map((angle) => (
        <ellipse
          key={angle}
          cx="40"
          cy={cy}
          rx={rx}
          ry={ry}
          fill={`url(#${id})`}
          transform={`rotate(${angle} 40 40)`}
          opacity="0.95"
        />
      ))}
      <circle cx="40" cy="40" r={coreOuter} fill={b} />
      <circle cx="40" cy="40" r={coreInner} fill={center} />
    </svg>
  );
}
