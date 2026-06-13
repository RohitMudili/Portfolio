import React from "react";
import { Trophy, Award } from "lucide-react";
import { achievements, education } from "../data/mock";
import TitleBlock from "./TitleBlock";
import { useReveal } from "../lib/motion";

const iconMap = { Trophy, Award };

const AchievementsEducation = () => {
  const eduRef = useReveal();
  return (
    <section id="achievements" className="relative py-[clamp(5rem,12vh,9rem)]">
      <div className="mx-auto max-w-content px-6">
        <TitleBlock index="05 — RECORD" sub="RECOGNITION / EDUCATION" title="On the record" />

        {/* recognition */}
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {achievements.map((a, i) => {
            const Icon = iconMap[a.icon];
            return <Recognition key={a.id} a={a} Icon={Icon} idx={i} />;
          })}
        </div>

        {/* education — one wide drawing sheet */}
        <div ref={eduRef} className="reveal-prep sheet mt-5 p-7 md:p-10">
          <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
            <div className="grid h-24 w-24 place-items-center border border-ink">
              <span className="font-expanded text-2xl font-bold text-ink">IIIT</span>
            </div>
            <div>
              <span className="label-mono text-accent">DEGREE</span>
              <h3 className="mt-2 font-display text-h3 font-semibold leading-tight text-ink">
                {education.institution}
              </h3>
              <p className="mt-2 text-lg text-ink-soft">
                {education.degree} · {education.major}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="label-mono">{education.duration}</span>
                <span className="h-1 w-1 rounded-full bg-ink/30" aria-hidden />
                <span className="label-mono">{education.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function Recognition({ a, Icon, idx }) {
  const ref = useReveal();
  return (
    <article ref={ref} className="reveal-prep sheet p-7 md:p-8">
      <div className="flex items-start justify-between">
        <Icon size={26} strokeWidth={1.5} className="text-accent" />
        <span className="label-mono">{String(idx + 1).padStart(2, "0")} / 02</span>
      </div>
      <h3 className="mt-6 font-display text-xl font-semibold leading-tight text-ink">{a.title}</h3>
      <p className="label-mono mt-2">{a.organizer}</p>
      <p className="mt-4 max-w-prose text-[0.96rem] leading-relaxed text-ink-soft">{a.description}</p>
    </article>
  );
}

export default AchievementsEducation;
