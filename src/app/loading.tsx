export default function Loading() {
  return (
    <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-35">
      <div className="relative flex aspect-square w-16 shrink-0 items-center justify-center">
        <div className="absolute inset-0 animate-ring-spin rounded-full border-[2.5px] border-purple-500/30 border-t-fuchsia-400 shadow-[0_0_18px_2px_rgba(232,121,249,0.35)]" />
        <div className="absolute inset-[15%] animate-ring-spin-reverse rounded-full border-2 border-purple-500/22 border-r-purple-300 shadow-[0_0_14px_1px_rgba(168,85,247,0.3)]" />
      </div>
    </div>
  );
}