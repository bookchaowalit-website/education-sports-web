import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

const text = (html: string) => html.replace(/<!-- -->/g, "");

describe("home page", () => {
  it("renders the board, the first session and the not-advice notice", () => {
    const html = text(renderToString(<Home />));
    expect(html).toContain("Make the next");
    expect(html).toContain("Base Miles");
    expect(html).toContain("42 MINUTES");
    expect(html).toContain("This planner is not medical or coaching advice.");
    expect(html).toContain("Self-authored sample plan");
  });

  it("starts with one session queued and every plan listed", () => {
    const html = text(renderToString(<Home />));
    expect(html).toContain("Queued ✓");
    expect(html).toContain("4 PLANS");
  });
});
