"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationProps {
  frameDir: string;
  desktopFrames: number;
  mobileFrames: number;
  children?: React.ReactNode;
}

/**
 * Canvas-driven scroll animation. Pre-decodes frames via createImageBitmap
 * (off main thread) and pins the section using GSAP — NOT CSS sticky.
 * Container is h-screen; pinSpacing adds the scroll distance.
 */
export function ScrollAnimation({
  frameDir,
  desktopFrames,
  mobileFrames,
  children,
}: ScrollAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [firstFrameReady, setFirstFrameReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const playhead = { frame: 0 };
    let currentFrameIndex = -1;
    let cancelled = false;

    const isMobile = window.innerWidth <= 768;
    const dir = isMobile ? `${frameDir}/mobile` : frameDir;
    const count = isMobile ? mobileFrames : desktopFrames;
    const baseSize = isMobile ? 720 : 1280;

    canvas.width = baseSize;
    canvas.height = baseSize;

    const urls = Array.from(
      { length: count },
      (_, i) => `${dir}/frame-${String(i + 1).padStart(3, "0")}.webp`,
    );

    const bitmaps: (ImageBitmap | null)[] = new Array(count).fill(null);
    let loadedCount = 0;
    let failedCount = 0;
    let triggerInstance: ScrollTrigger | null = null;
    let tween: gsap.core.Tween | null = null;

    const drawBitmap = (bitmap: ImageBitmap) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    };

    const render = () => {
      const newIndex = Math.round(playhead.frame);
      if (newIndex !== currentFrameIndex && bitmaps[newIndex]) {
        currentFrameIndex = newIndex;
        drawBitmap(bitmaps[newIndex]!);
      }
    };

    const initAnimation = () => {
      if (cancelled) return;
      tween = gsap.to(playhead, {
        frame: count - 1,
        ease: "none",
        onUpdate: render,
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=250%",
          scrub: 1.5,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });
      triggerInstance = tween.scrollTrigger ?? null;
    };

    urls.forEach((url, i) => {
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => createImageBitmap(blob))
        .then((bitmap) => {
          if (cancelled) {
            bitmap.close();
            return;
          }
          bitmaps[i] = bitmap;
          loadedCount++;
          if (i === 0) {
            drawBitmap(bitmap);
            setFirstFrameReady(true);
          }
          if (loadedCount + failedCount === count) initAnimation();
        })
        .catch(() => {
          failedCount++;
          if (loadedCount + failedCount === count) initAnimation();
        });
    });

    return () => {
      cancelled = true;
      tween?.kill();
      triggerInstance?.kill();
      bitmaps.forEach((b) => b?.close());
    };
  }, [frameDir, desktopFrames, mobileFrames]);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-white"
    >
      {!firstFrameReady && (
        <img
          src={`${frameDir}/frame-001.webp`}
          alt=""
          aria-hidden
          className="absolute left-1/2 top-1/2 max-w-full max-h-full pointer-events-none"
          style={{ transform: "translate(-50%, -50%)" }}
          // @ts-expect-error fetchpriority is valid HTML
          fetchpriority="high"
        />
      )}
      <canvas
        ref={canvasRef}
        className="absolute left-1/2 top-1/2"
        style={{
          transform: "translate(-50%, -50%)",
          maxWidth: "100%",
          maxHeight: "100%",
          width: "auto",
          height: "auto",
          opacity: firstFrameReady ? 1 : 0,
          filter: "brightness(1.04)",
          mixBlendMode: "multiply",
          transition: "opacity 0.3s ease",
        }}
      />
      {children}
    </div>
  );
}
