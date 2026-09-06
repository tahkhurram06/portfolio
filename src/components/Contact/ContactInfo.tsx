import { contactDetails } from "../../lib/contactInfo";
import SocialLinks from "../SocialLinks/SocialLinks";

export default function ContactInfo() {
  return (
    <div className="flex h-full flex-col justify-between gap-8 rounded-2xl border border-(--surface-border) bg-(--surface-bg) p-6 transition-all duration-250 hover:-translate-y-1 hover:border-(--surface-border-hover) hover:bg-(--surface-bg-hover) sm:p-7">
      <div className="flex flex-col gap-6">
        {contactDetails.map((detail) => (
          <div key={detail.label}>
            <p className="mb-1.5 text-[12.5px] font-bold text-(--accent)">
              {detail.label}
            </p>
            {detail.href ? (
              <a
                href={detail.href}
                className="text-[15px] font-semibold text-foreground transition-colors duration-200 hover:text-(--accent)"
              >
                {detail.value}
              </a>
            ) : (
              <p className="text-[15px] font-semibold text-foreground">
                {detail.value}
              </p>
            )}
          </div>
        ))}
      </div>

      <div>
        <p className="mb-3 text-[12.5px] font-bold text-(--accent)">
          Elsewhere
        </p>
        <SocialLinks />
      </div>
    </div>
  );
}
