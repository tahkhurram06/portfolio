import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-35 pb-24 text-center sm:px-8 min-[901px]:pt-40">
      <div className="animate-fade-up relative flex aspect-square w-40 shrink-0 items-center justify-center sm:w-48">
        <div className="absolute inset-0 animate-ring-spin rounded-full border-[2.5px] border-purple-500/30 border-t-fuchsia-400 shadow-[0_0_18px_2px_rgba(232,121,249,0.35)]" />
        <div className="absolute inset-[10%] animate-ring-spin-reverse rounded-full border-2 border-purple-500/22 border-r-purple-300 shadow-[0_0_14px_1px_rgba(168,85,247,0.3)]" />

        <span className="bg-linear-to-r from-violet-600 via-purple-500 to-fuchsia-400 bg-clip-text text-[64px] leading-none font-extrabold text-transparent">
          404
        </span>
      </div>

      <h1
        className="animate-fade-up animate-delay-1 mt-8 mb-3 text-[clamp(24px,4vw,32px)] leading-tight font-extrabold tracking-tight"
        style={{ color: "var(--foreground)" }}
      >
        This page drifted off.
      </h1>

      <p
        className="animate-fade-up animate-delay-1 mb-8 max-w-100 text-[15.5px] leading-relaxed"
        style={{ color: "var(--muted)" }}
      >
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>

      <Link
        href="/"
        className="animate-fade-up animate-delay-1 inline-flex items-center gap-1.5 rounded-full border px-6 py-2.5 text-sm font-semibold transition-all duration-250 hover:-translate-y-px"
        style={{
          color: "var(--foreground)",
          borderColor: "var(--surface-border)",
          backgroundColor: "var(--surface-bg)",
        }}
      >
        Back to home <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}