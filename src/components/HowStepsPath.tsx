"use client";

import { BrandText } from "@/components/BrandText";
import { useT } from "@/components/I18nProvider";

const STEP_ICONS = [
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 21V11" />
      <path d="M12 11c0-3 2-5 5-5-1 3-3 5-5 5Z" />
      <path d="M12 11c0-3-2-5-5-5 1 3 3 5 5 5Z" />
      <path d="M5 21h14" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 21V8" />
      <path d="M12 8c-2-3-6-3-8-1 1 3 5 4 8 1Z" />
      <path d="M12 12c2-2 6-2 8 0-2 3-6 2-8 0Z" />
      <path d="M5 21h14" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="8" r="3" />
      <path d="M12 11v10" />
      <path d="M12 8c0-3 4-3 4 0M12 8c0-3-4-3-4 0" />
      <path d="M5 21h14" />
    </svg>
  ),
];

export function HowStepsPath() {
  const t = useT();
  const steps = t.how.steps;

  return (
    <div className="steps-path-wrap">
      <div className="steps-path__rail" aria-hidden />
      <ol className="steps-path" aria-label={t.how.title}>
        {steps.map((step, i) => (
          <li
            key={step.n}
            className={`steps-path__item${i === 1 ? " steps-path__item--focus" : ""}`}
          >
            <div className="steps-path__node" aria-hidden>
              <span className="steps-path__badge">{step.n}</span>
              {i < steps.length - 1 && <span className="steps-path__connector" />}
            </div>

            <article className="steps-path__card">
              <div className="steps-path__card-head">
                <span className="steps-path__icon">{STEP_ICONS[i]}</span>
                <span className="steps-path__step-label">{step.n}</span>
              </div>
              <h3 className="steps-path__title">
                <BrandText>{step.t}</BrandText>
              </h3>
              <p className="steps-path__desc">{step.d}</p>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
