import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const GREETINGS = [
  "Hello",
  "السلام علیکم",
  "Bonjour",
  "こんにちは",
  "Hola",
  "안녕하세요",
  "Olá",
  "Ciao",
  "Anas",
];

export function Preloader({ onDone }: { onDone?: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setGone(true);
          onDone?.();
        },
      });

      GREETINGS.forEach((g, i) => {
        tl.call(() => {
          if (wordRef.current) wordRef.current.textContent = g;
        });
        tl.fromTo(
          wordRef.current,
          { yPercent: 60, opacity: 0, filter: "blur(10px)" },
          {
            yPercent: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: i === 0 ? 0.4 : 0.22,
            ease: "expo.out",
          },
        );
        tl.to(wordRef.current, {
          yPercent: -55,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.2,
          ease: "power2.in",
          delay: i === GREETINGS.length - 1 ? 0.35 : 0.03,
        });
      });

      tl.to(".pre-dot", { scale: 220, duration: 0.7, ease: "expo.inOut" }, "-=0.1");
      tl.to(".pre-panel", { yPercent: -101, duration: 0.9, ease: "expo.inOut" }, "-=0.35");
      tl.to(root.current, { autoAlpha: 0, duration: 0.2 }, "-=0.15");
    }, root);

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, [onDone]);

  if (gone) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[80]" aria-hidden>
      <div className="pre-panel absolute inset-0 flex items-center justify-center bg-ink">
        <span
          ref={wordRef}
          className="nameplate text-[11vw] leading-none text-bone md:text-[5.5vw]"
        />
        <span className="pre-dot absolute h-3 w-3 rounded-full bg-vermilion opacity-90" />
      </div>
    </div>
  );
}
