import Image from "next/image";
import HeroImg from "../../../public/hero-img.jpg";
import SocialLinks from "../SocialLinks/SocialLinks";
import FloatingBotUFO from "../FloatingBot/FloatingBot";

export default function Hero() {
  return (
    <section className="mx-auto flex min-h-screen w-full max-w-290 flex-col-reverse items-center justify-center gap-10 px-6 pt-35 pb-16 text-center min-[901px]:min-h-0 min-[901px]:flex-row min-[901px]:justify-center min-[901px]:gap-12 min-[901px]:px-8 min-[901px]:pt-40 min-[901px]:pb-20 min-[901px]:text-left min-[1280px]:min-h-screen min-[1280px]:justify-between">
      <FloatingBotUFO />
      <div className="max-w-full min-[901px]:max-w-140 min-[1280px]:flex-1">
        <p
          className="mb-2 flex items-center justify-center gap-2 text-lg min-[901px]:justify-start"
          style={{ color: "var(--muted)" }}
        >
          Hi{" "}
          <span className="inline-block origin-[70%_70%] animate-wave">👋</span>{" "}
          My name is
        </p>

        <h1 className="mb-5 bg-clip-text text-[clamp(56px,9vw,104px)] leading-none font-extrabold tracking-tight text-transparent" style={{ backgroundImage: "linear-gradient(to right, var(--accent), var(--accent-mid), var(--accent-2))" }}>
          Taha.
        </h1>

        <p
          className="mb-3.5 text-[clamp(20px,2.4vw,26px)] font-semibold"
          style={{ color: "var(--accent-2)" }}
        >
          Full Stack Developer
        </p>

        <p
          className="mx-auto max-w-115 text-[17px] leading-relaxed min-[901px]:mx-0"
          style={{ color: "var(--muted)" }}
        >
          Modern Front-End Developer crafting scalable,
          <br className="hidden min-[901px]:inline" /> pixel-perfect web
          experiences.
        </p>

        <SocialLinks />
      </div>

      <div className="flex items-center justify-center min-[1280px]:flex-1">
        <div className="relative flex aspect-square w-[min(300px,78vw)] items-center justify-center min-[481px]:w-[min(420px,80vw)]">
          <div className="absolute inset-0 animate-ring-spin rounded-full border-[2.5px] shadow-[0_0_18px_2px_rgba(45,212,191,0.35)]" style={{ borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)", borderTopColor: "var(--accent-2)" }}>
            <span className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full shadow-[0_0_10px_3px_rgba(242,97,63,0.8)]" style={{ backgroundColor: "var(--accent-2)" }} />
          </div>
          <div className="absolute inset-[9%] animate-ring-spin-reverse rounded-full border-2 shadow-[0_0_14px_1px_rgba(13,148,136,0.3)]" style={{ borderColor: "color-mix(in srgb, var(--accent-2) 22%, transparent)", borderRightColor: "var(--accent)" }}>
            <span className="absolute top-1/2 -right-0.75 h-2 w-2 -translate-y-1/2 rounded-full shadow-[0_0_9px_2px_rgba(13,148,136,0.75)]" style={{ backgroundColor: "var(--accent)" }} />
          </div>
          <div className="absolute inset-[18%] animate-ring-spin-slow rounded-full border-[1.5px] shadow-[0_0_12px_1px_rgba(242,97,63,0.4)]" style={{ borderColor: "color-mix(in srgb, var(--accent) 18%, transparent)", borderBottomColor: "var(--accent-2)" }}>
            <span className="absolute -bottom-0.75 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full shadow-[0_0_8px_2px_rgba(242,97,63,0.7)]" style={{ backgroundColor: "var(--accent-2)" }} />
          </div>

          <div className="relative aspect-square w-[62%] overflow-hidden rounded-full shadow-[0_0_40px_rgba(13,148,136,0.35),0_0_100px_rgba(242,97,63,0.12)]">
            <Image
              src={HeroImg}
              alt="Taha"
              width={480}
              height={480}
              priority
              className="h-full w-full object-cover"
            />
          </div>

          <span
            className="absolute top-[4%] right-[10%] h-2.5 w-2.5 animate-float rounded-full shadow-[0_0_10px_3px_rgba(45,212,191,0.7)]"
            style={{ backgroundColor: "var(--accent-dot)" }}
          />
          <span
            className="absolute right-[2%] bottom-[12%] h-2.5 w-2.5 animate-float-delay-1 rounded-full shadow-[0_0_10px_3px_rgba(242,97,63,0.65)]"
            style={{ backgroundColor: "var(--accent-dot)" }}
          />
          <span
            className="absolute bottom-[4%] left-[14%] h-2.5 w-2.5 animate-float-delay-2 rounded-full shadow-[0_0_10px_3px_rgba(45,212,191,0.7)]"
            style={{ backgroundColor: "var(--accent-dot)" }}
          />
        </div>
      </div>
    </section>
  );
}