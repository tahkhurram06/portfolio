"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function FloatingBotUFO() {
  const pathname = usePathname();
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return;
    const t = setTimeout(() => setRunning(true), 150);
    return () => clearTimeout(t);
  }, [pathname]);

  if (pathname !== "/") return null;

  return (
    <div className="botStage" aria-hidden="true">
      <div className={`botFlyer ${running ? "botFlyerRunning" : ""}`}>
        <div className="botTilt">
          <div className="botWobble">
            <svg width="150" height="130" viewBox="0 0 150 130" fill="none" xmlns="http://www.w3.org/2000/svg"
              style={{ filter: "drop-shadow(0 0 24px rgba(168,85,247,0.55))" }}>
              <defs>
                <linearGradient id="ufoBeam2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c084fc" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="ufoDome2" cx="38%" cy="28%" r="80%">
                  <stop offset="0%" stopColor="#f3e8ff" />
                  <stop offset="45%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#5b21a0" />
                </radialGradient>
                <linearGradient id="ufoBody2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#33204d" />
                  <stop offset="100%" stopColor="#0f081a" />
                </linearGradient>
                <radialGradient id="ufoGlow" cx="50%" cy="0%" r="100%">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                </radialGradient>
              </defs>

              <polygon
                points="30,66 120,66 148,128 2,128"
                fill="url(#ufoBeam2)"
                className="botBeamSweep"
              />
              <ellipse cx="75" cy="128" rx="60" ry="10" fill="url(#ufoGlow)" className="botBeamGlow" />

              <g className="botHover">
                <ellipse cx="75" cy="60" rx="14" ry="5" fill="#000" opacity="0.25" />
                <ellipse cx="75" cy="60" rx="62" ry="15" fill="url(#ufoBody2)" stroke="#c4b5fd" strokeWidth="2" />
                <ellipse cx="75" cy="52" rx="40" ry="9" fill="none" stroke="#3b2560" strokeWidth="1" opacity="0.6" />

                <circle cx="75" cy="40" r="26" fill="url(#ufoDome2)" stroke="#e9d5ff" strokeWidth="1.5" />
                <ellipse cx="63" cy="30" rx="9" ry="5.5" fill="#ffffff" opacity="0.35" />
                <ellipse cx="75" cy="40" rx="26" ry="26" fill="none" stroke="#f3e8ff" strokeWidth="0.5" opacity="0.4" className="botDomeShimmer" />

                {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                  const x = 24 + i * 17;
                  const y = 60 + Math.sin(i * 0.9) * 4;
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="3"
                      fill="#e9d5ff"
                      className="botChaseLight"
                      style={{ animationDelay: `${i * 0.18}s` }}
                    />
                  );
                })}
              </g>
            </svg>
          </div>
        </div>

        <div className="botGreetWrap">
          <span className="botGreetText">Welcome to my portfolio</span>
        </div>
      </div>

      <style>{`
        .botStage { position: fixed; inset: 0; z-index: 1200; pointer-events: none; overflow: hidden; }
        .botFlyer {
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -75px;
          margin-top: -65px;
          animation-play-state: paused;
          opacity: 0;
          transform: translate(62vw, 6vh) scale(0.8);
          animation: botFlyPath 9s cubic-bezier(0.45, 0.05, 0.35, 1) 1 forwards;
        }
        .botFlyerRunning { animation-play-state: running; }
        .botTilt {
          animation: botTiltSway 9s cubic-bezier(0.45,0.05,0.35,1) 1 forwards;
          animation-play-state: inherit;
        }

        /* One-shot entrance (9s, plays once on mount/reload, then stays
           hidden): flies in, hovers dead-center to greet, flies back out,
           and holds its final off-screen/hidden state. */
        @keyframes botFlyPath {
          0%   { transform: translate(62vw, 6vh) scale(0.8); opacity: 0; }
          10%  { opacity: 1; }
          28%  { transform: translate(0, 0) scale(1); opacity: 1; }
          38%  { transform: translate(0, -6px) scale(1); opacity: 1; }
          46%  { transform: translate(0, 0) scale(1); opacity: 1; }
          62%  { transform: translate(-8vw, 3vh) scale(0.96); opacity: 1; }
          78%  { transform: translate(-62vw, 8vh) scale(0.8); opacity: 0; }
          100% { transform: translate(-62vw, 8vh) scale(0.8); opacity: 0; }
        }
        @keyframes botTiltSway {
          0%   { transform: rotate(-10deg); }
          28%  { transform: rotate(0deg); }
          46%  { transform: rotate(0deg); }
          62%  { transform: rotate(-6deg); }
          78%  { transform: rotate(-14deg); }
          100% { transform: rotate(-14deg); }
        }

        .botWobble { animation: wobbleKf 4.2s ease-in-out infinite; }
        @keyframes wobbleKf {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-4px) rotate(-1.5deg); }
          50% { transform: translateY(0) rotate(0deg); }
          75% { transform: translateY(-2px) rotate(1.5deg); }
        }
        .botHover { animation: hoverKf 2.6s ease-in-out infinite; transform-origin: 75px 60px; }
        @keyframes hoverKf { 0%,100% { transform: scale(1); } 50% { transform: scale(1.015); } }
        .botDomeShimmer { animation: shimmerKf 3s linear infinite; }
        @keyframes shimmerKf { 0% { stroke-dasharray: 4 160; stroke-dashoffset: 0; } 100% { stroke-dasharray: 4 160; stroke-dashoffset: -164; } }
        .botChaseLight { animation: chaseKf 1.4s ease-in-out infinite; }
        @keyframes chaseKf { 0%, 100% { opacity: 0.25; } 50% { opacity: 1; } }

        .botBeamSweep {
          transform-origin: 75px 66px;
          opacity: 0;
          transform: scaleY(0.15);
          animation: beamSweepKf2 9s ease-in-out 1 forwards;
          animation-play-state: inherit;
        }
        @keyframes beamSweepKf2 {
          0%   { opacity: 0; transform: scaleY(0.15); }
          26%  { opacity: 0; transform: scaleY(0.15); }
          31%  { opacity: 1; transform: scaleY(1); }
          58%  { opacity: 1; transform: scaleY(1); }
          64%  { opacity: 0; transform: scaleY(0.15); }
          100% { opacity: 0; transform: scaleY(0.15); }
        }
        .botBeamGlow {
          opacity: 0;
          animation: beamGlowKf 9s ease-in-out 1 forwards;
          animation-play-state: inherit;
        }
        @keyframes beamGlowKf {
          0%   { opacity: 0; }
          26%  { opacity: 0; }
          31%  { opacity: 0.9; }
          58%  { opacity: 0.9; }
          64%  { opacity: 0; }
          100% { opacity: 0; }
        }

        .botGreetWrap {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translate(-50%, 6px) scale(0.8);
          white-space: nowrap;
          opacity: 0;
          animation: greetKf 9s ease-in-out 1 forwards;
          animation-play-state: inherit;
        }
        @keyframes greetKf {
          0%   { opacity: 0; transform: translate(-50%, 6px) scale(0.8); }
          26%  { opacity: 0; transform: translate(-50%, 6px) scale(0.8); }
          33%  { opacity: 1; transform: translate(-50%, 22px) scale(1); }
          58%  { opacity: 1; transform: translate(-50%, 22px) scale(1); }
          65%  { opacity: 0; transform: translate(-50%, 10px) scale(0.85); }
          100% { opacity: 0; transform: translate(-50%, 6px) scale(0.8); }
        }
        .botGreetText {
          font-family: inherit;
          font-size: 30px;
          font-weight: 700;
          letter-spacing: 0.01em;
          /* Light mode default: dark, high-contrast foreground color with
             a soft purple glow — the original near-white color below was
             unreadable against the light theme's near-white background. */
          color: var(--foreground);
          text-shadow:
            0 0 14px color-mix(in srgb, var(--accent) 45%, transparent),
            0 0 30px color-mix(in srgb, var(--accent) 22%, transparent);
        }
        .dark .botGreetText {
          /* Original bright glowing look, kept for the dark theme where
             the near-white color has plenty of contrast against the
             near-black background. */
          color: #f3e8ff;
          text-shadow: 0 0 14px rgba(168,85,247,1), 0 0 34px rgba(168,85,247,0.65), 0 0 60px rgba(168,85,247,0.4);
        }

        @media (max-width: 640px) {
          .botGreetText { font-size: 20px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .botFlyer, .botTilt, .botWobble, .botHover, .botDomeShimmer, .botChaseLight,
          .botBeamSweep, .botBeamGlow, .botGreetWrap {
            animation: none !important;
          }
          .botFlyer { opacity: 0; }
        }
      `}</style>
    </div>
  );
}