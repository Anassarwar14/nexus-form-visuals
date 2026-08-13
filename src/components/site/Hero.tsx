import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { PROFILE } from "./data";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const blobA = useRef<HTMLDivElement>(null);
  const blobB = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero-line span", {
        yPercent: 118,
        duration: 1.5,
        stagger: 0.09,
      })
        .from(".hero-ghost", { opacity: 0, scale: 1.08, duration: 1.6 }, 0.15)
        .from(
          ".hero-meta",
          { y: 26, opacity: 0, duration: 1.1, stagger: 0.08 },
          0.6,
        )
        .from(".hero-reed", { scaleY: 0, duration: 1.4, transformOrigin: "bottom" }, 0.2);

      gsap.to(blobA.current, {
        xPercent: 12,
        yPercent: -14,
        duration: 13,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(blobB.current, {
        xPercent: -16,
        yPercent: 12,
        duration: 17,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const onMove = (e: PointerEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(".hero-stack", {
          rotateY: x * 7,
          rotateX: -y * 5,
          duration: 1.1,
          ease: "power3.out",
        });
        gsap.to(".hero-ghost", {
          x: -x * 34,
          y: -y * 22,
          duration: 1.4,
          ease: "power3.out",
        });
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
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pb-10 pt-28 md:px-10"
    >
      {/* chromatic depth field */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          ref={blobA}
          className="absolute left-[6%] top-[14%] h-[46vw] w-[46vw] rounded-full opacity-70 blur-[90px]"
          style={{ background: "var(--gradient-chroma)" }}
        />
        <div
          ref={blobB}
          className="absolute right-[4%] top-[38%] h-[38vw] w-[38vw] rounded-full opacity-50 blur-[110px]"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, var(--color-cyanide), transparent 70%)",
          }}
        />
        <div className="hero-reed reeded absolute inset-y-0 right-0 w-[34%] opacity-70 md:w-[26%]" />
      </div>

      <header className="flex items-start justify-between text-[10px] uppercase tracking-[0.34em] text-muted-foreground">
        <span className="hero-meta">{PROFILE.location}</span>
        <span className="hero-meta hidden md:block">Available for work — 2026</span>
        <span className="hero-meta">Portfolio ’26</span>
      </header>

      <div className="hero-stack relative [perspective:1200px]">
        <span
          aria-hidden
          className="hero-ghost hero-slab chroma-text pointer-events-none absolute -top-[6%] left-0 select-none text-[26vw] opacity-40 blur-[2px]"
        >
          ANAS
        </span>

        <h1 className="relative hero-slab text-[15.5vw] leading-[0.78] md:text-[13vw]">
          <span className="hero-line block overflow-hidden">
            <span className="extrude block">Mohammad</span>
          </span>
          <span className="hero-line block overflow-hidden">
            <span className="extrude block pl-[8vw] text-vermilion">Anas</span>
          </span>
        </h1>

        <span
          aria-hidden
          className="hero-ghost hero-slab pointer-events-none absolute -bottom-[26%] right-0 select-none text-[14vw] text-ink/[0.06]"
        >
          ENGINEER
        </span>
      </div>

      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <p className="hero-meta max-w-md font-serif text-lg leading-snug text-ink/80 md:text-2xl">
          <em>Full stack &amp; AI engineer.</em> I build agentic products, LLM
          pipelines and interfaces that feel physically fast.
        </p>
        <div className="hero-meta flex items-center gap-3 text-[10px] uppercase tracking-[0.3em]">
          <a
            href="#work"
            className="glass rounded-full px-6 py-3 transition-transform duration-300 hover:-translate-y-1"
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
    </section>
  );
}
