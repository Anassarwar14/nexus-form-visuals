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

function Chip({ src, alt, w = "2.6em" }: { src: string; alt: string; w?: string }) {
  return (
    <span className="inline-chip align-middle" style={{ width: w, height: "1.5em" }}>
      <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
    </span>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setActive((i) => (i + 1) % DECK.length), 3800);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero-img", { clipPath: "inset(100% 0% 0% 0%)" });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.15 });
      tl.from(".hero-line span", { yPercent: 115, duration: 1.5, stagger: 0.12 })
        .to(".hero-img", { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, stagger: 0.12 }, 0.4)
        .from(".hero-img img", { scale: 1.35, duration: 1.8, stagger: 0.12 }, 0.4)
        .from(".hero-meta", { y: 24, opacity: 0, duration: 1, stagger: 0.07 }, 0.8)
        .from(".hero-rule", { scaleX: 0, duration: 1.2, transformOrigin: "left" }, 0.55)
        .from(".inline-chip", { scale: 0, duration: 0.9, stagger: 0.08, ease: "back.out(2)" }, 1);

      const onMove = (e: PointerEvent) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        gsap.to(".float-a", { x: x * -34, y: y * -24, duration: 1.4, ease: "power3.out" });
        gsap.to(".float-b", { x: x * 46, y: y * 30, duration: 1.6, ease: "power3.out" });
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
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pb-8 pt-28 md:px-10 md:pb-12 md:pt-36"
    >
      <div className="silk pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70vh] opacity-[0.5]" aria-hidden />

      <div className="hero-meta relative z-30 flex items-start justify-between text-[10px] uppercase tracking-[0.34em] text-muted-foreground">
        <span>{PROFILE.location} ✦ 24°N</span>
        <span className="hidden md:block">Available ✦ Q3 2026</span>
        <span>Portfolio ’26</span>
      </div>

      {/* NAMEPLATE */}
      <div className="relative mt-16 md:mt-6">
        <h1 className="nameplate relative z-10 text-[16vw] md:max-w-[70%] md:text-[8.4vw]">
          <span className="hero-line block overflow-hidden">
            <span className="block">Mohammad</span>
          </span>
          <span className="hero-line mt-[0.5vw] block overflow-hidden">
            <span className="block text-vermilion">Anas</span>
          </span>
        </h1>

        {/* rotating deck of art-directed frames in the negative space */}
        <div className="hero-img float-a absolute -top-[9vw] right-[2vw] z-20 hidden aspect-[4/5] w-[19vw] overflow-hidden rotate-[3deg] shadow-[var(--shadow-slab)] md:block">
          {DECK.map((d, i) => (
            <img
              key={d.src}
              src={d.src}
              alt={d.alt}
              width={1024}
              height={1280}
              className="absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)]"
              style={{
                opacity: i === active ? 1 : 0,
                transform: i === active ? "scale(1)" : "scale(1.08)",
              }}
            />
          ))}
        </div>

        <figure className="hero-img float-b absolute -bottom-[7vw] right-[24vw] z-0 hidden w-[13vw] -rotate-[5deg] overflow-hidden md:block">
          <img
            src={DECK[(active + 1) % DECK.length]!.src}
            alt="Art-directed texture study"
            width={1024}
            height={768}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </figure>
      </div>

      <div className="hero-rule mt-20 h-px w-full bg-ink/15 md:mt-28" aria-hidden />

      <div className="mt-6 grid gap-8 md:grid-cols-12 md:items-end">
        <p className="hero-meta edito col-span-6 text-[6.6vw] leading-[1.06] md:text-[2.5vw]">
          I ship <Chip src={caustic} alt="Caustic light study" /> production systems —
          agentic backends, <Chip src={chrome} alt="Chrome sculpture" w="3em" /> retrieval
          pipelines and <em className="text-vermilion">type-safe</em> interfaces{" "}
          <Chip src={reed} alt="Reeded glass study" /> that stay fast under load.
        </p>

        <div className="hero-meta col-span-2 hidden text-[10px] uppercase leading-relaxed tracking-[0.28em] text-muted-foreground md:block">
          Software engineer
          <br />
          Distributed systems ✦ LLM infra
        </div>

        <div className="hero-meta col-span-4 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.3em] md:justify-end">
          <a
            href="#work"
            className="rounded-full border border-ink/25 px-6 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-ink"
          >
            Selected work
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            className="rounded-full bg-ink px-6 py-3 text-bone transition-transform duration-300 hover:-translate-y-1"
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* mobile deck */}
      <div className="hero-img mt-8 aspect-[16/9] w-full overflow-hidden md:hidden">
        <img
          src={DECK[active]!.src}
          alt={DECK[active]!.alt}
          width={1024}
          height={1280}
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
