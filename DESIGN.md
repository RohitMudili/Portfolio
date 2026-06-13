# Design

> Concept: **The Drafting Table.** An AI engineer's portfolio rendered as a living
> architectural / engineering drawing. Off-white drafting paper, ink-black type, a
> single structural blueprint-blue accent, and SVG line-work that *draws itself* on
> scroll. Maximal motion expressed as precision — lines extend, points plot, schematics
> assemble — never as glow or chaos.

## Theme

Light, paper-based, high-contrast. Not dark (the anti-reference). Not warm cream (the
AI default). A true cool off-white, the color of good drafting vellum under daylight,
with ink-black text and a single saturated engineering-blue accent used for active
states, plotted nodes, dimension callouts, and the drawing-in-progress stroke.

Physical scene: an architect's drafting table by a north-facing window at midday. Cool,
even light. A precise hand. Graphite and one blue pencil.

## Color (OKLCH)

```
--paper        oklch(0.972 0.004 250)   /* cool off-white drafting vellum (chroma toward blue, not warm) */
--paper-sunk   oklch(0.945 0.005 250)   /* recessed panels, graph-paper fields */
--ink          oklch(0.205 0.012 260)   /* near-black blue-graphite — primary text */
--ink-soft     oklch(0.430 0.012 260)   /* secondary text / long prose, ≥4.5:1 on paper */
--ink-faint    oklch(0.620 0.010 260)   /* dimension labels, captions — large/mono only */
--rule         oklch(0.205 0.012 260 / 0.14)  /* hairline grid + dimension lines */
--rule-strong  oklch(0.205 0.012 260 / 0.30)
--accent       oklch(0.520 0.180 252)   /* engineering blueprint blue — the one accent */
--accent-ink   oklch(0.430 0.190 252)   /* accent text on paper, AA-safe */
--accent-wash  oklch(0.520 0.180 252 / 0.08)
--draw         oklch(0.520 0.180 252)   /* self-drawing stroke (same as accent) */
```

Strategy: **Restrained, committed to structure.** One ink ramp, one paper ramp, one
accent. The accent never gradients, never glows. Color independence preserved: active
nav state pairs accent with a position marker; plotted nodes pair accent with a label.

Contrast checks (against `--paper` L=0.972):
- `--ink` (L 0.205) → ~13:1. Pass AAA.
- `--ink-soft` (L 0.430) → ~6.4:1. Pass AA body.
- `--ink-faint` (L 0.620) → ~3.4:1. Large text / mono labels only (≥18px or bold).
- `--accent-ink` (L 0.430) → ~6:1. Pass AA for links/labels.

## Typography

Voice words: precise, mechanical, confident. Reflex picks (Inter / Space Grotesk /
IBM Plex Mono) rejected per ban list.

- **Display & headings — `Archivo`** (with `Archivo Expanded` for the giant hero
  numerals/wordmark). Industrial grotesque, drafting-stencil structure, strong verticals.
  Weights 600–800 for display, 500–600 for section heads.
- **Body & UI — `Spline Sans`.** Humanist grotesque, comfortable reading texture,
  clearly distinct from the display grotesque (contrast on the humanist↔mechanical axis).
  Weights 400 body, 500 emphasis.
- **Instrument labels — `Spline Sans Mono`.** Used ONLY as real readouts: coordinates,
  dimension values, tech-stack tags, section indices. Pairs with the body family. Never
  body copy. Tracked +0.04em, uppercase for labels.

Scale: fluid `clamp()`, ratio ≥1.25. Hero display caps at ~6rem per the ceiling rule;
the "shouting" feel comes from Expanded width + weight, not from going past 96px.
Display letter-spacing floor -0.04em. `text-wrap: balance` on h1–h3, `pretty` on prose.
Body line-length capped 68ch.

## Theme variant — DARK BLUEPRINT (active)

The site ships in dark mode: `--paper` is a deep blue-charcoal (L 0.215), the ink ramp
is light (L 0.955 → 0.64), rules are light hairlines, and the accent blue is brightened
(L 0.68) to read on the dark ground. The light "vellum" palette is preserved in git
history but the dark blueprint is the chosen identity. Only the tokens flip; the whole
concept (grid, schematic, sheets, dimension lines) is identical.

## 3D centerpiece — live agent graph (WebGL)

