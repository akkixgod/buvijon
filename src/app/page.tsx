import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { FlowerScene } from "@/components/FlowerScene";
import { PhoneMockup } from "@/components/PhoneMockup";

const FEATURES = [
  { title: "Gentle limits",   desc: "Daily time budgets that fit your family, not a spreadsheet." },
  { title: "Clear analytics", desc: "See what really pulls attention — without pages of charts." },
  { title: "Quiet alerts",    desc: "One nudge when it matters. Silence when it doesn't." },
  { title: "Every language",  desc: "Uzbek (Latin & Cyrillic), Russian, English. More on the way." },
];

const STEPS = [
  { n: "01", t: "Plant", d: "Add each child. Pick their flower." },
  { n: "02", t: "Grow",  d: "Set healthy budgets. Forget the rest." },
  { n: "03", t: "Bloom", d: "Watch the garden. Celebrate together." },
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
      <div id="scene-start" className="h-[40vh]" aria-hidden />

      {/* Stage 1 — The idea (text RIGHT, flower LEFT) */}
      <section id="story" className="section min-h-screen bg-white">
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
      <section id="features" className="section min-h-screen bg-white">
        <div className="container-1100">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Reveal as="p" className="eyebrow mb-6">Features</Reveal>
              <Reveal delay={0.06}>
                <h2 className="mb-10">Simple. Thoughtful. Quiet.</h2>
              </Reveal>
              <div className="grid gap-6">
                {FEATURES.map((f, i) => (
                  <Reveal key={f.title} delay={i * 0.05}>
                    <div className="card card-hover">
                      <h3 className="mb-2">{f.title}</h3>
                      <p className="text-[17px] leading-[1.5]">{f.desc}</p>
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
      <section id="how" className="section min-h-screen relative bg-white">
        <div className="container-1100 relative z-10">
          <div className="text-center mb-20">
            <Reveal as="p" className="eyebrow mb-6">How it works</Reveal>
            <Reveal delay={0.06}>
              <h2>Three steps. No manual.</h2>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="card-violet p-10 h-full backdrop-blur-sm">
                  <p className="text-[12px] tracking-[0.25em] text-[var(--brand-primary)] font-medium mb-6">{s.n}</p>
                  <h3 className="mb-3">{s.t}</h3>
                  <p className="text-[17px] leading-[1.5]">{s.d}</p>
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
