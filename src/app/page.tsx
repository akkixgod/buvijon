"use client";

import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { FlowerScene } from "@/components/FlowerScene";
import { BrandText } from "@/components/BrandText";
import { ScrollOnLoad } from "@/components/ScrollOnLoad";
import { ProblemDialogue } from "@/components/ProblemDialogue";
import { useT } from "@/components/I18nProvider";
import { HowStepsPath } from "@/components/HowStepsPath";

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

export default function Home() {
  const t = useT();

  return (
    <>
      <ScrollOnLoad />
      <Nav />

      <FlowerScene
        frameDir="/frames"
        desktopFrames={180}
        mobileFrames={100}
        startSelector="#scene-start"
        endSelector="#scene-end"
      />

      <main>
      {/* Problem — generational dialogue timeline with the app screenshot */}
      <ProblemDialogue />

      {/* Scene spacer — shorter on mobile so the flower animation starts sooner
          relative to the much smaller hero column on phones. */}
      <div id="scene-start" className="h-[30vh] md:h-[60vh]" aria-hidden />

      {/* How it works — the flower blooms in behind this section (canvas in the
          background, content centered). The former idea/features screens were
          removed, so this now follows the dialogue directly and the flower
          choreography is compressed into the shorter scroll (see FlowerScene). */}
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
