import Link from "next/link";
import { UTCMark } from "./svg-rowing";

export function Footer() {
  return (
    <footer className="bg-utc-navy text-white/80 mt-auto relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(200,182,130,0.06),transparent_50%)]" />

      <div className="relative mx-auto max-w-6xl px-4 pt-10 pb-4">
        <Link href="/" className="inline-flex items-center">
          <UTCMark className="text-lg text-white" />
        </Link>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-14 grid gap-10 sm:grid-cols-3 text-sm">
        <div>
          <p className="text-white/70 leading-relaxed">
            University of Tennessee at Chattanooga. Rowing at UTC since 1971 · Competing since
            1983. Olympic gold to ACRA, on the Tennessee River.
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
            On this site
          </p>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-utc-gold-bright transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/history" className="hover:text-utc-gold-bright transition-colors">
                History
              </Link>
            </li>
            <li>
              <Link href="/team" className="hover:text-utc-gold-bright transition-colors">
                Team
              </Link>
            </li>
            <li>
              <Link href="/alumni" className="hover:text-utc-gold-bright transition-colors">
                Alumni
              </Link>
            </li>
            <li>
              <Link href="/journal" className="hover:text-utc-gold-bright transition-colors">
                Journal
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-utc-gold uppercase text-xs tracking-[0.2em] mb-3">
            Get involved
          </p>
          <ul className="space-y-2">
            <li>
              <Link href="/submit" className="hover:text-utc-gold-bright transition-colors">
                Submit your story
              </Link>
            </li>
            <li>
              <Link href="/donate" className="hover:text-utc-gold-bright transition-colors">
                Donate
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-utc-gold-bright transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-utc-gold-bright transition-colors">
                Privacy
              </Link>
            </li>
            <li>
              <a
                href="https://giving.utc.edu/campaigns/42934/donations/new?_gl=1*pfvcug*_gcl_au*MzkyNTMzNTAwLjE3NzUwNjQzMzM."
                className="hover:text-utc-gold-bright transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Give to UTC Rowing
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-5 text-xs text-white/75">
          <p>© {new Date().getFullYear()} UTC Rowing alumni community.</p>
        </div>
      </div>
    </footer>
  );
}
