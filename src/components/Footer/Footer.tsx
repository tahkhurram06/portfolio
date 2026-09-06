import SocialLinks from "../SocialLinks/SocialLinks";
import Logo from "../Logo/Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 px-6 pb-8 sm:px-8">
      <div
        className="footerCard relative mx-auto w-full max-w-250 overflow-hidden rounded-t-[2.25rem] rounded-b-2xl border"
        style={{
          borderColor: "var(--surface-border)",
          backgroundColor: "var(--surface-bg)",
        }}
      >
        <div className="footerWaveBack" aria-hidden="true" />
        <div className="footerWaveFront" aria-hidden="true" />

        {/* Breakpoint aligned to min-[801px] to match Bio/Timeline/Contact/
            Navbar, which all stay stacked until ~800px. Using sm: (640px)
            here made the footer flip to a "desktop" two-column layout
            while everything above it was still in mobile/stacked mode. */}
        <div className="relative z-10 flex flex-col items-center gap-5 px-6 pt-16 pb-7 text-center min-[801px]:flex-row min-[801px]:justify-between min-[801px]:gap-4 min-[801px]:px-8 min-[801px]:pt-8 min-[801px]:text-left">
          <div className="footerFloat flex flex-col items-center gap-2 min-[801px]:flex-row min-[801px]:items-center min-[801px]:gap-3">
            <Logo className="h-15 w-auto shrink-0 sm:h-11" />
            <div>
              <p
                className="text-[15px] font-semibold"
                style={{ color: "var(--foreground)" }}
              >
                Taha
              </p>
              <p
                className="mt-0.5 text-[13px]"
                style={{ color: "var(--muted)" }}
              >
                Full stack developer, based in Karachi
              </p>
            </div>
          </div>

          <div className="footerFloat footerFloatDelay flex flex-col items-center gap-3 min-[801px]:items-end">
            <SocialLinks />
            <p className="text-[12px]" style={{ color: "var(--muted)" }}>
              © {year} Taha — built with Next.js and Tailwind
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .footerWaveBack,
        .footerWaveFront {
          position: absolute;
          left: -10%;
          width: 220%;
          height: 64px;
          background-repeat: repeat-x;
          background-size: 360px 64px;
          pointer-events: none;
        }
        .footerWaveBack {
          top: 4px;
          opacity: 0.35;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='360' height='64' viewBox='0 0 360 64'%3E%3Cpath d='M0,28 Q90,58 180,28 T360,28 L360,64 L0,64 Z' fill='%237c3aed'/%3E%3C/svg%3E");
          animation: footerWaveDriftBack 14s linear infinite;
        }
        .footerWaveFront {
          top: 16px;
          opacity: 0.55;
          background-size: 300px 54px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='54' viewBox='0 0 300 54'%3E%3Cpath d='M0,24 Q75,50 150,24 T300,24 L300,54 L0,54 Z' fill='%23a855f7'/%3E%3C/svg%3E");
          animation: footerWaveDriftFront 9s linear infinite reverse;
        }
        .dark .footerWaveBack {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='360' height='64' viewBox='0 0 360 64'%3E%3Cpath d='M0,28 Q90,58 180,28 T360,28 L360,64 L0,64 Z' fill='%233b1e6e'/%3E%3C/svg%3E");
          opacity: 0.5;
        }
        .dark .footerWaveFront {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='54' viewBox='0 0 300 54'%3E%3Cpath d='M0,24 Q75,50 150,24 T300,24 L300,54 L0,54 Z' fill='%23a855f7'/%3E%3C/svg%3E");
          opacity: 0.6;
        }

        @keyframes footerWaveDriftBack {
          from { background-position-x: 0; }
          to { background-position-x: -360px; }
        }
        @keyframes footerWaveDriftFront {
          from { background-position-x: 0; }
          to { background-position-x: -300px; }
        }

        .footerFloat {
          animation: hero-float 6s ease-in-out infinite;
        }
        .footerFloatDelay {
          animation-delay: 0.8s;
        }

        @media (prefers-reduced-motion: reduce) {
          .footerWaveBack, .footerWaveFront, .footerFloat, .footerFloatDelay {
            animation: none !important;
          }
        }
      `}</style>
    </footer>
  );
}
