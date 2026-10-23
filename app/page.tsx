"use client";

import { useMemo, useState } from "react";
import { FOCUSES, SESSIONS, blockShare, pickSelected, sessionsFor, toggleQueued } from "@/lib/sports";

export default function Home() {
  const [focus, setFocus] = useState("all");
  const [selectedId, setSelectedId] = useState(SESSIONS[0].id);
  const [queued, setQueued] = useState<string[]>([SESSIONS[0].id]);
  const visible = useMemo(() => sessionsFor(focus), [focus]);
  const selected = pickSelected(visible, selectedId) ?? SESSIONS[0];
  const toggleQueue = (id: string) => setQueued((current) => toggleQueued(current, id));
  return <main className="training-board">
    <header className="score-header"><div className="logo"><span>BT</span> / BOOK TRAINING</div><div className="date">WEEK 34 / MONDAY</div><div className="signal"><i /> BOARD READY</div></header>
    <section className="score-hero"><div><p className="kicker">TRAINING BOARD / SELF-PACED</p><h1>Make the next<br /><strong>session</strong> obvious.</h1><p className="hero-copy">A compact library for choosing a focus, reading the shape of a session, and putting one useful block on the week.</p></div><div className="score-stat"><strong>{queued.length.toString().padStart(2, "0")}</strong><span>queued<br />this week</span></div></section>
    <div className="board-body">
      <aside className="session-rail" aria-label="Training session filters"><div className="rail-title">FOCUS / FILTER</div>{FOCUSES.map((item) => <button type="button" key={item} className={focus === item ? "focus active" : "focus"} onClick={() => setFocus(item)} aria-pressed={focus === item}>{item}<span>↗</span></button>)}<p className="safety">DEMONSTRATION CONTENT<br />Adapt sessions to your own context. This planner is not medical or coaching advice.</p></aside>
      <section className="session-list" aria-label="Training sessions"><div className="list-head"><span>SESSION LIBRARY</span><span>{visible.length} PLANS</span></div>{visible.map((session) => <button type="button" key={session.id} className={selected.id === session.id ? "session active" : "session"} onClick={() => setSelectedId(session.id)}><span className="session-id">{session.id}</span><span><strong>{session.name}</strong><small>{session.focus} / {session.intensity}</small></span><span className="duration">{session.duration}<small>MIN</small></span></button>)}</section>
      <section className="session-detail" aria-live="polite"><div className="detail-heading"><div><p className="kicker">SELECTED SESSION / {selected.id}</p><h2>{selected.name}</h2></div><button type="button" className={queued.includes(selected.id) ? "queue queued" : "queue"} onClick={() => toggleQueue(selected.id)}>{queued.includes(selected.id) ? "Queued ✓" : "Queue session"}</button></div><div className="timeline">{selected.blocks.map((block, index) => <div className="block" key={block.label} style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}><div className="block-time">{String(block.minutes).padStart(2, "0")}<small>min</small></div><div className="block-bar"><span style={{ width: `${blockShare(block.minutes, selected.duration)}%` }} /></div><div><strong>{block.label}</strong><p>{block.detail}</p></div></div>)}</div><div className="detail-foot"><span>TOTAL SESSION</span><strong>{selected.duration} MINUTES</strong><span className="disclaimer">Self-authored sample plan</span></div></section>
    </div>
    <footer><span>BOOK TRAINING / 2026</span><span>Start within your own limits.</span></footer>
  </main>;
}
