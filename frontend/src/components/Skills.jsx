import React, { useRef, useState } from "react";
import { skills } from "../data/mock";
import TitleBlock from "./TitleBlock";
import { useStaggerReveal, prefersReducedMotion } from "../lib/motion";

/* Skills plotted on a proficiency axis instead of progress bars.
   Each skill is a node at x = level%. The axis draws, nodes plot in. */
function SkillRow({ group }) {
  const ref = useStaggerReveal({ selector: "[data-node]", step: 55 });
  const [hover, setHover] = useState(null);

  return (
    <div className="grid items-start gap-x-10 gap-y-4 border-b border-rule py-8 md:grid-cols-[minmax(180px,260px)_1fr]">
      <div>
        <h3 className="font-display text-lg font-semibold text-ink">{group.category}</h3>
        <span className="label-mono">{group.items.length} entries</span>
      </div>

      <div ref={ref} className="relative pt-2">
        {/* axis */}
        <div className="relative h-px w-full bg-rule-strong">
          {[0, 25, 50, 75, 100].map((t) => (
            <span
              key={t}
              className="absolute -top-1 h-2 w-px bg-ink/25"
              style={{ left: `${t}%` }}
              aria-hidden
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between">
          <span className="label-mono text-[0.62rem]">FAMILIAR</span>
          <span className="label-mono text-[0.62rem]">EXPERT</span>
        </div>

        {/* plotted nodes */}
        <div className="relative mt-6 h-auto">
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {group.items.map((s) => (
              <div
                key={s.name}
                data-node
                className="plot-in group/node flex items-center gap-2"
                onMouseEnter={() => setHover(s.name)}
                onMouseLeave={() => setHover(null)}
              >
                <span
                  className="relative grid h-3 w-3 place-items-center rounded-full border border-ink"
                  style={{
                    backgroundColor:
                      s.level >= 85 ? "oklch(var(--accent))" : "oklch(var(--paper))",
                  }}
                >
                  {s.level >= 85 && (
                    <span className="absolute h-1 w-1 rounded-full bg-paper" />
                  )}
                </span>
                <span className="font-mono text-[0.82rem] text-ink-soft transition-colors group-hover/node:text-ink">
                  {s.name}
                </span>
                <span
                  className={`font-mono text-[0.7rem] tabular-nums transition-opacity ${
                    hover === s.name ? "text-accent opacity-100" : "text-ink-faint opacity-60"
                  }`}
                >
                  {s.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const Skills = () => {
  return (
    <section id="skills" className="relative bg-paper-sunk py-[clamp(5rem,12vh,9rem)]">
      <div className="mx-auto max-w-content px-6">
        <TitleBlock index="02 — STACK" sub="TOOLS / FRAMEWORKS" title="What I build with" />

        <div className="mt-12 border-t border-rule-strong">
          {skills.map((group) => (
            <SkillRow key={group.category} group={group} />
          ))}
        </div>

        <p className="label-mono mt-6">
          ● filled node = expert proficiency (85+) · ○ open node = working proficiency
        </p>
      </div>
    </section>
  );
};

export default Skills;
