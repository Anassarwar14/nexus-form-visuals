import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "./data";
import { SectionLabel } from "./BlurReveal";

export function Projects() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".proj-row").forEach((row) => {
        gsap.from(row, {
          yPercent: 30,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: row, start: "top 88%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="projects"
      className="relative bg-ink px-5 py-28 text-bone md:px-10"
    >
      <div className="mb-10 flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-bone/50">
        <span className="h-px w-14 bg-bone/30" />
        Selected projects
      </div>

      <div className="border-t border-bone/15">
        {PROJECTS.map((p, i) => {
          const active = open === i;
          return (
            <div key={p.name} className="proj-row border-b border-bone/15">
              <button
                onClick={() => setOpen(active ? -1 : i)}
                className="group flex w-full items-center justify-between gap-6 py-8 text-left"
              >
                <div className="flex items-baseline gap-6">
                  <span className="font-mono text-[10px] text-bone/40">
                    0{i + 1}
                  </span>
                  <h3
                    className={`font-display text-[9vw] font-extrabold uppercase leading-[0.85] tracking-tighter transition-all duration-500 md:text-[5.6vw] ${
                      active ? "chroma-text" : "text-bone group-hover:text-vermilion"
                    }`}
                  >
                    {p.name}
                  </h3>
                </div>
                <div className="hidden shrink-0 text-right md:block">
                  <p className="font-serif text-sm italic text-bone/60">{p.tag}</p>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.3em] text-bone/40">
                    {p.year} {active ? "—" : "+"}
                  </p>
                </div>
              </button>

              <div
                className="grid transition-[grid-template-rows] duration-700 ease-out"
                style={{ gridTemplateRows: active ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <div className="grid gap-8 pb-12 md:grid-cols-[1.2fr_1fr]">
                    <div>
                      <p className="font-serif text-xl leading-snug text-bone/85 md:text-2xl">
                        {p.blurb}
                      </p>
                      <ul className="mt-6 space-y-2 font-serif text-[15px] text-bone/60">
                        {p.detail.map((d) => (
                          <li key={d} className="flex gap-3">
                            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-cyanide" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="reeded flex flex-col justify-between rounded-2xl p-6">
                      <div className="flex flex-wrap gap-2">
                        {p.stack.map((s) => (
                          <span
                            key={s}
                            className="rounded-full border border-bone/25 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-bone/80"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-bone px-5 py-3 text-[10px] uppercase tracking-[0.3em] text-ink transition-transform duration-300 hover:-translate-y-1"
                      >
                        View source ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
