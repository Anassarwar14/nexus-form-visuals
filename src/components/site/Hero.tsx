import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { PROFILE } from "./data";
import chrome from "@/assets/hero-chrome.jpg";
import reed from "@/assets/hero-reed.jpg";
import caustic from "@/assets/hero-caustic.jpg";

const DECK = [
  { src: chrome, alt: "Liquid chrome sculpture in raking sunlight" },
  { src: caustic, alt: "Amber caustic light rippling across concrete" },
  { src: reed, alt: "Light refracted through reeded glass" },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setActive((i) => (i + 1) % DECK.length), 4200);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.15 });
      tl.from(".hero-line span", { yPercent: 110, duration: 1.6, stagger: 0.1 })
        .fromTo(
          ".hero-frame",
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5 },
          0.35,
        )
        .from(".hero-frame img", { scale: 1.3, duration: 1.9 }, 0.35)
        .from(".hero-meta", { y: 18, opacity: 0, duration: 1, stagger: 0.08 }, 0.7);

      const onMove = (e: PointerEvent) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        gsap.to(".float-a", { x: x * -28, y: y * -20, duration: 1.4, ease: "power3.out" });
      };
      window.addEventListener("pointermove", onMove);
      return () => window.removeEventListener("pointermove", onMove);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pb-6 pt-10 md:px-8 md:pb-8"
    >
      <div className="silk pointer-events-none absolute inset-0 -z-10 opacity-[0.55]" aria-hidden />

      {/* top meta only — everything else breathes */}
      <div className="hero-meta relative z-30 flex items-start justify-between text-[10px] uppercase tracking-[0.34em] text-muted-foreground">
        <span>{PROFILE.location} ✦ 24°N</span>
        <span className="hidden md:block">Software engineer ✦ Available Q3 2026</span>
        <span>’26</span>
      </div>

      {/* one carefully placed frame in the negative space */}
      <div className="hero-frame float-a pointer-events-none absolute right-5 top-[22vh] z-10 aspect-[3/4] w-[46vw] overflow-hidden shadow-[var(--shadow-slab)] md:right-[8vw] md:top-[16vh] md:w-[19vw]">
        {DECK.map((d, i) => (
          <img
            key={d.src}
            src={d.src}
            alt={d.alt}
            width={1024}
            height={1365}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)]"
            style={{
              opacity: i === active ? 1 : 0,
              transform: i === active ? "scale(1)" : "scale(1.07)",
            }}
          />
        ))}
      </div>

      {/* bottom-corner nameplate */}
      <div className="relative z-20 mt-auto">
        <div className="hero-meta mb-4 flex items-end justify-between text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span className="max-w-[16ch] leading-relaxed md:max-w-none">
            Distributed systems ✦ LLM infra
          </span>
          <a
            href={`mailto:${PROFILE.email}`}
            className="hidden border-b border-ink/30 pb-1 text-ink transition-colors hover:border-vermilion hover:text-vermilion md:block"
          >
            Get in touch
          </a>
        </div>

        <h1 className="nameplate text-[15.4vw] leading-[0.78]">
          <span className="hero-line block overflow-hidden">
            <span className="block">Mohammad</span>
          </span>
          <span className="hero-line block overflow-hidden">
            <span className="block">Anas</span>
          </span>
        </h1>
      </div>
    </section>
  );
}
