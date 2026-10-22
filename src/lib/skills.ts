import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiGit,
  SiGithub,
  SiNodedotjs,
  SiExpress,
  SiRedux,
} from "react-icons/si";

export type Skill = {
  name: string;
  icon: IconType;
  color: string;
  /** True for icons whose real logo is a mono glyph (Next.js, GitHub,
   * Express) rather than a colored mark — rendered on a neutral tile
   * with a theme-reactive glyph color instead of a solid color swatch. */
  mono?: boolean;
};

export const skills: Skill[] = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF", mono: true },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "HTML", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", icon: SiCss, color: "#1572B6" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "#FFFFFF", mono: true },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Express", icon: SiExpress, color: "#FFFFFF", mono: true },
  { name: "Redux Toolkit", icon: SiRedux, color: "#764ABC" },
];