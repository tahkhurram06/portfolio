"use client";

import { useEffect, useRef } from "react";

// Same tech icon set used across the site's Skills section — kept as
// inline SVG paths here (not react-icons) so each node can carry its
// own `mono` flag and render at a fixed, predictable size inside the
// small circular tiles.
type GraphSkill = {
  name: string;
  color: string;
  /** True for icons whose real logo is a mono glyph (Next.js, Express)
   * rather than a colored mark — rendered in --foreground-ish white
   * instead of a brand color, same convention as SkillPill. */
  mono?: boolean;
  path: string;
  viewBox?: string;
};

const SKILLS: GraphSkill[] = [
  {
    name: "React",
    color: "#61dafb",
    path: '<circle cx="12" cy="12" r="2.1" fill="currentColor" stroke="none"/><ellipse cx="12" cy="12" rx="10" ry="4.1"/><ellipse cx="12" cy="12" rx="10" ry="4.1" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.1" transform="rotate(120 12 12)"/>',
  },
  {
    name: "Next.js",
    color: "#ffffff",
    mono: true,
    path: '<path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.251 1.6.422 2.534.526.363.04 1.935.04 2.299 0 1.611-.179 2.977-.578 4.323-1.264.207-.106.247-.134.219-.158-.02-.015-.9-1.197-1.955-2.62l-1.919-2.586-2.404-3.558a339.159 339.159 0 0 0-2.422-3.556c-.009-.003-.018 1.578-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.038-.14.045-.495.045H7.81l-.108-.068a.44.44 0 0 1-.157-.171l-.05-.106.005-4.703.007-4.705.073-.092a.645.645 0 0 1 .174-.143c.096-.047.133-.051.5-.051.396 0 .396 0 .498.075.077.055 3.1 4.63 6.756 10.164l6.49 9.773.078.03a1.28 1.28 0 0 0 .378-.21 12 12 0 0 0 3.498-5.02 11.904 11.904 0 0 0 .682-6.075c-.03-.21-.062-.42-.095-.63-.65-4.506-3.858-8.292-8.206-9.695A12.1 12.1 0 0 0 13.9.108Z"/>',
  },
  {
    name: "TypeScript",
    color: "#3178c6",
    path: '<path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.09 8.95v1.924h-2.13v9.49H4.06v-9.49H1.93V8.95h6.66zm2.16 9.49h2.5v-1.5h2.65v-2.1h-2.65V12.9h2.65V10.8h-5.15v7.64zm3.98-7.64v2.1h2.1v5.54h2.5V12.9h2.1v-2.1h-6.7z"/>',
  },
  {
    name: "Node.js",
    color: "#83cd29",
    path: '<path d="M12 2 3 7v10l9 5 9-5V7l-9-5zm0 2.2 7 3.9v9.8l-7 3.9-7-3.9V8.1l7-3.9z"/>',
  },
  {
    name: "Git",
    color: "#f05032",
    path: '<path d="M23.546 10.93 13.067.452a1.55 1.55 0 0 0-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.341l2.658 2.66a1.838 1.838 0 0 1 1.9 3.039 1.84 1.84 0 1 1-2.6-2.598c.067-.067.144-.13.219-.182l-2.479-2.482v6.524a1.837 1.837 0 1 1-1.513-.052V7.503a1.838 1.838 0 0 1-.994-2.41L8.26 2.37.452 10.173a1.55 1.55 0 0 0 0 2.188l10.479 10.478a1.55 1.55 0 0 0 2.188 0l10.427-10.425a1.55 1.55 0 0 0 0-2.19"/>',
  },
  {
    name: "Tailwind",
    color: "#38bdf8",
    path: '<path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.761.19 1.305.742 1.906 1.352C13.355 10.806 14.515 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.761-.19-1.305-.742-1.906-1.352C15.645 7.194 14.485 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.761.19 1.305.742 1.906 1.352C8.355 16.806 9.515 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.761-.19-1.305-.742-1.906-1.352C10.645 13.194 9.485 12 7 12z"/>',
  },
  {
    name: "Express",
    color: "#ffffff",
    mono: true,
    path: '<path d="M2 18V6h7l3 5 3-5h7v12" fill="none" stroke="currentColor" stroke-width="2"/><path d="M5 12h4M16 12h4" fill="none" stroke="currentColor" stroke-width="2"/>',
  },
  {
    name: "GitHub",
    color: "#ffffff",
    mono: true,
    path: '<path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.57.1.78-.25.78-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.02 1.75 2.68 1.25 3.33.95.1-.74.4-1.25.72-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.26 5.69.41.36.78 1.07.78 2.17 0 1.56-.01 2.82-.01 3.2 0 .31.2.67.79.56C20.71 21.37 24 17.07 24 12c0-6.27-5.23-11.5-12-11.5z"/>',
  },
];

