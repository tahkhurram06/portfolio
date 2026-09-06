"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
};

export default function NavLink({
  href,
  label,
  isActive,
  onClick,
}: NavLinkProps) {
  const pathname = usePathname();
  const isHomeLink = href === "/";
  const isHashLink = href.includes("#");
  const sectionId = isHashLink ? href.split("#")[1] : null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Next.js's <Link> only auto-scrolls to a hash on an actual page
    // navigation (landing on /#about from elsewhere, or a hard reload).
    // Clicking a same-page hash link while already on "/" doesn't
    // trigger a scroll at all — the URL updates but nothing moves.
    // So every in-page hash link needs a manual scroll here, the same
    // way Home already did.
    if (pathname === "/") {
      if (isHomeLink) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (sectionId) {
        const target = document.getElementById(sectionId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
    onClick?.();
  };

  // Shared focus-visible ring so keyboard users always get a clear,
  // on-brand indicator of which link is focused — regardless of the
  // active/inactive color scheme below.
  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]";

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={
        isActive
          ? `relative whitespace-nowrap rounded-full bg-linear-to-br from-(--pill-active-from) to-(--pill-active-to) px-3.5 py-2 text-sm font-medium text-(--pill-active-text) shadow-[0_0_16px_color-mix(in_srgb,var(--pill-active-to)_50%,transparent)] transition-colors duration-300 ease-out ${focusRing}`
          : `relative whitespace-nowrap rounded-full bg-transparent px-3.5 py-2 text-sm font-medium text-(--muted) transition-colors duration-300 ease-out hover:bg-(--surface-bg) hover:text-foreground) ${focusRing}`
      }
    >
      {label}
    </Link>
  );
}
