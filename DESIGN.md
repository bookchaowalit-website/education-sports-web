# Design direction — Training Board

Four self-authored sample sessions. Since 2026-11-19 the site uses the shared **Reader shell** (see
`READER.md`): `app/reader-shell.css`, `components/reader-shell.tsx` and `tests/reader-shell.test.tsx` are
copied byte for byte from content-techblog-web. Geist via `next/font` (variable on `<html>`), `--rs-*` tokens
in light and dark; no site colour tokens remain.

- Structure: one h1 and lede, focus chips (`aria-pressed`) with counts, a result count and a queue status line
  (`role="status"`), then every session as a card: id, focus, intensity and length, its blocks as a small
  timeline (minutes, a bar for its share of the session, label, detail), and a Queue button (`aria-pressed`,
  "Queued ✓" on a tinted fill, so queued differs from hover).
- The queue starts empty and lives in this page view only; no fake date or week is shown.
- Floor: text ≥ 12px, controls ≥ 44px, 4.5:1 text contrast, forced colours, no horizontal scroll at 320px,
  footer link back to https://bookchaowalit.com/.
- Honesty: demonstration content; not medical or coaching advice (footer note at full size).
