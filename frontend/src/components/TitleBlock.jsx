import React from "react";
import { useReveal } from "../lib/motion";

/**
 * The recurring drawing-sheet header. A title block like the corner of an
 * engineering drawing: a sheet index, the section title, and a dimension line
 * that draws itself across the margin. This is the deliberate, named brand
 * system that replaces a per-section eyebrow.
 */
export default function TitleBlock({ index, title, sub, align = "left" }) {
  const ref = useReveal();
  return (
    <header
      ref={ref}
      className={`reveal-prep relative ${align === "center" ? "text-center" : ""}`}
    >
      <div
        className={`flex items-baseline gap-4 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="label-mono text-accent">{index}</span>
        <span className="h-px flex-1 max-w-[7rem] rule" aria-hidden />
        {sub && <span className="label-mono hidden sm:inline">{sub}</span>}
      </div>
      <h2 className="font-expanded text-h2 mt-4 font-bold uppercase tracking-tight">
        {title}
      </h2>
    </header>
  );
}