type OrbitConfig = {
  /** Orbit radius in the 420-unit stage space. */
  r: number;
  /** 1 = clockwise, -1 = counter-clockwise. */
  dir: 1 | -1;
  /** Angular speed in radians per second. */
  speed: number;
  /** Rotates the starting angle of the whole orbit. */
  phase: number;
  /** Indices into SKILLS that live on this orbit. */
  indices: number[];
};

// Two concentric orbits turning in opposite directions. Radii are chosen
// so the outer tiles still sit fully inside the circular clip
// (VIEW / 2 = 210) while using far more of the stage than before.
const ORBITS: OrbitConfig[] = [
  { r: 86, dir: -1, speed: 0.24, phase: Math.PI / 3, indices: [0, 3, 6] },
  { r: 158, dir: 1, speed: 0.13, phase: 0, indices: [1, 2, 4, 5, 7] },
];

type NodeRuntime = {
  el: HTMLDivElement;
  path: SVGPathElement; // edge: node -> hub
  secondary: SVGPathElement; // edge: node -> next node on same orbit
  packet: SVGCircleElement;
  delay: number;
  orbit: number; // index into ORBITS
  baseAngle: number;
  nextIdx: number; // index (in nodes[]) of next node on the same orbit
};

const VIEW = 420;
const CX = VIEW / 2;
const CY = VIEW / 2;
const N = SKILLS.length;
const TILE = 64; // node tile size (px in stage space)
const ICON = 34;

const STAGGER = 0.45;
const POP_DUR = 0.55;
const HOLD_UNTIL = STAGGER * (N - 1) + POP_DUR + 3.0;
const FADE_DUR = 1.1;
const CYCLE = HOLD_UNTIL + FADE_DUR + 1.2;

// Packets keep flowing into the hub for as long as the graph is visible.
const PACKET_TRAVEL = 1.1;
const PACKET_PERIOD = 2.8;

function easeOutBack(t: number) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}
function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}

const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * Replaces the Bio photo with an animated "build graph": skill icons
 * ride two large concentric orbits (turning in opposite directions),
 * each wired to a pulsing center hub and to its neighbour on the same
 * orbit, with coral light packets flowing inward along the spokes.
 *
 * Everything runs off one shared rAF clock. `cycle` drives the
 * pop-in / hold / fade-out reveal; `clock` is a separate, never-resetting
 * time that drives orbital rotation, so nodes keep gliding smoothly
 * across the end of a cycle instead of snapping back.
 *
 * Sits inside the same ring treatment Bio.tsx already wraps around the
 * photo, so this component fills only the inner circular slot and
 * intentionally has no boundary ring or outer glow of its own.
 */
