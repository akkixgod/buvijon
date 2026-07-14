import type { ReactNode } from "react";

// One consistent phone frame used everywhere a screenshot is shown (home mockup
// + features showcase) so device framing never looks inconsistent. It is just a
// gradient bezel + soft aura around whatever `children` fills the screen — the
// screenshots already carry their own status bar, so there is no fake notch.
export function PhoneFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative mx-auto w-full ${className}`}>
      <div
        className="absolute -inset-6 -z-10 rounded-[3rem] opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(124,58,237,0.35), transparent 60%), radial-gradient(circle at 80% 80%, rgba(236,72,153,0.28), transparent 55%)",
        }}
      />
      <div className="rounded-[3rem] p-[3px] bg-gradient-to-br from-violet-500 via-violet-600 to-pink-500 shadow-[0_40px_100px_rgba(109,40,217,0.35)]">
        <div className="rounded-[2.85rem] bg-white overflow-hidden border border-violet-100">
          {children}
        </div>
      </div>
    </div>
  );
}
