import Link from "next/link";
import { OarMark } from "./svg-rowing";

export function Footer() {
  return (
    <footer className="bg-utc-navy-darker text-white/80 mt-auto relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(200,182,130,0.06),transparent_50%)]" />

      <div className="relative mx-auto max-w-6xl px-4 py-14 grid gap-10 sm:grid-cols-3 text-sm">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block w-7 h-7 rounded-full bg-gradient-to-br from-utc-gold-bright to-utc-gold-deep flex items-center justify-center text-utc-navy-deep font-mono text-xs font-bold">
              U
            </span>
            <p className="font-display text-lg font-bold text-white">
              <span className="text-utc-gold">UTC</span> Rowing
            </p>
          </div>
          <p className="text-white/70 leading-relaxed">
            University of Tennessee at Chattanooga. Club sport since 1983. Olympic gold to ACRA, on
            the Tennessee River.
          </p>
          <p className="mt-4">
            <Link
              href="/donate"
              className="inline-flex items-center gap-1 text-utc-gold-bright link-draw font-semibold"
            >
              Support the program →
            </Link>
          </p>
        </div>

        <div>
          <p className="font-semibold text-utc-gold uppercase text-xs tracking-[0.2em] mb-3">
            Help us rebuild the record
          </p>
          <p className="text-white/70 mb-3 leading-relaxed">
            We&rsquo;re collecting alumni stories, photos, and corrections. Every contribution
            makes the picture more complete.
          </p>
          <Link
            href="/submit"
            className="inline-flex items-center gap-1 text-utc-gold-bright link-draw font-semibold"
          >
            Submit your story →
          </Link>
        </div>

        <div>
          <p className="font-semibold text-utc-gold uppercase text-xs tracking-[0.2em] mb-3">
            Connect
          </p>
          <ul className="space-y-2">
            <li>
              <Link href="/contact" className="hover:text-utc-gold-bright transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <a
                href="https://utcrowing.org"
                className="hover:text-utc-gold-bright transition-colors"
                rel="noreferrer"
              >
                Program site
              </a>
            </li>
            <li>
              <a
                href="https://giving.utc.edu/campaigns/42934/donations/new?_gl=1*pfvcug*_gcl_au*MzkyNTMzNTAwLjE3NzUwNjQzMzM."
                className="hover:text-utc-gold-bright transition-colors"
                rel="noreferrer"
              >
                Give to UTC Rowing
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-5 flex items-center justify-between text-xs text-white/50">
          <p>© {new Date().getFullYear()} UTC Rowing alumni community.</p>
          <span className="text-utc-gold/40 w-16">
            <OarMark className="w-16" />
          </span>
        </div>
      </div>
    </footer>
  );
}
