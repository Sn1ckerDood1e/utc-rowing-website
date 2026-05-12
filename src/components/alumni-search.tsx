"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import { searchAlumni } from "@/app/alumni/actions";
import type { Alumni } from "@/types/domain";
import { ERA_LABELS, photoUrl } from "@/types/domain";
import { MedalIcon } from "./svg-rowing";

type AlumWithPhoto = Alumni & {
  featured_photo?: {
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

export function AlumniSearch({
  initialAlumni,
  appearanceCounts = {},
}: {
  initialAlumni: AlumWithPhoto[];
  appearanceCounts?: Record<string, number>;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AlumWithPhoto[]>(initialAlumni);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!query.trim()) {
      setResults(initialAlumni);
      return;
    }
    const handle = setTimeout(() => {
      startTransition(async () => {
        const r = (await searchAlumni(query)) as AlumWithPhoto[];
        setResults(r);
      });
    }, 200);
    return () => clearTimeout(handle);
  }, [query, initialAlumni]);

  // Group by era (memoized so it doesn't re-run every keystroke)
  const byEra = useMemo(
    () =>
      results.reduce<Record<string, AlumWithPhoto[]>>((acc, a) => {
        (acc[a.era] ||= []).push(a);
        return acc;
      }, {}),
    [results]
  );
  const eraOrder: (keyof typeof ERA_LABELS)[] = [
    "founding",
    "carney",
    "espeseth",
    "worth",
    "resurrection",
  ];

  return (
    <div>
      <div className="sticky top-16 bg-white border-b border-border z-10 -mx-4 px-4 py-4 mb-6">
        <input
          type="search"
          placeholder="Search alumni by name..."
          aria-label="Search alumni by name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-xl px-4 py-3 border border-border rounded text-base focus:outline-none focus:ring-2 focus:ring-utc-gold"
        />
        <p className="mt-2 text-sm text-muted-foreground">
          {isPending
            ? "Searching…"
            : `${results.length.toLocaleString()} alumni`}
          {query && !isPending && ` match "${query}"`}
        </p>
      </div>

      <div
        aria-busy={isPending}
        className={`transition-opacity ${isPending ? "opacity-60" : "opacity-100"}`}
      >
        {results.length === 0 && (
          <p className="text-muted-foreground py-8 text-center">
            No match for that name. Try a different spelling, an initial, or — if they should
            be here —{" "}
            <Link
              href="/submit"
              className="text-utc-navy font-semibold underline decoration-utc-gold underline-offset-4"
            >
              add them
            </Link>
            .
          </p>
        )}

        {eraOrder.map((era) => {
          const list = byEra[era];
          if (!list || list.length === 0) return null;
          return (
            <section key={era} className="mb-12">
              <h2 className="text-xl font-bold text-utc-navy border-b-2 border-utc-gold pb-1 mb-4">
                {ERA_LABELS[era]}{" "}
                <span className="text-base font-normal text-muted-foreground">
                  ({list.length})
                </span>
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((a) => (
                  <AlumniCard
                    key={a.id}
                    a={a}
                    appearanceCount={appearanceCounts[a.id] ?? 0}
                  />
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function AlumniCard({
  a,
  appearanceCount = 0,
}: {
  a: AlumWithPhoto;
  appearanceCount?: number;
}) {
  const years =
    a.first_year && a.last_year
      ? a.first_year === a.last_year
        ? String(a.first_year)
        : `${a.first_year}–${a.last_year}`
      : null;
  const regattas = a.regattas
    ?.split("|")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3);
  const tone =
    MEDAL_TONES[a.featured_medal_kind ?? "gold"] ?? MEDAL_TONES.gold;
  const photoSrc = a.featured_photo
    ? photoUrl(a.featured_photo.storage_path)
    : null;

  return (
    <li className="border border-border rounded p-3 hover:border-utc-gold transition-colors focus-visible:ring-2 focus-visible:ring-utc-gold focus-visible:outline-none flex gap-3">
      {photoSrc && (
        <div className="relative w-16 h-16 shrink-0 rounded overflow-hidden bg-utc-navy-deep">
          <Image
            src={photoSrc}
            alt=""
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="font-semibold text-utc-navy truncate">
              {a.canonical_name}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {years || "Years on file: unknown"}
            </div>
          </div>
          {a.is_featured && a.featured_medal_label && (
            <div
              className={`shrink-0 inline-flex items-center gap-1 bg-gradient-to-r ${tone} text-utc-navy-deep text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full`}
              title={a.achievements ?? a.featured_medal_label}
            >
              <MedalIcon className="w-2.5 h-2.5" />
              {a.featured_medal_label}
            </div>
          )}
        </div>
        {a.variants && (
          <div className="text-xs text-muted-foreground/80 mt-1 italic line-clamp-1">
            also: {a.variants}
          </div>
        )}
        {a.achievements && (
          <div className="text-xs text-utc-navy mt-1.5 font-medium line-clamp-1">
            ★ {a.achievements}
          </div>
        )}
        {regattas && regattas.length > 0 && (
          <div className="text-xs text-foreground/70 mt-1.5 line-clamp-1">
            {regattas.join(" · ")}
          </div>
        )}
        {appearanceCount > 0 && (
          <div className="mt-1.5 text-[11px] text-utc-navy/80 font-medium">
            Appears in {appearanceCount} photo{appearanceCount === 1 ? "" : "s"}
          </div>
        )}
        {a.sources && (
          <div className="mt-2 pt-2 border-t border-border/50">
            <div className="text-[9px] uppercase tracking-wider text-utc-gold font-semibold mb-0.5">
              Documented in
            </div>
            <div className="text-xs text-foreground/60 line-clamp-2 leading-snug">
              {a.sources}
            </div>
          </div>
        )}
      </div>
    </li>
  );
}
