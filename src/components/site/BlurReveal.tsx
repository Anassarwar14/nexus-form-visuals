import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function BlurReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(".blur-word", {
        filter: "blur(0px)",
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.035,
        scrollTrigger: { trigger: ref.current, start: "top 78%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <p ref={ref} className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="blur-word mr-[0.28em]">
          {w}
        </span>
      ))}
    </p>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-10 flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
      <span className="h-px w-14 bg-ink/30" />
      {children}
    </div>
  );
}
