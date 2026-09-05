"use client";

import { skills } from "../../lib/skills";
import SkillPill from "./SkillPill";

export default function Skills() {
  return (
    <section className="animate-fade-up">
      <h2
        className="mb-7 text-[22px] font-bold sm:mb-8 sm:text-2xl"
        style={{ color: "var(--foreground)" }}
      >
        Skills
      </h2>

      <div className="flex flex-wrap justify-center gap-3 sm:gap-3.5 min-[801px]:justify-start">
        {skills.map((skill) => (
          <SkillPill
            key={skill.name}
            name={skill.name}
            icon={skill.icon}
            color={skill.color}
          />
        ))}
      </div>
    </section>
  );
}
