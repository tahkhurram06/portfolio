"use client";

import { useEffect, useRef, useState } from "react";

type TimelineItemProps = {
  year: string;
  title: string;
  description: string;
  isLast?: boolean;
  /** Stagger delay (ms) before this item slides in, once it's in view. */
  delay?: number;
  /** Viewport px from the top treated as the flow's "now" line — must
   * match Timeline's ACTIVE_LINE_PX so this item's marker grows exactly
   * as the glowing line reaches it. */
  activeLinePx?: number;
};

// How long before the flow line arrives (in px) the marker starts
// swelling, and how big it gets right as the line reaches it.
const GROW_WINDOW_PX = 170;
const REST_SCALE = 0.7;
const PEAK_SCALE = 1.6;
const LIT_SCALE = 1.05;

export default function TimelineItem({
  year,
  title,
  description,
  isLast,
  delay = 0,
  activeLinePx = 260,
}: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  // One-shot reveal: once an item has slid in, it stays in — this isn't
  // meant to replay every time you scroll past it, just to greet it
  // the first time it enters the viewport.
  const [revealed, setRevealed] = useState(false);
  // Flips on once the entrance pop has finished, handing control of the
  // marker's size over to scroll-driven proximity instead of the
  // one-time entrance animation.
  const [settled, setSettled] = useState(false);
  // 0 (flow line is still well above this item) to 1 (the line has
  // reached or passed it). Drives how big the marker grows.
  const [proximity, setProximity] = useState(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    reducedMotionRef.current = prefersReduced;
    if (prefersReduced) {
      setRevealed(true);
      setSettled(true);
      setProximity(1);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      // Fires a little before the item reaches the very bottom of the
      // viewport, so it's already sliding by the time you'd notice it.
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Once revealed, let the entrance pop finish on its own before handing
  // the marker's size over to scroll-driven growth — otherwise the two
  // animations fight over the same transform.
  useEffect(() => {
    if (!revealed || reducedMotionRef.current) return;
    const ENTRANCE_MS = 520;
    const t = setTimeout(() => setSettled(true), delay + ENTRANCE_MS);
    return () => clearTimeout(t);
  }, [revealed, delay]);

  useEffect(() => {
    if (!settled || reducedMotionRef.current) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const distance = rect.top - activeLinePx;
      const t =
        distance <= 0
          ? 1
          : distance >= GROW_WINDOW_PX
            ? 0
            : 1 - distance / GROW_WINDOW_PX;
      setProximity(t);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [settled, activeLinePx]);

  const markerScale = !revealed
    ? 0
    : !settled
      ? REST_SCALE
      : proximity >= 1
        ? LIT_SCALE
        : REST_SCALE + (PEAK_SCALE - REST_SCALE) * proximity;
  const markerOpacity = !revealed ? 0 : 0.55 + 0.45 * Math.min(proximity, settled ? 1 : 0.3);
  const markerGlow = settled ? proximity : 0.2;

  return (
    <div
      ref={ref}
      className={`group relative will-change-transform ${
        revealed
          ? "translate-x-0 translate-y-0 scale-100 opacity-100 blur-none"
          : "-translate-x-12 translate-y-2 scale-[0.96] opacity-0 blur-[6px]"
      } ${isLast ? "" : "pb-9 sm:pb-10"}`}
      style={{
        // Three tracks on purpose, not one flat tween:
        // - transform gets a springy overshoot (settles past 0 and
        //   eases back), so the item feels like it's arriving with
        //   a little momentum rather than just sliding to a stop.
        // - opacity/blur fade in faster and linearly-ish underneath,
        //   so the "materializing" read finishes before the bounce
        //   settles, instead of opacity dragging out the whole thing.
        transitionProperty: "transform, opacity, filter",
        transitionDuration: revealed ? "850ms, 550ms, 550ms" : "0ms",
        transitionTimingFunction:
          "cubic-bezier(0.22, 1.4, 0.36, 1), ease-out, ease-out",
        transitionDelay: revealed
          ? `${delay}ms, ${delay}ms, ${delay}ms`
          : "0ms",
      }}
    >
      {/* Marker on the rail. Pops in on reveal, then — once that pop
          settles — grows as the flowing line approaches and reaches it,
          easing back to a slightly-larger "lit" resting size once
          passed, instead of just switching on. */}
      <span
        className="absolute top-1 -left-7.25 h-3 w-3 rounded-full sm:-left-8.25"
        style={{
          backgroundColor: "var(--accent)",
          opacity: markerOpacity,
          transform: `scale(${markerScale})`,
          boxShadow: `0 0 ${8 + markerGlow * 16}px ${2 + markerGlow * 3}px color-mix(in srgb, var(--accent) ${45 + markerGlow * 35}%, transparent)`,
          transitionProperty: "transform, opacity, box-shadow",
          transitionDuration: settled
            ? "240ms, 240ms, 240ms"
            : "600ms, 400ms, 400ms",
          transitionTimingFunction: settled
            ? "ease-out, ease-out, ease-out"
            : "cubic-bezier(0.34,1.56,0.64,1), ease-out, ease-out",
          transitionDelay:
            revealed && !settled ? `${delay}ms, ${delay}ms, ${delay}ms` : "0ms, 0ms, 0ms",
        }}
      />
      <p
        className={`text-[13px] font-bold tracking-wide transition-[opacity,transform] duration-500 ease-out ${
          revealed ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"
        }`}
        style={{
          color: "var(--accent)",
          transitionDelay: revealed ? `${delay + 220}ms` : "0ms",
        }}
      >
        {year}
      </p>
      <p
        className={`mt-1 mb-1.5 text-[17px] font-bold transition-[opacity,transform] duration-500 ease-out ${
          revealed ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"
        }`}
        style={{
          color: "var(--foreground)",
          transitionDelay: revealed ? `${delay + 270}ms` : "0ms",
        }}
      >
        {title}
      </p>
      <p
        className={`max-w-140 text-[14.5px] leading-relaxed transition-[opacity,transform] duration-500 ease-out ${
          revealed ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"
        }`}
        style={{
          color: "var(--muted)",
          transitionDelay: revealed ? `${delay + 320}ms` : "0ms",
        }}
      >
        {description}
      </p>
    </div>
  );
}