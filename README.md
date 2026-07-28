# Playground UI

A Next.js rebuild of the Playground product-testing workspace — the `/runs/new`
screen where an agent turns a messy product brief into a runnable test, then
shows the findings against a live product.

## Stack

- **Next.js 15** (App Router) + React 19
- **TypeScript**
- **Tailwind CSS 3**
- **Geist** / Geist Mono

Next.js was chosen over a separate frontend + Express server so the UI and the
payment endpoints (which need a secret key and a webhook receiver) ship from one
codebase and one deploy.

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000/runs/new>.

## The nine-step run

A run walks through nine steps, each its own route under `/runs/[runId]`. The
right-hand spine shows all nine and tracks which one you are on.

| Step | Route | What it does |
| --- | --- | --- |
| 1–2 | `/connect` | Pick a source (URL / Figma / build), then state the one decision. Both gate the next step. |
| 3 | `/predictions` | Agent-predicted failures as dashed pins, grouped by category with confidence bars. |
| 4 | `/humans` | Recruitment board: Recruited → Consented → In session → Complete, plus a criteria sheet. |
| 5 | `/evidence` | Session clips with a scrub bar marking dead clicks, hesitation, backtracks and voice notes. |
| 6 | `/divergence` | Split frames — predicted paths vs real attention — over a delta table. |
| 7 | `/verdict` | Ship / Modify / Kill as the hero, with ranked issues and fixes. |
| 8 | `/retest` | The same findings re-scored: fixed, still broken, or new. |
| 9 | `/memory` | Version timeline across every run of the product. |

Product memory also lives in the left rail as a colour-coded timeline; hovering a
version reveals what changed in it.

## The chat workspace

`/runs/new` keeps the conversational entry point and has two modes, toggled from
the run card in the transcript:

- **Chat mode** — icon rail, transcript with the empty-state hero, step spine.
- **Preview mode** — *Open live workspace* narrows the transcript and mounts the
  product stage: a browser frame around the product under test, numbered finding
  pins, captured-screen tabs, and the evidence drawer.

## Layout

```
app/
  layout.tsx            fonts + globals
  page.tsx              redirects to /runs/new
  runs/new/page.tsx     renders <Workspace />
  runs/[runId]/
    layout.tsx          shared shell: rail + step content + spine
    connect/ predictions/ humans/ evidence/
    divergence/ verdict/ retest/ memory/
  api/pinch/            payment-link + webhook route handlers
components/
  workspace.tsx         owns the chat/preview mode toggle
  sidebar-rail.tsx      icon rail + product-memory timeline
  chat-feed.tsx         transcript, compact variant for preview mode
  run-artifact.tsx      the generated-run card
  composer.tsx          auto-growing input bar
  run/                  step spine, step header, product frame
  preview/              product stage, findings, evidence drawer
lib/
  demo-conversation.ts  placeholder transcript
  demo-run.ts           placeholder data + types for all nine steps
  pinch.ts              server-side payment client
```

The demo product renders at a fixed 860px width and the stage scrolls, so the
finding pins stay anchored to the elements they point at regardless of how the
surrounding panels are sized.

## Placeholder content

Everything in `lib/demo-conversation.ts` and `lib/demo-run.ts` is sample copy
written to exercise the layout. Swap both for real run data before shipping.

## Payments

Pinch integration is scaffolded but not wired to a datastore:

- `lib/pinch.ts` — creates payment links, verifies webhook HMACs with a
  timing-safe comparison
- `app/api/pinch/payment-link/route.ts` — `POST` to create a link
- `app/api/pinch/webhook/route.ts` — reads the raw body before parsing so the
  signature is checked against the exact bytes received

Copy `.env.example` to `.env.local` and fill in your keys. Keys are read lazily,
so the app runs fine without them. Two things still to do before billing is
real: confirm the API base URL and webhook header name against current Pinch
docs, and persist the result in the `payment.succeeded` branch, which only logs
today.

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | dev server on :3000 |
| `npm run build` | production build |
| `npm start` | serve the production build |
| `npm run lint` | ESLint |

Stop the dev server before running `npm run build` — both write to `.next`, and
running them together leaves the dev server serving 404s for its own chunks.
