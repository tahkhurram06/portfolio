import type { Metadata } from "next";
import Projects from "../../components/Projects/Projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A selection of projects built by Taha Khurram, including e-commerce storefronts, interactive web experiences, and full-stack applications.",
};

export default function ProjectsPage() {
  return (
    <div className="relative z-10 flex flex-col flex-1">
      <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-20 px-6 pt-[140px] pb-24 sm:gap-24 sm:px-8 min-[901px]:pt-40 min-[901px]:gap-28">
        <Projects />
      </div>
    </div>
  );
}