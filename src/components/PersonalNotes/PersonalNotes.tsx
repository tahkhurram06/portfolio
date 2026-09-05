import { facts } from "../../lib/facts";
import FactCard from "./FactCard";

export default function PersonalNotes() {
  return (
    <section className="animate-fade-up">
      <h2
        className="mb-7 text-[22px] font-bold sm:mb-8 sm:text-2xl"
        style={{ color: "var(--foreground)" }}
      >
        A few personal notes
      </h2>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
        {facts.map((fact) => (
          <FactCard key={fact.label} label={fact.label} value={fact.value} />
        ))}
      </div>
    </section>
  );
}
