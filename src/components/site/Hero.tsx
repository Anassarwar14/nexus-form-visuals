import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { PROFILE } from "./data";
import chrome from "@/assets/hero-chrome.jpg";
import reed from "@/assets/hero-reed.jpg";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero-img", { clipPath: "inset(100% 0% 0% 0%)" });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero-line span", { yPercent: 115, duration: 1.5, stagger: 0.1 })
        .to(
          ".hero-img",
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, stagger: 0.12 },
          0.35,
        )
        .from(".hero-img img", { scale: 1.35, duration: 1.8, stagger: 0.12 }, 0.35)
        .from(
          ".hero-meta",
          { y: 24, opacity: 0, duration: 1, stagger: 0.07 },
          0.75,
        )
        .from(".hero-rule", { scaleX: 0, duration: 1.2, transformOrigin: "left" }, 0.5);

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
      {/* soft chromatic wash, kept faint so white space breathes */}
      <div
        className="pointer-events-none absolute -right-[18%] top-[6%] -z-10 h-[52vw] w-[52vw] rounded-full opacity-[0.18] blur-[120px]"
        style={{ background: "var(--gradient-chroma)" }}
        aria-hidden
      />

      <div className="hero-meta relative z-30 flex items-start justify-between text-[10px] uppercase tracking-[0.34em] text-muted-foreground">
        <span>{PROFILE.location} · 24°N</span>
        <span className="hidden md:block">Available — Q3 2026</span>
        <span>Portfolio ’26</span>
      </div>

      {/* NAME */}
      <div className="relative mt-10 md:mt-0">
        <h1 className="hero-slab relative z-10 text-[17vw] leading-[0.78] md:max-w-[80%] md:text-[8.4vw]">
          <span className="hero-line block overflow-hidden">
            <span className="block">Mohammad</span>
          </span>
          <span className="hero-line -mt-[1.2vw] flex items-end gap-[3vw] overflow-hidden">
            <span className="block text-vermilion">Anas</span>
          </span>
        </h1>

        {/* floating imagery in the negative space */}
        <figure className="hero-img float-a absolute -top-[7vw] right-0 z-20 hidden w-[20vw] rotate-[3deg] overflow-hidden shadow-[var(--shadow-slab)] md:block">
          <img
            src={chrome}
            alt="Liquid chrome sculpture in raking sunlight"
            width={1024}
            height={1344}
            className="h-full w-full object-cover"
          />
        </figure>

        <figure className="hero-img float-b absolute -bottom-[6vw] right-[23vw] z-0 hidden w-[14vw] -rotate-[5deg] overflow-hidden md:block">
          <img
            src={reed}
            alt="Light refracted through reeded glass"
            width={1024}
            height={768}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </figure>
      </div>

      <div className="hero-rule mt-14 h-px w-full bg-ink/15 md:mt-24" aria-hidden />

      <div className="mt-6 grid gap-8 md:grid-cols-12 md:items-end">
        <p className="hero-meta edito col-span-5 text-[7vw] leading-[1.02] md:text-[2.6vw]">
          I build <em className="text-vermilion">agentic</em> products, LLM pipelines
          and interfaces that feel physically fast.
        </p>

        <div className="hero-meta col-span-3 hidden text-[10px] uppercase leading-relaxed tracking-[0.28em] text-muted-foreground md:block">
          Full stack &amp; AI engineer
          <br />
          RAG · tool calling · design engineering
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

      {/* mobile image strip */}
      <div className="hero-img mt-8 aspect-[16/9] w-full overflow-hidden md:hidden">
        <img
          src={chrome}
          alt="Liquid chrome sculpture in raking sunlight"
          width={1024}
          height={1344}
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
