import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const LINKS = [
  { label: "Profile", href: "#about", idx: "01" },
  { label: "Work", href: "#work", idx: "02" },
  { label: "Projects", href: "#projects", idx: "03" },
  { label: "Contact", href: "#contact", idx: "04" },
];

function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Karachi",
        }).format(new Date()),
      );
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

export function Nav() {
  const root = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const time = useClock();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-item", {
        y: -18,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.06,
        delay: 0.15,
      });
    }, root);

    const onScroll = () => {
      const doc = document.documentElement;
      const p = doc.scrollTop / Math.max(1, doc.scrollHeight - doc.clientHeight);
      gsap.set(bar.current, { scaleX: p });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      ctx.revert();
    };
  }, []);

  return (
    <nav
      ref={root}
      className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-bone/55 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between px-5 py-3.5 text-[10px] uppercase tracking-[0.28em] md:px-10">
        <a href="#top" className="nav-item flex items-baseline gap-3">
          <span className="hero-slab text-base leading-none tracking-[-0.03em]">MA</span>
          <span className="hidden text-muted-foreground md:inline">
            Full stack · AI engineer
          </span>
        </a>

        <span className="nav-item hidden font-mono text-muted-foreground md:block">
          Karachi <span className="text-ink tabular-nums">{time}</span>
        </span>

        <ul className="flex items-center gap-1">
          {LINKS.map((l) => (
            <li key={l.href} className="nav-item">
              <a
                href={l.href}
                className="group relative flex items-center gap-1.5 overflow-hidden px-3 py-2"
              >
                <span className="text-[8px] text-muted-foreground">{l.idx}</span>
                <span className="relative block h-[1em] overflow-hidden">
                  <span className="block transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-full">
                    {l.label}
                  </span>
                  <span className="absolute inset-0 block translate-y-full text-vermilion transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0">
                    {l.label}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div
        ref={bar}
        className="h-px w-full origin-left scale-x-0 bg-vermilion"
        aria-hidden
      />
    </nav>
  );
}
