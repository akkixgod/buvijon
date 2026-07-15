"use client";

import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { BrandText } from "@/components/BrandText";
import { FeatureShowcase } from "@/components/product/FeatureShowcase";
import { useT } from "@/components/I18nProvider";

export default function FeaturesPage() {
  const t = useT();
  const f = t.featuresPage;

  return (
    <>
      <Nav />

      <main>
        {/* Functions — compact header, then sequential rows with real screenshots */}
        <section className="section-hero">
          <div className="container-1100">
            <div className="max-w-[600px] mb-14 sm:mb-20">
              <Reveal as="p" className="eyebrow mb-2">{f.eyebrow}</Reveal>
              <Reveal delay={0.05}>
                {/* Size set inline so it beats the unlayered global `h1` rule. */}
                <h1
                  className="font-semibold text-[var(--text-primary)]"
                  style={{ fontSize: "clamp(1.15rem, 1.9vw, 1.6rem)", lineHeight: 1.3, letterSpacing: "-0.01em" }}
                >
                  {f.title1}{" "}
                  <span className="gradient-text">{f.titleHighlight}</span>
                  {f.titleEnd}
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-[14px] sm:text-[15px] leading-[1.6] text-[var(--text-secondary)] mt-3">
                  <BrandText>{f.lead}</BrandText>
                </p>
              </Reveal>
            </div>

            <FeatureShowcase />
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
              <Reveal
                delay={0.12}
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
