import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCE } from "./data";
import { SectionLabel } from "./BlurReveal";

export function Experience() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 900px)", () => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth + 80;
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      return () => tween.kill();
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const job = open !== null ? EXPERIENCE[open] : null;

  return (
    <section
      ref={root}
      id="work"
      className="relative overflow-hidden bg-bone py-24 md:h-[100svh] md:py-0"
    >
      <div className="flex h-full flex-col justify-center px-5 md:px-10">
        <SectionLabel>Where I&apos;ve worked</SectionLabel>
        <div ref={track} className="flex flex-col gap-6 md:w-max md:flex-row md:gap-8 md:pr-24">
          {EXPERIENCE.map((j, i) => (
            <article
              key={j.company}
              className="xp-card glass flex flex-col rounded-2xl p-8 md:h-[58vh] md:w-[42vw] md:p-10"
            >
              <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <span>{j.index}</span>
                <span>{j.period}</span>
              </div>
              <h3 className="mt-6 nameplate text-5xl leading-[0.85] md:text-7xl">{j.company}</h3>
              <p className="mt-3 edito text-2xl text-ink/70">
                {j.role} ✦ {j.place}
              </p>
              <p className="mt-5 flex-1 line-clamp-3 font-serif text-[15px] leading-relaxed text-ink/70">
                {j.bullets[0]}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {j.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-ink/20 px-3 py-1 text-[9px] uppercase tracking-[0.2em]"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group mt-6 flex items-center justify-between border-t border-ink/15 pt-4 text-[10px] uppercase tracking-[0.3em] text-ink transition-colors hover:text-vermilion"
              >
                Read the full brief
                <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </button>
            </article>
          ))}
        </div>
      </div>

      {job && (
        <div className="fixed inset-0 z-[70] flex justify-end bg-ink/40 backdrop-blur-sm animate-fade-in">
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 cursor-default"
            onClick={() => setOpen(null)}
          />
          <aside className="relative flex h-full w-full max-w-2xl flex-col overflow-y-auto bg-bone px-6 py-10 shadow-[var(--shadow-slab)] md:px-12 animate-slide-in-right">
            <div className="flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              <span>{job.period}</span>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="tracking-[0.3em] text-ink hover:text-vermilion"
              >
                Close ✕
              </button>
            </div>
            <h3 className="nameplate mt-8 text-6xl leading-[0.85] md:text-8xl">{job.company}</h3>
            <p className="mt-4 edito text-3xl text-ink/70">
              {job.role} ✦ {job.place}
            </p>
            <ul className="mt-10 space-y-5">
              {job.bullets.map((b, i) => (
                <li key={i} className="flex gap-4">
                  <span className="mt-[10px] h-1 w-1 shrink-0 rounded-full bg-vermilion" />
                  <span className="font-serif text-[17px] leading-relaxed text-ink/80">{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-2 pb-4">
              {job.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-ink/20 px-3 py-1 text-[9px] uppercase tracking-[0.2em]"
                >
                  {s}
                </span>
              ))}
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
