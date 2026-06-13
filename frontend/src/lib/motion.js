// Motion infrastructure for The Drafting Table.
// GSAP ScrollTrigger for draw-on-scroll choreography, Lenis for smooth scroll.
// Everything degrades to a finished, static drawing under prefers-reduced-motion.

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Decide whether heavy WebGL 3D should mount: needs WebGL, a non-tiny
   viewport, more than a couple cores, and no reduced-motion preference. */
export function canRender3D() {
  if (typeof window === "undefined") return false;
  if (prefersReducedMotion()) return false;
  if (window.innerWidth < 820) return false; // phones get the SVG fallback
  const cores = navigator.hardwareConcurrency || 4;
  if (cores < 4) return false;
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2") || c.getContext("webgl");
    return !!gl;
  } catch {
    return false;
  }
}

/* ---------------- Lenis smooth scroll, wired into ScrollTrigger ---------------- */
export function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // expose for nav anchor scrolling
    window.__lenis = lenis;

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis && !prefersReducedMotion()) {
    window.__lenis.scrollTo(el, { offset: -72, duration: 1.2 });
  } else {
    el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  }
}

/* ---------------- Self-drawing SVG path ----------------
   Pass a ref to an <svg>; every [data-draw] path inside animates its
   stroke-dashoffset to 0 when the container enters the viewport. */
export function useDrawOnScroll(scopeRef, { start = "top 82%", stagger = 0.12, duration = 1.1 } = {}) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;
    const paths = Array.from(scope.querySelectorAll("[data-draw]"));
    if (!paths.length) return;

    // measure and prime each path
    paths.forEach((p) => {
      const len = p.getTotalLength ? p.getTotalLength() : 1000;
      p.style.setProperty("--len", len);
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = prefersReducedMotion() ? 0 : len;
    });

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.to(paths, {
        strokeDashoffset: 0,
        duration,
        ease: "expo.out",
        stagger,
        scrollTrigger: { trigger: scope, start },
      });
    }, scope);

    return () => ctx.revert();
  }, [scopeRef, start, stagger, duration]);
}

/* ---------------- Reveal on scroll (generic) ----------------
   Adds .is-in when the element enters the viewport. Default state in CSS
   is already visible (.reveal); only the .reveal-prep/.plot-in/.clip-up
   variants animate, and they animate FROM a visible baseline under RM. */
export function useReveal(options = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: options.threshold ?? 0.18, rootMargin: options.rootMargin ?? "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [options.threshold, options.rootMargin]);
  return ref;
}

/* ---------------- Staggered children reveal ---------------- */
export function useStaggerReveal({ selector = "[data-stagger]", step = 70 } = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const scope = ref.current;
    if (!scope) return;
    const items = Array.from(scope.querySelectorAll(selector));
    if (prefersReducedMotion()) {
      items.forEach((i) => i.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            items.forEach((item, i) => {
              setTimeout(() => item.classList.add("is-in"), i * step);
            });
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(scope);
    return () => io.disconnect();
  }, [selector, step]);
  return ref;
}

/* ---------------- Count-up readout ---------------- */
export function useCountUp(target, { duration = 1400 } = {}) {
  const [value, setValue] = useState(prefersReducedMotion() ? target : 0);
  const ref = useRef(null);
  const started = useRef(false);

  const run = useCallback(() => {
    if (started.current) return;
    started.current = true;
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && run()),
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [run]);

  return [value, ref];
}

/* ---------------- Magnetic element (button pulls toward cursor) ---------------- */
export function useMagnetic(strength = 0.4) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (window.matchMedia("(hover: none)").matches) return;
    let raf;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "translate(0px, 0px)";
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [strength]);
  return ref;
}

/* ---------------- 3D tilt on hover (cards / sheets) ---------------- */
export function useTilt(max = 7) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (window.matchMedia("(hover: none)").matches) return;
    let raf;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${-py * max}deg) rotateY(${px * max}deg)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [max]);
  return ref;
}

/* ---------------- Scrubbed heading reveal (per-line, scroll-tied) ---------------- */
export function useScrubReveal(selector = "[data-scrub]") {
  const ref = useRef(null);
  useEffect(() => {
    const scope = ref.current;
    if (!scope) return;
    const items = Array.from(scope.querySelectorAll(selector));
    if (!items.length) return;
    if (prefersReducedMotion()) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, ease: "none", stagger: 0.08,
          scrollTrigger: { trigger: scope, start: "top 88%", end: "top 45%", scrub: 0.6 },
        }
      );
    }, scope);
    return () => ctx.revert();
  }, [selector]);
  return ref;
}

export { gsap, ScrollTrigger };
