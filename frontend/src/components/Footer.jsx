import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { personalInfo } from "../data/mock";
import { scrollToId } from "../lib/motion";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-ink bg-paper">
      {/* giant end-stamp wordmark */}
      <div className="mx-auto max-w-content px-6 pt-16">
        <button
          onClick={() => scrollToId("home")}
          className="block w-full text-left"
          aria-label="Back to top"
        >
          <span className="font-expanded text-[clamp(3rem,16vw,12rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.04em] text-ink transition-colors hover:text-accent">
            Rohit Mudili
          </span>
        </button>
      </div>

      {/* title block grid */}
      <div className="mx-auto mt-12 grid max-w-content gap-y-8 border-t border-rule-strong px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="label-mono">ROLE</span>
          <p className="mt-2 text-sm text-ink-soft">AI Engineer — LLM, RAG, voice agents & automation.</p>
        </div>
        <div>
          <span className="label-mono">INDEX</span>
          <ul className="mt-2 space-y-1.5">
            {[["About", "about"], ["Work", "projects"], ["Experience", "experience"], ["Contact", "contact"]].map(([l, id]) => (
              <li key={id}>
                <button onClick={() => scrollToId(id)} className="text-sm text-ink-soft transition-colors hover:text-accent">
                  {l}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span className="label-mono">CONNECT</span>
          <div className="mt-2 flex gap-2">
            {[
              { Icon: Github, href: personalInfo.github, label: "GitHub" },
              { Icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn" },
              { Icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center border border-rule-strong text-ink-soft transition-colors hover:border-ink hover:text-accent"
              >
                <Icon size={17} strokeWidth={1.6} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <span className="label-mono">DRAWN</span>
          <p className="mt-2 text-sm text-ink-soft">Nagpur, India · {year}</p>
          <p className="label-mono mt-3">© {year} — ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
