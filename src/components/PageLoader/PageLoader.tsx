"use client";

import { useEffect, useState } from "react";
import Logo from "../Logo/Logo";

// How long the loader stays fully visible before starting to fade, and
// how long the fade-out transition itself takes. Total time on screen
// is DISPLAY_MS + FADE_MS (~1.8s) — long enough to register as an
// intentional moment, short enough not to feel like a delay.
const DISPLAY_MS = 1300;
const FADE_MS = 500;

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Respect reduced-motion users entirely — skip the animation and
    // don't hold the page hostage for it.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setVisible(false);
      return;
    }

    const fadeTimer = setTimeout(() => setFading(true), DISPLAY_MS);
    const hideTimer = setTimeout(() => setVisible(false), DISPLAY_MS + FADE_MS);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100000] flex items-center justify-center transition-opacity duration-500 ease-out"
      style={{
        backgroundColor: "var(--background)",
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : "auto",
      }}
      aria-hidden="true"
    >
      <div className="relative flex aspect-square w-28 items-center justify-center sm:w-32">
        <div
          className="absolute inset-0 animate-ring-spin rounded-full border-[2.5px] shadow-[0_0_18px_2px_rgba(45,212,191,0.35)]"
          style={{
            borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)",
            borderTopColor: "var(--accent-2)",
          }}
        />
        <div
          className="absolute inset-[12%] animate-ring-spin-reverse rounded-full border-2 shadow-[0_0_14px_1px_rgba(13,148,136,0.3)]"
          style={{
            borderColor: "color-mix(in srgb, var(--accent-2) 22%, transparent)",
            borderRightColor: "var(--accent)",
          }}
        />
        <div
          className="absolute inset-[24%] animate-ring-spin-slow rounded-full border-[1.5px] shadow-[0_0_12px_1px_rgba(242,97,63,0.4)]"
          style={{
            borderColor: "color-mix(in srgb, var(--accent) 18%, transparent)",
            borderBottomColor: "var(--accent-2)",
          }}
        />

        <Logo className="h-12 w-auto animate-fade-up sm:h-14" />
      </div>
    </div>
  );
}