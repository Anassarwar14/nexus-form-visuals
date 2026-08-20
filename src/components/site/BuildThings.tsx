import chrome from "@/assets/hero-chrome.jpg";
import reed from "@/assets/hero-reed.jpg";
import caustic from "@/assets/hero-caustic.jpg";
import portal from "@/assets/hero-portal.jpg";

const PALETTE = [
  "oklch(0.63 0.238 32)",
  "oklch(0.78 0.13 205)",
  "oklch(0.86 0.17 88)",
  "oklch(0.55 0.2 300)",
  "oklch(0.72 0.19 145)",
  "oklch(0.7 0.2 355)",
];

function letterFill(i: number) {
  const pick = (n: number) => PALETTE[(i * 3 + n) % PALETTE.length];
  return {
    backgroundImage: [
      `radial-gradient(circle at 20% 24%, ${pick(0)} 0 26%, transparent 27%)`,
      `radial-gradient(circle at 62% 18%, ${pick(1)} 0 22%, transparent 23%)`,
      `radial-gradient(circle at 34% 56%, ${pick(2)} 0 24%, transparent 25%)`,
      `radial-gradient(circle at 78% 62%, ${pick(3)} 0 26%, transparent 27%)`,
      `radial-gradient(circle at 48% 90%, ${pick(5)} 0 24%, transparent 25%)`,
      `radial-gradient(circle at 88% 92%, ${pick(0)} 0 20%, transparent 21%)`,
      `linear-gradient(${pick(4)}, ${pick(4)})`,
    ].join(","),
    WebkitBackgroundClip: "text",
    backgroundClip: "text" as const,
    color: "transparent",
  };
}

const WORD = "I build things";

const CHIPS = [
  { src: portal, alt: "Abstract chromatic portal artwork", w: "3.1em" },
  { src: chrome, alt: "Liquid chrome sculpture", w: "2.4em" },
  { src: caustic, alt: "Amber caustic light study", w: "2.8em" },
  { src: reed, alt: "Light through reeded glass", w: "2.2em" },
];

function Chip({ i }: { i: number }) {
  const c = CHIPS[i]!;

  return (
    <span
      className="inline-chip h-[1.05em] align-middle"
      style={{ width: c.w, animationDelay: `${0.2 + i * 0.12}s` }}
    >
      <img src={c.src} alt={c.alt} loading="lazy" className="h-full w-full object-cover" />
    </span>
  );
}

export function BuildThings() {
  return (
    <section className="relative bg-ink px-5 py-20 md:px-10 md:py-28">
      <h2
        className="nameplate flex w-full flex-nowrap justify-between whitespace-nowrap text-[11.6vw] leading-[0.9]"
        aria-label={WORD}
      >
        {WORD.split("").map((ch, i) =>
          ch === " " ? (
            <span key={i} className="w-[0.22em]" />
          ) : (
            <span key={i} style={letterFill(i)} aria-hidden>
              {ch}
            </span>
          ),
        )}
      </h2>

      <p className="mt-14 max-w-4xl edito text-[6vw] leading-[1.25] text-bone/90 md:text-[2.6vw]">
        I ship <Chip i={0} /> production systems — agentic backends,{" "}
        <Chip i={1} /> retrieval pipelines and type-safe{" "}
        <Chip i={2} /> interfaces that stay fast <Chip i={3} /> under load.
      </p>
    </section>
  );
}
