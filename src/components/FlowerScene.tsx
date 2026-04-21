"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// DO NOT wrap this component's output in any parent with transform, filter,
// perspective, backdrop-filter, or contain (paint/layout/strict/content).
// Those create a containing block for position:fixed descendants, which
// breaks the fixed canvas positioning across scroll stages.

interface Props {
  frameDir: string;
  desktopFrames: number;
  mobileFrames: number;
  startSelector: string;
  endSelector: string;
}

export function FlowerScene({
  frameDir,
  desktopFrames,
  mobileFrames,
  startSelector,
  endSelector,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [firstFrameReady, setFirstFrameReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth <= 768;
    const dir = isMobile ? `${frameDir}/mobile` : frameDir;
    const count = isMobile ? mobileFrames : desktopFrames;
    const baseSize = isMobile ? 720 : 1280;

    canvas.width = baseSize;
    canvas.height = baseSize;

    const playhead = { frame: 0 };
    let currentFrameIndex = -1;
    let cancelled = false;
    const triggers: ScrollTrigger[] = [];
    const tweens: gsap.core.Tween[] = [];
    const timelines: gsap.core.Timeline[] = [];

    const urls = Array.from(
      { length: count },
      (_, i) => `${dir}/frame-${String(i + 1).padStart(3, "0")}.webp`,
    );
    const bitmaps: (ImageBitmap | null)[] = new Array(count).fill(null);
    let loadedCount = 0;
    let failedCount = 0;

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

      // 1. Frame playback — scrub across whole scene (scene-start → scene-end).
      //    Independent of the position timeline so scrub rates can differ.
      const playback = gsap.to(playhead, {
        frame: count - 1,
        ease: "none",
        onUpdate: render,
        scrollTrigger: {
          trigger: startSelector,
          endTrigger: endSelector,
          start: "top top",
          end: "top bottom",
          scrub: 2,
        },
      });
      tweens.push(playback);
      if (playback.scrollTrigger) triggers.push(playback.scrollTrigger);

      // 2. Position timeline — single ScrollTrigger, sequential keyframes.
      //    Positions in the timeline are absolute seconds; scrub maps whole
      //    scene progress onto the total duration.
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: startSelector,
          endTrigger: endSelector,
          start: "top top",
          end: "top bottom",
          scrub: 1.5,
        },
      });

      const stage1Vars = isMobile
        ? { x: 0, y: 0, scale: 0.5, opacity: 0.22 }
        : { x: "-22vw", y: 0, scale: 0.7, opacity: 1 };
      const stage2Vars = isMobile
        ? { x: 0, y: 0, scale: 0.5, opacity: 0.22 }
        : { x: "22vw", y: 0, scale: 0.7, opacity: 1 };
      const stage3Vars = { x: 0, y: 0, scale: 1.35, opacity: 0.14 };
      const stage4Vars = { x: 0, y: "30vh", scale: 0.4, opacity: 0 };

      // Timeline segments (durations are relative — GSAP scales them to scrub).
      // Approximate mapping to scene scroll progress:
      //   0.00 - 0.08 : fade in
      //   0.08 - 0.30 : stage 1 (LEFT)
      //   0.30 - 0.55 : stage 2 (RIGHT)
      //   0.55 - 0.80 : stage 3 (BG CENTER)
      //   0.80 - 1.00 : stage 4 (fade out)
      tl
        .to(wrapper, { opacity: 1, duration: 0.08 }, 0)
        .to(wrapper, stage1Vars, 0.08)
        .to(wrapper, stage2Vars, 0.30)
        .to(wrapper, stage3Vars, 0.55)
        .to(wrapper, stage4Vars, 0.80);

      timelines.push(tl);
      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);

      ScrollTrigger.refresh();
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
      tweens.forEach((t) => t.kill());
      timelines.forEach((t) => t.kill());
      triggers.forEach((t) => t.kill());
      bitmaps.forEach((b) => b?.close());
    };
  }, [frameDir, desktopFrames, mobileFrames, startSelector, endSelector]);

  return (
    <div
      ref={wrapperRef}
      aria-hidden
      className="fixed inset-0 pointer-events-none flex items-center justify-center"
      style={{ opacity: 0, zIndex: 0 }}
    >
      {!firstFrameReady && (
        <img
          src={`${frameDir}/frame-001.webp`}
          alt=""
          className="absolute max-w-[70vmin] max-h-[70vmin]"
          // @ts-expect-error fetchpriority is valid HTML
          fetchpriority="high"
        />
      )}
      <canvas
        ref={canvasRef}
        className="max-w-[70vmin] max-h-[70vmin]"
        style={{
          width: "auto",
          height: "auto",
          filter: "brightness(1.04)",
          mixBlendMode: "multiply",
          opacity: firstFrameReady ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
    </div>
  );
}
