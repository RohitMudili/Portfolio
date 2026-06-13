import React, { useEffect, useRef } from "react";
import { experiences } from "../data/mock";
import TitleBlock from "./TitleBlock";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../lib/motion";

/* ------------------------------------------------------------------
   Experience as an animated timeline. A vertical spine fills as you
   scroll, a glowing scan-head rides its growing tip, and each role's
   node + content activates in sequence as the head passes it.
   ------------------------------------------------------------------ */

function ExperienceEntry({ exp, index, total }) {
  return (
    <article
      data-entry
      className="relative grid gap-x-10 pb-16 last:pb-0 md:grid-cols-[180px_1fr] md:gap-x-14"
    >
      {/* LEFT rail: date + meta + the timeline node */}
      <div className="relative md:pr-10 md:text-right">
        <div className="flex items-baseline gap-3 md:justify-end">
          <span data-entry-num className="label-mono text-accent">{String(index + 1).padStart(2, "0")}</span>
          <span className="label-mono">/{String(total).padStart(2, "0")}</span>
        </div>
        {exp.current && (
          <span data-entry-badge className="mt-3 inline-block border border-accent/60 px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-accent">
            ● Present
          </span>
        )}
        <p className="mt-3 font-display text-lg font-semibold leading-tight text-ink">
          {exp.duration}
        </p>
        <p className="mt-1 text-sm text-ink-soft">{exp.location}</p>

        {/* timeline node — sits on the spine (desktop). Activated via JS. */}
        <span
          data-entry-node
          className="absolute right-[-7px] top-1.5 z-[2] hidden h-[15px] w-[15px] place-items-center rounded-full border border-ink bg-paper md:grid"
          aria-hidden
        >
          <span data-entry-core className="h-[5px] w-[5px] scale-0 rounded-full bg-accent" />
          <span data-entry-ring className="absolute inset-0 scale-0 rounded-full border border-accent" />
        </span>
      </div>

      {/* RIGHT: the work (reveals when the node activates) */}
      <div data-entry-body className="border-t border-rule-strong pt-5 md:border-t-0 md:pl-2 md:pt-0">
        <h3 className="font-display text-h3 font-semibold text-ink">{exp.role}</h3>
        <p className="mt-1 text-lg text-accent">{exp.company}</p>

        <ul className="mt-6 space-y-4">
          {exp.achievements.map((a, i) => (
            <li key={i} data-entry-bullet className="grid grid-cols-[auto_1fr] gap-4">
              <span className="label-mono mt-1.5 text-ink/40">{String(i + 1).padStart(2, "0")}</span>
              <span className="max-w-prose text-[0.98rem] leading-relaxed text-ink-soft">{a}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap gap-2">
          {exp.techStack.map((t) => (
            <span key={t} className="border border-rule-strong px-3 py-1.5 font-mono text-[0.74rem] text-ink-soft">
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
  const headRef = useRef(null);

  useEffect(() => {
    const wrap = railRef.current;
    const line = lineRef.current;
    const head = headRef.current;
    if (!wrap) return;

    const entries = Array.from(wrap.querySelectorAll("[data-entry]"));
    const reduce = prefersReducedMotion();

    if (reduce) {
      // static, fully-revealed timeline
      if (line) line.style.transform = "scaleY(1)";
      if (head) head.style.opacity = "0";
      entries.forEach((e) => {
        e.querySelector("[data-entry-core]")?.style.setProperty("transform", "scale(1)");
        gsap.set(e.querySelectorAll("[data-entry-body], [data-entry-bullet]"), { opacity: 1, y: 0, x: 0 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      // 1) spine fills + scan-head rides the tip
      if (line) {
        gsap.set(line, { transformOrigin: "top", scaleY: 0 });
        gsap.to(line, {
          scaleY: 1, ease: "none",
          scrollTrigger: {
            trigger: wrap, start: "top 64%", end: "bottom 72%", scrub: 0.5,
            onUpdate: (self) => {
              if (head) {
                const h = wrap.offsetHeight;
                head.style.transform = `translateY(${self.progress * h}px)`;
                head.style.opacity = self.progress > 0.001 && self.progress < 0.999 ? "1" : "0";
              }
            },
          },
        });
      }

      // 2) each entry activates when its node reaches the scan line
      entries.forEach((entry) => {
        const node = entry.querySelector("[data-entry-node]");
        const core = entry.querySelector("[data-entry-core]");
        const ring = entry.querySelector("[data-entry-ring]");
        const body = entry.querySelector("[data-entry-body]");
        const bullets = entry.querySelectorAll("[data-entry-bullet]");
        const badge = entry.querySelector("[data-entry-badge]");

        gsap.set(body, { opacity: 0, y: 26 });
        gsap.set(bullets, { opacity: 0, x: 18 });
        if (badge) gsap.set(badge, { opacity: 0, scale: 0.8 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: entry, start: "top 62%", toggleActions: "play none none reverse" },
          defaults: { ease: "expo.out" },
        });
        // node plots
        if (core) tl.to(core, { scale: 1, duration: 0.4 });
        if (ring) tl.fromTo(ring, { scale: 0, opacity: 0.9 }, { scale: 2.6, opacity: 0, duration: 0.8 }, "<");
        if (node) tl.fromTo(node, { borderColor: "oklch(var(--ink))" }, { borderColor: "oklch(var(--accent))", duration: 0.4 }, "<");
        if (badge) tl.to(badge, { opacity: 1, scale: 1, duration: 0.4 }, "<");
        // content reveals
        tl.to(body, { opacity: 1, y: 0, duration: 0.7 }, "<0.05")
          .to(bullets, { opacity: 1, x: 0, duration: 0.5, stagger: 0.08 }, "<0.15");
      });

      ScrollTrigger.refresh();
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="relative py-[clamp(5rem,12vh,9rem)]">
      <div className="mx-auto max-w-content px-6">
        <TitleBlock index="03 — EXPERIENCE" sub="WHERE / WHAT SHIPPED" title="Roles & what they shipped" />

        <div ref={railRef} className="relative mt-16">
          {/* spine track (faint) + filling line + scan head — desktop */}
          <div className="pointer-events-none absolute left-[179px] top-1.5 hidden h-[calc(100%-1.5rem)] w-px md:block" aria-hidden>
            <div className="absolute inset-0 bg-rule-strong" />
            <div ref={lineRef} className="absolute inset-0 origin-top bg-accent" />
            {/* scan head */}
            <div
              ref={headRef}
              className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-accent opacity-0 shadow-[0_0_14px_4px_oklch(var(--accent)/0.55)]"
            />
          </div>

          {experiences.map((exp, i) => (
            <ExperienceEntry key={exp.id} exp={exp} index={i} total={experiences.length} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
