"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import { searchAlumni } from "@/app/alumni/actions";
import type { Alumni } from "@/types/domain";
import { ERA_LABELS } from "@/types/domain";

export function AlumniSearch({
  initialAlumni,
}: {
  initialAlumni: Alumni[];
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Alumni[]>(initialAlumni);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!query.trim()) {
      setResults(initialAlumni);
      return;
    }
    const handle = setTimeout(() => {
      startTransition(async () => {
        const r = await searchAlumni(query);
        setResults(r);
      });
    }, 200);
    return () => clearTimeout(handle);
  }, [query, initialAlumni]);

  // Group by era (memoized so it doesn't re-run every keystroke)
  const byEra = useMemo(
    () =>
      results.reduce<Record<string, Alumni[]>>((acc, a) => {
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
                  <AlumniCard key={a.id} a={a} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function AlumniCard({ a }: { a: Alumni }) {
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

  return (
    <li className="border border-border rounded p-3 hover:border-utc-gold transition-colors focus-visible:ring-2 focus-visible:ring-utc-gold focus-visible:outline-none">
      <div className="font-semibold text-utc-navy">{a.canonical_name}</div>
      <div className="text-xs text-muted-foreground mt-0.5">
        {years || "Years on file: unknown"}
      </div>
      {a.variants && (
        <div className="text-xs text-muted-foreground/80 mt-1 italic">
          also: {a.variants}
        </div>
      )}
      {regattas && regattas.length > 0 && (
        <div className="text-xs text-foreground/70 mt-2 line-clamp-2">
          {regattas.join(" · ")}
        </div>
      )}
      {a.achievements && (
        <div className="text-xs text-utc-navy mt-2 font-medium">
          ★ {a.achievements}
        </div>
      )}
    </li>
  );
}
