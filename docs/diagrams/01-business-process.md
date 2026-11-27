# 01 — Business process (As-Is / To-Be)

education-sports-web คือหน้าเว็บฝั่ง browser ล้วน (sports.bookchaowalit.com) แสดงตัวอย่างโปรแกรมฝึก 4 แบบ แบ่งเป็นบล็อกตามเวลา ให้กรองตามโฟกัสและกด queue ไว้ดูในรอบการเยี่ยมชมเดียว

Last reviewed: 2026-11-28 · commit `ff8e2e3`

## As-Is (จากโค้ดวันนี้)

```mermaid
flowchart TD
  PUSH["push or PR to main"] --> CI["GitHub Actions: shared ci-node + shared security scan"]
  PUSH -.->|"no Git link on the Vercel project, per PRODUCT.md"| LAG["live site lags main until a manual Vercel CLI deploy"]
  LAG --> PAGE["GET / : BoardView, focus = all, queue empty"]
  PAGE --> FOCUS["visitor picks a focus chip: sessionsFor(focus)"]
  FOCUS --> CARDS["every matching session renders as a card with timed blocks"]
  CARDS --> BAR["each block shows minutes and a bar = blockShare of the session duration"]
  CARDS --> QUEUE["Queue session toggles the id in queued (toggleQueued)"]
  QUEUE --> COUNT["status line: N queued for this visit (not saved)"]
  COUNT --> LOST["reload or leave: queue is lost"]
  PAGE -.->|"runtime error, only if NEXT_PUBLIC_SENTRY_DSN set"| SENTRY["Sentry, errors only, scrubEvent strips request, user, query strings"]
  PAGE --> REDIR["GET /more-projects: 308 to bookchaowalit.com"]
```

Sources: `app/page.tsx`, `components/board-view.tsx`, `lib/sports.ts`, `lib/sentry.ts`, `next.config.ts`, `PRODUCT.md`

ข้อเท็จจริงจากโค้ด: ไม่มี network call ของตัวเอง ไม่เก็บข้อมูล. `components/board-view.tsx` แสดงทุก session ที่ผ่านตัวกรองเป็นการ์ด และไม่เรียก `pickSelected` ต่างจาก PRODUCT.md ที่เล่าว่า "เปิด session ที่เลือก". [ต้องยืนยัน] สถานะ deploy ปัจจุบัน (PRODUCT.md บันทึกเมื่อ 2026-10-23).

## To-Be (PRODUCT.md §Live URL and deploy state)

```mermaid
flowchart TD
  PUSH["push to main"] --> CI["GitHub Actions: shared ci-node + shared security scan"]
  PUSH --> VERCEL["Vercel Git deploy to sports.bookchaowalit.com"]
  VERCEL --> PAGE["GET / : BoardView (same page as As-Is)"]
```

Sources: `PRODUCT.md` (owner action D9: connect Vercel Git to this repository)

## Gap

| ID | As-Is → To-Be | Status | Owner | Evidence |
|---|---|---|---|---|
| G1 | Vercel ไม่มี Git link, deploy ด้วย CLI เท่านั้น → push to `main` deploy เอง | decide | owner | `PRODUCT.md` §Live URL and deploy state (owner action D9) |
| G2 | PRODUCT.md บอกว่าเปิด session ที่เลือก (open session) แต่โค้ดแสดงทุกการ์ด → แก้เอกสารให้ตรงโค้ด | todo | claude | `components/board-view.tsx`; `lib/sports.ts` `pickSelected` ไม่ถูกเรียกจากหน้า |

## Open questions

- production ตาม `main` อยู่หรือไม่ (PRODUCT.md บันทึก deploy ล่าสุด 2026-10-08)
