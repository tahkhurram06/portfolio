type TimelineItemProps = {
  year: string;
  title: string;
  description: string;
  isLast?: boolean;
};

export default function TimelineItem({
  year,
  title,
  description,
  isLast,
}: TimelineItemProps) {
  return (
    <div className={`group relative ${isLast ? "" : "pb-9 sm:pb-10"}`}>
      <span
        className="absolute top-1 -left-[29px] block h-3 w-3 rounded-full transition-transform duration-300 group-hover:scale-125 sm:-left-[33px]"
        style={{
          backgroundColor: "var(--accent)",
          boxShadow:
            "0 0 12px 2px color-mix(in srgb, var(--accent) 55%, transparent)",
        }}
      />
      <p
        className="text-[13px] font-bold tracking-wide"
        style={{ color: "var(--accent)" }}
      >
        {year}
      </p>
      <p
        className="mt-1 mb-1.5 text-[17px] font-bold"
        style={{ color: "var(--foreground)" }}
      >
        {title}
      </p>
      <p
        className="max-w-[560px] text-[14.5px] leading-relaxed"
        style={{ color: "var(--muted)" }}
      >
        {description}
      </p>
    </div>
  );
}
