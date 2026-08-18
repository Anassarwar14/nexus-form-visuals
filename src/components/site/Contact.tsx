import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROFILE } from "./data";

export function Contact() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".contact-word span", {
        yPercent: 110,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={root}
      id="contact"
      className="relative overflow-hidden bg-ink px-5 pb-10 pt-28 text-bone md:px-10"
    >
      <div
        className="pointer-events-none absolute -bottom-1/3 left-1/2 h-[70vw] w-[70vw] -translate-x-1/2 rounded-full opacity-35 blur-[120px]"
        style={{ background: "var(--gradient-chroma)" }}
      />

      <div className="relative">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-bone/50">
          Open to full-time & contract work
        </p>
        <h2 className="mt-8 nameplate text-[16vw] leading-[0.8] md:text-[13vw]">
          <span className="contact-word block overflow-hidden">
            <span className="block">Let&apos;s</span>
          </span>
          <span className="contact-word block overflow-hidden">
            <span className="block pl-[10vw] chroma-text">build</span>
          </span>
        </h2>

        <a
          href={`mailto:${PROFILE.email}`}
          className="glitch mt-12 inline-block font-display text-2xl font-semibold tracking-tight md:text-5xl"
          data-text={PROFILE.email}
        >
          {PROFILE.email}
        </a>

        <div className="mt-16 flex flex-wrap items-center gap-6 border-t border-bone/15 pt-8 text-[10px] uppercase tracking-[0.3em] text-bone/60">
          <a href={PROFILE.github} target="_blank" rel="noreferrer" className="hover:text-vermilion">
            GitHub ↗
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="hover:text-vermilion">
            LinkedIn ↗
          </a>
          <a href={`tel:${PROFILE.phone.replace(/\s/g, "")}`} className="hover:text-vermilion">
            {PROFILE.phone}
          </a>
          <span className="ml-auto">© 2026 {PROFILE.name}</span>
        </div>
      </div>
    </footer>
  );
}
