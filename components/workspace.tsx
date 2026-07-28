"use client";

import { useState } from "react";
import { SidebarRail } from "./sidebar-rail";
import { ChatFeed } from "./chat-feed";
import { RunProgress } from "./run-progress";
import { PreviewPanel } from "./preview/preview-panel";

/**
 * Holds the two layouts of a run: the brief-writing view (chat + progress),
 * and the preview view where the tested product takes over the stage.
 */
export function Workspace() {
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <main className="flex h-screen w-full overflow-hidden bg-surface">
      <SidebarRail />
      <ChatFeed
        compact={previewOpen}
        onOpenPreview={() => setPreviewOpen(true)}
        onClosePreview={() => setPreviewOpen(false)}
      />
      {previewOpen ? <PreviewPanel /> : <RunProgress />}
    </main>
  );
}
