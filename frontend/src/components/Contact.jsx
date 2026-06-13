import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, ArrowUpRight } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { personalInfo } from "../data/mock";
import TitleBlock from "./TitleBlock";
import { useReveal } from "../lib/motion";

const Field = ({ label, id, children, idx }) => (
  <label htmlFor={id} className="block">
    <span className="mb-2 flex items-baseline gap-2">
      <span className="label-mono">{idx}</span>
      <span className="font-display text-sm font-medium text-ink">{label}</span>
    </span>
    {children}
  </label>
);

const inputClass =
  "w-full border border-rule-strong bg-paper px-4 py-3 font-sans text-ink outline-none transition-colors placeholder:text-ink-soft focus:border-accent";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const infoRef = useReveal();
  const formRef = useReveal();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ "form-name": "contact", ...form }).toString(),
      });
      if (!res.ok) throw new Error("failed");
      toast({ title: "Message sent", description: "Thanks for reaching out — I'll reply soon." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast({
        title: "Couldn't send",
        description: "Please email me directly at " + personalInfo.email,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-[clamp(5rem,12vh,9rem)]">
      <div className="mx-auto max-w-content px-6">
        <TitleBlock index="06 — CONTACT" sub="OPEN TO WORK" title="Let's build something exact" />

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* contact info as a title block */}
          <div ref={infoRef} className="reveal-prep">
            <p className="max-w-prose text-lg leading-relaxed text-ink-soft">
              I'm open to AI/ML engineering roles and focused contract work — agents,
              RAG, voice, automation. If you're building something that needs to
              actually work in production, let's talk.
            </p>

            <div className="mt-9 divide-y divide-rule border-y border-rule-strong">
              {[
                { Icon: Mail, label: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { Icon: Phone, label: personalInfo.phone, href: `tel:${personalInfo.phone}` },
                { Icon: MapPin, label: personalInfo.location, href: null },
              ].map(({ Icon, label, href }) => {
                const Inner = (
                  <span className="flex items-center gap-4 py-4">
                    <Icon size={18} strokeWidth={1.6} className="shrink-0 text-accent" />
                    <span className="text-ink-soft">{label}</span>
                  </span>
                );
                return href ? (
                  <a key={label} href={href} className="group block transition-colors hover:text-ink [&_span]:hover:text-ink">
                    {Inner}
                  </a>
                ) : (
                  <div key={label}>{Inner}</div>
                );
              })}
            </div>

            <div className="mt-8 flex gap-3">
              {[
                { label: "GitHub", href: personalInfo.github },
                { label: "LinkedIn", href: personalInfo.linkedin },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 border border-ink px-5 py-3 font-mono text-sm uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  {label}
                  <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </div>

          {/* form on a graph-paper field */}
          <form
            ref={formRef}
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={onSubmit}
            className="reveal-prep graph-field border border-rule-strong p-6 sm:p-8"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
              <label>
                Don't fill this out: <input name="bot-field" onChange={onChange} />
              </label>
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" id="name" idx="01">
                <input id="name" name="name" required value={form.name} onChange={onChange} placeholder="Your name" className={inputClass} />
              </Field>
              <Field label="Email" id="email" idx="02">
                <input id="email" name="email" type="email" required value={form.email} onChange={onChange} placeholder="you@company.com" className={inputClass} />
              </Field>
            </div>
            <div className="mt-5">
              <Field label="Subject" id="subject" idx="03">
                <input id="subject" name="subject" required value={form.subject} onChange={onChange} placeholder="What's this about?" className={inputClass} />
              </Field>
            </div>
            <div className="mt-5">
              <Field label="Message" id="message" idx="04">
                <textarea id="message" name="message" required rows={5} value={form.message} onChange={onChange} placeholder="Tell me about the project…" className={`${inputClass} resize-none`} />
              </Field>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-7 inline-flex w-full items-center justify-center gap-2 bg-ink py-4 font-mono text-sm uppercase tracking-wider text-paper transition-colors hover:bg-accent disabled:opacity-50 sm:w-auto sm:px-10"
            >
              {submitting ? "Sending…" : (<><Send size={15} /> Send message</>)}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
