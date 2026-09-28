"use client";

import { useLayoutEffect, useState } from "react";

function applyTheme(isDark: boolean) {
  const root = document.documentElement;
  root.classList.toggle("dark", isDark);
  root.classList.toggle("light", !isDark);
}

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // The inline init script in layout.tsx (themeInitScript) has already
  // put the right class on <html> before first paint. Here we only sync
  // React state to it, so the toggle can't disagree with what's shown.
  useLayoutEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = !isDark;

    const commit = () => {
      setIsDark(next);
      applyTheme(next);
      try {
        localStorage.setItem("theme", next ? "dark" : "light");
      } catch {
        // theme just won't persist across reloads in this session
      }
    };

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Circular reveal, expanding from the button, via the View
    // Transitions API. Browsers without support (or reduced-motion
    // users) just get the instant swap — commit() is the whole
    // behavior either way, the animation is a progressive enhancement
    // layered on top of it.
    if (prefersReduced || !document.startViewTransition) {
      commit();
      return;
    }

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(commit);

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 650,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"
      }
      className="relative flex h-9 w-16 shrink-0 items-center rounded-full border px-1 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      style={{
        borderColor: "var(--surface-border)",
        backgroundColor: "var(--surface-bg)",
      }}
    >
      <span
        className="flex h-7 w-7 items-center justify-center rounded-full text-sm shadow-sm transition-transform duration-300 ease-out"
        style={{
          backgroundColor: "var(--pill-active-to)",
          transform: mounted && isDark ? "translateX(28px)" : "translateX(0px)",
        }}
      >
        {mounted ? (isDark ? "🌙" : "☀️") : null}
      </span>
    </button>
  );
}