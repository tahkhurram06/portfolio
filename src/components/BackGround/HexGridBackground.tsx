"use client";

import { useEffect, useRef } from "react";

// Elements that should trigger the orbiting hover ring. Add
// `data-cursor-hover` to anything custom (a div acting as a button, etc.)
// that isn't covered by this list.
const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, label, summary, [role="button"], [data-cursor-hover]';

const PARTICLE_COUNT = 6;

export default function HexGridBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const particleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const head = headRef.current;
    const particles = particleRefs.current;
    const ring = ringRef.current;
    if (!el || !head || !ring || particles.some((p) => !p)) return;

    let frame: number;

    // target = raw mouse position, pos = eased/lagging position (for stretch calc)
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: target.x, y: target.y };

    // Short history of eased positions, sampled one per frame, so each
    // particle can lag further behind the previous one — this is what
    // reads as a soft drifting trail rather than a hard wedge shape.
    const history: { x: number; y: number }[] = new Array(PARTICLE_COUNT).fill({
      x: pos.x,
      y: pos.y,
    });

    const handleMouseMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;

      // background glow follows instantly (no lag needed for the hex glow)
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--x", `${e.clientX}px`);
        el.style.setProperty("--y", `${e.clientY}px`);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Hover ring: toggled on/off as the pointer enters/leaves anything
    // interactive. Uses pointerover/pointerout (they bubble, like
    // mouseover/mouseout) with a relatedTarget check so moving between
    // a parent and child that both match doesn't flicker the ring off.
    const handlePointerOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest(INTERACTIVE_SELECTOR)) {
        ring.classList.add("cursorRing--active");
      }
    };
    const handlePointerOut = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      const related = e.relatedTarget as HTMLElement | null;
      if (!t?.closest(INTERACTIVE_SELECTOR)) return;
      if (related?.closest(INTERACTIVE_SELECTOR)) return;
      ring.classList.remove("cursorRing--active");
    };

    window.addEventListener("pointerover", handlePointerOver);
    window.addEventListener("pointerout", handlePointerOut);

    // animation loop: eases pos toward target, computes stretch/tail from velocity
    let rafId: number;
    const animate = () => {
      const dx = target.x - pos.x;
      const dy = target.y - pos.y;

      // Faster easing so the cursor feels responsive, with just a touch
      // of glide left (fully instant would be dx/dy directly).
      pos.x += dx * 0.42;
      pos.y += dy * 0.42;

      const speed = Math.min(Math.hypot(dx, dy), 70);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      // Comet head: gentle squash/stretch, most of the "motion" feeling
      // now lives in the trailing particles.
      const headStretch = 1 + speed / 110;
      const headSqueeze = 1 - Math.min(speed / 240, 0.22);
      head.style.transform = `translate(${pos.x}px, ${pos.y}px) rotate(${angle}deg) scale(${headStretch}, ${headSqueeze})`;

      // Shift history forward and push the current eased position on
      // the front, so history[0] is newest (closest to the head) and
      // history[N-1] is oldest (furthest back / most faded).
      history.pop();
      history.unshift({ x: pos.x, y: pos.y });

      const speedFactor = Math.min(speed / 40, 1);
      particles.forEach((particle, i) => {
        if (!particle) return;
        const p = history[i];
        const t = i / (PARTICLE_COUNT - 1); // 0 = newest, 1 = oldest
        const scale = (1 - t * 0.75) * (0.4 + speedFactor * 0.6);
        const opacity = (1 - t) * speedFactor * 0.85;
        particle.style.transform = `translate(${p.x}px, ${p.y}px) scale(${scale})`;
        particle.style.opacity = `${opacity}`;
      });

      // Hover ring just needs to track position — its spin and
      // opacity/active state are handled entirely by CSS.
      ring.style.transform = `translate(${pos.x}px, ${pos.y}px)`;

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerout", handlePointerOut);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="hexbg" aria-hidden="true">
        <div className="hexbg__grid" />
        <div className="hexbg__glow" />
      </div>
      <div ref={ringRef} className="cursorRing" aria-hidden="true">
        <div className="cursorRing__ring cursorRing__ring--1" />
        <div className="cursorRing__ring cursorRing__ring--2" />
        <div className="cursorRing__ring cursorRing__ring--3" />
      </div>
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(node) => {
            particleRefs.current[i] = node;
          }}
          className="cometParticle"
          aria-hidden="true"
        />
      ))}
      <div ref={headRef} className="cometHead" aria-hidden="true" />
    </>
  );
}