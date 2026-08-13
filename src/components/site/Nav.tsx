const LINKS = [
  { label: "Profile", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  return (
    <nav className="fixed left-1/2 top-5 z-50 -translate-x-1/2">
      <ul className="glass flex items-center gap-1 rounded-full px-2 py-2 text-[10px] uppercase tracking-[0.24em]">
        <li>
          <a href="#top" className="rounded-full px-4 py-2 font-semibold">
            MA
          </a>
        </li>
        {LINKS.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="rounded-full px-4 py-2 transition-colors duration-300 hover:bg-ink hover:text-bone"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
