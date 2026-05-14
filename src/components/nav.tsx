"use client";

import Link from "next/link";
import { useState } from "react";
import { UTCMark } from "./svg-rowing";

const links = [
  { href: "/history", label: "History" },
  { href: "/team", label: "Team" },
  { href: "/alumni", label: "Alumni" },
  { href: "/journal", label: "Journal" },
  { href: "/join", label: "Join" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-utc-navy/95 backdrop-blur-md text-white border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center"
          onClick={() => setOpen(false)}
        >
          <UTCMark className="text-base text-white" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:block">
          <ul className="flex gap-1 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="px-3 py-2 rounded font-medium hover:bg-white/10 hover:text-utc-gold-bright transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="ml-2">
              <Link
                href="/donate"
                className="inline-block bg-utc-gold text-utc-navy-deep px-4 py-2 rounded font-semibold hover:bg-utc-gold-bright transition-colors"
              >
                Support →
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile button */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded hover:bg-white/10"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></>}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav id="mobile-nav" className="md:hidden border-t border-white/10 bg-utc-navy-deep">
          <ul className="px-4 py-3 flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-3 rounded font-medium hover:bg-white/10 hover:text-utc-gold-bright transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link
                href="/donate"
                onClick={() => setOpen(false)}
                className="block px-3 py-3 rounded font-semibold text-center bg-utc-gold text-utc-navy-deep hover:bg-utc-gold-bright transition-colors"
              >
                Support →
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
