import Image from "next/image";
import Link from "next/link";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { photoUrl } from "@/types/domain";
import { MedalIcon } from "./svg-rowing";

type FeaturedRow = {
  id: string;
  slug: string;
  canonical_name: string;
  achievements: string | null;
  bio: string | null;
  featured_medal_label: string | null;
  featured_medal_kind: string | null;
  featured_class_label: string | null;
  featured_rank: number | null;
  featured_photo: {
    storage_path: string;
    caption: string | null;
    submitter_name: string | null;
    attribution: string | null;
  } | null;
};

const MEDAL_TONES: Record<string, string> = {
  gold: "from-utc-gold-bright to-utc-gold-deep",
  first: "from-utc-gold-bright to-utc-gold-deep",
  national: "from-river-blue-light to-river-blue-dark",
  coach: "from-utc-navy to-utc-navy-deep",
};

export async function FeaturedAlumni() {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("alumni")
    .select(
      "id, slug, canonical_name, achievements, bio, featured_medal_label, featured_medal_kind, featured_class_label, featured_rank, featured_photo:featured_photo_id (storage_path, caption, submitter_name, attribution)"
    )
    .eq("is_featured", true)
    .order("featured_rank", { ascending: true, nullsFirst: false })
    .limit(12);

  if (error) {
    console.error("[FeaturedAlumni] fetch failed", error.message);
    return null;
  }

  const featured = (data ?? []) as unknown as FeaturedRow[];
  if (featured.length === 0) return null;

  return (
    <section className="bg-utc-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden>
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-utc-gold blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-96 h-96 rounded-full bg-river-blue blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-20">
        <div className="mb-12 max-w-2xl">
          <p className="text-utc-gold uppercase text-xs tracking-[0.2em] font-semibold mb-3">
            Fifty-five years of rowers
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
            UTC has produced{" "}
            <span className="text-gradient-gold italic">Olympians, scholars, and lifelong rowers.</span>
          </h2>
          <p className="mt-5 text-white/70 text-lg">
            These names came out of a club. They didn&rsquo;t act like one.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((f) => {
            const tone =
              MEDAL_TONES[f.featured_medal_kind ?? "gold"] ?? MEDAL_TONES.gold;
            const photoSrc = f.featured_photo
              ? photoUrl(f.featured_photo.storage_path)
              : null;
            return (
              <article
                key={f.id}
                className="relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl overflow-hidden hover:border-utc-gold/40 transition-all duration-300 hover:translate-y-[-2px] flex flex-col"
              >
                {photoSrc && (
                  <div className="relative h-44 w-full bg-utc-navy-deep">
                    <Image
                      src={photoSrc}
                      alt={
                        f.featured_photo?.caption ??
                        `${f.canonical_name} featured photograph`
                      }
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    {f.featured_photo?.attribution === "attributed" &&
                      f.featured_photo?.submitter_name && (
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent text-white/85 text-[10px] px-3 py-1.5">
                          Photo contributed by {f.featured_photo.submitter_name}
                        </div>
                      )}
                  </div>
                )}
                <div className="p-6 flex flex-col">
                  {f.featured_medal_label && (
                    <div
                      className={`inline-flex self-start items-center gap-1.5 bg-gradient-to-r ${tone} text-utc-navy-deep text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-4`}
                    >
                      <MedalIcon className="w-3.5 h-3.5" />
                      {f.featured_medal_label}
                    </div>
                  )}
                  <h3 className="font-display text-xl font-bold leading-tight mb-1">
                    {f.canonical_name}
                  </h3>
                  {f.featured_class_label && (
                    <p className="text-utc-gold-bright text-sm font-medium mb-3">
                      {f.featured_class_label}
                    </p>
                  )}
                  {f.achievements && (
                    <p className="font-semibold text-white mb-2">{f.achievements}</p>
                  )}
                  {f.bio && (
                    <p className="text-white/65 text-sm leading-relaxed">{f.bio}</p>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-10 text-center text-white/50 text-sm">
          More alumni to surface as submissions come in. If you know a UTC rower whose
          story belongs here,{" "}
          <Link href="/submit" className="text-utc-gold-bright link-draw">
            tell us
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
