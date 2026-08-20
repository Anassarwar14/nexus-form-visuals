import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import portal from "@/assets/hero-portal.jpg";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.1 });
      tl.fromTo(
        ".hero-frame",
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5 },
      )
        .from(".hero-frame img", { scale: 1.22, duration: 1.8 }, 0)
        .from(".hero-line span", { yPercent: 112, duration: 1.5, stagger: 0.08 }, 0.35);

      const onMove = (e: PointerEvent) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        gsap.to(".hero-frame", { x: x * -22, y: y * -16, duration: 1.4, ease: "power3.out" });
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
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-6 md:px-8 md:pb-8"
    >
      <div className="silk pointer-events-none absolute inset-0 -z-10" aria-hidden />

      <div className="hero-frame pointer-events-none absolute left-1/2 top-[13vh] z-10 aspect-[4/5] w-[62vw] -translate-x-1/2 overflow-hidden shadow-[var(--shadow-slab)] md:w-[26vw]">
        <img
          src={portal}
          alt="Abstract chromatic portal print in electric blue and molten orange"
          width={1280}
          height={1600}
          className="h-full w-full object-cover"
        />
      </div>

      <h1 className="relative z-20 mix-blend-difference">
        <span className="nameplate block text-[16.2vw] leading-[0.78] text-bone">
          <span className="hero-line block overflow-hidden">
            <span className="block">Mohammad</span>
          </span>
          <span className="hero-line block overflow-hidden">
            <span className="block">Anas</span>
          </span>
        </span>
      </h1>
    </section>
  );
}
