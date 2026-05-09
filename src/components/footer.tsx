import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-utc-navy-deep text-white/80 mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 sm:grid-cols-3 text-sm">
        <div>
          <p className="font-semibold text-utc-gold mb-2">UTC Rowing</p>
          <p>University of Tennessee at Chattanooga</p>
          <p>Club sport since 1983</p>
          <p className="mt-3">
            <Link href="/donate" className="underline hover:text-utc-gold-bright">
              Support the program →
            </Link>
          </p>
        </div>

        <div>
          <p className="font-semibold text-utc-gold mb-2">Help us rebuild the record</p>
          <p>
            We&rsquo;re collecting alumni stories, photos, and corrections.
            Every contribution makes the picture more complete.
          </p>
          <p className="mt-3">
            <Link href="/submit" className="underline hover:text-utc-gold-bright">
              Submit your story →
            </Link>
          </p>
        </div>

        <div>
          <p className="font-semibold text-utc-gold mb-2">Connect</p>
          <ul className="space-y-1">
            <li>
              <Link href="/contact" className="hover:text-utc-gold-bright">
                Contact
              </Link>
            </li>
            <li>
              <a
                href="https://utcrowing.org"
                className="hover:text-utc-gold-bright"
                rel="noreferrer"
              >
                Program site
              </a>
            </li>
            <li>
              <a
                href="https://gomocs.com/giving"
                className="hover:text-utc-gold-bright"
                rel="noreferrer"
              >
                gomocs.com/giving
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-white/60">
          © {new Date().getFullYear()} UTC Rowing alumni community.
        </div>
      </div>
    </footer>
  );
}
