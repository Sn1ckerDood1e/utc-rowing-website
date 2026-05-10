"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ERAS, type Era, type Moment } from "@/lib/timeline-data";

/**
 * Era cover photos. Keyed by era slug. Eras without an entry render as
 * gradient-only (existing behavior). Photos are placed behind the gradient
 * via absolute positioning + object-cover; the gradient is layered on top
 * with reduced opacity so the chapter text remains legible.
 */
const ERA_COVER_PHOTOS: Partial<
  Record<
    Era["slug"],
    { src: string; alt: string; objectPosition?: string }
  >
> = {
  carney: {
    // The Carney era closes with the 1996 trailer arson — the era's
    // most-documented event. Use the salvage photo (athletes carrying
    // broken hulls) over the burned-trailer shot: it shows the response,
    // not just the damage.
    src: "/photos/utc-crew-1996-salvage.jpg",
    alt: "Black-and-white photo of UTC Crew athletes carrying a broken hull through a field after the 1996 trailer arson.",
    objectPosition: "center",
  },
  resurrection: {
    src: "/photos/m4x-acra-prep-distant.jpg",
    alt: "UTC Rowing's 2026 men's quad on the race course in ACRA preparation, distant view of the full lane.",
    // Portrait crop — anchor toward the top of the frame so the boat stays in view.
    objectPosition: "center top",
  },
};

const KIND_META: Record<
  Moment["kind"],
  { label: string; dot: string; ring: string }
> = {
  founding: {
    label: "Origin",
    dot: "bg-utc-gold-bright",
    ring: "ring-utc-gold-bright/30",
  },
  achievement: {
    label: "Achievement",
    dot: "bg-utc-gold",
    ring: "ring-utc-gold/30",
  },
  milestone: {
    label: "Milestone",
    dot: "bg-river-blue-light",
    ring: "ring-river-blue-light/30",
  },
  person: {
    label: "Figure",
    dot: "bg-utc-navy",
    ring: "ring-utc-navy/30",
  },
  challenge: {
    label: "Challenge",
    dot: "bg-red-500",
    ring: "ring-red-500/20",
  },
  transition: {
    label: "Transition",
    dot: "bg-utc-gold-deep",
    ring: "ring-utc-gold-deep/30",
  },
};

