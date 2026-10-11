export default function Loading() {
  return (
    <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-35">
      <div className="relative flex aspect-square w-16 shrink-0 items-center justify-center">
        <div
          className="absolute inset-0 animate-ring-spin rounded-full border-[2.5px] shadow-[0_0_18px_2px_rgba(45,212,191,0.35)]"
          style={{
            borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)",
            borderTopColor: "var(--accent-2)",
          }}
        />
        <div
          className="absolute inset-[15%] animate-ring-spin-reverse rounded-full border-2 shadow-[0_0_14px_1px_rgba(13,148,136,0.3)]"
          style={{
            borderColor: "color-mix(in srgb, var(--accent-2) 22%, transparent)",
            borderRightColor: "var(--accent)",
          }}
        />
      </div>
    </div>
  );
}