export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-graphite-950">
      <div className="vv-grid absolute inset-0 animate-grid-drift" />
      <div className="absolute -right-[18rem] top-[-22rem] size-[54rem] rounded-full bg-violet-600/[0.12] blur-[150px]" />
      <div className="absolute -left-[16rem] top-[48%] size-[36rem] rounded-full bg-acid/[0.035] blur-[130px]" />
      <div className="vv-noise absolute inset-0" />
    </div>
  );
}
