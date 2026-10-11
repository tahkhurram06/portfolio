import Image from "next/image";
import HeroImg from "../../../../public/about-img.jpg";

export default function Bio() {
  return (
    <div className="flex flex-col items-center gap-8 text-center sm:gap-10 min-[801px]:flex-row min-[801px]:items-center min-[801px]:gap-12 min-[801px]:text-left">
      <div className="animate-fade-up relative flex aspect-square w-60 shrink-0 items-center justify-center sm:w-70 min-[801px]:w-75">
        <div className="absolute inset-0 animate-ring-spin rounded-full border-[2.5px] shadow-[0_0_18px_2px_rgba(45,212,191,0.35)]" style={{ borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)", borderTopColor: "var(--accent-2)" }}>
          <span className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full shadow-[0_0_10px_3px_rgba(242,97,63,0.8)]" style={{ backgroundColor: "var(--accent-2)" }} />
        </div>
        <div className="absolute inset-[10%] animate-ring-spin-reverse rounded-full border-2 shadow-[0_0_14px_1px_rgba(13,148,136,0.3)]" style={{ borderColor: "color-mix(in srgb, var(--accent) 22%, transparent)", borderRightColor: "var(--accent)" }}>
          <span className="absolute top-1/2 -right-0.75 h-2 w-2 -translate-y-1/2 rounded-full shadow-[0_0_9px_2px_rgba(13,148,136,0.75)]" style={{ backgroundColor: "var(--accent)" }} />
        </div>
        <div className="absolute inset-[20%] animate-ring-spin-slow rounded-full border-[1.5px]" style={{ borderColor: "color-mix(in srgb, var(--accent) 18%, transparent)", borderBottomColor: "#5eead4" }}>
          <span className="absolute -bottom-0.75 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#5eead4] shadow-[0_0_8px_2px_rgba(94,234,212,0.7)]" />
        </div>

        <div className="relative aspect-square w-[60%] overflow-hidden rounded-full shadow-[0_0_40px_rgba(13,148,136,0.35),0_0_100px_rgba(242,97,63,0.12)] transition-transform duration-500 hover:scale-[1.04]">
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

      <div className="animate-fade-up animate-delay-1 max-w-full min-[801px]:max-w-130">
        <p
          className="mb-2.5 text-sm font-semibold"
          style={{ color: "var(--accent)" }}
        >
          About me
        </p>

        <h1 className="mb-4 text-[clamp(32px,5vw,44px)] leading-tight font-extrabold tracking-tight bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to right, var(--accent), var(--accent-mid), var(--accent-2))" }}>
          Building things for the web.
        </h1>

        <p
          className="mx-auto min-[801px]:mx-0 text-[16px] leading-relaxed"
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