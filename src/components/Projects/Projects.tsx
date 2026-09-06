import Link from "next/link";
import { projects } from "../../lib/projects";
import ProjectCard from "./ProjectCard";

type ProjectsProps = {
  /** Show only the first N projects. Omit to show all. */
  limit?: number;
  /** Show a "View all projects" button linking to /projects. */
  showViewAll?: boolean;
  /**
   * Mini fixed-width cards that sit in a row (homepage preview) instead
   * of the full-size cards that stretch to fill the grid (/projects page).
   */
  compact?: boolean;
  /**
   * Force a single row of 3 columns regardless of viewport width
   * (used for the homepage preview). On narrow screens the row
   * scrolls horizontally instead of wrapping.
   */
  singleRow?: boolean;
};

export default function Projects({
  limit,
  showViewAll,
  compact = false,
  singleRow = false,
}: ProjectsProps) {
  const list = typeof limit === "number" ? projects.slice(0, limit) : projects;

  return (
    <section className="animate-fade-up">
      <h2
        className="mb-7 text-[22px] font-bold sm:mb-8 sm:text-2xl"
        style={{ color: "var(--foreground)" }}
      >
        Projects
      </h2>

      {compact ? (
        <div className="flex flex-wrap gap-4">
          {list.map((project) => (
            <div key={project.title} className="w-[47%] min-[560px]:w-52.5">
              <ProjectCard project={project} compact />
            </div>
          ))}
        </div>
      ) : singleRow ? (
        // Breakpoint aligned to min-[801px] to match Bio/Timeline/Footer,
        // which all stay stacked/mobile until ~800px. The old "sm:" (640px)
        // squeezed 3 full-size cards into a tablet-portrait width before
        // there was really room for them.
        <div className="flex gap-4 overflow-x-auto pb-2 min-[801px]:grid min-[801px]:grid-cols-3 min-[801px]:overflow-visible min-[801px]:pb-0">
          {list.map((project) => (
            <div
              key={project.title}
              className="w-[85%] shrink-0 min-[801px]:w-auto min-[801px]:shrink"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 min-[901px]:grid-cols-3">
          {list.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      )}

      {showViewAll && (
        <div className="mt-8 flex justify-center">
          <Link
            href="/projects"
            className="rounded-full border px-6 py-2.5 text-sm font-semibold transition-all duration-250 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-background)"
            style={{
              color: "var(--foreground)",
              borderColor: "var(--surface-border)",
              backgroundColor: "var(--surface-bg)",
            }}
          >
            View all projects
          </Link>
        </div>
      )}
    </section>
  );
}
