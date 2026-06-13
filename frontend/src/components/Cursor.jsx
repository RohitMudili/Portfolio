import React, { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/motion";

/* A drafting-instrument cursor: a precise ring + center dot that trails the
   pointer, expands over interactive targets, and reads coordinates. Pointer
   devices only; hidden on touch and under reduced-motion. */
export default function Cursor() {
  const ring = useRef(null);
  const dot = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(hover: none)").matches) return; // touch
    const r = ring.current, d = dot.current;
    if (!r || !d) return;

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      d.style.transform = `translate(${mx}px, ${my}px)`;
      const t = e.target;
      const interactive = t.closest("a, button, input, textarea, [data-cursor]");
      r.dataset.hot = interactive ? "1" : "0";
    };
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      r.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    const onDown = () => (r.dataset.down = "1");
    const onUp = () => (r.dataset.down = "0");

    document.body.classList.add("has-custom-cursor");
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden />
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}