The hero's right half is a real-time **react-three-fiber** scene (`components/three/
AgentGraph3D.jsx`): a 9-node agentic-RAG pipeline (INPUT/DOCS → EMBED/RETRIEVE →
MEMORY/AGENT → TOOLS/ACTION → OUTPUT) as wireframe icosahedrons with glowing accent
cores, curved edges carrying traveling data pulses. Slow auto-rotation, mouse parallax
(group + camera), scroll dolly. The AGENT core breathes.

- **Stack:** `@react-three/fiber@9 + @react-three/drei@10 + three@0.169` (v9/v10 are the
  React-19-compatible line; v8 throws `ReactCurrentOwner` under React 19).
- **Gate:** `canRender3D()` in `lib/motion.js` — needs WebGL, ≥820px, ≥4 cores, and no
  reduced-motion. Phones / reduced-motion / no-WebGL fall back to the SVG schematic
  (`HeroSchematic` in `Hero.jsx`).
- **Perf:** lazy-loaded (`React.lazy`) so Three.js ships as a separate ~271 kB chunk that
  only downloads when the 3D actually mounts; main bundle stays ~145 kB.

## Motion

The signature. Library: **GSAP + ScrollTrigger** for draw-on-scroll choreography,
**Lenis** for smooth scroll, react-three-fiber for the 3D. Interaction layer:
- **Custom cursor** (`components/Cursor.jsx`) — drafting ring + dot, expands on
  interactive targets, `mix-blend-difference`. Pointer devices only.
- **Magnetic** CTAs (`useMagnetic`) and **3D tilt** on project sheets (`useTilt`).
- **Scrubbed** experience timeline spine draws with scroll; metric counters count up.
All gated on `prefers-reduced-motion` and `(hover: none)`. Principles:

- **Self-drawing line-work.** SVG paths animate `stroke-dashoffset` from full to 0 as
  they scroll into view — lines extend, the schematic assembles, dimension arrows reach
  their ticks. This is the "drawing happening" effect, the core idea.
- **Plotting, not fading.** Nodes/points scale-in from 0 at their plotted coordinates
  with a short stagger; labels type/clip in after their node lands.
- **Hero overture.** One orchestrated page-load: the title-block rules draw, the
  wordmark clips up, the hero schematic plots itself, the coordinate readout counts up.
- Easing: `expo.out` / `quint.out`. No bounce, no elastic. Durations 0.6–1.2s for draws.
- **Reduced motion:** every drawn path renders already-complete (dashoffset 0), counters
  show final values, entrance reveals become instant. Content is NEVER gated on motion —
  default state is the finished drawing; motion only animates from a visible baseline.

## Layout

- Max content width 1200px, generous fluid section padding (`clamp(5rem, 12vh, 9rem)`),
  varied rhythm — not uniform 24-pad everywhere.
- A faint blueprint **grid** underlies the whole page (1px rules at ~32px, a stronger
  rule every 4th). It's the paper. Sections sit on it; dimension lines reference it.
- **Asymmetric, drawing-like compositions.** Title blocks in corners, dimension lines
  spanning margins, plotted layouts — not centered-everything. Break the grid for
  emphasis intentionally.
- Cards used sparingly and only where they're the right affordance (project specimens,
  experience entries as "drawing sheets"). No nested cards. No icon-heading-text grid
  repeated for every section.
- Responsive grids: `repeat(auto-fit, minmax(280px, 1fr))` where a grid is right.

## Components / Motifs

- **Title block** — corner metadata frames (like an engineering drawing's title block):
  name, role, sheet index, coordinates. The brand's recurring signature.
- **Dimension line** — accent line with end ticks + a mono value label; used to "measure"
  metrics and spans.
- **Plotted node** — a small ring + dot at a coordinate, with a connector to its label.
- **Drawing sheet** — the card form: paper panel with a hairline border, corner ticks,
  a sheet index in the corner. Experience + projects use this.
- **Graph-paper field** — recessed `--paper-sunk` panels with a finer grid (contact form,
  skills plot).
- **Coordinate readout** — mono nav element showing section + a scroll-position figure.

## Bans (project-specific, on top of skill bans)

- No dark hero, no neon, no glow shadows, no gradient text, no gradient-on-hover titles.
- No `border-left` accent stripes (use full hairline borders + corner ticks).
- No tiny uppercase tracked eyebrow above every section. Section identity comes from the
  title-block sheet index, used as a deliberate drawing system, not a kicker on every head.
- No emoji. Icons sparingly and only line-weight (lucide), matched to the hairline rules.
