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

  // useLayoutEffect runs synchronously before the browser paints, so
  // applying the saved/explicit theme here causes no visible flash —
  // no pre-hydration <script> needed at all (CSS handles the very
  // first frame via prefers-color-scheme, see globals.css).
  useLayoutEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("theme");
    } catch {
      // localStorage unavailable — fall back to system preference
    }
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const resolved =
      stored === "light" || stored === "dark" ? stored === "dark" : systemDark;

    applyTheme(resolved);
    setIsDark(resolved);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    applyTheme(next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // theme just won't persist across reloads in this session
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"
      }
      className="relative flex h-9 w-16 shrink-0 items-center rounded-full border px-1 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-background)"
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
