// Training board: the four self-authored sample sessions and the filter, selection and queue rules.

export type Session = { id: string; name: string; focus: string; intensity: string; duration: number; blocks: { label: string; minutes: number; detail: string }[] };
export const SESSIONS: Session[] = [
  { id: "S-01", name: "Base Miles", focus: "endurance", intensity: "steady", duration: 42, blocks: [{ label: "Warm-up", minutes: 8, detail: "Easy movement + range check" }, { label: "Main set", minutes: 26, detail: "Steady continuous effort" }, { label: "Recovery", minutes: 8, detail: "Walk, breathe, note the day" }] },
  { id: "S-02", name: "Short Intervals", focus: "speed", intensity: "sharp", duration: 34, blocks: [{ label: "Warm-up", minutes: 10, detail: "Progressive pace, full control" }, { label: "Main set", minutes: 16, detail: "4 × 2 min / 2 min easy" }, { label: "Recovery", minutes: 8, detail: "Bring the heart rate down" }] },
  { id: "S-03", name: "Strong Frame", focus: "strength", intensity: "moderate", duration: 38, blocks: [{ label: "Warm-up", minutes: 7, detail: "Joint circles + unloaded pattern" }, { label: "Main set", minutes: 23, detail: "Push / pull / hinge circuit" }, { label: "Recovery", minutes: 8, detail: "Slow mobility sequence" }] },
  { id: "S-04", name: "Reset Flow", focus: "mobility", intensity: "easy", duration: 24, blocks: [{ label: "Arrive", minutes: 5, detail: "Quiet breathing and floor contact" }, { label: "Sequence", minutes: 14, detail: "Spine, hips, shoulders" }, { label: "Close", minutes: 5, detail: "Choose one useful range" }] },
];
export const FOCUSES = ["all", ...Array.from(new Set(SESSIONS.map((session) => session.focus)))];

export function sessionsFor(focus: string, sessions: Session[] = SESSIONS): Session[] {
  return focus === "all" ? sessions : sessions.filter((session) => session.focus === focus);
}

/** The selected session while it is in the visible list, else the first visible one. */
export function pickSelected(visible: Session[], selectedId: string): Session | null {
  return visible.find((session) => session.id === selectedId) ?? visible[0] ?? null;
}

export function toggleQueued(queued: string[], id: string): string[] {
  return queued.includes(id) ? queued.filter((item) => item !== id) : [...queued, id];
}

/** Width of a block's bar as a share of its session, in percent. */
export function blockShare(minutes: number, duration: number): number {
  return duration > 0 ? (minutes / duration) * 100 : 0;
}
