import { BlurReveal, SectionLabel } from "./BlurReveal";
import { SKILLS } from "./data";

export function About() {
  return (
    <section id="about" className="relative px-5 py-28 md:px-10">
      <div className="grid gap-16 md:grid-cols-[1.4fr_1fr]">
        <div>
          <SectionLabel>Profile</SectionLabel>
          <BlurReveal
            className="max-w-3xl font-display text-3xl font-semibold leading-[1.08] tracking-tight md:text-[3.4vw]"
            text="I'm a computer science senior at FAST Karachi and a three-time Dean's List honoree, shipping production software for teams in Australia, the US and Pakistan — mostly at the seam where LLMs meet real product surfaces."
          />
          <BlurReveal
            className="mt-8 max-w-2xl font-serif text-lg leading-relaxed text-ink/70 md:text-xl"
            text="Agentic workflows, tool-calling pipelines, retrieval that actually grounds answers, billing that doesn't break — plus the interface craft to make all of it feel effortless."
          />
        </div>

        <aside className="glass h-fit rounded-2xl p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Education
          </p>
          <p className="mt-4 font-display text-2xl font-semibold leading-tight">
            B.S. Computer Science
          </p>
          <p className="mt-1 font-serif italic text-ink/70">
            FAST — NUCES, Karachi · 2022–2026
          </p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-vermilion">
            Dean&apos;s List of Honor ×3
          </p>

          <div className="mt-8 h-px w-full bg-ink/15" />

          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Certifications
          </p>
          <ul className="mt-4 space-y-2 font-serif text-[15px] text-ink/75">
            <li>Developing LLM Apps with LangChain — DataCamp</li>
            <li>Advanced React Development — Meta</li>
          </ul>
        </aside>
      </div>

      <div id="stack" className="mt-28">
        <SectionLabel>Toolkit</SectionLabel>
        <div className="grid gap-px overflow-hidden rounded-2xl bg-ink/15 md:grid-cols-4">
          {SKILLS.map((group) => (
            <div key={group.label} className="group bg-bone p-8 transition-colors duration-500 hover:bg-ink">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground transition-colors group-hover:text-bone/50">
                {group.label}
              </p>
              <ul className="mt-6 space-y-2">
                {group.items.map((s) => (
                  <li
                    key={s}
                    className="font-display text-lg font-semibold tracking-tight transition-colors duration-500 group-hover:text-bone"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
