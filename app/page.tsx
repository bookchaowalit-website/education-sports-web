"use client";

import { useMemo, useState } from "react";

type Session = { id: string; name: string; focus: string; intensity: string; duration: number; blocks: { label: string; minutes: number; detail: string }[] };
const sessions: Session[] = [
  { id: "S-01", name: "Base Miles", focus: "endurance", intensity: "steady", duration: 42, blocks: [{ label: "Warm-up", minutes: 8, detail: "Easy movement + range check" }, { label: "Main set", minutes: 26, detail: "Steady continuous effort" }, { label: "Recovery", minutes: 8, detail: "Walk, breathe, note the day" }] },
  { id: "S-02", name: "Short Intervals", focus: "speed", intensity: "sharp", duration: 34, blocks: [{ label: "Warm-up", minutes: 10, detail: "Progressive pace, full control" }, { label: "Main set", minutes: 16, detail: "4 × 2 min / 2 min easy" }, { label: "Recovery", minutes: 8, detail: "Bring the heart rate down" }] },
  { id: "S-03", name: "Strong Frame", focus: "strength", intensity: "moderate", duration: 38, blocks: [{ label: "Warm-up", minutes: 7, detail: "Joint circles + unloaded pattern" }, { label: "Main set", minutes: 23, detail: "Push / pull / hinge circuit" }, { label: "Recovery", minutes: 8, detail: "Slow mobility sequence" }] },
  { id: "S-04", name: "Reset Flow", focus: "mobility", intensity: "easy", duration: 24, blocks: [{ label: "Arrive", minutes: 5, detail: "Quiet breathing and floor contact" }, { label: "Sequence", minutes: 14, detail: "Spine, hips, shoulders" }, { label: "Close", minutes: 5, detail: "Choose one useful range" }] },
];
const focuses = ["all", ...Array.from(new Set(sessions.map((session) => session.focus)))];

export default function Home() {
  const [focus, setFocus] = useState("all");
  const [selectedId, setSelectedId] = useState(sessions[0].id);
  const [queued, setQueued] = useState<string[]>([sessions[0].id]);
  const visible = useMemo(() => focus === "all" ? sessions : sessions.filter((session) => session.focus === focus), [focus]);
  const selected = sessions.find((session) => session.id === selectedId) ?? visible[0] ?? sessions[0];
  const toggleQueue = (id: string) => setQueued((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  return <main className="training-board">
    <header className="score-header"><div className="logo"><span>BT</span> / BOOK TRAINING</div><div className="date">WEEK 34 / MONDAY</div><div className="signal"><i /> BOARD READY</div></header>
    <section className="score-hero"><div><p className="kicker">TRAINING BOARD / SELF-PACED</p><h1>Make the next<br /><strong>session</strong> obvious.</h1><p className="hero-copy">A compact library for choosing a focus, reading the shape of a session, and putting one useful block on the week.</p></div><div className="score-stat"><strong>{queued.length.toString().padStart(2, "0")}</strong><span>queued<br />this week</span></div></section>
    <div className="board-body">
      <aside className="session-rail" aria-label="Training session filters"><div className="rail-title">FOCUS / FILTER</div>{focuses.map((item) => <button key={item} className={focus === item ? "focus active" : "focus"} onClick={() => setFocus(item)} aria-pressed={focus === item}>{item}<span>↗</span></button>)}<p className="safety">DEMONSTRATION CONTENT<br />Adapt sessions to your own context. This planner is not medical or coaching advice.</p></aside>
      <section className="session-list" aria-label="Training sessions"><div className="list-head"><span>SESSION LIBRARY</span><span>{visible.length} PLANS</span></div>{visible.map((session) => <button key={session.id} className={selected.id === session.id ? "session active" : "session"} onClick={() => setSelectedId(session.id)}><span className="session-id">{session.id}</span><span><strong>{session.name}</strong><small>{session.focus} / {session.intensity}</small></span><span className="duration">{session.duration}<small>MIN</small></span></button>)}</section>
      <section className="session-detail" aria-live="polite"><div className="detail-heading"><div><p className="kicker">SELECTED SESSION / {selected.id}</p><h2>{selected.name}</h2></div><button className={queued.includes(selected.id) ? "queue queued" : "queue"} onClick={() => toggleQueue(selected.id)}>{queued.includes(selected.id) ? "Queued ✓" : "Queue session"}</button></div><div className="timeline">{selected.blocks.map((block, index) => <div className="block" key={block.label} style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}><div className="block-time">{String(block.minutes).padStart(2, "0")}<small>min</small></div><div className="block-bar"><span style={{ width: `${(block.minutes / selected.duration) * 100}%` }} /></div><div><strong>{block.label}</strong><p>{block.detail}</p></div></div>)}</div><div className="detail-foot"><span>TOTAL SESSION</span><strong>{selected.duration} MINUTES</strong><span className="disclaimer">Self-authored sample plan</span></div></section>
    </div>
    <footer><span>BOOK TRAINING / 2026</span><span>Start within your own limits.</span></footer>
  </main>;
}
