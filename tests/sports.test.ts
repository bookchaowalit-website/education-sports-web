import { describe, expect, it } from "vitest";
import { FOCUSES, SESSIONS, blockShare, pickSelected, sessionsFor, toggleQueued } from "@/lib/sports";

describe("sample sessions", () => {
  it("has four sessions whose blocks add up to the stated duration", () => {
    expect(SESSIONS).toHaveLength(4);
    for (const session of SESSIONS) {
      expect(session.blocks.reduce((sum, block) => sum + block.minutes, 0)).toBe(session.duration);
    }
  });

  it("derives one filter per focus plus all", () => {
    expect(FOCUSES).toEqual(["all", "endurance", "speed", "strength", "mobility"]);
  });
});

describe("filter and selection", () => {
  it("filters by focus", () => {
    expect(sessionsFor("all")).toHaveLength(4);
    expect(sessionsFor("speed").map((s) => s.id)).toEqual(["S-02"]);
    expect(sessionsFor("yoga")).toEqual([]);
  });

  it("moves the detail to the first visible session when a filter hides the selected one", () => {
    expect(pickSelected(sessionsFor("all"), "S-03")?.id).toBe("S-03");
    expect(pickSelected(sessionsFor("mobility"), "S-01")?.id).toBe("S-04");
    expect(pickSelected([], "S-01")).toBeNull();
  });
});

describe("queue", () => {
  it("adds and removes a session", () => {
    expect(toggleQueued(["S-01"], "S-02")).toEqual(["S-01", "S-02"]);
    expect(toggleQueued(["S-01", "S-02"], "S-01")).toEqual(["S-02"]);
  });
});

describe("blockShare", () => {
  it("is the block's share of the session in percent, and 0 for an empty session", () => {
    expect(blockShare(8, 32)).toBe(25);
    expect(blockShare(5, 0)).toBe(0);
  });
});
