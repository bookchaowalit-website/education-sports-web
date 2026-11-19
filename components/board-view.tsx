"use client";

import { useState } from "react";
import { Reader, ReaderFoot, ReaderHead, ReaderTop, ResultCount } from "@/components/reader-shell";
import { FOCUSES, SESSIONS, blockShare, sessionsFor, toggleQueued } from "@/lib/sports";

// The training board on the Reader shell: focus chips narrow four sample sessions; each card shows its blocks
// as a small timeline and a Queue button. The queue lives in this page view only.

const SOURCE = "https://github.com/bookchaowalit-website/education-sports-web";

export function BoardView() {
  const [focus, setFocus] = useState("all");
  const [queued, setQueued] = useState<string[]>([]);
  const visible = sessionsFor(focus);
  return (
    <Reader>
      <ReaderTop name="Training Board" tagline="Self-paced sample sessions" links={[{ href: "#sessions", label: "Sessions" }]} />
      <main id="main" className="rs-main">
        <ReaderHead
          eyebrow="Training board, self-paced"
          title="Make the next session obvious."
          lede="A compact library for choosing a focus, reading the shape of a session, and putting one useful block on the week."
        />
        <section aria-labelledby="sessions">
          <div className="rs-section-head"><h2 id="sessions">Session library</h2></div>
          <div className="rs-toolbar">
            <ul className="site-chips" aria-label="Filter by focus">
              {FOCUSES.map((item) => (
                <li key={item}>
                  <button type="button" className="rs-chip" aria-pressed={focus === item} onClick={() => setFocus(item)}>
                    {item === "all" ? "All" : item}<small>{sessionsFor(item).length}</small>
                  </button>
                </li>
              ))}
            </ul>
            <ResultCount shown={visible.length} total={SESSIONS.length} noun="session" filter={focus === "all" ? undefined : `“${focus}”`} />
            <p className="rs-count" role="status">{queued.length === 0 ? "Nothing queued yet: press Queue session on a plan you want this week." : `${queued.length} queued for this visit (not saved)`}</p>
          </div>
          <ul className="rs-list session-grid" role="list" data-layout="cards">
            {visible.map((session) => {
              const isQueued = queued.includes(session.id);
              return (
                <li key={session.id}>
                  <article className="rs-entry">
                    <h3>{session.name}</h3>
                    <p className="rs-entry-meta">{session.id} · {session.focus} · {session.intensity} · {session.duration} min</p>
                    <ol className="session-blocks" aria-label={`${session.name} blocks`}>
                      {session.blocks.map((block) => (
                        <li key={block.label}>
                          <span className="session-min">{block.minutes} min</span>
                          <div>
                            <span className="session-bar" aria-hidden="true"><span style={{ width: `${blockShare(block.minutes, session.duration)}%` }} /></span>
                            <strong>{block.label}</strong>
                            <p>{block.detail}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                    <button type="button" className="rs-plain session-queue" aria-pressed={isQueued} onClick={() => setQueued((current) => toggleQueued(current, session.id))}>
                      {isQueued ? "Queued ✓" : "Queue session"}
                      {/* Four cards share the visible label: the session name makes each button's name unique. */}
                      <span className="rs-sr">: {session.name}</span>
                    </button>
                  </article>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
      <ReaderFoot source={SOURCE} note="Self-authored sample sessions for demonstration. Adapt them to your own context and limits; this planner is not medical or coaching advice." />
    </Reader>
  );
}
