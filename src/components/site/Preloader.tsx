import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const NAMES = ["Anas", "أنس", "アナス", "Anas"];

export function Preloader({ onDone }: { onDone?: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
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

      tl.from(".pre-static span", {
        yPercent: 120,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.05,
      });

      NAMES.forEach((n, i) => {
        tl.call(() => {
          if (nameRef.current) nameRef.current.textContent = n;
        });
        tl.fromTo(
          nameRef.current,
          { xPercent: 22, opacity: 0, letterSpacing: "0.4em" },
          {
            xPercent: 0,
            opacity: 1,
            letterSpacing: "-0.04em",
            duration: 0.6,
            ease: "expo.out",
          },
          i === 0 ? "-=0.35" : undefined,
        );
        if (i < NAMES.length - 1) {
          tl.to(nameRef.current, {
            xPercent: -22,
            opacity: 0,
            letterSpacing: "0.4em",
            duration: 0.42,
            ease: "power2.in",
            delay: 0.22,
          });
        }
      });

      tl.to(".pre-word", { yPercent: -130, duration: 0.9, ease: "expo.inOut", stagger: 0.05 }, "+=0.45");
      tl.to(".pre-slat", { scaleY: 0, transformOrigin: "top", duration: 1, ease: "expo.inOut", stagger: 0.07 }, "-=0.6");
      tl.set(root.current, { autoAlpha: 0 });
    }, root);

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, [onDone]);

  if (gone) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[80] overflow-hidden" aria-hidden>
      <div className="absolute inset-0 flex">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="pre-slat h-full flex-1 bg-ink" />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <span className="pre-word nameplate flex items-baseline gap-[0.28em] whitespace-nowrap text-[8vw] leading-none text-bone md:text-[4.2vw]">
          <span className="pre-static inline-block overflow-hidden">
            <span className="inline-block">Hello! I am</span>
          </span>
          <span ref={nameRef} className="inline-block text-vermilion" />
        </span>
      </div>
    </div>
  );
}
