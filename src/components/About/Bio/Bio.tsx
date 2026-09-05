import Image from "next/image";
import HeroImg from "../../../assets/hero-avatar.png";

export default function Bio() {
  return (
    <div className="flex flex-col items-center gap-8 text-center sm:gap-10 min-[801px]:flex-row min-[801px]:items-center min-[801px]:gap-12 min-[801px]:text-left">
      <div className="animate-fade-up relative flex aspect-square w-[240px] shrink-0 items-center justify-center sm:w-[280px] min-[801px]:w-[300px]">
        <div className="absolute inset-0 animate-ring-spin rounded-full border-[2.5px] border-purple-500/30 border-t-fuchsia-400 shadow-[0_0_18px_2px_rgba(232,121,249,0.35)]">
          <span className="absolute top-[-4px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-fuchsia-300 shadow-[0_0_10px_3px_rgba(232,121,249,0.8)]" />
        </div>
        <div className="absolute inset-[10%] animate-ring-spin-reverse rounded-full border-[2px] border-purple-500/22 border-r-purple-300 shadow-[0_0_14px_1px_rgba(168,85,247,0.3)]">
          <span className="absolute top-1/2 right-[-3px] h-2 w-2 -translate-y-1/2 rounded-full bg-purple-300 shadow-[0_0_9px_2px_rgba(168,85,247,0.75)]" />
        </div>
        <div className="absolute inset-[20%] animate-ring-spin-slow rounded-full border-[1.5px] border-purple-500/18 border-b-violet-200/90">
          <span className="absolute bottom-[-3px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-violet-200 shadow-[0_0_8px_2px_rgba(233,213,255,0.7)]" />
        </div>

        <div className="relative aspect-square w-[60%] overflow-hidden rounded-full shadow-[0_0_40px_rgba(168,85,247,0.35),0_0_100px_rgba(168,85,247,0.15)] transition-transform duration-500 hover:scale-[1.04]">
          <Image
            src={HeroImg}
            alt="Taha"
            width={440}
            height={440}
            priority
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="animate-fade-up animate-delay-1 max-w-full min-[801px]:max-w-[520px]">
        <p
          className="mb-2.5 text-sm font-semibold"
          style={{ color: "var(--accent)" }}
        >
          About me
        </p>

        <h1 className="mb-4 text-[clamp(32px,5vw,44px)] leading-tight font-extrabold tracking-tight bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
          Building things for the web.
        </h1>

        <p
          className="mx-auto text-[16px] leading-relaxed min-[801px]:mx-0 text-[24px]"
          style={{ color: "var(--muted)" }}
        >
          I&apos;m Taha, a self-taught frontend developer who learns by shipping
          real projects rather than tutorials. I care about interfaces that feel
          considered — smooth motion, clear hierarchy, no dead ends — and
          I&apos;m currently deepening into full-stack work.
        </p>
      </div>
    </div>
  );
}
