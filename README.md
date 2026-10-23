# Book Training (sports training board)

A training board over four sample sessions: filter by focus, open a session to see its timed blocks, queue a few for the week. Sample content, not coaching advice.

Live: https://sports.bookchaowalit.com (deployed by Vercel CLI; it can lag `main`, see `PRODUCT.md`).

## What it does not do

- No logging, analytics, periodization, Strava or saved queue. Not medical or coaching advice.

## Run

```bash
npm ci
npm run dev
```

## Checks

```bash
npm test           # Vitest: session data, filter, selection and queue rules, home page render, Sentry scrubbing
npm run lint
npm run typecheck
npm run build
```

CI (`.github/workflows/ci.yml`) runs the shared Node workflow (with a line-coverage gate) and the shared security
scan on every push and PR to `main`.

## Code map

- `lib/sports.ts`: the four sample sessions, focus list, `sessionsFor`, `pickSelected`, `toggleQueued`, `blockShare`.
- `lib/sentry.ts` + `instrumentation*.ts`: error reporting to Sentry, errors only, personal data stripped; off when `NEXT_PUBLIC_SENTRY_DSN` is unset.
