# Book Training (sports training board) — Product truth

> Inferred from the code and copy (no user interview). Checked against the portfolio card claims review
> (`portfolio-site-web/docs/audits/CARD-CLAIMS-REVIEW-2026-10.md`, row `sports-training`) on 2026-10-23.

## What it is

A client-only training board over four self-authored sample sessions (endurance, speed, strength, mobility), each split into timed blocks.

## Who it is for

A visitor who wants to browse a few session shapes and pick one for the week.

## What works today

1. Filter by focus; the library lists the matching plans. If a filter hides the open session, the first visible one opens.
2. Open a session to see its blocks, each with minutes and a bar showing its share of the session (the blocks add up to the stated total, checked by tests).
3. Queue or unqueue sessions; the counter shows how many are queued. The queue lasts for the visit only.
4. Front-end and server errors go to Sentry (errors only, personal data stripped) when `NEXT_PUBLIC_SENTRY_DSN` is set.

## What does not work (and must not be claimed)

- No workout logging, performance analytics, periodization or Strava sync (removed from the portfolio card in the 2026-10 review).
- "WEEK 34 / MONDAY" is fixed header copy, not today's date. Nothing is saved.
- Not medical or coaching advice (stated on the page).

## Live URL and deploy state

- Live: https://sports.bookchaowalit.com (HTTP 200 on 2026-10-23).
- The Vercel project `bookchaowalit-sports-frontend` has no Git link and is deployed only by CLI. Its last production deploy is 2026-10-08 (CLI, commit 989fae6, before the Next 16.4.2 CVE patch); the CVE patch deploy is queued with the coordinator (Vercel free-plan deploy limit hit on 2026-10-23). A push to `main` does not deploy: the L2 work stays undeployed until the owner connects Vercel Git to this repository (owner action D9). `NEXT_PUBLIC_SENTRY_DSN` is already set on the Vercel project (Sentry project `education-sports-web`, org `personal-yu0`).

## Boundaries

- Browser-only static page; no API routes, storage or network calls of its own.
