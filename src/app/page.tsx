import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { FlowerScene } from "@/components/FlowerScene";
import { PhoneMockup } from "@/components/PhoneMockup";

const FEATURES = [
  {
    title: "Gentle limits",
    desc: "Daily time budgets that fit your family, not a spreadsheet.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: "Clear analytics",
    desc: "See what really pulls attention — without pages of charts.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="M8 15v-4" />
        <path d="M13 15V8" />
        <path d="M18 15v-2" />
      </svg>
    ),
  },
  {
    title: "Quiet alerts",
    desc: "One nudge when it matters. Silence when it doesn't.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 19a3 3 0 0 0 6 0" />
        <path d="M18 16H6l1.5-2V10a4.5 4.5 0 1 1 9 0v4Z" />
      </svg>
    ),
  },
  {
    title: "Every language",
    desc: "Uzbek (Latin & Cyrillic), Russian, English. More on the way.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a14 14 0 0 1 0 18" />
        <path d="M12 3a14 14 0 0 0 0 18" />
      </svg>
    ),
  },
];

const STEPS = [
  {
    n: "01",
    t: "Plant",
    d: "Add each child. Pick their flower.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21V11" />
        <path d="M12 11c0-3 2-5 5-5-1 3-3 5-5 5Z" />
        <path d="M12 11c0-3-2-5-5-5 1 3 3 5 5 5Z" />
        <path d="M5 21h14" />
      </svg>
    ),
  },
  {
    n: "02",
    t: "Grow",
    d: "Set healthy budgets. Forget the rest.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21V8" />
        <path d="M12 8c-2-3-6-3-8-1 1 3 5 4 8 1Z" />
        <path d="M12 12c2-2 6-2 8 0-2 3-6 2-8 0Z" />
        <path d="M5 21h14" />
      </svg>
    ),
  },
  {
    n: "03",
    t: "Bloom",
    d: "Watch the garden. Celebrate together.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="2.5" />
        <path d="M12 5.5c.5-2 2-3 3.5-2.5-.3 1.8-1.6 2.8-3.5 2.5Z" />
        <path d="M12 5.5c-.5-2-2-3-3.5-2.5.3 1.8 1.6 2.8 3.5 2.5Z" />
        <path d="M14.5 8c2-.5 3.5.5 4 2-1.7.7-3.3 0-4-2Z" />
        <path d="M9.5 8c-2-.5-3.5.5-4 2 1.7.7 3.3 0 4-2Z" />
        <path d="M12 10.5V21" />
        <path d="M5 21h14" />
      </svg>
    ),
  },
];

export default function Home() {
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

      {/* Hero */}
      <section className="section-hero pt-[120px]">
        <div className="container-1100">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
            <div>
              <Reveal as="p" className="eyebrow mb-6">Buvijon · Launching May 15</Reveal>
              <Reveal delay={0.05}>
                <h1 className="mb-6">
                  Screen time.
                  <br />
                  <span className="gradient-text">Reimagined.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="lead mb-10">
                  A garden where your child&apos;s digital balance blooms. Quiet limits, gentle insights, and a flower that grows when your family&apos;s habits do.
                </p>
              </Reveal>
              <Reveal delay={0.18} className="flex flex-wrap items-center gap-5">
                <Link href="/waitlist" className="btn-primary">Join the waitlist</Link>
                <a href="#story" className="btn-link">Learn more ›</a>
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

      {/* Stage 1 — The idea (text RIGHT, flower LEFT) */}
      <section id="story" className="section min-h-screen">
        <div className="container-1100">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="hidden lg:block" aria-hidden />
            <div>
              <Reveal as="p" className="eyebrow mb-6">The idea</Reveal>
              <Reveal delay={0.06}>
                <h2 className="mb-8">
                  Not another
                  <br />
                  parental control app.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="lead">
                  Buvijon replaces blocklists and punishments with something gentler — a flower that grows when your family&apos;s habits do. No noise. No shame. Just a quiet, daily nudge toward balance.
                </p>
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
              <Reveal as="p" className="eyebrow mb-6">Features</Reveal>
              <Reveal delay={0.06}>
                <h2 className="mb-10">Simple. Thoughtful. Quiet.</h2>
              </Reveal>
              <div className="grid sm:grid-cols-2 gap-5">
                {FEATURES.map((f, i) => (
                  <Reveal key={f.title} delay={i * 0.06}>
                    <div className="feature-card h-full">
                      <span className="feature-icon">{f.icon}</span>
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
            <Reveal as="p" className="eyebrow mb-6">How it works</Reveal>
            <Reveal delay={0.06}>
              <h2>Three steps. No manual.</h2>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="step-card">
                  <span className="step-icon">{s.icon}</span>
                  <span className="step-number">{s.n}</span>
                  <h3 className="mb-3">{s.t}</h3>
                  <p className="text-[16px] leading-[1.55]">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Scene end marker — flower fades out here */}
      <div id="scene-end" className="h-[20vh]" aria-hidden />

      {/* Final CTA */}
      <section className="section text-center">
        <div className="container-1100">
          <Reveal>
            <h2 className="mb-8">
              Let&apos;s grow
              <br />
              <span className="gradient-text">together.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="lead mx-auto mb-10">
              Launching May 15. Get in early — be one of the first families in the garden.
            </p>
          </Reveal>
          <Reveal delay={0.16} className="flex flex-wrap items-center justify-center gap-5">
            <Link href="/waitlist" className="btn-primary">Join the waitlist</Link>
            <Link href="/family" className="btn-link">Explore the dashboard ›</Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
