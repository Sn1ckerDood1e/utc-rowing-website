import Link from "next/link";

const links = [
  { href: "/history", label: "History" },
  { href: "/alumni", label: "Alumni" },
  { href: "/submit", label: "Submit" },
  { href: "/donate", label: "Donate" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="bg-utc-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-wide text-lg">
          <span className="text-utc-gold">UTC</span>
          <span className="ml-2">Rowing</span>
        </Link>
        <nav>
          <ul className="flex gap-1 sm:gap-4 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="px-2 py-1 rounded hover:bg-utc-navy-deep hover:text-utc-gold-bright transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
