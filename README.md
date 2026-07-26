# VentureVerdict Playground

A three-route hackathon demonstration for AI-and-human startup validation:

- `/` — landing page and validation pipeline
- `/demo` — startup autopsy, prototype audit and reviewer campaign
- `/success` — Pinch return state and campaign timeline

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5176`.

## Pinch sandbox

Copy `.env.example` to `.env.local`, then provide:

```bash
PINCH_ACCESS_TOKEN=
PINCH_PAYER_ID=
NEXT_PUBLIC_APP_URL=http://localhost:5176
```

Without credentials, the payment action automatically opens the polished
sandbox simulation. With credentials, it creates a hosted $5.00 AUD Payment
Link through the server-only `/api/pinch/payment-link` route.

The success screen treats the hosted-checkout redirect as provisional. Final
payment status must be confirmed by a verified Pinch webhook in production.

## Deploy to Vercel

Import the GitHub repository into Vercel and keep the detected framework as
Next.js. The default `npm run build` command uses the native Next.js production
builder.

Add these environment variables in the Vercel project:

```bash
PINCH_ACCESS_TOKEN=
PINCH_PAYER_ID=
NEXT_PUBLIC_APP_URL=https://your-vercel-domain.vercel.app
```

Deploy once more after setting the final production URL. If Pinch credentials
are omitted, the campaign checkout safely falls back to the sandbox simulation.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```
