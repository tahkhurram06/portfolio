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
        <div className="absolute inset-0 animate-ring-spin rounded-full border-[2.5px] border-purple-500/30 border-t-fuchsia-400 shadow-[0_0_18px_2px_rgba(232,121,249,0.35)]" />
        <div className="absolute inset-[12%] animate-ring-spin-reverse rounded-full border-2 border-purple-500/22 border-r-purple-300 shadow-[0_0_14px_1px_rgba(168,85,247,0.3)]" />
        <div className="absolute inset-[24%] animate-ring-spin-slow rounded-full border-[1.5px] border-purple-500/18 border-b-violet-200/90" />

        <Logo className="h-12 w-auto animate-fade-up sm:h-14" />
      </div>
    </div>
  );
}