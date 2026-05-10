"use client";

import { useEffect, useRef, useState } from "react";

export function AnimatedCounter({
  end,
  duration = 1500,
  prefix = "",
  suffix = "",
  className = "",
}: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  // SSR renders the FINAL value so the page is correct without JS / before hydration.
  const [value, setValue] = useState(end);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const didMountRef = useRef(false);

  // On mount, reset to 0 so the count-up animation has somewhere to count from.
  useEffect(() => {
    if (didMountRef.current) return;
    didMountRef.current = true;
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setValue(end);
    } else {
      setValue(0);
    }
  }, [end]);

  useEffect(() => {
    if (!ref.current || started) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setValue(end);
      return;
    }
    const start = performance.now();
    let frameId: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(end * eased));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [started, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
