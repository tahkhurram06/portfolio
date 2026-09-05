type FactCardProps = {
  label: string;
  value: string;
};

export default function FactCard({ label, value }: FactCardProps) {
  return (
    <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-bg)] p-5 transition-all duration-250 hover:-translate-y-1 hover:border-[var(--surface-border-hover)] hover:bg-[var(--surface-bg-hover)]">
      <p className="mb-2 text-[16px] min-[801px]:text-[12.5px] font-bold text-[var(--accent)]">
        {label}
      </p>
      <p className="text-[21px] min-[801px]:text-[15px] font-semibold text-[var(--foreground)]">
        {value}
      </p>
    </div>
  );
}