export function InteractiveTimeline() {
  const [activeEra, setActiveEra] = useState<Era["slug"]>("founding");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const eraSectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  const totalMoments = useMemo(
    () => ERAS.reduce((acc, era) => acc + era.moments.length, 0),
    []
  );

  // Scroll-spy: track which era is currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most-visible era section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const slug = visible[0].target.getAttribute("data-era");
          if (slug) setActiveEra(slug as Era["slug"]);
        }
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    eraSectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Reveal-on-scroll for moment cards.
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>("[data-moment-card]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );
    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  function toggleExpanded(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function jumpToEra(slug: Era["slug"]) {
    const el = eraSectionRefs.current.get(slug);
    if (!el) return;
    const headerOffset = 96; // sticky nav height
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <div className="relative">
      {/*
        JS-disabled fallback: if scripts don't run, the IntersectionObserver
        above never fires and `is-visible` is never added. Force the
        revealed state via a <noscript>-scoped style so cards remain
        readable. (motion-reduce is handled inline on the <li>.)
      */}
      <noscript>
        <style>{`
          [data-moment-card] {
            opacity: 1 !important;
            transform: none !important;
          }
        `}</style>
      </noscript>

      {/* Era-jump rail (sticky under main nav) */}
      <div
        className="sticky top-16 z-40 bg-paper/95 backdrop-blur-md border-b border-border shadow-sm"
        data-testid="era-rail"
      >
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scroll-smooth -mx-2 px-2">
            <span className="text-xs uppercase tracking-[0.2em] text-utc-navy/60 font-semibold mr-3 whitespace-nowrap">
              Jump to era →
            </span>
            {ERAS.map((era) => {
              const isActive = era.slug === activeEra;
              return (
                <button
                  key={era.slug}
                  type="button"
                  onClick={() => jumpToEra(era.slug)}
                  data-testid={`era-jump-${era.slug}`}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? "bg-utc-navy text-utc-gold-bright shadow-sm"
                      : "text-utc-navy/70 hover:text-utc-navy hover:bg-utc-navy/5"
                  }`}
                >
                  <span className="font-mono-numbers text-xs mr-1.5 text-utc-gold-deep">
                    {era.span.split("—")[0].trim()}
                  </span>
                  {era.label}
                </button>
              );
            })}
            <span className="ml-auto text-xs text-muted-foreground whitespace-nowrap pr-2 hidden sm:inline">
              {totalMoments} moments · {ERAS.length} eras
            </span>
          </div>
        </div>
      </div>

      {/* Eras */}
      <div className="mx-auto max-w-6xl px-4">
        {ERAS.map((era, eraIdx) => (
          <section
            key={era.slug}
            data-era={era.slug}
            data-testid={`era-section-${era.slug}`}
            ref={(el) => {
              if (el) eraSectionRefs.current.set(era.slug, el);
            }}
            className="relative pt-16 pb-8"
          >
            {/* Era cover */}
            <div
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${era.gradient} text-white shadow-xl mb-12`}
            >
              {ERA_COVER_PHOTOS[era.slug] && (
                <Image
                  src={ERA_COVER_PHOTOS[era.slug]!.src}
                  alt={ERA_COVER_PHOTOS[era.slug]!.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1152px"
                  loading="lazy"
                  className="object-cover"
                  style={{
                    objectPosition:
                      ERA_COVER_PHOTOS[era.slug]!.objectPosition ?? "center",
                  }}
                />
              )}
              {/* Gradient overlay — re-applied on top of the photo for legibility.
                  When no photo is present, the parent's bg-gradient still shows through. */}
              {ERA_COVER_PHOTOS[era.slug] && (
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${era.gradient} opacity-70 pointer-events-none`}
                  aria-hidden
                />
              )}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none" />
              <div className="relative p-8 sm:p-10">
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="font-mono-numbers text-utc-gold-bright text-sm tracking-widest font-semibold uppercase">
                    Chapter {eraIdx + 1} · {era.span}
                  </span>
                </div>
                <h2 className="font-display text-4xl sm:text-5xl font-bold leading-[1.05]">
                  {era.label}
                </h2>
                <p className="mt-4 text-lg text-white/80 max-w-3xl leading-relaxed">
                  {era.intro}
                </p>
                <p className="mt-3 text-xs text-white/60 uppercase tracking-widest">
                  {era.moments.length} {era.moments.length === 1 ? "moment" : "moments"}
                </p>
              </div>
            </div>

            {/* Vertical timeline rail + moment cards */}
            <div className="relative">
              {/* Center rail (desktop) */}
              <div
                className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-gradient-to-b from-utc-gold/0 via-utc-gold/40 to-utc-gold/0"
                aria-hidden
              />

              <ol className="space-y-6 md:space-y-8">
                {era.moments
                  .slice()
                  .sort((a, b) => a.sortYear - b.sortYear)
                  .map((moment, idx) => {
                    const id = `${era.slug}-${moment.sortYear}-${idx}`;
                    const isExpanded = expanded.has(id);
                    const isLeft = idx % 2 === 0;
                    const meta = KIND_META[moment.kind];
                    return (
                      <li
                        key={id}
                        data-moment-card
                        data-testid={`moment-${era.slug}-${idx}`}
                        className={`relative md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6 md:items-start opacity-0 translate-y-3 transition-all duration-700 [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0 motion-reduce:!opacity-100 motion-reduce:!translate-y-0`}
                      >
                        {/* Left side card (desktop) */}
                        <div
                          className={`${
                            isLeft ? "md:block" : "md:invisible md:h-0"
                          } md:text-right`}
                        >
                          {isLeft && (
                            <MomentCard
                              moment={moment}
                              isExpanded={isExpanded}
                              onToggle={() => toggleExpanded(id)}
                              alignRight
                            />
                          )}
                        </div>

                        {/* Center marker */}
                        <div className="hidden md:flex flex-col items-center pt-6">
                          <span
                            className={`relative inline-flex w-4 h-4 rounded-full ${meta.dot} ring-8 ${meta.ring}`}
                          >
                            <span
                              className={`absolute inset-0 rounded-full ${meta.dot} animate-pulse-ring opacity-40`}
                            />
                          </span>
                          <span className="mt-2 font-mono-numbers text-xs text-muted-foreground">
                            {moment.year}
                          </span>
                        </div>

                        {/* Right side card (desktop) — also the mobile card */}
                        <div
                          className={`${
                            !isLeft ? "md:block" : "md:invisible md:h-0"
                          }`}
                        >
                          {!isLeft && (
                            <MomentCard
                              moment={moment}
                              isExpanded={isExpanded}
                              onToggle={() => toggleExpanded(id)}
                            />
                          )}

                          {/* Mobile (single column): always render the card */}
                          {isLeft && (
                            <div className="md:hidden">
                              <MomentCard
                                moment={moment}
                                isExpanded={isExpanded}
                                onToggle={() => toggleExpanded(id)}
                                showMobileMarker
                              />
                            </div>
                          )}
                        </div>

                        {/* Mobile-only marker for cards that would be on the left in desktop */}
                        {/* (Already rendered inside the right col when isLeft is true above; nothing else needed) */}
                      </li>
                    );
                  })}
              </ol>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function MomentCard({
  moment,
  isExpanded,
  onToggle,
  alignRight = false,
  showMobileMarker = false,
}: {
  moment: Moment;
  isExpanded: boolean;
  onToggle: () => void;
  alignRight?: boolean;
  showMobileMarker?: boolean;
}) {
  const meta = KIND_META[moment.kind];
  return (
    <article
      className={`group relative bg-white border border-border rounded-xl shadow-sm hover:shadow-lg hover:border-utc-gold/40 transition-all p-5 sm:p-6 ${
        alignRight ? "md:ml-auto" : ""
      } md:max-w-md`}
    >
      {/* Mobile-only year + dot at top */}
      {showMobileMarker && (
        <div className="md:hidden flex items-center gap-2 mb-3 -mt-1">
          <span
            className={`inline-flex w-2.5 h-2.5 rounded-full ${meta.dot}`}
          />
          <span className="font-mono-numbers text-sm font-semibold text-utc-navy">
            {moment.year}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
            · {meta.label}
          </span>
        </div>
      )}

      {/* Desktop kind chip */}
      <div className="hidden md:flex items-center gap-1.5 mb-2">
        <span
          className={`inline-flex w-1.5 h-1.5 rounded-full ${meta.dot}`}
        />
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
          {meta.label}
        </span>
      </div>

      <h3 className="font-display text-xl font-bold text-utc-navy leading-snug mb-2">
        {moment.title}
      </h3>
      <p className="text-foreground/85 leading-relaxed text-[0.95rem]">
        {moment.summary}
      </p>

      {moment.pullQuote && (
        <blockquote className="mt-4 border-l-4 border-utc-gold pl-4 py-1">
          <p className="font-display text-lg italic text-utc-navy leading-snug">
            &ldquo;{moment.pullQuote.text}&rdquo;
          </p>
          {moment.pullQuote.attribution && (
            <footer className="mt-1 text-xs text-muted-foreground">
              — {moment.pullQuote.attribution}
            </footer>
          )}
        </blockquote>
      )}

      {moment.detail && (
        <>
          <div
            className={`grid transition-all duration-300 ease-out overflow-hidden ${
              isExpanded ? "grid-rows-[1fr] mt-4 opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="min-h-0">
              <div className="border-t border-border pt-4 text-[0.95rem] text-foreground/80 leading-relaxed whitespace-pre-line">
                {renderInlineMarkdown(moment.detail)}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onToggle}
            data-testid="moment-toggle"
            className="mt-3 inline-flex items-center gap-1 text-utc-navy text-sm font-semibold link-draw"
            aria-expanded={isExpanded}
          >
            {isExpanded ? "Collapse" : "More on this moment"}
            <svg
              viewBox="0 0 24 24"
              className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </>
      )}

      {moment.source && (
        <p className="mt-3 text-[10px] uppercase tracking-widest text-muted-foreground/80">
          Source · {moment.source}
        </p>
      )}
    </article>
  );
}

/**
 * Tiny in-line markdown for the optional `detail` field.
 * Supports **bold** and *italic*. Doesn't try to be MDX.
 */
function renderInlineMarkdown(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-utc-navy font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return <span key={i}>{part}</span>;
  });
}
