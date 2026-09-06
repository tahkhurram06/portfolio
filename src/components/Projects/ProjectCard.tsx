"use client";

import Image from "next/image";
import { FaGithub } from "react-icons/fa6";
import type { Project } from "../../lib/projects";

type ProjectCardProps = {
  project: Project;
  /** Smaller header, tighter padding/text — used for the homepage preview. */
  compact?: boolean;
};

export default function ProjectCard({
  project,
  compact = false,
}: ProjectCardProps) {
  const {
    title,
    description,
    tags,
    href,
    githubHref,
    image,
    gradient,
    labelColor,
  } = project;

  const card = (
    <div className="relative h-full overflow-hidden rounded-2xl border border-(--surface-border) bg-(--surface-bg) transition-all duration-250 hover:-translate-y-1 hover:border-(--surface-border-hover) hover:bg-(--surface-bg-hover)">
      <div
        className={`relative flex items-center justify-center overflow-hidden ${compact ? "h-21" : "h-30"}`}
      >
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes={compact ? "220px" : "(min-width: 901px) 33vw, 85vw"}
          />
        ) : (
          // No screenshot yet — show the project's gradient with its
          // title instead of falling back to an unrelated placeholder
          // image, which reads as a broken/wrong thumbnail to visitors.
          <div
            className="flex h-full w-full items-center justify-center px-4 text-center"
            style={{ background: gradient }}
          >
            <span
              className={`font-extrabold tracking-wide ${compact ? "text-[13px]" : "text-[16px]"}`}
              style={{ color: labelColor ?? "#ffffff" }}
            >
              {title}
            </span>
          </div>
        )}
      </div>

      <div className={compact ? "p-3" : "p-8 min-[801px]:p-4"}>
        <p
          className={`mb-1 font-bold text-foreground ${compact ? "text-[13px]" : "text-[15px]"}`}
        >
          {title}
        </p>
        <p
          className={`leading-relaxed text-(--muted) ${compact ? "mb-2 text-[11px]" : "mb-2.5 text-[12.5px]"}`}
        >
          {description}
        </p>
        <div className="flex flex-wrap items-center gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full bg-[color-mix(in_srgb,var(--accent)_16%,transparent)] text-(--accent) ${compact ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]"}`}
            >
              {tag}
            </span>
          ))}

          {githubHref && (
            <a
              href={githubHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} on GitHub`}
              onClick={(e) => e.stopPropagation()}
              className={`group/gh ml-auto flex items-center overflow-hidden rounded-full border border-(--surface-border) bg-(--surface-bg) text-foreground transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:border-(--surface-border-hover) hover:bg-(--surface-bg-hover) hover:text-(--accent) hover:pr-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-background ${compact ? "h-6 w-6 hover:w-auto" : "h-7 w-7 hover:w-auto"}`}
            >
              <span
                className={`flex shrink-0 items-center justify-center ${compact ? "h-6 w-6" : "h-7 w-7"}`}
              >
                <FaGithub size={compact ? 13 : 15} />
              </span>
              <span className="flex max-w-0 items-center gap-1 overflow-hidden text-[11px] font-medium whitespace-nowrap opacity-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-75 group-hover/gh:max-w-35 group-hover/gh:opacity-100">
                View on GitHub <span aria-hidden="true">→</span>
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );

  if (!href) return card;

  // A plain <a> can't wrap this card because the GitHub icon inside
  // `card` is itself an <a> — nested anchors are invalid HTML and
  // cause a hydration mismatch (the browser silently un-nests them,
  // React doesn't). A div with link-like behavior avoids the nesting
  // while keeping the whole card clickable and keyboard-accessible.
  return (
    <div
      role="link"
      tabIndex={0}
      data-cursor-hover
      aria-label={title}
      onClick={() => window.open(href, "_blank", "noopener,noreferrer")}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          window.open(href, "_blank", "noopener,noreferrer");
        }
      }}
      className="block h-full cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 `focus-visible:ring-offset-background"
    >
      {card}
    </div>
  );
}
