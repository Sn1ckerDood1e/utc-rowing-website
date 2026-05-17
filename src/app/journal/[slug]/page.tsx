import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { UTCMark } from "@/components/svg-rowing";
import {
  formatPostDate,
  getAllSlugs,
  getPostBySlug,
  splitParagraphs,
} from "@/lib/journal";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {
      title: "Journal · UTC Rowing",
      description: "Notes from Coach Kinsey and the program.",
    };
  }
  return {
    title: `${post.title} · UTC Rowing Journal`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const paragraphs = splitParagraphs(post.body);

  return (
    <>
      <section className="relative bg-utc-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(200,182,130,0.12),transparent_55%)]" />
        <div className="relative mx-auto max-w-3xl px-4 py-16">
          <UTCMark className="text-3xl mb-4 text-utc-gold-bright" />
          <p className="text-utc-gold uppercase text-sm tracking-[0.25em] font-semibold mb-3">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden> · </span>
            <span className="text-white/70 normal-case tracking-normal font-normal">
              {post.author}
            </span>
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold leading-[1.05]">
            {post.title}
          </h1>
        </div>
      </section>

      {post.heroVideo ? (
        // Hero video. `heroVideoAspect` controls width:
        //  - "portrait" (default): max-w-sm centered, suits phone-shot 9:16
        //  - "landscape": fills the article column (max-w-3xl) so 16:9
        //    race footage doesn't look like a thumbnail.
        // Chrome: rounded, shadowed, ring, navy-gradient overlay — same as
        // the M4x video on /donate.
        <section className="bg-paper">
          <div className="mx-auto max-w-3xl px-4 pt-10">
            <figure
              className={`relative overflow-hidden rounded-2xl shadow-2xl shadow-utc-navy-deep/40 ring-1 ring-utc-navy/10 mx-auto ${
                post.heroVideoAspect === "landscape" ? "w-full" : "max-w-sm"
              }`}
            >
              <video
                className="w-full h-auto block"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={post.heroVideoPoster}
                aria-label={post.heroAlt ?? post.title}
              >
                <source src={post.heroVideo} type="video/mp4" />
              </video>
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-utc-navy-deep/40 via-transparent to-transparent pointer-events-none"
              />
            </figure>
          </div>
        </section>
      ) : (
        post.hero && (
          <section className="bg-paper">
            <div className="mx-auto max-w-3xl px-4 pt-10">
              <figure className="relative overflow-hidden rounded-xl shadow-lg aspect-[16/9]">
                <Image
                  src={post.hero}
                  alt={post.heroAlt ?? ""}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                  className="object-cover"
                />
              </figure>
            </div>
          </section>
        )
      )}

      <section className="bg-paper">
        <article className="mx-auto max-w-2xl px-4 py-16 font-serif text-foreground/85 text-lg leading-[1.75]">
          {paragraphs.map((p, i) => (
            <span key={i}>
              <p className="mb-6 last:mb-0">{p}</p>
              {post.bodyImage && post.bodyImage.afterParagraph === i && (
                <figure className="my-8 -mx-4 sm:mx-0">
                  <div className="relative overflow-hidden rounded-lg shadow-2xl shadow-utc-navy-deep/30 ring-1 ring-utc-navy/10">
                    <Image
                      src={post.bodyImage.src}
                      alt={post.bodyImage.alt}
                      width={1800}
                      height={1350}
                      sizes="(min-width: 768px) 672px, 100vw"
                      className="w-full h-auto block"
                    />
                  </div>
                  <figcaption className="mt-3 text-sm text-foreground/65 italic font-sans px-1 sm:px-0">
                    {post.bodyImage.caption}
                  </figcaption>
                </figure>
              )}
            </span>
          ))}

          <hr className="my-12 border-border" />

          <p className="not-prose font-sans text-sm">
            <Link href="/journal" className="link-draw text-utc-navy font-semibold">
              ← Back to Journal
            </Link>
          </p>
        </article>
      </section>

      <section className="bg-utc-navy text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <p className="text-utc-gold uppercase text-xs tracking-[0.25em] font-semibold mb-4">
            Two ways in
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-5 leading-tight">
            If this hit, do something with it.
          </h2>
          <p className="text-white/75 max-w-xl mx-auto mb-8">
            Help us fill in the record, or back the crew racing for it.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/submit"
              className="bg-utc-gold text-utc-navy-deep font-semibold px-7 py-3.5 rounded-md hover:bg-utc-gold-bright transition-all hover:shadow-xl inline-flex items-center gap-2"
            >
              Add yourself to the roster →
            </Link>
            <Link
              href="/donate"
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold px-7 py-3.5 rounded-md hover:bg-white/20 hover:border-utc-gold/60 transition-all"
            >
              Back the rebuild →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
