"use client";

// React 19 + Next.js 16.2+ log a false-positive dev warning for inline
// <script> tags rendered through next/script's beforeInteractive
// strategy (see pacocoursey/next-themes#385, shadcn-ui/ui#10104).
// The patch runs at module load, on the client only, before any
// component renders, so it catches the warning during hydration too.
// Lives here (not in layout.tsx) because layout is a server component,
// where `window` never exists and the old patch could never run.
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const originalError = console.error;
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Encountered a script tag while rendering React component")
    ) {
      return;
    }
    originalError.apply(console, args);
  };
}

export default function DevConsoleFilter() {
  return null;
}