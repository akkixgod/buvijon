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

        {/* Functions — sequential rows, each with a real app screenshot */}
        <section className="section">
          <div className="container-1100">
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
