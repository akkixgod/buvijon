"use client";

import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { BrandText } from "@/components/BrandText";
import { AnalysisDemo } from "@/components/product/AnalysisDemo";
import { useT } from "@/components/I18nProvider";

// One icon per function, in dictionary order:
// Family tree · Screen-time analysis · In-app connection · Buvijon AI
const ITEM_ICONS = [
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" key="f1">
      <circle cx="12" cy="5" r="2.4" />
      <circle cx="6" cy="18" r="2.4" />
      <circle cx="18" cy="18" r="2.4" />
      <path d="M12 7.4v3.6M12 11H6v4.6M12 11h6v4.6" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" key="f2">
      <path d="M4 20V5" /><path d="M4 20h16" />
      <path d="M8 16v-3" /><path d="M12 16v-7" /><path d="M16 16v-5" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" key="f3">
      <path d="M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 3.5V6a1 1 0 0 1 1-1Z" />
      <path d="M9 10h6M9 12.5h3" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" key="f4">
      <path d="M12 3l1.6 3.9L17.5 8.5 13.6 10 12 14l-1.6-4L6.5 8.5l3.9-1.6L12 3Z" />
      <path d="M18 14l.8 2 .2.8 2 .2-2 .8-.2 2-.8-2-2-.2 2-.2.8-2Z" />
    </svg>
  ),
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="mt-0.5 flex-shrink-0">
      <path d="M4 10.5l3.5 3.5L16 6" />
    </svg>
  );
}

export default function FeaturesPage() {
  const t = useT();
  const f = t.featuresPage;

  return (
    <>
      <Nav />

      <main>
        {/* Hero */}
        <section className="section-hero pb-0">
          <div className="container-1100">
            <div className="max-w-[760px]">
              <Reveal as="p" className="eyebrow mb-4 sm:mb-5">{f.eyebrow}</Reveal>
              <Reveal delay={0.05}>
                <h1 className="mb-5 sm:mb-6">
                  {f.title1}{" "}
                  <span className="gradient-text">{f.titleHighlight}</span>
                  {f.titleEnd}
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="lead"><BrandText>{f.lead}</BrandText></p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Four functions */}
        <section className="section">
          <div className="container-1100">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
              {f.items.map((item, i) => (
                <Reveal key={item.title} delay={(i % 2) * 0.06}>
                  <div className="feature-card h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="feature-icon" style={{ marginBottom: 0 }}>
                        {ITEM_ICONS[i]}
                      </span>
                      <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[var(--brand-primary)]">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="mb-3">{item.title}</h3>
                    <p className="text-[15px] leading-[1.6] mb-6">
                      <BrandText>{item.desc}</BrandText>
                    </p>
                    <ul className="mt-auto space-y-2.5 pt-5 border-t border-[var(--border-subtle)]">
                      {item.points.map((p) => (
                        <li
                          key={p}
                          className="flex items-start gap-2.5 text-[14px] leading-[1.5] text-[var(--text-primary)]/85"
                        >
                          <span className="text-[var(--brand-primary)]"><CheckIcon /></span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Embedded live analysis demo */}
        <section className="section-tight pt-0">
          <div className="container-1100">
            <Reveal className="mb-8 sm:mb-10 max-w-[640px]">
              <p className="eyebrow mb-3">{f.demoEyebrow}</p>
              <h2 className="mb-3">{f.demoTitle}</h2>
              <p className="text-[14px] leading-[1.55] text-[var(--text-muted)]">{f.demoNote}</p>
            </Reveal>
            <Reveal delay={0.06}>
              <AnalysisDemo />
            </Reveal>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="section-tight text-center">
          <div className="container-1100">
            <div className="cta-panel">
              <Reveal>
                <h2 className="mb-6 sm:mb-8">
                  <BrandText>{t.ctaSection.title1}</BrandText>{" "}
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
                <Link href="/waitlist" className="btn-primary btn-block-mobile">
                  {t.ctaSection.primary}
                </Link>
                <Link href="/#how" className="btn-link justify-center sm:justify-start">
                  {t.nav.how} ›
                </Link>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
