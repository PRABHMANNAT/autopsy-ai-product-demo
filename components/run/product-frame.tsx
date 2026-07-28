import { BrowserChrome } from "@/components/preview/browser-chrome";
import { DemoSite } from "@/components/preview/demo-site";

/**
 * Browser-framed product canvas. Children render as an absolute overlay on top
 * of the site at its fixed design width, so pins stay anchored while scrolling.
 */
export function ProductFrame({
  url,
  label,
  children,
}: {
  url: string;
  label?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-card border-[0.8px] border-line-strong bg-card shadow-artifact">
      {label && (
        <span className="border-b-[0.8px] border-line bg-panel px-3 py-[7px] font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
          {label}
        </span>
      )}
      <BrowserChrome url={url} />
      <div className="thin-scroll min-h-0 flex-1 overflow-auto">
        <div className="relative w-[860px]">
          <DemoSite />
          {children}
        </div>
      </div>
    </div>
  );
}
