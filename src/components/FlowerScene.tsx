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

      // Frame playback covers the entire scroll story (one shared scrub).
      const playback = gsap.to(playhead, {
        frame: count - 1,
        ease: "none",
        onUpdate: render,
        scrollTrigger: {
          trigger: startSelector,
          endTrigger: endSelector,
          start: "top top",
          end: "top bottom",
          scrub: 0.25,
        },
      });
      tweens.push(playback);
      if (playback.scrollTrigger) triggers.push(playback.scrollTrigger);

      const stage1Vars = isMobile
        ? { x: 0, y: 0, scale: 0.5, opacity: 0.22 }
        : { x: "-26vw", y: 0, scale: 0.7, opacity: 1 };
      const stage2Vars = isMobile
        ? { x: 0, y: 0, scale: 0.5, opacity: 0.22 }
        : { x: "26vw", y: 0, scale: 0.7, opacity: 1 };
      const stage3Vars = { x: 0, y: 0, scale: 1.35, opacity: 1 };

      // Initial state — hidden, slightly under-scaled, centered.
      gsap.set(wrapper, { x: 0, y: 0, scale: 0.6, opacity: 0 });

      // Each stage is its OWN ScrollTrigger so the flower SETTLES at its target
      // when its section is in view, then HOLDS while the user reads. Movement
      // happens only between sections. A single scrubbed timeline interpolated
      // continuously across all sections — leaving the flower mid-flight every
      // time a section was in view (which read as "late").

      // Stage 1: fade in + glide LEFT.
      // Tied to #story (not #scene-start) so fade-in only begins after hero,
      // even on short laptop viewports where #scene-start sits near viewport
      // bottom at scroll=0.
      const t1 = gsap.to(wrapper, {
        ...stage1Vars,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#story",
          start: "top bottom",
          end: "top 60%",
          scrub: 0.4,
        },
      });
      tweens.push(t1);
      if (t1.scrollTrigger) triggers.push(t1.scrollTrigger);

      // Stages 2–4 use fromTo with explicit `from = previous stage's vars` so
      // scrub interpolates from the wrapper's actual settled position rather
      // than the captured initial state (which would cause a jump back to
      // center on entry). immediateRender:false prevents GSAP from snapping
      // the wrapper to `from` at creation time.

      // Stage 2: LEFT → RIGHT during #story → #features handoff.
      const t2 = gsap.fromTo(wrapper, stage1Vars, {
        ...stage2Vars,
        ease: "power2.inOut",
        immediateRender: false,
        scrollTrigger: {
          trigger: "#features",
          start: "top 90%",
          end: "top 40%",
          scrub: 0.4,
        },
      });
      tweens.push(t2);
      if (t2.scrollTrigger) triggers.push(t2.scrollTrigger);

      // Stage 3: RIGHT → CENTER BACKGROUND during #features → #how handoff.
      const t3 = gsap.fromTo(wrapper, stage2Vars, {
        ...stage3Vars,
        ease: "power2.inOut",
        immediateRender: false,
        scrollTrigger: {
          trigger: "#how",
          start: "top 90%",
          end: "top 40%",
          scrub: 0.4,
        },
      });
      tweens.push(t3);
      if (t3.scrollTrigger) triggers.push(t3.scrollTrigger);

      // Stage 4: slow opacity-only fade as scene-end approaches.
      // start moved to "top 60%" so it doesn't overlap with Stage 3's range.
      const t4 = gsap.fromTo(wrapper, stage3Vars, {
        opacity: 0,
        ease: "power2.in",
        immediateRender: false,
        scrollTrigger: {
          trigger: endSelector,
          start: "top 60%",
          end: "top top",
          scrub: 1,
        },
      });
      tweens.push(t4);
      if (t4.scrollTrigger) triggers.push(t4.scrollTrigger);

      // Bloom halo — kept at opacity 1; visibility comes for free from the
      // wrapper's stage opacity (child opacity multiplies with parent).
      // So the halo fades in/out exactly with the flower at every stage,
      // not just at bloom.

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
      {/* Bloom halo — sits behind the canvas, opacity driven by GSAP.
          mixBlendMode:multiply keeps it visible on white but neutral over
          white cards above (multiply with white = identity). */}
      <div
        aria-hidden
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "min(85vmin, 720px)",
          height: "min(85vmin, 720px)",
          background:
            "radial-gradient(circle, rgba(233,30,99,0.55) 0%, rgba(244,114,182,0.32) 35%, rgba(248,187,208,0.12) 60%, transparent 75%)",
          filter: "blur(28px)",
          mixBlendMode: "multiply",
        }}
      />
      {!firstFrameReady && (
        <img
          src={`${frameDir}/frame-001.webp`}
          alt=""
          className="absolute max-w-[70vmin] max-h-[70vmin]"
          fetchPriority="high"
        />
      )}
      <canvas
        ref={canvasRef}
        className="max-w-[70vmin] max-h-[70vmin]"
        style={{
          width: "auto",
          height: "auto",
          opacity: firstFrameReady ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
    </div>
  );
}
