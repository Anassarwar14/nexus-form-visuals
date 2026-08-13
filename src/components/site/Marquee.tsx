import { MARQUEE } from "./data";

export function Marquee() {
  const row = [...MARQUEE, ...MARQUEE];
  return (
    <div className="relative border-y border-ink/15 bg-ink py-4 text-bone">
      <div className="flex w-max marquee-track">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 whitespace-nowrap px-8 text-[11px] uppercase tracking-[0.4em]"
          >
            {item}
            <span className="text-vermilion">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
