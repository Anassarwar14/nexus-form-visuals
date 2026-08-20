import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const NAMES = ["أنس", "アナス", "안녕 아나스", "Anas"];

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
        duration: 0.8,
        ease: "expo.out",
      });

      NAMES.forEach((n, i) => {
        const last = i === NAMES.length - 1;
        tl.call(() => {
          if (nameRef.current) nameRef.current.textContent = n;
        });
        tl.fromTo(
          nameRef.current,
          { x: 26, opacity: 0 },
          { x: 0, opacity: 1, duration: last ? 0.42 : 0.2, ease: "power2.out" },
          i === 0 ? "-=0.3" : undefined,
        );
        if (!last) {
          tl.to(nameRef.current, {
            x: -26,
            opacity: 0,
            duration: 0.18,
            ease: "power2.in",
            delay: 0.12,
          });
        }
      });

      tl.to(".pre-word", { yPercent: -130, duration: 0.9, ease: "expo.inOut" }, "+=0.6");
      tl.to(
        ".pre-slat",
        { scaleY: 0, transformOrigin: "top", duration: 1, ease: "expo.inOut", stagger: 0.07 },
        "-=0.6",
      );
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
        <span className="pre-word slick flex items-baseline gap-[0.3em] whitespace-nowrap text-[7vw] leading-none text-bone md:text-[3.4vw]">
          <span className="pre-static inline-block overflow-hidden">
            <span className="inline-block">hello! i am</span>
          </span>
          <span ref={nameRef} className="inline-block min-w-[3.5em] text-bone" />
        </span>
      </div>
    </div>
  );
}
