type LogoProps = {
  className?: string;
};

// Inline SVG (not next/image) so the gradient defs resolve correctly
// and the mark stays crisp at any size — this renders wherever the
// "Portfolio" text used to sit in the navbar.
export default function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Taha Khurram logo"
    >
      <defs>
        <linearGradient id="braceGrad" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="letterGrad" x1="60" y1="60" x2="150" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" style={{ stopColor: "var(--foreground)" }} />
          <stop offset="100%" style={{ stopColor: "var(--accent)" }} />
        </linearGradient>
      </defs>

      {/* Left brace */}
      <path
        d="M76 46
           C60 46 54 54 54 68
           L54 88
           C54 96 50 100 42 100
           C50 100 54 104 54 112
           L54 132
           C54 146 60 154 76 154"
        stroke="url(#braceGrad)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Right brace */}
      <path
        d="M124 46
           C140 46 146 54 146 68
           L146 88
           C146 96 150 100 158 100
           C150 100 146 104 146 112
           L146 132
           C146 146 140 154 124 154"
        stroke="url(#braceGrad)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* T */}
      <g stroke="url(#letterGrad)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M76 76 H100" />
        <path d="M88 76 V124" />
      </g>

      {/* K, single path so the elbow stays a sharp vertex */}
      <g stroke="url(#letterGrad)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M112 76 V124" />
        <path d="M136 76 L112 100 L136 124" fill="none" />
      </g>
    </svg>
  );
}