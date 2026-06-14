import React, { useRef } from "react";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { projects } from "../data/mock";
import TitleBlock from "./TitleBlock";
import { useReveal, useTilt } from "../lib/motion";

function ProjectSheet({ project, sheet, featured }) {
  const ref = useReveal();
  const tiltRef = useTilt(featured ? 2.5 : 4);
  const primaryLink = project.github || project.liveDemo || null;

  // Whole-card click → open the project. Robust against the 3D-tilt transform,
  // which displaces native anchor hit-testing. Inner links still work and
  // stopPropagation so they win when clicked directly.
  const openPrimary = () => {
    if (primaryLink) window.open(primaryLink, "_blank", "noopener,noreferrer");
  };

  return (
    <article
      ref={ref}
      className={`reveal-prep ${featured ? "md:col-span-3" : ""}`}
      style={{ transformStyle: "preserve-3d" }}
    >
    <div
      ref={tiltRef}
      data-cursor
      onClick={openPrimary}
      role={primaryLink ? "link" : undefined}
      tabIndex={primaryLink ? 0 : undefined}
      onKeyDown={(e) => { if (primaryLink && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openPrimary(); } }}
      aria-label={primaryLink ? `${project.title} — open on GitHub` : undefined}
      className={`sheet group flex h-full flex-col transition-[box-shadow] duration-300 will-change-transform hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] ${primaryLink ? "cursor-pointer" : ""}`}
    >
      <div className={`grid ${featured ? "md:grid-cols-[1.05fr_1fr]" : "grid-cols-1"} h-full`}>
        {/* plate */}
        <div className="relative aspect-[16/10] overflow-hidden border-b border-rule-strong md:border-b-0 md:[.md\\:col-span-3_&]:border-r">
          <img
            src={project.image}
            alt={project.alt || `${project.title} — project plate`}
            loading="lazy"
            className="h-full w-full object-cover opacity-80 grayscale transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-100 group-hover:grayscale-0"
          />
          {/* blueprint blend so the plate reads on the dark ground */}
          <div className="pointer-events-none absolute inset-0 bg-accent/25 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-0" />
          <div className="pointer-events-none absolute inset-0 bg-paper/30 transition-opacity duration-500 group-hover:opacity-0" />
          <span className="label-mono absolute left-3 top-3 bg-paper/85 px-2 py-1 backdrop-blur-sm">
            {sheet}
          </span>
        </div>

        {/* spec */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-h3 font-semibold leading-tight text-ink">
            {project.title}
          </h3>
          <p className={`mt-3 text-ink-soft ${featured ? "text-base leading-relaxed" : "text-sm leading-relaxed"}`}>
            {featured ? project.longDescription : project.description}
          </p>

          <p className="label-mono mt-4 text-accent">{project.impact}</p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.techStack.map((t) => (
              <span key={t} className="border border-rule px-2.5 py-1 font-mono text-[0.7rem] text-ink-soft">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center gap-4 pt-6">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 font-mono text-[0.78rem] uppercase tracking-wider text-ink transition-colors hover:text-accent"
              >
                <Github size={15} strokeWidth={1.7} /> Source
              </a>
            )}
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 font-mono text-[0.78rem] uppercase tracking-wider text-ink transition-colors hover:text-accent"
              >
                <ExternalLink size={15} strokeWidth={1.7} /> Demo
              </a>
            )}
            {!project.github && !project.liveDemo && (
              <span className="label-mono">Internal · case study on request</span>
            )}
            <ArrowUpRight
              size={18}
              className="ml-auto text-ink/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
            />
          </div>
        </div>
      </div>
    </div>
    </article>
  );
}

const Projects = () => {
  return (
    <section id="projects" className="relative bg-paper-sunk py-[clamp(5rem,12vh,9rem)]">
      <div className="mx-auto max-w-content px-6">
        <TitleBlock index="04 — WORK" sub="SELECTED BUILDS" title="Selected projects" />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectSheet
              key={p.id}
              project={p}
              sheet={`SHT ${String(i + 1).padStart(2, "0")}`}
              featured={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
