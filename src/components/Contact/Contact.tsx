import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section className="animate-fade-up">
      <p className="mb-2.5 text-sm font-semibold" style={{ color: "var(--accent)" }}>
        Get in touch
      </p>

      <h1 className="mb-4 text-[clamp(28px,4.5vw,40px)] leading-tight font-extrabold tracking-tight bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
        Let&apos;s work together.
      </h1>

      <p
        className="mb-10 max-w-[560px] text-[16px] leading-relaxed sm:mb-12"
        style={{ color: "var(--muted)" }}
      >
        Have a project in mind, a role to fill, or just want to say hi?
        Send a message and I&apos;ll get back to you soon.
      </p>

      <div className="grid grid-cols-1 items-stretch gap-5 min-[801px]:grid-cols-[0.85fr_1.15fr] min-[801px]:gap-6">
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  );
}