"use client";

import { useEffect, useRef, useState } from "react";
import { timeline } from "../../../lib/timeline";
import TimelineItem from "./TimelineItem";
import WorkTogetherCTA from "./WorkTogetherCTA";

// Same "active line" idea as the navbar's scroll tracking: a fixed
// point down from the top of the viewport that we treat as "now". As
// that point travels down the rail, the glow tracks with it — and each
// item's marker (see TimelineItem) grows as this line reaches it.
const ACTIVE_LINE_PX = 260;

export default function Timeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  // 0 to 1 progress of how far the viewport's "active line" has moved
  // down the timeline's vertical rail. Drives the glow's top offset.
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateProgress = () => {
      const rect = track.getBoundingClientRect();
      const railHeight = rect.height;
      if (railHeight <= 0) return;

      const traveled = ACTIVE_LINE_PX - rect.top;
      const clamped = Math.min(Math.max(traveled / railHeight, 0), 1);
      setProgress(clamped);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <section className="animate-fade-up">
      <h2
        className="mb-7 text-[22px] font-bold sm:mb-8 sm:text-2xl"
        style={{ color: "var(--foreground)" }}
      >
        Timeline
      </h2>

      <div className="grid grid-cols-1 items-center gap-4 min-[901px]:grid-cols-[1fr_300px] min-[901px]:gap-10">
        <div ref={trackRef} className="relative pl-6 sm:pl-7">
          {/* Base rail — thickened into a rounded tube rather than a
              hairline, so the flowing fill inside it reads clearly. */}
          <div
            className="absolute top-0 left-0 h-full w-1 rounded-full"
            style={{ backgroundColor: "var(--surface-border)" }}
          />

          {/* Single glowing line, growing from the top of the rail down
              to the current scroll position. Its background is a smooth
              repeating brightness pulse (.timelineFlow, see globals.css)
              that animates continuously via background-position — always
              solid accent color, just flowing brighter/dimmer down the
              tube like light moving through water, independent of scroll
              speed. */}
          <div
            className="timelineFlow pointer-events-none absolute top-0 left-0 w-1 rounded-full transition-[height] duration-150 ease-out"
            style={{
              height: `${progress * 100}%`,
              boxShadow: "0 0 14px 2px color-mix(in srgb, var(--accent) 55%, transparent)",
            }}
          />

          {timeline.map((entry, i) => (
            <TimelineItem
              key={entry.year}
              year={entry.year}
              title={entry.title}
              description={entry.description}
              isLast={i === timeline.length - 1}
              // Capped so it only staggers items that show up together
              // (page load, fast scroll) — doesn't add lag to an item
              // you slowly scroll down to on its own.
              delay={Math.min(i * 90, 360)}
              activeLinePx={ACTIVE_LINE_PX}
            />
          ))}
        </div>

        <WorkTogetherCTA />
      </div>
    </section>
  );
}