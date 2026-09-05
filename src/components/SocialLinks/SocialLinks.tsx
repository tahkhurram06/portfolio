"use client";

import { socialLinks } from "../../lib/socialLinks";

export default function SocialLinks() {
  return (
    <div className="mt-6 flex items-center justify-center gap-2.5 min-[400px]:gap-3.5 min-[901px]:justify-start min-[901px]:gap-4">
      {socialLinks.map(({ name, href, icon: Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-250 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] min-[400px]:h-16 min-[400px]:w-16"
          style={{
            borderColor: "var(--surface-border)",
            backgroundColor: "var(--surface-bg)",
            color: "var(--foreground)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--surface-border-hover)";
            e.currentTarget.style.backgroundColor = "var(--surface-bg-hover)";
            e.currentTarget.style.color = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--surface-border)";
            e.currentTarget.style.backgroundColor = "var(--surface-bg)";
            e.currentTarget.style.color = "var(--foreground)";
          }}
        >
          <Icon size={16} className="min-[400px]:hidden w-[35px] h-[40px]" />
          <Icon size={18} className="hidden min-[400px]:block" />
        </a>
      ))}
    </div>
  );
}
