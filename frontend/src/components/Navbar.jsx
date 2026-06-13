import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { scrollToId } from "../lib/motion";

const navItems = [
  { id: "about", label: "About", idx: "01" },
  { id: "skills", label: "Stack", idx: "02" },
  { id: "experience", label: "Experience", idx: "03" },
  { id: "projects", label: "Work", idx: "04" },
  { id: "achievements", label: "Record", idx: "05" },
  { id: "contact", label: "Contact", idx: "06" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);

      const ids = ["home", ...navItems.map((n) => n.id)];
      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    scrollToId(id);
    setOpen(false);
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[50] transition-[background-color,border-color] duration-300 ${
        scrolled
          ? "border-b border-rule-strong bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      {/* scroll progress — a drawn dimension line across the top */}
      <div
        className="absolute inset-x-0 top-0 h-px origin-left bg-accent"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden
      />

      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <button
          onClick={() => go("home")}
          className="group flex items-center gap-3"
          aria-label="Home"
        >
          <span className="grid h-9 w-9 place-items-center border border-ink font-expanded text-sm font-bold text-ink transition-colors group-hover:bg-ink group-hover:text-paper">
            RM
          </span>
          <span className="label-mono hidden sm:inline">ROHIT MUDILI</span>
        </button>

        {/* desktop nav */}
        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className="group relative font-mono text-[0.8rem] uppercase tracking-wider transition-colors"
            >
              <span className={active === item.id ? "text-ink" : "text-ink-soft group-hover:text-ink"}>
                {item.label}
              </span>
              <span
                className={`absolute -bottom-1.5 left-0 h-px bg-accent transition-all duration-300 ${
                  active === item.id ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
          <button
            onClick={() => go("contact")}
            className="bg-ink px-5 py-2.5 font-mono text-[0.78rem] uppercase tracking-wider text-paper transition-colors hover:bg-accent"
          >
            Get in touch
          </button>
        </div>

        <button
          className="grid h-10 w-10 place-items-center border border-rule-strong text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* mobile sheet */}
      {open && (
        <div className="border-t border-rule-strong bg-paper px-6 pb-6 pt-2 md:hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className="flex w-full items-center justify-between border-b border-rule py-3.5 text-left"
            >
              <span className="font-display text-lg font-medium text-ink">{item.label}</span>
              <span className="label-mono">{item.idx}</span>
            </button>
          ))}
          <button
            onClick={() => go("contact")}
            className="mt-5 w-full bg-ink py-3.5 font-mono text-sm uppercase tracking-wider text-paper"
          >
            Get in touch
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
