import React, { useRef } from "react";
import { GraduationCap, Briefcase, Trophy, Rocket } from "lucide-react";
import { personalInfo, highlights, metrics } from "../data/mock";
import TitleBlock from "./TitleBlock";
import { useCountUp, useReveal, useStaggerReveal } from "../lib/motion";

const iconMap = { GraduationCap, Briefcase, Trophy, Rocket };

/* A metric "dimensioned" like a measurement on a drawing: end ticks, a value,
   and a caption. The value counts up and the dimension line draws in. */
function Dimension({ m }) {
  const [val, ref] = useCountUp(m.value);
  return (
    <div ref={ref} className="relative py-7">
      {/* dimension line */}
      <div className="mb-5 flex items-center gap-2 text-ink/40" aria-hidden>
        <span className="h-3 w-px bg-current" />
        <span className="h-px flex-1 bg-current" />
        <span className="h-3 w-px bg-current" />
      </div>
      <div className="flex items-baseline gap-0.5 font-expanded text-[clamp(2.3rem,4.6vw,3.5rem)] font-bold leading-none tracking-tight text-ink">
        {m.prefix && <span className="text-accent">{m.prefix}</span>}
        <span>{val.toLocaleString()}</span>
        {m.suffix && <span className="text-accent">{m.suffix}</span>}
      </div>
      <p className="mt-3 font-display text-base font-medium text-ink">{m.label}</p>
      <p className="label-mono mt-1">{m.note}</p>
    </div>
  );
}

const About = () => {
  const bioRef = useReveal();
  const gridRef = useStaggerReveal({ step: 90 });
  const highlightsRef = useRef(null);

  return (
    <section id="about" className="relative py-[clamp(5rem,12vh,9rem)]">
      <div className="mx-auto max-w-content px-6">
        <TitleBlock index="01 — PROFILE" sub="WHO / WHAT / SCALE" title="The engineer on the drawing" />

        <div className="mt-14 grid gap-x-16 gap-y-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div ref={bioRef} className="reveal-prep">
            <p className="max-w-prose font-display text-[clamp(1.35rem,2.4vw,1.7rem)] font-medium leading-[1.35] text-ink">
              I'm an AI engineer building agentic systems — currently at{" "}
              <span className="text-accent">Plum Benefits</span>, architecting a
              multi-agentic support platform on LangGraph. CSE graduate of IIIT Nagpur.
            </p>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-soft">
              Across Plum Benefits, Es Magico AI and AIVC Talent I've shipped autonomous
              agent frameworks, browser automation reaching{" "}
              <strong className="font-semibold text-ink">90% workflow reuse</strong>, and
              real-time voice agents answering in{" "}
              <strong className="font-semibold text-ink">under 600&nbsp;milliseconds</strong>.
              I care about the unglamorous parts — latency, recovery, retrieval quality,
              autonomous decision-making — because that's where AI either works or doesn't.
            </p>

            {/* highlights as drawing annotations */}
            <ul ref={highlightsRef} className="mt-9 space-y-0 border-t border-rule-strong">
              {highlights.map((h, i) => {
                const Icon = iconMap[h.icon];
                return (
                  <li
                    key={i}
                    className="flex items-center gap-4 border-b border-rule py-3.5"
                  >
                    <span className="label-mono w-7 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <Icon size={18} strokeWidth={1.6} className="shrink-0 text-accent" />
                    <span className="text-[0.98rem] text-ink-soft">{h.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* metrics, dimensioned */}
          <div
            ref={gridRef}
            className="grid grid-cols-2 gap-x-10 self-start border-t border-rule-strong sm:gap-x-14 lg:border-t-0 lg:border-l lg:border-rule-strong lg:pl-12"
          >
            {metrics.map((m) => (
              <div data-stagger key={m.label} className="reveal-prep">
                <Dimension m={m} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
