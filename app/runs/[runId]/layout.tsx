import { SidebarRail } from "@/components/sidebar-rail";
import { StepSpine } from "@/components/run/step-spine";

/** Shared shell for every step of a run: rail, step content, nine-step spine. */
export default function RunLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen w-full overflow-hidden bg-surface">
      <SidebarRail />
      {/* relative so step screens can mount slide-overs inside the content area */}
      <section className="grid-texture relative flex min-w-0 flex-1 flex-col">
        {children}
      </section>
      <StepSpine />
    </main>
  );
}
