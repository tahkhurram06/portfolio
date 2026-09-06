"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Logo from "../Logo/Logo";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

// Distance from the top of the viewport used as the "active line" —
// whichever tracked section's top has most recently crossed this line
// is the one considered active. Keeping this single source of truth
// (rather than one IntersectionObserver per NavLink) avoids the race
// where two sections can briefly report "not intersecting" at once
// during a fast scroll, which was lighting up Home incorrectly.
const ACTIVE_LINE_PX = 140;

// How close to the bottom of the document (in px) counts as "at the
// bottom" for the purposes of forcing the last section active. Needed
// because the last section's top may never actually cross
// ACTIVE_LINE_PX if there isn't enough room below it to keep
// scrolling — without this, the nav gets stuck highlighting the
// second-to-last section forever once you hit the bottom of the page.
const BOTTOM_SLOP_PX = 2;

// Shared focus-visible ring so keyboard users get a clear, on-brand
// indicator of focus on any custom-styled interactive element in the nav.
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Single tracker for which section is active. Runs only on "/" since
  // that's the only page with [data-nav-section] elements.
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-section]"),
    );
    if (sections.length === 0) {
      setActiveSection(null);
      return;
    }

    const computeActive = () => {
      // Pick the last section whose top has crossed the active line —
      // i.e. the section currently "owning" that band of the viewport.
      let current: string | null = null;
      for (const section of sections) {
        const top = section.getBoundingClientRect().top;
        if (top <= ACTIVE_LINE_PX) {
          current = section.id || null;
        }
      }

      // Fallback: if we've scrolled to (or essentially to) the bottom
      // of the document, the last section is unambiguously the one
      // in view even if its top never made it above ACTIVE_LINE_PX
      // (happens when there isn't enough content/padding below it to
      // scroll that far). Without this, scrolling all the way down
      // can leave the nav stuck on the previous section forever.
      const scrollHeight = document.documentElement.scrollHeight;
      const atBottom =
        window.innerHeight + window.scrollY >= scrollHeight - BOTTOM_SLOP_PX;
      if (atBottom) {
        const last = sections[sections.length - 1];
        current = last.id || current;
      }

      setActiveSection(current);
    };

    computeActive();
    window.addEventListener("scroll", computeActive, { passive: true });
    window.addEventListener("resize", computeActive);
    return () => {
      window.removeEventListener("scroll", computeActive);
      window.removeEventListener("resize", computeActive);
    };
  }, [pathname]);

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/" && activeSection === null;
    if (href.includes("#"))
      return pathname === "/" && activeSection === href.split("#")[1];
    return pathname === href;
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-1000 transition-[padding] duration-300 ${
          scrolled ? "px-6 py-3" : "px-6 py-5"
        }`}
      >
        <nav
          className="mx-auto flex max-w-220 items-center justify-between gap-3 rounded-full border py-2.5 pr-3 pl-5 backdrop-blur-2xl transition-colors duration-300 min-[901px]:gap-6"
          style={{
            borderColor: "var(--nav-border)",
            backgroundColor: scrolled
              ? "var(--nav-bg-scrolled)"
              : "var(--nav-bg)",
            boxShadow: "var(--shadow-nav)",
          }}
        >
          <a
            href="/"
            aria-label="Taha Khurram — Home"
            className={`flex shrink-0 items-center rounded-full ${FOCUS_RING}`}
          >
            <Logo className="h-8 w-auto sm:h-9" />
          </a>

          <div className="hidden items-center gap-1 min-[901px]:flex">
            {LINKS.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={isLinkActive(link.href)}
              />
            ))}
          </div>

          <div className="hidden items-center gap-3 min-[901px]:flex">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`shrink-0 whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-250 hover:-translate-y-px ${FOCUS_RING}`}
              style={{
                color: "var(--foreground)",
                borderColor: "var(--surface-border)",
                backgroundColor: "var(--surface-bg)",
              }}
            >
              Resume
            </a>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 min-[901px]:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className={`flex h-9.5 w-9.5 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full border transition-all duration-250 hover:-translate-y-0.5 ${FOCUS_RING}`}
              style={{
                borderColor: "var(--surface-border)",
                backgroundColor: "var(--surface-bg)",
              }}
            >
              <span
                className="block h-0.5 w-4 rounded-full"
                style={{ backgroundColor: "var(--foreground)" }}
              />
              <span
                className="block h-0.5 w-4 rounded-full"
                style={{ backgroundColor: "var(--foreground)" }}
              />
              <span
                className="block h-0.5 w-4 rounded-full"
                style={{ backgroundColor: "var(--foreground)" }}
              />
            </button>
          </div>
        </nav>

        {/* Fullscreen mobile menu overlay. Sits in its own stacking
            context (fixed + z-999) above the nav bar above, so the
            "Open menu" button behind it is genuinely unclickable while
            this is showing — that's exactly why a dedicated close
            button lives inside the overlay itself, rather than relying
            on toggling the same hamburger button underneath it. */}
        <div
          className="fixed inset-0 z-999 overflow-y-auto backdrop-blur-[20px] transition-[opacity,visibility] duration-350"
          style={{
            backgroundColor: "var(--overlay-bg)",
            opacity: menuOpen ? 1 : 0,
            visibility: menuOpen ? "visible" : "hidden",
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className={`fixed top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-250 hover:-translate-y-0.5 hover:border-[var(--surface-border-hover)] hover:bg-[var(--surface-bg-hover)] ${FOCUS_RING}`}
            style={{
              borderColor: "var(--surface-border)",
              backgroundColor: "var(--surface-bg)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M2 2L14 14M14 2L2 14"
                stroke="var(--foreground)"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div className="flex min-h-full flex-col items-center justify-center gap-3 py-20">
            {LINKS.map((link, i) => (
              <div
                key={link.href}
                className={`text-[22px] transition-[opacity,transform] duration-400 [&_a]:px-6 [&_a]:py-2.5 [&_a]:text-[22px] ${
                  menuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3.5 opacity-0"
                }`}
                style={{ transitionDelay: `${menuOpen ? i * 60 : 0}ms` }}
              >
                <NavLink
                  href={link.href}
                  label={link.label}
                  isActive={isLinkActive(link.href)}
                  onClick={() => setMenuOpen(false)}
                />
              </div>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className={`mt-5 rounded-full border px-7 py-3 text-base font-semibold transition-all duration-250 ${FOCUS_RING}`}
              style={{
                color: "var(--foreground)",
                borderColor: "var(--surface-border)",
                backgroundColor: "var(--surface-bg)",
              }}
            >
              Resume
            </a>
          </div>
        </div>
      </header>

      {/* Persistent floating "Resume" button for small screens — always
          reachable in the corner without opening the hamburger menu at
          all. Hidden at the min-[901px] breakpoint since the full nav
          bar's own Resume button takes over there. Sits below the
          comet-cursor layers (z-9997+) but above ordinary page content. */}
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download resume"
        className={`fixed right-4 bottom-4 z-40 flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-sm font-semibold backdrop-blur-2xl transition-all duration-250 hover:-translate-y-0.5 min-[901px]:hidden ${FOCUS_RING}`}
        style={{
          color: "var(--foreground)",
          borderColor: "var(--nav-border)",
          backgroundColor: "var(--nav-bg-scrolled)",
          boxShadow: "var(--shadow-nav)",
        }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"
            stroke="var(--accent)"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="M14 2v6h6"
            stroke="var(--accent)"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
        Resume
      </a>
    </>
  );
}
