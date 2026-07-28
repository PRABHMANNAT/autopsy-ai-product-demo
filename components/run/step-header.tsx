/** Sticky header shared by every step screen. */
export function StepHeader({
  step,
  title,
  detail,
  actions,
}: {
  step: number;
  title: string;
  detail: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b-[0.8px] border-line/70 bg-surface/85 px-6 py-[13px] backdrop-blur">
      <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-accent/[0.14] font-mono text-[12px] font-medium text-accent-deep">
        {step}
      </span>
      <span className="min-w-0 flex-1">
        <h1 className="truncate text-[14px] font-semibold">{title}</h1>
        <p className="truncate text-[11.5px] text-ink-faint">{detail}</p>
      </span>
      {actions}
    </header>
  );
}
