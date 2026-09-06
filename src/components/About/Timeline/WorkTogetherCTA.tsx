"use client";

import { useState } from "react";

export default function WorkTogetherCTA() {
  const [bounceKey, setBounceKey] = useState(0);

  const triggerBounce = () => setBounceKey((k) => k + 1);

  return (
    <div className="mx-auto flex w-full max-w-70 flex-col items-center self-center text-center min-[901px]:self-center">
      <div
        role="button"
        tabIndex={0}
        aria-label="Bounce the UFO"
        onClick={triggerBounce}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            triggerBounce();
          }
        }}
        className="ctaUfoWrap"
      >
        <div className="ctaGlowHalo" aria-hidden="true" />
        <span key={bounceKey} className={bounceKey > 0 ? "ctaBounce" : ""}>
          <svg
            width="130"
            height="170"
            viewBox="0 0 130 190"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ctaUfoSvg"
          >
            <defs>
              <linearGradient id="ctaBeam" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="ctaDome" cx="38%" cy="28%" r="80%">
                <stop offset="0%" stopColor="#f3e8ff" />
                <stop offset="45%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#5b21a0" />
              </radialGradient>
              <linearGradient id="ctaBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#33204d" />
                <stop offset="100%" stopColor="#0f081a" />
              </linearGradient>
            </defs>

            <g className="ctaHoverGroup">
              <polygon
                points="26,66 104,66 128,180 2,180"
                fill="url(#ctaBeam)"
                className="ctaBeamPulse"
              />

              <ellipse
                cx="65"
                cy="60"
                rx="12"
                ry="4.5"
                fill="#000"
                opacity="0.22"
              />
              <ellipse
                cx="65"
                cy="60"
                rx="54"
                ry="13"
                fill="url(#ctaBody)"
                stroke="#c4b5fd"
                strokeWidth="1.6"
              />
              <ellipse
                cx="65"
                cy="53"
                rx="35"
                ry="8"
                fill="none"
                stroke="#3b2560"
                strokeWidth="1"
                opacity="0.6"
              />

              <circle
                cx="65"
                cy="40"
                r="23"
                fill="url(#ctaDome)"
                stroke="#e9d5ff"
                strokeWidth="1.3"
              />
              <ellipse
                cx="55"
                cy="31"
                rx="8"
                ry="5"
                fill="#ffffff"
                opacity="0.35"
              />

              {[0, 1, 2, 3, 4, 5].map((i) => {
                const x = 24 + i * 15;
                const y = 60 + Math.sin(i * 0.9) * 3.5;
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="2.6"
                    fill="#e9d5ff"
                    className="ctaChaseLight"
                    style={{ animationDelay: `${i * 0.18}s` }}
                  />
                );
              })}
            </g>
          </svg>
        </span>
      </div>

      <div className="ctaTextGlow">
        <h3
          className="mb-2 text-[21px] font-bold"
          style={{ color: "var(--foreground)" }}
        >
          Want to work together?
        </h3>
        <p
          className="mb-5 text-[13.5px] leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          Got a project, a role, or just want to chat — I&apos;d love to hear
          from you.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-1.5 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-250 hover:-translate-y-px"
          style={{
            color: "var(--foreground)",
            borderColor: "var(--surface-border)",
            backgroundColor: "var(--surface-bg)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--surface-border-hover)";
            e.currentTarget.style.backgroundColor = "var(--surface-bg-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--surface-border)";
            e.currentTarget.style.backgroundColor = "var(--surface-bg)";
          }}
        >
          Get in touch <span aria-hidden="true">→</span>
        </a>
      </div>

      <style>{`
        .ctaUfoWrap {
          position: relative;
          display: inline-flex;
          cursor: pointer;
          outline: none;
        }
        .ctaUfoWrap:focus-visible {
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 45%, transparent);
          border-radius: 16px;
        }

        .ctaGlowHalo {
          position: absolute;
          inset: -26px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(168,85,247,0.32), transparent 70%);
          opacity: 0.32;
          transform: scale(1);
          transition: opacity 0.4s ease, transform 0.4s ease;
          pointer-events: none;
          z-index: -1;
        }
        .ctaUfoWrap:hover .ctaGlowHalo,
        .ctaUfoWrap:focus-visible .ctaGlowHalo {
          opacity: 0.75;
          transform: scale(1.45);
        }

        .ctaUfoSvg {
          filter: drop-shadow(0 0 20px rgba(168,85,247,0.5));
          transition: filter 0.4s ease;
        }
        .ctaUfoWrap:hover .ctaUfoSvg,
        .ctaUfoWrap:focus-visible .ctaUfoSvg {
          filter: drop-shadow(0 0 38px rgba(168,85,247,0.9)) drop-shadow(0 0 70px rgba(168,85,247,0.4));
        }
        .ctaUfoWrap:hover .ctaBeamPulse,
        .ctaUfoWrap:focus-visible .ctaBeamPulse {
          opacity: 0.95;
        }

        .ctaHoverGroup {
          animation: ctaHoverKf 4.4s ease-in-out infinite;
          transform-origin: 65px 60px;
        }
        @keyframes ctaHoverKf {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-6px) rotate(-1.4deg); }
          50% { transform: translateY(0) rotate(0deg); }
          75% { transform: translateY(-3px) rotate(1.4deg); }
        }
        .ctaBeamPulse {
          animation: ctaBeamPulseKf 3.2s ease-in-out infinite;
          transform-origin: 65px 66px;
          transition: opacity 0.4s ease;
        }
        @keyframes ctaBeamPulseKf {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.85; }
        }
        .ctaChaseLight { animation: ctaChaseKf 1.4s ease-in-out infinite; }
        @keyframes ctaChaseKf { 0%, 100% { opacity: 0.25; } 50% { opacity: 1; } }

        .ctaBounce {
          display: inline-block;
          animation: ctaBounceKf 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) 1;
        }
        @keyframes ctaBounceKf {
          0%   { transform: translateY(0) scale(1, 1); }
          25%  { transform: translateY(-22px) scale(1.05, 0.94); }
          45%  { transform: translateY(0) scale(0.95, 1.06); }
          65%  { transform: translateY(-9px) scale(1.02, 0.98); }
          85%  { transform: translateY(0) scale(0.99, 1.01); }
          100% { transform: translateY(0) scale(1, 1); }
        }

        .ctaTextGlow {
          position: relative;
          margin-top: -14px;
          padding: 22px 8px 4px;
        }
        .ctaTextGlow::before {
          content: "";
          position: absolute;
          top: -10px;
          left: 50%;
          width: 220px;
          height: 160px;
          transform: translateX(-50%);
          background: radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--accent) 30%, transparent), transparent 70%);
          opacity: 0.7;
          pointer-events: none;
          z-index: -1;
          transition: width 0.45s ease, height 0.45s ease, opacity 0.45s ease, background 0.45s ease;
        }
        .ctaUfoWrap:hover ~ .ctaTextGlow::before,
        .ctaUfoWrap:focus-visible ~ .ctaTextGlow::before {
          width: 320px;
          height: 230px;
          opacity: 1;
          background: radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--accent) 48%, transparent), transparent 75%);
        }

        @media (prefers-reduced-motion: reduce) {
          .ctaHoverGroup, .ctaBeamPulse, .ctaChaseLight, .ctaBounce, .ctaGlowHalo, .ctaUfoSvg {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
