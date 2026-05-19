"use client";

import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { FlowerScene } from "@/components/FlowerScene";
import { PhoneMockup } from "@/components/PhoneMockup";
import { ScrollDownCue } from "@/components/ScrollDownCue";
import { BrandText } from "@/components/BrandText";
import { Countdown } from "@/components/Countdown";
import { useT } from "@/components/I18nProvider";

const FEATURE_ICONS = [
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" key="i1">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" key="i2">
      <path d="M4 19V5" /><path d="M4 19h16" /><path d="M8 15v-4" /><path d="M13 15V8" /><path d="M18 15v-2" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" key="i3">
      <path d="M6 19a3 3 0 0 0 6 0" />
      <path d="M18 16H6l1.5-2V10a4.5 4.5 0 1 1 9 0v4Z" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" key="i4">
      <circle cx="12" cy="12" r="9" /><path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" /><path d="M12 3a14 14 0 0 0 0 18" />
    </svg>
  ),
];

const STEP_ICONS = [
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" key="s1">
      <path d="M12 21V11" />
      <path d="M12 11c0-3 2-5 5-5-1 3-3 5-5 5Z" />
      <path d="M12 11c0-3-2-5-5-5 1 3 3 5 5 5Z" />
      <path d="M5 21h14" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" key="s2">
      <path d="M12 21V8" />
      <path d="M12 8c-2-3-6-3-8-1 1 3 5 4 8 1Z" />
      <path d="M12 12c2-2 6-2 8 0-2 3-6 2-8 0Z" />
      <path d="M5 21h14" />
    </svg>
  ),
  // Bloom — simplified to 4 paths so the headline reads stronger.
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" key="s3">
      <circle cx="12" cy="8" r="3" />
      <path d="M12 11v10" />
      <path d="M12 8c0-3 4-3 4 0M12 8c0-3-4-3-4 0" />
      <path d="M5 21h14" />
    </svg>
  ),
];

const WHY_ICONS = [
  (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" key="w1">
      <path d="M7 12s-4-2.5-4-6a2.3 2.3 0 0 1 4-1.5A2.3 2.3 0 0 1 11 6c0 3.5-4 6-4 6Z" />
    </svg>
  ),
  (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" key="w2">
      <path d="M2 7h2l2-5 2 10 2-5h2" />
    </svg>
  ),
  (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" key="w3">
      <rect x="3" y="6" width="8" height="6" rx="1.4" />
      <path d="M5 6V5a2 2 0 0 1 4 0v1" />
    </svg>
  ),
];

export default function Home() {
  const t = useT();

  return (
    <>
      <Nav />

      <FlowerScene
        frameDir="/frames"
        desktopFrames={180}
        mobileFrames={100}
        startSelector="#scene-start"
        endSelector="#scene-end"
      />

      <main>
      {/* Hero */}
      <section className="section-hero pt-[130px]">
        <div className="container-1100">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
            <div>
              <Reveal as="p" className="eyebrow mb-6"><Countdown /></Reveal>
              <Reveal delay={0.05}>
                <h1 className="mb-6">
                  {t.hero.titleLine1}
                  <br />
                  <span className="gradient-text">{t.hero.titleLine2}</span>
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="lead mb-10">{t.hero.lead}</p>
              </Reveal>
              <Reveal delay={0.18} className="flex flex-wrap items-center gap-3">
                <Link href="/waitlist" className="btn-primary">{t.hero.joinWaitlist}</Link>
                <Link href="/family" className="btn-secondary">{t.hero.exploreDashboard}</Link>
                <Link href="/analysis" className="btn-link">{t.hero.viewAnalytics} ›</Link>
              </Reveal>
              <Reveal delay={0.28}>
                <ScrollDownCue />
              </Reveal>
            </div>

            <Reveal delay={0.1} className="relative flex justify-center">
              <div className="float-slow">
                <PhoneMockup />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Scene spacer — marks where the flower animation begins */}
      <div id="scene-start" className="h-[60vh]" aria-hidden />

      {/* Stage 1 — The idea (text RIGHT, flower LEFT). Right column also lists "Why it matters" bullets. */}
      <section id="story" className="section min-h-[80vh]">
        <div className="container-1100">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="hidden lg:block" aria-hidden />
            <div>
              <Reveal as="p" className="eyebrow mb-6">{t.story.eyebrow}</Reveal>
              <Reveal delay={0.06}>
                <h2 className="mb-8">
                  {t.story.title1}
                  <br />
                  {t.story.title2}
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="lead mb-10"><BrandText>{t.story.lead}</BrandText></p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="text-[12px] tracking-[0.22em] uppercase font-medium text-[var(--brand-primary)] mb-4">
                  {t.story.whyTitle}
                </p>
                <ul className="space-y-3">
                  {t.story.whyItems.map((line, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] text-[var(--text-primary)]/85 leading-[1.55]">
                      <span className="mt-0.5 w-6 h-6 rounded-full bg-[var(--violet-50)] text-[var(--brand-primary)] inline-flex items-center justify-center flex-shrink-0">
                        {WHY_ICONS[i]}
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Stage 2 — Features (text LEFT, flower RIGHT) */}
      <section id="features" className="section min-h-screen">
        <div className="container-1100">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Reveal as="p" className="eyebrow mb-6">{t.features.eyebrow}</Reveal>
              <Reveal delay={0.06}>
                <h2 className="mb-10">{t.features.title}</h2>
              </Reveal>
              <div className="grid sm:grid-cols-2 gap-5">
                {t.features.items.map((f, i) => (
                  <Reveal key={f.title} delay={i * 0.06}>
                    <div className="feature-card h-full">
                      <span className="feature-icon">{FEATURE_ICONS[i]}</span>
                      <h3 className="mb-2">{f.title}</h3>
                      <p className="text-[16px] leading-[1.55]">{f.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <div className="hidden lg:block" aria-hidden />
          </div>
        </div>
      </section>

      {/* Stage 3 — How it works (canvas in background, content centered) */}
      <section id="how" className="section min-h-screen relative">
        <div className="container-1100 relative z-10">
          <div className="text-center mb-20">
            <Reveal as="p" className="eyebrow mb-6">{t.how.eyebrow}</Reveal>
            <Reveal delay={0.06}>
              <h2>{t.how.title}</h2>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {t.how.steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="step-card">
                  <span className="step-icon">{STEP_ICONS[i]}</span>
                  <span className="step-number">{s.n}</span>
                  <h3 className="mb-3"><BrandText>{s.t}</BrandText></h3>
                  <p className="step-desc">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Scene end marker — flower fades out here */}
      <div id="scene-end" className="h-[20vh]" aria-hidden />

      {/* Final CTA */}
      <section className="section-tight text-center">
        <div className="container-1100">
          <div className="cta-panel">
                      <Reveal>
            <h2 className="mb-8">
              <BrandText>{t.ctaSection.title1}</BrandText>
              <br />
              <span className="gradient-text">{t.ctaSection.title2}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="lead mx-auto mb-10">{t.ctaSection.lead}</p>
          </Reveal>
          <Reveal delay={0.16} className="flex flex-wrap items-center justify-center gap-5">
            <Link href="/waitlist" className="btn-primary">{t.ctaSection.primary}</Link>
            <Link href="/family" className="btn-link">{t.ctaSection.secondary}</Link>
          </Reveal>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </>
  );
}
