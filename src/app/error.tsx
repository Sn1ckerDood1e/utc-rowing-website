"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app/error]", {
      message: error.message,
      digest: error.digest,
    });
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-utc-navy text-white px-4">
      <div className="max-w-xl text-center">
        <p className="text-utc-gold uppercase text-xs tracking-[0.25em] font-semibold mb-4">
          Something went wrong
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
          Caught a crab.
        </h1>
        <p className="mt-5 text-white/75">
          An unexpected error came up while loading this page. You can try again
          or head back home.
        </p>
        {error.digest && (
          <p className="mt-3 text-sm text-white/40 font-mono-numbers">
            ref: {error.digest}
          </p>
        )}
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="bg-utc-gold text-utc-navy-deep font-semibold px-7 py-3.5 rounded-md hover:bg-utc-gold-bright transition-all hover:shadow-xl hover:shadow-utc-gold/30"
          >
            Try again
          </button>
          <Link
            href="/"
            className="bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold px-7 py-3.5 rounded-md hover:bg-white/20 hover:border-utc-gold/60 transition-all"
          >
            &larr; Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
