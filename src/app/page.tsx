import Hero from "../components/Hero/Hero";
import Bio from "../components/About/Bio/Bio";
import Skills from "../components/Skills/Skills";
import Timeline from "../components/About/Timeline/Timeline";
import Projects from "../components/Projects/Projects";
import PersonalNotes from "../components/PersonalNotes/PersonalNotes";

export default function Home() {
  return (
    <div className="relative z-10 flex flex-col flex-1">
      <Hero />
      <div className="mx-auto flex w-full max-w-250 flex-col gap-20 px-6 pt-10 pb-24 sm:gap-24 sm:px-8 min-[901px]:pt-16 min-[901px]:gap-28">
        <div id="about" data-nav-section className="scroll-mt-24 flex flex-col gap-20 sm:gap-24 min-[901px]:gap-28">
          <Bio />
          <Timeline />
        </div>

        <div id="skills" data-nav-section className="scroll-mt-24">
          <Skills />
        </div>

        <PersonalNotes />

        <div id="projects" data-nav-section className="scroll-mt-24">
          <Projects limit={3} showViewAll singleRow />
        </div>
      </div>
    </div>
  );
}