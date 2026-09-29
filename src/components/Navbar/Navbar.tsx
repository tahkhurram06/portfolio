"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
  const [prefersReduced, setPrefersReduced] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

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

  // Escape closes the drawer, same as clicking the backdrop or the X.
  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  // Focus management for the drawer acting as a modal dialog:
  // - on open, move focus into the drawer (its own close button) so
  //   keyboard/screen-reader users land inside it, not still on the
  //   hamburger button behind the now-open overlay.
  // - on close, return focus to the hamburger button that opened it,
  //   so keyboard users don't lose their place on the page.
  // - while open, Tab/Shift+Tab are trapped within the drawer's
  //   focusable elements so they can't reach content hidden behind
  //   the backdrop.
  useEffect(() => {
    const panel = drawerRef.current;
    if (!menuOpen || !panel) return;

    const focusable = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const handleTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || focusable.length === 0) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleTrap);
    return () => {
      window.removeEventListener("keydown", handleTrap);
      hamburgerRef.current?.focus();
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
          <Link
            href="/"
            aria-label="Taha Khurram — Home"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className={`flex shrink-0 items-center rounded-full ${FOCUS_RING}`}
          >
            <Logo className="h-8 w-auto sm:h-9" />
          </Link>

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
              ref={hamburgerRef}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className={`relative flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-full border transition-all duration-250 hover:-translate-y-0.5 active:scale-90 ${FOCUS_RING}`}
              style={{
                borderColor: "var(--surface-border)",
                backgroundColor: "var(--surface-bg)",
              }}
            >
              <span
                className="absolute block h-0.5 w-4 rounded-full transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                style={{
                  backgroundColor: "var(--foreground)",
                  transform: menuOpen
                    ? "translateY(0) rotate(45deg)"
                    : "translateY(-5px) rotate(0deg)",
                }}
              />
              <span
                className="absolute block h-0.5 w-4 rounded-full transition-[opacity,transform] duration-200 ease-out"
                style={{
                  backgroundColor: "var(--foreground)",
                  opacity: menuOpen ? 0 : 1,
                  transform: menuOpen ? "scaleX(0)" : "scaleX(1)",
                }}
              />
              <span
                className="absolute block h-0.5 w-4 rounded-full transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                style={{
                  backgroundColor: "var(--foreground)",
                  transform: menuOpen
                    ? "translateY(0) rotate(-45deg)"
                    : "translateY(5px) rotate(0deg)",
                }}
              />
            </button>
          </div>
        </nav>

        {/* Mobile nav drawer: slides in from the right (same side as the
            hamburger button that opens it) over a dimmed backdrop, rather
            than taking over the whole screen. Two separate layers:
            - backdrop: fixed, full-screen, just dims/blurs slightly and
              is clickable to close.
            - panel: fixed-width column sliding in via translateX, sits
              above the backdrop, holds the links/resume/close button. */}
        <div
          className={`fixed inset-0 z-999 ${prefersReduced ? "transition-[opacity,visibility] duration-200" : "transition-[opacity,visibility,backdrop-filter] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"}`}
          style={{
            backgroundColor: "rgba(0,0,0,0.42)",
            opacity: menuOpen ? 1 : 0,
            visibility: menuOpen ? "visible" : "hidden",
            backdropFilter: prefersReduced ? undefined : menuOpen ? "blur(6px)" : "blur(0px)",
            WebkitBackdropFilter: prefersReduced ? undefined : menuOpen ? "blur(6px)" : "blur(0px)",
            transitionDelay: menuOpen ? "0ms" : "120ms",
          }}
          onClick={() => setMenuOpen(false)}
          aria-hidden={!menuOpen}
        />

        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className={`fixed inset-y-0 right-0 z-999 flex w-[78vw] max-w-80 flex-col overflow-y-auto border-l ${prefersReduced ? "transition-transform duration-200" : "transition-transform duration-450 ease-[cubic-bezier(0.16,1,0.3,1)]"}`}
          style={{
            borderColor: "var(--nav-border)",
            backgroundColor: "var(--overlay-bg)",
            boxShadow: menuOpen ? "-16px 0 40px rgba(0,0,0,0.25)" : "none",
            transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          }}
        >
          <div
            className="flex items-center justify-between px-5 pt-5 pb-2"
            style={
              prefersReduced
                ? undefined
                : {
                    transitionProperty: "transform, opacity",
                    transitionDuration: menuOpen ? "400ms" : "150ms",
                    transitionTimingFunction: menuOpen
                      ? "cubic-bezier(0.22, 1, 0.36, 1)"
                      : "ease-in",
                    transitionDelay: menuOpen ? "60ms" : "0ms",
                    transform: menuOpen ? "translateY(0)" : "translateY(-10px)",
                    opacity: menuOpen ? 1 : 0,
                  }
            }
          >
            <Logo className="h-8 w-auto" />
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className={`flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-0.5 hover:rotate-90 active:scale-90 hover:border-(--surface-border-hover) hover:bg-(--surface-bg-hover) ${FOCUS_RING}`}
              style={{
                borderColor: "var(--surface-border)",
                backgroundColor: "var(--surface-bg)",
              }}
            >
              <svg
                width="15"
                height="15"
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
          </div>

          <div className="flex flex-1 flex-col gap-1 px-5 py-6">
            {LINKS.map((link, i) => (
              <div
                key={link.href}
                className="[&_a]:block [&_a]:w-full [&_a]:px-4 [&_a]:py-3 [&_a]:text-[16px]"
                style={
                  prefersReduced
                    ? { opacity: menuOpen ? 1 : 0, transitionProperty: "opacity", transitionDuration: "150ms" }
                    : {
                        transitionProperty: "transform, opacity",
                        transitionDuration: menuOpen ? "480ms" : "200ms",
                        transitionTimingFunction: menuOpen
                          ? "cubic-bezier(0.16, 1, 0.3, 1)"
                          : "ease-in",
                        transitionDelay: menuOpen
                          ? `${90 + i * 55}ms`
                          : `${(LINKS.length - 1 - i) * 30}ms`,
                        transform: menuOpen
                          ? "translateX(0) scale(1)"
                          : "translateX(28px) scale(0.96)",
                        opacity: menuOpen ? 1 : 0,
                      }
                }
              >
                <NavLink
                  href={link.href}
                  label={link.label}
                  isActive={isLinkActive(link.href)}
                  onClick={() => setMenuOpen(false)}
                />
              </div>
            ))}
          </div>

          <div
            className="px-5 pt-2 pb-6"
            style={
              prefersReduced
                ? { opacity: menuOpen ? 1 : 0, transitionProperty: "opacity", transitionDuration: "150ms" }
                : {
                    transitionProperty: "transform, opacity",
                    transitionDuration: menuOpen ? "480ms" : "150ms",
                    transitionTimingFunction: menuOpen
                      ? "cubic-bezier(0.16, 1, 0.3, 1)"
                      : "ease-in",
                    transitionDelay: menuOpen ? `${90 + LINKS.length * 55}ms` : "0ms",
                    transform: menuOpen ? "translateX(0)" : "translateX(28px)",
                    opacity: menuOpen ? 1 : 0,
                  }
            }
          >
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-250 hover:-translate-y-px active:scale-95 ${FOCUS_RING}`}
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