import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ScrollAnimation } from "@/components/ScrollAnimation";
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

const CALLOUTS = [
  { side: "left",  top: "22%", label: "Bloom",  sub: "Healthy daily balance" },
  { side: "right", top: "38%", label: "Grow",   sub: "Habits that last" },
  { side: "left",  top: "58%", label: "Care",   sub: "Quiet, kind nudges" },
  { side: "right", top: "74%", label: "Bond",   sub: "Family-shared garden" },
];

export default function Home() {
  return (
    <>
      <Nav />

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

      {/* Scroll animation — pinned canvas with the flower video frames */}
      <section id="garden" className="bg-white">
        <ScrollAnimation
          frameDir="/frames"
          desktopFrames={121}
          mobileFrames={81}
        >
          {/* Edge callouts — sit in the white margin, never on the product */}
          <div className="absolute inset-0 pointer-events-none hidden md:block">
            {CALLOUTS.map((c) => (
              <div
                key={c.label}
                className={`absolute flex items-center gap-3 ${
                  c.side === "left" ? "left-[5%]" : "right-[5%] flex-row-reverse"
                }`}
                style={{ top: c.top }}
              >
                <div className={c.side === "left" ? "text-right" : "text-left"}>
                  <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--brand-primary)]">
                    {c.label}
                  </p>
                  <p className="text-[13px] text-[var(--text-muted)]">{c.sub}</p>
                </div>
                <div className="w-[110px] border-t border-dashed border-[var(--violet-300)]" />
              </div>
            ))}
          </div>

          {/* Floating caption */}
          <div className="absolute bottom-10 inset-x-0 text-center pointer-events-none">
            <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--text-muted)]">
              Every petal is a promise
            </p>
          </div>
        </ScrollAnimation>
      </section>

      {/* The idea */}
      <section id="story" className="section">
        <div className="container-1100 max-w-[820px] text-center mx-auto">
          <Reveal as="p" className="eyebrow mb-6">The idea</Reveal>
          <Reveal delay={0.06}>
            <h2 className="mb-8">
              Not another
              <br />
              parental control app.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lead mx-auto">
              Buvijon replaces blocklists and punishments with something gentler — a flower that grows when your family&apos;s habits do. No noise. No shame. Just a quiet, daily nudge toward balance.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section bg-[var(--bg-section)]">
        <div className="container-1100">
          <div className="text-center mb-20">
            <Reveal as="p" className="eyebrow mb-6">Features</Reveal>
            <Reveal delay={0.06}>
              <h2>Simple. Thoughtful. Quiet.</h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05}>
                <div className="card card-hover h-full">
                  <h3 className="mb-3">{f.title}</h3>
                  <p className="text-[17px] leading-[1.5]">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="section">
        <div className="container-1100">
          <div className="text-center mb-20">
            <Reveal as="p" className="eyebrow mb-6">How it works</Reveal>
            <Reveal delay={0.06}>
              <h2>Three steps. No manual.</h2>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="card-violet p-10 h-full">
                  <p className="text-[12px] tracking-[0.25em] text-[var(--brand-primary)] font-medium mb-6">{s.n}</p>
                  <h3 className="mb-3">{s.t}</h3>
                  <p className="text-[17px] leading-[1.5]">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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
