import Image from "next/image";
import Link from "next/link";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { photoUrl } from "@/types/domain";
import { IdentifyForm } from "@/components/identify-form";

export const revalidate = 300;

export const metadata = {
  title: "Help identify — UTC Rowing",
  description:
    "Photos contributed by alumni that need identification. If you recognize a face, seat, or regatta, please share what you know.",
};

type IdentifyPhoto = {
  id: string;
  storage_path: string;
  caption: string | null;
  date_taken_text: string | null;
  date_taken_year: number | null;
  era: string | null;
  regatta: string | null;
  location: string | null;
  boat_type: string | null;
  submitter_name: string;
  attribution: string;
  identification_notes: string | null;
  photo_people: { role: string | null; alumni: { canonical_name: string } | null }[];
};

export default async function IdentifyPage() {
  let photos: IdentifyPhoto[] = [];
  let dbReady = true;

  try {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase
      .from("photos")
      .select(
        "id, storage_path, caption, date_taken_text, date_taken_year, era, regatta, location, boat_type, submitter_name, attribution, identification_notes, photo_people (role, alumni:alumni_id (canonical_name))"
      )
      .eq("status", "published")
      .eq("needs_identification", true)
      .order("date_taken_year", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false })
      .limit(60);
    if (error) throw error;
    photos = (data ?? []) as unknown as IdentifyPhoto[];
  } catch (e) {
    console.error("[/identify] Supabase fetch failed", e);
    dbReady = false;
  }

  return (
    <>
      <section className="relative bg-utc-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(200,182,130,0.12),transparent_55%)]" />
        <div className="relative mx-auto max-w-3xl px-4 py-16">
          <p className="text-utc-gold uppercase text-sm tracking-[0.25em] font-semibold mb-3">
            Help close the gaps
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold leading-[1.05] mb-5">
            Who do you recognize?
          </h1>
          <p className="text-lg text-white/80 max-w-2xl">
            Every photo here was contributed by an alum. Some are nearly
            identified; some are blank slates. If you know a face, a seat, a
            regatta, or a year, please tell us.
          </p>
          <p className="text-base text-white/60 max-w-2xl mt-3">
            Even a partial answer helps. Each submission is reviewed before
            anything gets attached to a roster entry.
          </p>
        </div>
      </section>

      <section className="bg-paper-grain">
        <div className="mx-auto max-w-5xl px-4 py-12">
          {!dbReady ? (
            <p className="text-muted-foreground py-8 text-center">
              The photo archive isn&rsquo;t reachable right now. Try again in a few minutes.
            </p>
          ) : photos.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center">
              No photos awaiting identification right now. As alumni send more in, they&rsquo;ll
              show up here.{" "}
              <Link
                href="/submit"
                className="text-utc-navy font-semibold underline decoration-utc-gold underline-offset-4"
              >
                Send us yours
              </Link>
              .
            </p>
          ) : (
            <ul className="space-y-10">
              {photos.map((p) => (
                <IdentifyCard key={p.id} photo={p} />
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="bg-utc-navy text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 leading-tight">
            Have a photo we should add?
          </h2>
          <p className="text-white/75 max-w-xl mx-auto mb-8">
            If you have a print, a slide, or a phone snap of a UTC crew, the form is open. No
            quality bar — context matters more than resolution.
          </p>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 bg-utc-gold text-utc-navy-deep font-semibold px-7 py-3.5 rounded-md hover:bg-utc-gold-bright transition-all hover:shadow-xl"
          >
            Send us a photo →
          </Link>
        </div>
      </section>
    </>
  );
}

function IdentifyCard({ photo }: { photo: IdentifyPhoto }) {
  const src = photoUrl(photo.storage_path);
  const named = photo.photo_people
    .filter((pp) => pp.alumni)
    .map((pp) => `${pp.role ?? "rower"}: ${pp.alumni!.canonical_name}`);
  const unnamedRoles = photo.photo_people
    .filter((pp) => !pp.alumni)
    .map((pp) => pp.role ?? "person");

  return (
    <li className="bg-white border border-border rounded-lg overflow-hidden shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
        <div className="lg:col-span-3 relative bg-utc-navy-deep min-h-[18rem] lg:min-h-[26rem]">
          <Image
            src={src}
            alt={photo.caption ?? "Photo awaiting identification"}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-contain"
          />
        </div>
        <div className="lg:col-span-2 p-5 lg:p-6 flex flex-col">
          {photo.caption && (
            <h3 className="font-semibold text-utc-navy text-base mb-2">
              {photo.caption}
            </h3>
          )}
          <dl className="text-xs text-foreground/75 space-y-1 mb-3">
            {photo.date_taken_text && (
              <Row label="Date" value={photo.date_taken_text} />
            )}
            {photo.regatta && <Row label="Regatta" value={photo.regatta} />}
            {photo.location && <Row label="Location" value={photo.location} />}
            {photo.boat_type && <Row label="Boat" value={photo.boat_type} />}
            {photo.attribution === "attributed" && (
              <Row label="Contributed by" value={photo.submitter_name} />
            )}
          </dl>

          {named.length > 0 && (
            <div className="mb-3 text-xs">
              <div className="font-semibold text-utc-navy mb-1">Already identified</div>
              <ul className="text-foreground/80 space-y-0.5">
                {named.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            </div>
          )}

          {unnamedRoles.length > 0 && (
            <div className="mb-3 text-xs">
              <div className="font-semibold text-utc-gold-deep mb-1">
                Still unidentified
              </div>
              <ul className="text-foreground/80 space-y-0.5">
                {unnamedRoles.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}

          {photo.identification_notes && (
            <p className="text-xs text-foreground/65 italic mb-3 border-l-2 border-utc-gold/50 pl-3">
              {photo.identification_notes}
            </p>
          )}

          <div className="mt-auto pt-3 border-t border-border/50">
            <IdentifyForm photoId={photo.id} />
          </div>
        </div>
      </div>
    </li>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="inline font-semibold text-utc-navy/80">{label}:</dt>{" "}
      <dd className="inline">{value}</dd>
    </div>
  );
}
