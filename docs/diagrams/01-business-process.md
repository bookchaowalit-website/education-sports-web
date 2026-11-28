# 01 — Business process (As-Is / To-Be)

education-sports-web คือหน้าเว็บฝั่ง browser ล้วน (sports.bookchaowalit.com) แสดงตัวอย่างโปรแกรมฝึก 4 แบบ แบ่งเป็นบล็อกตามเวลา ให้กรองตามโฟกัสและกด queue ไว้ดูในรอบการเยี่ยมชมเดียว

Last reviewed: 2026-11-28 · commit `ff8e2e3`

## As-Is (จากโค้ดวันนี้)

```mermaid
flowchart TD
  PR["push or PR to main"] --> CI["GitHub Actions: shared ci-node + shared security scan (ci.yml triggers: push and PR)"]
  MAIN["push to main"] -->|"Vercel Git link, verified 2026-11-28 (separate from ci.yml, not gated by it)"| PROD["production = ff8e2e3 via Vercel Git; main is ahead only by docs/ commits"]
  PAGE["GET / : BoardView, focus = all, queue empty"] --> CARDS["all 4 session cards shown at once, each with Queue session and timed blocks"]
  PAGE -->|"optional"| FOCUS["visitor picks a focus chip: sessionsFor(focus) changes which cards show"]
  FOCUS --> CARDS
  CARDS --> BAR["each block shows minutes and a bar = blockShare of the session duration"]
  CARDS --> QUEUE["Queue session toggles the id in queued (toggleQueued)"]
  QUEUE --> COUNT["status line: N queued for this visit (not saved)"]
  COUNT --> LOST["reload or leave: queue is lost"]
  PAGE -.->|"runtime error, only if NEXT_PUBLIC_SENTRY_DSN set"| SENTRY["Sentry, errors only, scrubEvent strips request, user, query strings"]
  DIRECT["separate request: GET /more-projects (old URL)"] --> REDIR["308 to bookchaowalit.com"]
```

Sources: `app/page.tsx`, `components/board-view.tsx`, `lib/sports.ts`, `lib/sentry.ts`, `next.config.ts`, `PRODUCT.md`

ข้อเท็จจริงจากโค้ด: ไม่มี network call ของตัวเอง ไม่เก็บข้อมูล (ยกเว้นรายงานข้อผิดพลาดไป Sentry); ปุ่ม More projects ใน footer ลิงก์ตรงไป bookchaowalit.com ไม่ผ่าน `/more-projects`. `components/board-view.tsx` แสดงทุก session ที่ผ่านตัวกรองเป็นการ์ด และไม่เรียก `pickSelected` ต่างจาก PRODUCT.md ที่เล่าว่า "เปิด session ที่เลือก". production = ff8e2e3 ผ่าน Vercel Git (ตรวจ 2026-11-28); main HEAD bc61860 นำหน้าเฉพาะ commit ใน docs/.

## To-Be (PRODUCT.md §Live URL and deploy state)

```mermaid
flowchart TD
  PUSH["push to main"] --> CI["GitHub Actions: shared ci-node + shared security scan"]
  PUSH --> VERCEL["Vercel Git deploy to sports.bookchaowalit.com"]
  VERCEL --> PAGE["GET / : BoardView (same page as As-Is)"]
```

Sources: `PRODUCT.md` (owner action D9 done, verified 2026-11-28 via Vercel API)

## Gap

| ID | As-Is → To-Be | Status | Owner | Evidence |
|---|---|---|---|---|
| G1 | Vercel ไม่มี Git link, deploy ด้วย CLI เท่านั้น → push to `main` deploy เอง | done | owner | `PRODUCT.md` §Live URL and deploy state (owner action D9); Vercel API 2026-11-28: project `bookchaowalit-sports-frontend` Git link → `bookchaowalit-website/education-sports-web`, production branch `main` |
| G2 | PRODUCT.md บอกว่าเปิด session ที่เลือก (open session) แต่โค้ดแสดงทุกการ์ด → แก้เอกสารให้ตรงโค้ด | todo | claude | `components/board-view.tsx`; `lib/sports.ts` `pickSelected` ไม่ถูกเรียกจากหน้า |

## Open questions

- ไม่มีคำถามค้างเรื่อง deploy: production = ff8e2e3 via Vercel Git; main HEAD bc61860 is ahead only by docs/ commits (ตรวจกับ Vercel API 2026-11-28)
