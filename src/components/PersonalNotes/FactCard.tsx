type FactCardProps = {
  label: string;
  value: string;
};

export default function FactCard({ label, value }: FactCardProps) {
  return (
    <div className="rounded-2xl border border-(--surface-border) bg-(--surface-bg) p-5 transition-all duration-250 hover:-translate-y-1 hover:border-(--surface-border-hover) hover:bg-(--surface-bg-hover)">
      <p className="mb-2 text-[12.5px] font-bold text-(--accent)">{label}</p>
      <p className="text-[15px] font-semibold text-foreground">{value}</p>
    </div>
  );
}
