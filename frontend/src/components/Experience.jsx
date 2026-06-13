import React, { useEffect, useRef } from "react";
import { experiences } from "../data/mock";
import TitleBlock from "./TitleBlock";
import { useReveal, gsap, prefersReducedMotion } from "../lib/motion";

function ExperienceSheet({ exp, index, total }) {
  const ref = useReveal();
  return (
    <article ref={ref} className="reveal-prep relative grid gap-x-12 md:grid-cols-[200px_1fr]">
      {/* left rail: timeline + meta */}
      <div className="relative pb-14 md:pb-20">
        <div className="flex items-baseline gap-3">
          <span className="label-mono text-accent">{String(index + 1).padStart(2, "0")}</span>
          <span className="label-mono">/{String(total).padStart(2, "0")}</span>
        </div>
        <p className="mt-4 font-display text-lg font-semibold leading-tight text-ink">
          {exp.duration}
        </p>
        <p className="mt-1 text-sm text-ink-soft">{exp.location}</p>

        {/* drawn connector node */}
        <span className="absolute -right-[6.5px] top-1.5 hidden h-3 w-3 rounded-full border border-ink bg-paper md:block" />
        <span className="absolute right-0 top-2.5 hidden h-full w-px translate-x-[0.5px] bg-rule-strong md:block" />
      </div>

      {/* right: the work */}
      <div className="border-t border-rule-strong pb-14 pt-1 md:border-t-0 md:pt-0">
        <h3 className="font-display text-h3 font-semibold text-ink">{exp.role}</h3>
        <p className="mt-1 text-lg text-accent">{exp.company}</p>

        <ul className="mt-6 space-y-4">
          {exp.achievements.map((a, i) => (
            <li key={i} className="grid grid-cols-[auto_1fr] gap-4">
              <span className="label-mono mt-1.5 text-ink/40">{String(i + 1).padStart(2, "0")}</span>
              <span className="max-w-prose text-[0.98rem] leading-relaxed text-ink-soft">{a}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap gap-2">
          {exp.techStack.map((t) => (
            <span
              key={t}
              className="border border-rule-strong px-3 py-1.5 font-mono text-[0.74rem] text-ink-soft"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

const Experience = () => {
  const railRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const wrap = railRef.current;
    const line = lineRef.current;
    if (!wrap || !line) return;
    if (prefersReducedMotion()) {
      line.style.transform = "scaleY(1)";
      return;
    }
    line.style.transformOrigin = "top";
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1, ease: "none",
          scrollTrigger: { trigger: wrap, start: "top 70%", end: "bottom 75%", scrub: 0.5 },
        }
      );
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="relative py-[clamp(5rem,12vh,9rem)]">
      <div className="mx-auto max-w-content px-6">
        <TitleBlock index="03 — EXPERIENCE" sub="WHERE / WHAT SHIPPED" title="Roles & what they shipped" />
        <div ref={railRef} className="relative mt-16 space-y-2">
          {/* scroll-drawn spine (desktop) */}
          <div className="pointer-events-none absolute left-[199px] top-2 hidden h-[calc(100%-3rem)] w-px md:block" aria-hidden>
            <div ref={lineRef} className="h-full w-full bg-accent/60" />
          </div>
          {experiences.map((exp, i) => (
            <ExperienceSheet key={exp.id} exp={exp} index={i} total={experiences.length} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
