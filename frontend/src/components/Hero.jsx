import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import { Github, Linkedin, Mail, ArrowDownRight } from "lucide-react";
import { personalInfo } from "../data/mock";
import { gsap, ScrollTrigger, prefersReducedMotion, scrollToId, canRender3D, useMagnetic } from "../lib/motion";

const AgentGraph3D = lazy(() => import("./three/AgentGraph3D"));

/* The hero schematic: a stylized agent / RAG dataflow drawn as engineering
   line-work. It plots itself on page load — nodes scale in, connectors draw,
   labels clip up — the "drawing happening" overture. */
function HeroSchematic({ svgRef }) {
  // node coordinates on a 0–1000 / 0–620 canvas
  const nodes = [
    { x: 90, y: 150, r: 18, label: "INPUT" },
    { x: 90, y: 470, r: 18, label: "DOCS" },
    { x: 340, y: 120, r: 24, label: "EMBED" },
    { x: 340, y: 500, r: 24, label: "RETRIEVE" },
    { x: 600, y: 310, r: 34, label: "AGENT" },
    { x: 860, y: 170, r: 20, label: "TOOLS" },
    { x: 860, y: 460, r: 20, label: "OUTPUT" },
  ];
  const edges = [
    [0, 2], [1, 3], [2, 4], [3, 4], [4, 5], [4, 6], [5, 4],
  ];

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1000 620"
      className="h-full w-full"
      fill="none"
      aria-hidden="true"
    >
      {/* dimension frame ticks */}
      <g stroke="oklch(var(--rule-strong))" strokeWidth="1">
        <path data-draw d="M 24 24 L 76 24 M 24 24 L 24 76" />
        <path data-draw d="M 976 596 L 924 596 M 976 596 L 976 544" />
      </g>

      {/* connectors */}
      <g stroke="oklch(var(--accent))" strokeWidth="1.6" strokeLinecap="round">
        {edges.map(([a, b], i) => {
          const A = nodes[a], B = nodes[b];
          const mx = (A.x + B.x) / 2;
          return (
            <path
              key={i}
              data-draw
              d={`M ${A.x} ${A.y} C ${mx} ${A.y}, ${mx} ${B.y}, ${B.x} ${B.y}`}
            />
          );
        })}
      </g>

      {/* flowing data pulses along the central edge */}
      <g className="hero-pulse" stroke="oklch(var(--accent))" strokeWidth="2.4" strokeLinecap="round" opacity="0">
        <path d={`M ${nodes[2].x} ${nodes[2].y} C 470 ${nodes[2].y}, 470 ${nodes[4].y}, ${nodes[4].x} ${nodes[4].y}`} strokeDasharray="2 26" />
      </g>

      {/* nodes */}
      <g>
        {nodes.map((n, i) => (
          <g key={i} className="hero-node" style={{ transformOrigin: `${n.x}px ${n.y}px` }}>
            <circle cx={n.x} cy={n.y} r={n.r} fill="oklch(var(--paper))" stroke="oklch(var(--ink))" strokeWidth="1.4" />
            <circle cx={n.x} cy={n.y} r={n.r * 0.32} fill="oklch(var(--accent))" />
            <text
              x={n.x}
              y={n.y + n.r + 18}
              textAnchor="middle"
              className="hero-node-label"
              fill="oklch(var(--ink-faint))"
              fontFamily="Spline Sans Mono, monospace"
              fontSize="13"
              letterSpacing="1.5"
            >
              {n.label}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

const Hero = () => {
  const svgRef = useRef(null);
  const rootRef = useRef(null);
  const [use3D, setUse3D] = useState(false);
  const magBtn = useMagnetic(0.35);

  useEffect(() => {
    setUse3D(canRender3D());
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = prefersReducedMotion();
    const svg = svgRef.current; // null in 3D mode

    // ---- SVG schematic priming (only when the SVG fallback is mounted) ----
    let paths = [];
    if (svg) {
      paths = Array.from(svg.querySelectorAll("[data-draw]"));
      paths.forEach((p) => {
        const len = p.getTotalLength ? p.getTotalLength() : 800;
        p.style.strokeDasharray = len;
        p.style.strokeDashoffset = reduce ? 0 : len;
      });
      if (reduce) gsap.set(svg.querySelectorAll(".hero-node"), { opacity: 1, scale: 1 });
    }

    if (reduce) return;

    const labels = root.querySelectorAll("[data-hero-line]");
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    // text overture — runs in BOTH 3D and SVG modes
    tl.from(root.querySelectorAll("[data-hero-tick]"), {
      scaleX: 0, transformOrigin: "left", duration: 0.7, stagger: 0.08,
    }).to(labels, { clipPath: "inset(0 0 0 0)", y: 0, opacity: 1, duration: 0.95, stagger: 0.12 }, "-=0.4");

    let st;
    if (svg) {
      const nodes = svg.querySelectorAll(".hero-node");
      gsap.set(nodes, { opacity: 0, scale: 0.3, transformOrigin: "center" });
      tl.to(paths, { strokeDashoffset: 0, duration: 1.2, stagger: 0.07 }, "-=0.7")
        .to(nodes, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.06 }, "-=0.9")
        .to(svg.querySelector(".hero-pulse"), { opacity: 1, duration: 0.4 }, "-=0.2")
        .add(() => {
          gsap.to(svg.querySelector(".hero-pulse path"), {
            strokeDashoffset: -280, duration: 2.2, ease: "none", repeat: -1,
          });
        });
      st = gsap.to(svg, {
        yPercent: 14, ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
      });
    }

    return () => {
      tl.kill();
      if (st) { st.scrollTrigger && st.scrollTrigger.kill(); st.kill(); }
    };
  }, [use3D]);

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:min-h-[100svh] lg:pb-0"
    >
      <div className="mx-auto grid w-full max-w-content grid-cols-1 items-center gap-y-10 px-6 lg:min-h-[78svh] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-x-8">
        {/* LEFT — title block + wordmark + copy.
            Container ignores pointer events so the 3D graph behind/beside it
            stays grabbable through empty space; interactive children opt back in. */}
        <div className="relative z-[1] pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
          <div className="flex items-center gap-4">
            <span data-hero-tick className="block h-px w-12 rule" />
            <span className="label-mono">SHEET 00 — PORTFOLIO</span>
            <span data-hero-tick className="hidden h-px w-24 rule sm:block" />
            <span className="label-mono hidden text-accent sm:inline">REV 2026</span>
          </div>

          <p data-hero-line className="clip-up label-mono mb-4 mt-10 text-accent">
            AI Engineer · LLM / RAG / Voice Agents
          </p>
          <h1 className="font-expanded font-extrabold uppercase leading-[0.84] tracking-[-0.04em] text-ink">
            <span data-hero-line className="clip-up block text-[clamp(2.9rem,11.5vw,7rem)]">Rohit</span>
            <span data-hero-line className="clip-up block text-[clamp(2.9rem,11.5vw,7rem)]">Mudili</span>
          </h1>

          <p
            data-hero-line
            className="clip-up mt-7 max-w-prose text-lg leading-relaxed text-ink-soft"
          >
            I build intelligent systems that bridge AI innovation with real-world
            automation — LLM agents, RAG architectures, and sub-second voice
            interfaces.
          </p>

          <div data-hero-line className="clip-up mt-9 flex flex-wrap items-center gap-4">
            <button
              ref={magBtn}
              onClick={() => scrollToId("projects")}
              className="group inline-flex items-center gap-3 bg-ink px-7 py-4 font-mono text-sm uppercase tracking-wider text-paper transition-colors will-change-transform hover:bg-accent"
            >
              View the work
              <ArrowDownRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </button>
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 border border-ink px-7 py-4 font-mono text-sm uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Resume
            </a>
            <div className="ml-1 flex items-center gap-1">
              {[
                { href: personalInfo.github, Icon: Github, label: "GitHub" },
                { href: personalInfo.linkedin, Icon: Linkedin, label: "LinkedIn" },
                { href: `mailto:${personalInfo.email}`, Icon: Mail, label: "Email" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center border border-transparent text-ink-soft transition-colors hover:border-rule-strong hover:text-accent"
                >
                  <Icon size={19} strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — live 3D agent graph (capable devices) or self-drawing SVG.
            z-[2] so it sits ABOVE the text column → nodes are catchable wherever
            the graph is visible, including the parts that overlap the headline area. */}
        <div className="relative order-first w-full lg:order-none">
          {use3D ? (
            <div className="relative z-[2] mx-auto aspect-[10/8] w-full max-w-[640px] pointer-events-auto lg:absolute lg:right-0 lg:top-1/2 lg:aspect-auto lg:h-[92svh] lg:w-[60vw] lg:max-w-none lg:-translate-y-1/2">
              <Suspense fallback={null}>
                <AgentGraph3D />
              </Suspense>
            </div>
          ) : (
            <div className="pointer-events-none mx-auto aspect-[10/6.2] w-full max-w-[680px] opacity-95 lg:max-w-none lg:translate-x-[4%]">
              <HeroSchematic svgRef={svgRef} />
            </div>
          )}
        </div>
      </div>

      {/* bottom coordinate readout */}
      <div className="mx-auto mt-12 flex max-w-content items-end justify-between px-6 lg:absolute lg:inset-x-0 lg:bottom-6 lg:z-[1] lg:mt-0">
        <span className="label-mono">IIIT NAGPUR · CSE · 2022—2026</span>
        <span className="label-mono hidden md:inline">BENGALURU 12.97°N 77.59°E</span>
      </div>
    </section>
  );
};

export default Hero;