export default function BuildGraphAnimation() {
  const stageRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const starsLayerRef = useRef<HTMLDivElement>(null);
  const orbitsLayerRef = useRef<SVGGElement>(null);
  const edgesLayerRef = useRef<SVGGElement>(null);
  const packetsLayerRef = useRef<SVGGElement>(null);
  const dustLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const scaleEl = scaleRef.current;
    const starsLayer = starsLayerRef.current;
    const orbitsLayer = orbitsLayerRef.current;
    const edgesLayer = edgesLayerRef.current;
    const packetsLayer = packetsLayerRef.current;
    const dustLayer = dustLayerRef.current;
    const coreEl = coreRef.current;
    if (
      !stage ||
      !scaleEl ||
      !starsLayer ||
      !orbitsLayer ||
      !edgesLayer ||
      !packetsLayer ||
      !dustLayer ||
      !coreEl
    )
      return;

    // The SVG layer scales itself via viewBox, but the plain HTML node
    // tiles (and dust) are positioned with raw pixel coordinates in the
    // same 420-unit space. This wrapper keeps the HTML layer locked to
    // the SVG's scaling.
    const applyScale = () => {
      const size = stage.clientWidth; // stage is always square
      if (size > 0) scaleEl.style.transform = `scale(${size / VIEW})`;
    };
    applyScale();
    const resizeObserver = new ResizeObserver(applyScale);
    resizeObserver.observe(stage);

    // clear in case of hot-reload re-run
    starsLayer.innerHTML = "";
    orbitsLayer.innerHTML = "";
    edgesLayer.innerHTML = "";
    packetsLayer.innerHTML = "";
    dustLayer.innerHTML = "";

    // background dust specks, independent ambience
    for (let i = 0; i < 20; i++) {
      const d = document.createElement("div");
      d.className = "bg-dust-node";
      const size = 1 + Math.random() * 1.5;
      d.style.position = "absolute";
      d.style.width = `${size}px`;
      d.style.height = `${size}px`;
      d.style.borderRadius = "50%";
      d.style.background = "var(--accent)";
      d.style.left = `${Math.random() * 100}%`;
      d.style.top = `${Math.random() * 100}%`;
      d.style.animation = `buildGraphTwinkle ${3 + Math.random() * 4}s ease-in-out infinite`;
      d.style.animationDelay = `${Math.random() * 4}s`;
      dustLayer.appendChild(d);
    }

    // Faint dashed orbit tracks the nodes ride on.
    const orbitRings: SVGCircleElement[] = ORBITS.map((o) => {
      const ring = document.createElementNS(SVG_NS, "circle");
      ring.setAttribute("cx", `${CX}`);
      ring.setAttribute("cy", `${CY}`);
      ring.setAttribute("r", `${o.r}`);
      ring.setAttribute("class", "build-graph-orbit");
      orbitsLayer.appendChild(ring);
      return ring;
    });

    // Build node runtimes. Each skill gets its orbit slot (even spacing
    // around its orbit) and a link to the next node on the same orbit.
    const nodes: NodeRuntime[] = new Array(N);
    ORBITS.forEach((o, orbitIdx) => {
      const M = o.indices.length;
      o.indices.forEach((skillIdx, k) => {
        const s = SKILLS[skillIdx];
        const nextSkillIdx = o.indices[(k + 1) % M];

        const el = document.createElement("div");
        el.className = "build-graph-node";
        el.style.width = `${TILE}px`;
        el.style.height = `${TILE}px`;
        el.style.margin = `${-TILE / 2}px 0 0 ${-TILE / 2}px`;
        el.style.borderRadius = "20px";
        el.innerHTML = `<svg viewBox="${s.viewBox ?? "0 0 24 24"}" fill="currentColor" style="width:${ICON}px;height:${ICON}px;color:${s.mono ? "var(--foreground)" : s.color}">${s.path}</svg>`;
        starsLayer.appendChild(el);

        // pathLength=1 makes dash math independent of the (now changing)
        // edge length, so edges can follow moving nodes cleanly.
        const path = document.createElementNS(SVG_NS, "path");
        path.setAttribute("class", "build-graph-edge");
        path.setAttribute("pathLength", "1");
        path.style.strokeDasharray = "1";
        edgesLayer.appendChild(path);

        const secondary = document.createElementNS(SVG_NS, "path");
        secondary.setAttribute(
          "class",
          "build-graph-edge build-graph-edge--secondary",
        );
        secondary.setAttribute("pathLength", "1");
        secondary.style.strokeDasharray = "1";
        edgesLayer.appendChild(secondary);

        const packet = document.createElementNS(SVG_NS, "circle");
        packet.setAttribute("r", "3");
        packet.setAttribute("fill", "#f2613f");
        packet.setAttribute("class", "build-graph-packet");
        packetsLayer.appendChild(packet);

        nodes[skillIdx] = {
          el,
          path,
          secondary,
          packet,
          delay: skillIdx * STAGGER,
          orbit: orbitIdx,
          baseAngle: (k / M) * Math.PI * 2 - Math.PI / 2 + o.phase,
          nextIdx: nextSkillIdx,
        };
      });
    });

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const pts = nodes.map(() => ({ x: CX, y: CY }));

    function render(tInCycle: number, clock: number) {
      const fadeT = clamp01((tInCycle - HOLD_UNTIL) / FADE_DUR);
      const globalOpacity = 1 - fadeT;

      const corePulse =
        1 + 0.3 * (0.5 + 0.5 * Math.sin((tInCycle * Math.PI * 2) / 1.5));
      coreEl!.style.transform = `scale(${corePulse})`;
      coreEl!.style.boxShadow = `0 0 ${18 + (8 * (corePulse - 1)) / 0.3}px ${5 + (2 * (corePulse - 1)) / 0.3}px rgba(45,212,191,0.5), 0 0 40px 12px rgba(242,97,63,0.14)`;
      coreEl!.style.opacity = `${globalOpacity}`;

      // orbit tracks: fade in with the first nodes, crawl slowly so the
      // dashes themselves read as motion along the orbit.
      orbitRings.forEach((ring, i) => {
        const o = ORBITS[i];
        const appear = clamp01((tInCycle - 0.1 - i * 0.3) / 0.9);
        ring.style.opacity = `${appear * globalOpacity}`;
        ring.style.strokeDashoffset = `${-o.dir * clock * o.speed * o.r}`;
      });

      // current position of every node on its orbit
      nodes.forEach((n, i) => {
        const o = ORBITS[n.orbit];
        const a = n.baseAngle + o.dir * o.speed * clock;
        pts[i].x = CX + o.r * Math.cos(a);
        pts[i].y = CY + o.r * Math.sin(a);
      });

      nodes.forEach((n, i) => {
        const p = pts[i];
        const local = tInCycle - n.delay;

        let scale = 0.3;
        let opacity = 0;
        let borderColor = "color-mix(in srgb, var(--accent) 30%, transparent)";
        let glow = "0 4px 14px rgba(0,0,0,0.3)";

        if (local < 0) {
          scale = 0.3;
          opacity = 0;
        } else if (local < POP_DUR) {
          const t = local / POP_DUR;
          scale = 0.3 + (1.08 - 0.3) * easeOutBack(t);
          opacity = clamp01(t * 3);
          if (t < 0.6) {
            borderColor = "#f2613f";
            glow = "0 0 20px 4px rgba(242,97,63,0.6)";
          }
        } else if (local < POP_DUR + 0.25) {
          const t = (local - POP_DUR) / 0.25;
          scale = 1.08 + (1 - 1.08) * t;
          opacity = 1;
        } else {
          scale = 1;
          opacity = 1;
        }

        n.el.style.left = `${p.x}px`;
        n.el.style.top = `${p.y}px`;
        n.el.style.transform = `scale(${scale})`;
        n.el.style.opacity = `${opacity * globalOpacity}`;
        n.el.style.borderColor = borderColor;
        n.el.style.boxShadow = glow;

        // spoke: node -> hub (follows the node as it orbits)
        let dashOffset = 1;
        let edgeOpacity = 0;
        if (local >= 0) {
          const t = clamp01(local / POP_DUR);
          dashOffset = 1 - t;
          edgeOpacity = 0.55 * clamp01(local / (POP_DUR * 0.4));
        }
        n.path.setAttribute("d", `M ${p.x} ${p.y} L ${CX} ${CY}`);
        n.path.style.strokeDashoffset = `${dashOffset}`;
        n.path.style.opacity = `${edgeOpacity * globalOpacity}`;

        // web: node -> next node on the same orbit
        const q = pts[n.nextIdx];
        const sDelay = Math.max(n.delay, nodes[n.nextIdx].delay) + 0.2;
        const sLocal = tInCycle - sDelay;
        let sOffset = 1;
        let sOpacity = 0;
        if (sLocal >= 0) {
          const t = clamp01(sLocal / POP_DUR);
          sOffset = 1 - t;
          sOpacity = 0.28 * clamp01(sLocal / (POP_DUR * 0.4));
        }
        n.secondary.setAttribute("d", `M ${p.x} ${p.y} L ${q.x} ${q.y}`);
        n.secondary.style.strokeDashoffset = `${sOffset}`;
        n.secondary.style.opacity = `${sOpacity * globalOpacity}`;

        // packets keep flowing node -> hub while the graph is visible
        const pLocal = tInCycle - (n.delay + POP_DUR);
        const inPulse = pLocal >= 0 ? pLocal % PACKET_PERIOD : -1;
        if (inPulse >= 0 && inPulse <= PACKET_TRAVEL) {
          const t = clamp01(inPulse / PACKET_TRAVEL);
          n.packet.setAttribute("cx", `${p.x + (CX - p.x) * t}`);
          n.packet.setAttribute("cy", `${p.y + (CY - p.y) * t}`);
          n.packet.style.opacity = `${globalOpacity}`;
        } else {
          n.packet.style.opacity = "0";
        }
      });
    }

    if (prefersReduced) {
      render(HOLD_UNTIL - 0.01, 0);
      return () => resizeObserver.disconnect();
    }

    let rafId = 0;
    const start = performance.now();
    const frame = (now: number) => {
      const clock = (now - start) / 1000;
      render(clock % CYCLE, clock);
      rafId = requestAnimationFrame(frame);
    };
    rafId = requestAnimationFrame(frame);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="build-graph-stage relative h-full w-full overflow-hidden rounded-full"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox={`0 0 ${VIEW} ${VIEW}`}
      >
        <defs>
          <linearGradient
            id="buildGraphEdgeGrad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#0d9488" />
            <stop offset="100%" stopColor="#5eead4" />
          </linearGradient>
        </defs>
        <g ref={orbitsLayerRef} />
        <g ref={edgesLayerRef} />
        <g ref={packetsLayerRef} />
      </svg>

      <div
        ref={scaleRef}
        className="absolute top-0 left-0"
        style={{ width: VIEW, height: VIEW, transformOrigin: "top left" }}
      >
        <div ref={coreRef} className="build-graph-core" />
        <div ref={dustLayerRef} className="absolute inset-0" />
        <div ref={starsLayerRef} className="absolute inset-0" />
      </div>
    </div>
  );
}
