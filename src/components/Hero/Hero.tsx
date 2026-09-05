import Image from "next/image";
import HeroImg from "../../assets/hero-avatar.png";
import SocialLinks from "../SocialLinks/SocialLinks";
import FloatingBotUFO from "../FloatingBot/FloatingBot";

export default function Hero() {
  return (
    
    <section className="mx-auto flex min-h-screen w-full max-w-[1160px] flex-col-reverse items-center justify-center gap-10 px-6 pt-[140px] pb-16 text-center min-[901px]:min-h-0 min-[901px]:flex-row min-[901px]:justify-center min-[901px]:gap-12 min-[901px]:px-8 min-[901px]:pt-40 min-[901px]:pb-20 min-[901px]:text-left min-[1280px]:min-h-screen min-[1280px]:justify-between">
      <FloatingBotUFO/>
      <div className="max-w-full min-[901px]:max-w-[560px] min-[1280px]:flex-1">
        <p className="mb-2 flex items-center justify-center gap-2 text-lg min-[901px]:justify-start" style={{ color: "var(--muted)" }}>
          Hi <span className="inline-block origin-[70%_70%] animate-wave">👋</span> My name is
        </p>

        <h1 className="mb-5 bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-400 bg-clip-text text-[clamp(56px,9vw,104px)] leading-none font-extrabold tracking-tight text-transparent">
          Taha.
        </h1>

        <p className="mb-3.5 text-[clamp(20px,2.4vw,26px)] font-semibold" style={{ color: "var(--foreground)" }}>
          Full Stack Developer
        </p>

        <p className="mx-auto max-w-[460px] text-[17px] leading-relaxed min-[901px]:mx-0" style={{ color: "var(--muted)" }}>
          Modern Front-End Developer crafting scalable,
          <br className="hidden min-[901px]:inline" /> pixel-perfect web experiences.
        </p>

        <SocialLinks />
      </div>

      <div className="flex items-center justify-center min-[1280px]:flex-1">
        <div className="relative flex aspect-square w-[min(300px,78vw)] items-center justify-center min-[481px]:w-[min(420px,80vw)]">
          <div className="absolute inset-0 animate-ring-spin rounded-full border-[2.5px] border-purple-500/30 border-t-fuchsia-400 shadow-[0_0_18px_2px_rgba(232,121,249,0.35)]">
            <span className="absolute top-[-4px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-fuchsia-300 shadow-[0_0_10px_3px_rgba(232,121,249,0.8)]" />
          </div>
          <div className="absolute inset-[9%] animate-ring-spin-reverse rounded-full border-[2px] border-purple-500/22 border-r-purple-300 shadow-[0_0_14px_1px_rgba(168,85,247,0.3)]">
            <span className="absolute top-1/2 right-[-3px] h-2 w-2 -translate-y-1/2 rounded-full bg-purple-300 shadow-[0_0_9px_2px_rgba(168,85,247,0.75)]" />
          </div>
          <div className="absolute inset-[18%] animate-ring-spin-slow rounded-full border-[1.5px] border-purple-500/18 border-b-violet-200/90">
            <span className="absolute bottom-[-3px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-violet-200 shadow-[0_0_8px_2px_rgba(233,213,255,0.7)]" />
          </div>

          <div className="relative aspect-square w-[62%] overflow-hidden rounded-full shadow-[0_0_40px_rgba(168,85,247,0.35),0_0_100px_rgba(168,85,247,0.15)]">
            <Image
              src={HeroImg}
              alt="Taha"
              width={480}
              height={480}
              priority
              className="h-full w-full object-cover"
            />
          </div>

          <span className="absolute top-[4%] right-[10%] h-2.5 w-2.5 animate-float rounded-full shadow-[0_0_10px_3px_rgba(232,121,249,0.7)]" style={{ backgroundColor: "var(--accent-dot)" }} />
          <span className="absolute right-[2%] bottom-[12%] h-2.5 w-2.5 animate-float-delay-1 rounded-full shadow-[0_0_10px_3px_rgba(232,121,249,0.7)]" style={{ backgroundColor: "var(--accent-dot)" }} />
          <span className="absolute bottom-[4%] left-[14%] h-2.5 w-2.5 animate-float-delay-2 rounded-full shadow-[0_0_10px_3px_rgba(232,121,249,0.7)]" style={{ backgroundColor: "var(--accent-dot)" }} />
        </div>
      </div>
    </section>
  );
}