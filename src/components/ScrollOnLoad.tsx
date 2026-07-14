"use client";

import { useEffect } from "react";
import { takePendingScroll } from "@/lib/pendingScroll";

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * On mount, if a cross-page nav click left a pending scroll target, smooth-scroll
 * to it (via Lenis when available). Retries briefly so it works even before the
 * smooth-scroll provider and the target section have finished mounting.
 */
export function ScrollOnLoad() {
  useEffect(() => {
    const hash = takePendingScroll();
    if (!hash) return;

    let done = false;
    const start = Date.now();

    const tick = () => {
      if (done) return;
      const el = document.querySelector(hash) as HTMLElement | null;
      if (el) {
        const lenis = window.__lenis;
        if (lenis) {
          lenis.scrollTo(el, { duration: 1.1, easing: easeOutCubic });
        } else {
          el.scrollIntoView({ behavior: "smooth" });
        }
        done = true;
        return;
      }
      // Section not in the DOM yet — keep trying for up to ~2.5s.
      if (Date.now() - start < 2500) window.setTimeout(tick, 60);
    };

    const id = window.setTimeout(tick, 80);
    return () => {
      done = true;
      window.clearTimeout(id);
    };
  }, []);

  return null;
}
