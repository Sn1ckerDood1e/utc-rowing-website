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
          <UTCMark className="w-12 h-12 mb-4" />
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

      <section className="bg-paper">
        <article className="mx-auto max-w-2xl px-4 py-16 font-serif text-foreground/85 text-lg leading-[1.75]">
          {paragraphs.map((p, i) => (
            <p key={i} className="mb-6 last:mb-0">
              {p}
            </p>
          ))}

          <hr className="my-12 border-border" />

          <p className="not-prose font-sans text-sm">
            <Link href="/journal" className="link-draw text-utc-navy font-semibold">
              ← Back to Journal
            </Link>
          </p>
        </article>
      </section>
    </>
  );
}
