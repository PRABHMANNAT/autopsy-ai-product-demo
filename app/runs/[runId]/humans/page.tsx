"use client";

import { useState } from "react";
import { StepHeader } from "@/components/run/step-header";
import {
  PARTICIPANTS,
  PARTICIPANT_STAGES,
  type Participant,
  type ParticipantStage,
} from "@/lib/demo-run";
import { CheckIcon, CloseIcon, PlusIcon } from "@/components/icons";

const STAGE_TINT: Record<ParticipantStage, string> = {
  Recruited: "bg-ink/[0.06] text-ink-faint",
  Consented: "bg-accent/[0.12] text-accent-deep",
  "In session": "bg-accent/[0.2] text-accent-deep",
  Complete: "bg-success/[0.1] text-success",
};

export default function HumansPage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const live = PARTICIPANTS.filter((p) => p.stage !== "Recruited").length;

  return (
    <>
      <StepHeader
        step={4}
        title="Matched Human Testing"
        detail={`${live} of ${PARTICIPANTS.length} matched participants active · $40 incentive each`}
        actions={
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="flex shrink-0 items-center gap-2 rounded-[11px] bg-ink px-[14px] py-[9px] text-[13px] font-medium text-canvas transition-colors hover:bg-ink/85"
          >
            <PlusIcon className="h-[15px] w-[15px]" />
            Add participants
          </button>
        }
      />

      <div className="thin-scroll flex-1 overflow-auto p-4">
        <div className="grid min-w-[900px] grid-cols-4 gap-3">
          {PARTICIPANT_STAGES.map((stage) => {
            const column = PARTICIPANTS.filter((p) => p.stage === stage);
            return (
              <section key={stage} className="flex flex-col gap-2">
                <header className="flex items-center justify-between px-1 pb-1">
                  <h3 className="eyebrow">{stage}</h3>
                  <span className="font-mono text-[10px] text-ink-faint">
                    {column.length}
                  </span>
                </header>

                {column.map((p) => (
                  <ParticipantCard key={p.id} participant={p} />
                ))}

                {!column.length && (
                  <p className="rounded-[13px] border-[0.8px] border-dashed border-line px-3 py-6 text-center text-[11.5px] text-ink-faint">
                    Nobody here yet
                  </p>
                )}
              </section>
            );
          })}
        </div>
      </div>

      {sheetOpen && <CriteriaSheet onClose={() => setSheetOpen(false)} />}
    </>
  );
}

function ParticipantCard({ participant }: { participant: Participant }) {
  return (
    <article className="rounded-[13px] border-[0.8px] border-line bg-card p-3">
      <header className="flex items-center gap-[10px]">
        <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-ink font-mono text-[10px] tracking-wider text-canvas">
          {participant.initials}
        </span>
        <span className="min-w-0 flex-1">
          <strong className="block truncate text-[12.5px] font-semibold">
            {participant.name}
          </strong>
          <span className="block truncate text-[11px] text-ink-faint">
            {participant.segment}
          </span>
        </span>
      </header>

      <span
        className={`mt-[10px] inline-block rounded-full px-[8px] py-[3px] font-mono text-[9.5px] uppercase tracking-[0.12em] ${
          STAGE_TINT[participant.stage]
        }`}
      >
        {participant.stage}
      </span>

      {/* Task progress */}
      <div className="mt-3 flex items-center gap-2">
        <span className="h-[4px] flex-1 overflow-hidden rounded-full bg-ink/[0.08]">
          <span
            className={`block h-full rounded-full ${
              participant.progress === 100 ? "bg-success" : "bg-accent-deep/70"
            }`}
            style={{ width: `${participant.progress}%` }}
          />
        </span>
        <span className="font-mono text-[10px] text-ink-faint">
          {participant.progress}%
        </span>
      </div>

      <ul className="mt-3 flex flex-col gap-[6px]">
        {participant.tasks.map((task) => (
          <li
            key={task.label}
            className={`flex items-start gap-2 text-[11.5px] leading-snug ${
              task.done ? "text-ink-soft" : "text-ink-faint"
            }`}
          >
            <span
              className={`mt-[1px] flex h-[13px] w-[13px] shrink-0 items-center justify-center rounded-[4px] ${
                task.done
                  ? "bg-success/[0.12] text-success"
                  : "border-[0.8px] border-line"
              }`}
            >
              {task.done && <CheckIcon className="h-[9px] w-[9px]" />}
            </span>
            {task.label}
          </li>
        ))}
      </ul>

      <footer className="mt-3 border-t-[0.8px] border-line pt-[9px] font-mono text-[10px] text-ink-faint">
        {participant.incentive}
      </footer>
    </article>
  );
}

/** Slide-over for describing who should be recruited. */
function CriteriaSheet({ onClose }: { onClose: () => void }) {
  const field =
    "mt-[6px] w-full rounded-[11px] border-[0.8px] border-line-input bg-composer px-[13px] py-[10px] text-[13.5px] outline-none placeholder:text-ink-faint focus:border-accent-deep/50";

  return (
    <div className="absolute inset-0 z-30 flex justify-end bg-ink/20 backdrop-blur-[2px]">
      <div className="flex w-[380px] flex-col border-l-[0.8px] border-line-strong bg-canvas shadow-[0_0_60px_rgba(75,55,36,0.2)]">
        <header className="flex items-center justify-between border-b-[0.8px] border-line px-4 py-[14px]">
          <span>
            <strong className="block text-[14px] font-semibold">
              Target user criteria
            </strong>
            <small className="block text-[11.5px] text-ink-faint">
              Playground handles sourcing, consent and payment
            </small>
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[9px] bg-bubble/70 text-ink-soft transition-colors hover:bg-ink hover:text-canvas"
          >
            <CloseIcon className="h-[15px] w-[15px]" />
          </button>
        </header>

        <div className="thin-scroll flex-1 overflow-y-auto px-4 py-4">
          <label className="block text-[12.5px] font-medium">
            Who are they?
            <input
              className={field}
              placeholder="Early-stage SaaS founders"
              defaultValue="Early-stage SaaS founders"
            />
          </label>

          <label className="mt-4 block text-[12.5px] font-medium">
            Must have done
            <input
              className={field}
              placeholder="Evaluated an analytics tool in the last 6 months"
            />
          </label>

          <label className="mt-4 block text-[12.5px] font-medium">
            How many?
            <input className={field} type="number" defaultValue={5} />
          </label>

          <label className="mt-4 block text-[12.5px] font-medium">
            Incentive per session
            <input className={field} defaultValue="$40" />
          </label>

          <p className="mt-4 rounded-[12px] bg-accent/[0.09] p-3 text-[11.5px] leading-snug text-ink-soft">
            Consent is collected before recording starts. Sessions are capped at
            20 minutes and participants can withdraw at any point.
          </p>
        </div>

        <footer className="border-t-[0.8px] border-line px-4 py-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-[11px] bg-ink py-[11px] text-[13.5px] font-medium text-canvas transition-colors hover:bg-ink/85"
          >
            Start recruiting
          </button>
        </footer>
      </div>
    </div>
  );
}
