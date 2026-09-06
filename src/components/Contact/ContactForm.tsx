"use client";

import { useState, type FormEvent } from "react";

const FORM_ENDPOINT = "https://formspree.io/f/mwlkqjld";

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClass =
  "w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-bg)] px-3.5 py-2.5 text-[14.5px] text-[var(--foreground)] outline-none transition-all duration-200 focus:border-[var(--surface-border-hover)] focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_22%,transparent)]";

export default function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  // Honeypot: a field real visitors never see or fill in (hidden off-screen,
  // skipped in tab order, no autofill). Bots that blindly fill every input
  // in a form will populate it. If it has a value on submit, we pretend
  // the message sent successfully but never actually hit the network —
  // silently drops the spam without tipping the bot off or bothering
  // Formspree's quota.
  const [honeypot, setHoneypot] = useState("");

  const setValue = (key: keyof typeof values, val: string) => {
    setValues((v) => ({ ...v, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: FieldErrors = {};
    if (!values.name.trim()) next.name = "Enter your name";
    if (!values.email.trim()) next.email = "Enter your email";
    else if (!EMAIL_RE.test(values.email.trim()))
      next.email = "That email doesn't look right";
    if (!values.message.trim()) next.message = "Write a short message";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (honeypot.trim()) {
      // Bot filled the hidden field. Fake a successful send and bail —
      // no request goes out, no error shown, nothing for the bot to learn.
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const isSubmitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex h-full flex-col gap-4 rounded-2xl border border-(--surface-border) bg-(--surface-bg) p-6 transition-all duration-250 hover:-translate-y-1 sm:p-7"
    >
      {/* Honeypot field — invisible to real visitors, invisible to
          screen readers, and skipped in keyboard tab order. Bots that
          auto-fill every input on a form will still find and fill it. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div>
        <label
          htmlFor="contact-name"
          className="mb-1.5 block text-[12.5px] font-bold text-(--accent)"
        >
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          placeholder="Your name"
          value={values.name}
          onChange={(e) => setValue("name", e.target.value)}
          className={fieldClass}
        />
        {errors.name && (
          <p className="animate-fade-up mt-1.5 text-[12.5px] text-[#f87171]">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="mb-1.5 block text-[12.5px] font-bold text-(--accent)"
        >
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={(e) => setValue("email", e.target.value)}
          className={fieldClass}
        />
        {errors.email && (
          <p className="animate-fade-up mt-1.5 text-[12.5px] text-[#f87171]">
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-[12.5px] font-bold text-(--accent)"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          placeholder="Tell me about your project"
          rows={5}
          value={values.message}
          onChange={(e) => setValue("message", e.target.value)}
          className={`${fieldClass} flex-1 resize-none leading-relaxed`}
        />
        {errors.message && (
          <p className="animate-fade-up mt-1.5 text-[12.5px] text-[#f87171]">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 flex items-center justify-center gap-2.5 rounded-full border border-(--surface-border) bg-(--surface-bg-hover) px-6 py-2.5 text-sm font-semibold text-foreground transition-all duration-250 hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {isSubmitting && (
          <span
            className="h-3.5 w-3.5 animate-ring-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
        )}
        {isSubmitting ? "Sending..." : "Send message"}
      </button>

      <div aria-live="polite">
        {status === "success" && (
          <p className="animate-fade-up rounded-xl border border-(--surface-border) bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] px-3.5 py-2.5 text-[13.5px] font-medium text-r(--accent)">
            Message sent — I&apos;ll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="animate-fade-up rounded-xl border border-[rgba(248,113,113,0.4)] bg-[rgba(248,113,113,0.12)] px-3.5 py-2.5 text-[13.5px] font-medium text-[#f87171]">
            Something went wrong. Try again or email me directly.
          </p>
        )}
      </div>
    </form>
  );
}
