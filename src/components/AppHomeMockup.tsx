"use client";

import Image from "next/image";
import appHome from "../../public/app-home.png";
import { PhoneFrame } from "@/components/PhoneFrame";

// The real Buvijon app home screen ("Bog'im" feed), shown inside the shared
// phone frame. The screenshot already includes its own status bar.
export function AppHomeMockup() {
  return (
    <PhoneFrame>
      <Image
        src={appHome}
        alt="Buvijon ilovasining bosh ekrani — oila ekran vaqti va oila lentasi"
        className="w-full h-auto block"
        sizes="(max-width: 1024px) 90vw, 350px"
        priority
      />
    </PhoneFrame>
  );
}
