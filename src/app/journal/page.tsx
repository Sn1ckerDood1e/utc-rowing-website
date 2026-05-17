import Image from "next/image";
import Link from "next/link";
import { formatPostDate, getAllPosts } from "@/lib/journal";
import { MailingListSignup } from "@/components/mailing-list-signup";

export const metadata = {
  title: "Journal · UTC Rowing",
  description: "Notes from Coach Kinsey and the program.",
};

export default function JournalIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="relative bg-utc-navy text-white overflow-hidden">
        <Image
          src="/photos/boats-sunset-silhouette.jpg"
          alt="Multiple rowing shells silhouetted on the Tennessee River at sunset, late 1990s."
          fill
          sizes="100vw"
          quality={75}
          className="object-cover object-center opacity-40"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-utc-navy via-utc-navy/85 to-utc-navy/40 pointer-events-none" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(200,182,130,0.12),transparent_55%)]" />
        <div className="relative mx-auto max-w-3xl px-4 py-20 sm:py-24">
          <p className="text-utc-gold uppercase text-sm tracking-[0.25em] font-semibold mb-3">
            From the boathouse
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold leading-[1.05] mb-4">
            Journal
          </h1>
          <p className="text-lg text-white/80 max-w-2xl">
            Notes from Coach Kinsey and the program — what we&rsquo;re doing, why
            we&rsquo;re doing it, and where we&rsquo;re headed.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16">
          {posts.length === 0 ? (
            <p className="text-foreground/70 font-serif text-lg">
              Nothing posted yet — check back soon.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {posts.map((post) => (
                <li key={post.slug} className="py-8 first:pt-0 last:pb-0">
                  <article>
                    <p className="text-sm uppercase tracking-[0.2em] font-semibold text-utc-navy/60 mb-2">
                      {formatPostDate(post.date)}
                    </p>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-utc-navy leading-tight mb-2">
                      <Link
                        href={`/journal/${post.slug}`}
                        className="link-draw"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-sm text-muted-foreground mb-3">
                      {post.author}
                    </p>
                    <p className="font-serif text-foreground/80 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <p className="mt-3">
                      <Link
                        href={`/journal/${post.slug}`}
                        className="link-draw text-utc-navy font-semibold text-sm"
                      >
                        Read more →
                      </Link>
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          )}

          {posts.length > 0 && (
            <div className="mt-16 pt-10 border-t border-border space-y-10">
              <div className="text-center">
                <p className="font-serif text-foreground/80 text-lg">
                  Hooch is next.{" "}
                  <Link
                    href="/donate"
                    className="text-utc-navy font-semibold underline decoration-utc-gold underline-offset-4 hover:text-utc-gold-deep"
                  >
                    Back the rebuild →
                  </Link>
                </p>
              </div>
              <MailingListSignup
                variant="card"
                source="journal-index"
                heading="Stay in the loop."
                subhead="Race recaps and program updates from Coach Kinsey. No marketing — just the journal when there&rsquo;s something to write."
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
