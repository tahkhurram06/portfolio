"use client";

import { useEffect, useRef, useState } from "react";
import { timeline } from "../../../lib/timeline";
import TimelineItem from "./TimelineItem";
import WorkTogetherCTA from "./WorkTogetherCTA";

export default function Timeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  // 0 to 1 progress of how far the viewport's "active line" has moved
  // down the timeline's vertical rail. Drives the glow's top offset.
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Same "active line" idea as the navbar's scroll tracking: a fixed
    // point down from the top of the viewport that we treat as "now".
    // As that point travels down the rail (between the rail's top and
    // bottom), the glow tracks along with it.
    const ACTIVE_LINE_PX = 260;

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
          {/* Base rail */}
          <div
            className="absolute top-0 left-0 h-full w-px"
            style={{ backgroundColor: "var(--surface-border)" }}
          />

          {/* Glowing marker that travels down the rail as you scroll */}
          <div
            className="pointer-events-none absolute left-0 w-px transition-[top] duration-150 ease-out"
            style={{
              top: `${progress * 100}%`,
              height: "120px",
              transform: "translateY(-50%)",
              background:
                "linear-gradient(to bottom, transparent, var(--accent), transparent)",
              boxShadow: "0 0 16px 3px color-mix(in srgb, var(--accent) 65%, transparent)",
            }}
          />

          {timeline.map((entry, i) => (
            <TimelineItem
              key={entry.year}
              year={entry.year}
              title={entry.title}
              description={entry.description}
              isLast={i === timeline.length - 1}
            />
          ))}
        </div>

        <WorkTogetherCTA />
      </div>
    </section>
  );
}