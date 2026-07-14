"use client";

import Image from "next/image";
import appHome from "../../public/app-home.png";

// The real Buvijon app home screen ("Bog'im" feed), shown inside a phone frame.
// The screenshot already includes its own status bar, so the frame here is just
// a bezel + soft aura around it — no fake notch/status bar on top.
export function AppHomeMockup() {
  return (
    <div className="relative mx-auto w-full">
      <div
        className="absolute -inset-6 -z-10 rounded-[3rem] opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(124,58,237,0.35), transparent 60%), radial-gradient(circle at 80% 80%, rgba(236,72,153,0.28), transparent 55%)",
        }}
      />

      <div className="rounded-[3rem] p-[3px] bg-gradient-to-br from-violet-500 via-violet-600 to-pink-500 shadow-[0_40px_100px_rgba(109,40,217,0.35)]">
        <div className="rounded-[2.85rem] bg-white overflow-hidden border border-violet-100">
          <Image
            src={appHome}
            alt="Buvijon ilovasining bosh ekrani — oila ekran vaqti va oila lentasi"
            className="w-full h-auto block"
            sizes="(max-width: 1024px) 90vw, 350px"
            priority
          />
        </div>
      </div>
    </div>
  );
}
