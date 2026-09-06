"use client";

import { useState } from "react";
import type { IconType } from "react-icons";

type SkillPillProps = {
  name: string;
  icon: IconType;
  color: string;
};

export default function SkillPill({ name, icon: Icon, color }: SkillPillProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex aspect-square w-30 shrink-0 flex-col items-center justify-center gap-3 rounded-2xl border transition-all duration-250 hover:-translate-y-1 sm:w-23 min-[701px]:w-25"
      style={{
        borderColor: hovered ? color : "var(--surface-border)",
        backgroundColor: hovered
          ? "var(--surface-bg-hover)"
          : "var(--surface-bg)",
        boxShadow: hovered ? `0 0 22px -4px ${color}` : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="flex h-17 w-17 items-center justify-center rounded-xl transition-all duration-250"
        style={{ backgroundColor: color }}
      >
        <div className="w-10 h-10 min-[801px]:w-6 min-[801px]:h-6">
          <Icon className="w-full h-full" style={{ color: "#0a0410" }} />
        </div>
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
