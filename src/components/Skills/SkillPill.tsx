"use client";

import { useState } from "react";
import type { IconType } from "react-icons";

type SkillPillProps = {
  name: string;
  icon: IconType;
  color: string;
  /** Icons whose real-world logo is a mono glyph (Next.js, GitHub,
   * Express) rather than a colored mark — these get a neutral tile
   * with a theme-reactive glyph color instead of being dropped into
   * a solid color swatch like the brand-colored icons. */
  mono?: boolean;
};

export default function SkillPill({
  name,
  icon: Icon,
  color,
  mono = false,
}: SkillPillProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex aspect-square w-21 shrink-0 flex-col items-center justify-center gap-3 rounded-2xl border transition-all duration-250 hover:-translate-y-1 sm:w-23 min-[701px]:w-25"
      style={{
        borderColor: hovered
          ? `color-mix(in srgb, ${color} 60%, transparent)`
          : "var(--surface-border)",
        backgroundColor: hovered
          ? "var(--surface-bg-hover)"
          : "var(--surface-bg)",
        boxShadow: hovered ? `0 0 22px -4px ${color}` : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-250"
        style={{
          backgroundColor: mono ? "var(--surface-bg)" : color,
          borderColor: mono ? "var(--surface-border)" : "transparent",
        }}
      >
        <Icon
          size={24}
          style={{ color: mono ? "var(--foreground)" : "#0a0410" }}
        />
      </div>

      <span
        className="text-center text-[12.5px] font-semibold"
        style={{ color: "var(--foreground)" }}
      >
        {name}
      </span>
    </div>
  );
}