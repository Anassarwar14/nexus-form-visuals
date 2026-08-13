import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCE } from "./data";
import { SectionLabel } from "./BlurReveal";

export function Experience() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

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
      gsap.from(".xp-card", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 60%" },
      });
      return () => tween.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      id="work"
      className="relative overflow-hidden bg-bone py-24 md:h-[100svh] md:py-0"
    >
      <div className="flex h-full flex-col justify-center px-5 md:px-10">
        <SectionLabel>Where I&apos;ve worked</SectionLabel>
        <div
          ref={track}
          className="flex flex-col gap-6 md:w-max md:flex-row md:gap-8 md:pr-24"
        >
          {EXPERIENCE.map((job) => (
            <article
              key={job.company}
              className="xp-card glass flex flex-col rounded-2xl p-8 md:h-[62vh] md:w-[46vw] md:p-10"
            >
              <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <span>{job.index}</span>
                <span>{job.period}</span>
              </div>
              <h3 className="mt-6 font-display text-5xl font-extrabold uppercase leading-[0.85] tracking-tight md:text-7xl">
                {job.company}
              </h3>
              <p className="mt-3 font-serif text-lg italic text-ink/70">
                {job.role} — {job.place}
              </p>
              <ul className="mt-6 flex-1 space-y-3 overflow-hidden text-[13px] leading-relaxed text-ink/75">
                {job.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-vermilion" />
                    <span className="font-serif text-[15px]">{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {job.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-ink/20 px-3 py-1 text-[9px] uppercase tracking-[0.2em]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
