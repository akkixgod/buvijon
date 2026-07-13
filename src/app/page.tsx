"use client";

import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { FlowerScene } from "@/components/FlowerScene";
import { PhoneMockup } from "@/components/PhoneMockup";
import { ScrollDownCue } from "@/components/ScrollDownCue";
import { BrandText } from "@/components/BrandText";
import { useT } from "@/components/I18nProvider";
import { HowStepsPath } from "@/components/HowStepsPath";

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

const TRUST_ICONS = [
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" key="t1">
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" key="t2">
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <path d="M12 14v2" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" key="t3">
      <path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Z" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M4 4l16 16" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" key="t4">
      <path d="M4 11l8-6 8 6" />
      <path d="M6 10v9h12v-9" />
      <path d="M12 19v-4a2 2 0 0 1 4 0v4" />
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
      {/* Hero — section-hero supplies fluid top/bottom padding (clamp tokens) */}
      <section className="section-hero">
        <div className="container-1100">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 sm:gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <Reveal as="p" className="eyebrow mb-5 sm:mb-6">{t.hero.eyebrow}</Reveal>
              <Reveal delay={0.05}>
                <h1 className="mb-5 sm:mb-6">
                  {t.hero.titleLine1}
                  <br />
                  <span className="gradient-text">{t.hero.titleLine2}</span>
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="lead mb-8 sm:mb-10">{t.hero.lead}</p>
              </Reveal>
              <Reveal
                delay={0.18}
                className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3"
              >
                <Link href="/waitlist" className="btn-primary btn-block-mobile">{t.hero.joinWaitlist}</Link>
                <Link href="/family" className="btn-secondary btn-block-mobile">{t.hero.exploreDashboard}</Link>
                <Link href="/analysis" className="btn-link justify-center sm:justify-start">
                  {t.hero.viewAnalytics} ›
                </Link>
              </Reveal>
              <Reveal delay={0.28} className="hidden md:block">
                <ScrollDownCue />
              </Reveal>
            </div>

            <Reveal delay={0.1} className="order-1 lg:order-2 relative w-full flex justify-center">
              <div className="float-slow w-full max-w-[300px] sm:max-w-[340px] md:max-w-[380px]">
                <PhoneMockup />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Scene spacer — shorter on mobile so the flower animation starts sooner
          relative to the much smaller hero column on phones. */}
      <div id="scene-start" className="h-[30vh] md:h-[60vh]" aria-hidden />

      {/* Stage 1 — The idea (text RIGHT, flower LEFT). Right column also lists "Why it matters" bullets.
          min-height only on lg+: on mobile the flower animation is dimmed
          (see FlowerScene stageVars opacity: 0.22) so the section doesn't
          need to be a full viewport tall — that just creates empty space. */}
      <section id="story" className="section lg:min-h-[80vh]">
        <div className="container-1100">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
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
      <section id="features" className="section lg:min-h-screen">
        <div className="container-1100">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div>
              <Reveal as="p" className="eyebrow mb-5 sm:mb-6">{t.features.eyebrow}</Reveal>
              <Reveal delay={0.06}>
                <h2 className="mb-8 sm:mb-10">{t.features.title}</h2>
              </Reveal>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
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
      <section id="how" className="section lg:min-h-screen relative">
        <div className="container-1100 relative z-10">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <Reveal as="p" className="eyebrow mb-5 sm:mb-6">{t.how.eyebrow}</Reveal>
            <Reveal delay={0.06}>
              <h2>{t.how.title}</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <HowStepsPath />
          </Reveal>
        </div>
      </section>

      {/* Scene end marker — flower fades out here */}
      <div id="scene-end" className="h-[20vh]" aria-hidden />

      {/* Trust & privacy — reassurance right before the closing CTA */}
      <section id="trust" className="section">
        <div className="container-1100">
          <div className="text-center max-w-[720px] mx-auto mb-12 sm:mb-16">
            <Reveal as="p" className="eyebrow mb-5 sm:mb-6">{t.trust.eyebrow}</Reveal>
            <Reveal delay={0.06}>
              <h2 className="mb-6"><BrandText>{t.trust.title}</BrandText></h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="lead mx-auto"><BrandText>{t.trust.lead}</BrandText></p>
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {t.trust.items.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.06}>
                <div className="feature-card h-full">
                  <span className="feature-icon">{TRUST_ICONS[i]}</span>
                  <h3 className="mb-2">{f.title}</h3>
                  <p className="text-[15px] leading-[1.55]">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-tight text-center">
        <div className="container-1100">
          <div className="cta-panel">
          <Reveal>
            <h2 className="mb-6 sm:mb-8">
              <BrandText>{t.ctaSection.title1}</BrandText>
              <br />
              <span className="gradient-text">{t.ctaSection.title2}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="lead mx-auto mb-8 sm:mb-10">{t.ctaSection.lead}</p>
          </Reveal>
          <Reveal
            delay={0.16}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-5"
          >
            <Link href="/waitlist" className="btn-primary btn-block-mobile">{t.ctaSection.primary}</Link>
            <Link href="/family" className="btn-link justify-center sm:justify-start">{t.ctaSection.secondary}</Link>
          </Reveal>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </>
  );
}
