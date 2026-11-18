// @vitest-environment happy-dom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import Home from "@/app/page";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import nextConfig from "@/next.config";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
const text = (html: string) => html.replace(/<!-- -->/g, "");

describe("home page (server render)", () => {
  it("renders one h1, every session with its blocks, an empty queue and the not-advice notice", () => {
    const html = text(renderToString(<Home />));
    expect(html.match(/<h1/g)).toHaveLength(1);
    for (const name of ["Base Miles", "Short Intervals", "Strong Frame", "Reset Flow"]) expect(html).toContain(name);
    expect(html).toContain("S-01 · endurance · steady · 42 min");
    expect(html).toContain("4 × 2 min / 2 min easy");
    expect(html).toContain("Nothing queued yet");
    expect(html).toContain("this planner is not medical or coaching advice");
    expect(html).not.toContain("WEEK 34");
    expect(html).toContain('href="https://bookchaowalit.com/"');
  });
});

describe("home page (mounted)", () => {
  let root: Root;
  let host: HTMLDivElement;
  const button = (t: string, scope: ParentNode = host) => [...scope.querySelectorAll("button")].find((b) => b.textContent?.trim().startsWith(t)) as HTMLButtonElement;
  const press = (el: Element) => act(() => { el.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
  const names = () => [...host.querySelectorAll(".rs-entry h3")].map((h) => h.textContent);

  beforeEach(() => {
    host = document.createElement("div");
    document.body.append(host);
    root = createRoot(host);
    act(() => root.render(<Home />));
  });
  afterEach(() => { act(() => root.unmount()); host.remove(); });

  it("filters by focus with a pressed chip and a count", () => {
    press(button("mobility"));
    expect(names()).toEqual(["Reset Flow"]);
    expect(button("mobility").getAttribute("aria-pressed")).toBe("true");
    expect(host.querySelector(".rs-count")!.textContent).toBe("Showing 1 of 4 sessions in “mobility”");
  });

  it("queues and unqueues sessions with a pressed button and an announced count", () => {
    const cards = () => [...host.querySelectorAll(".rs-entry")];
    press(button("Queue session", cards()[0]));
    press(button("Queue session", cards()[2]));
    expect(button("Queued", cards()[0]).getAttribute("aria-pressed")).toBe("true");
    expect(host.querySelectorAll("[role='status']")[1].textContent).toBe("2 queued for this visit (not saved)");
    press(button("Queued", cards()[0]));
    expect(host.querySelectorAll("[role='status']")[1].textContent).toBe("1 queued for this visit (not saved)");
  });

  it("draws each block bar as its share of the session", () => {
    const bar = host.querySelector<HTMLElement>(".session-bar span")!;
    expect(bar.style.width).toBe(`${(8 / 42) * 100}%`);
  });
});

describe("site files", () => {
  it("points robots and the sitemap at sports.bookchaowalit.com and redirects /more-projects", async () => {
    expect(robots().sitemap).toBe("https://sports.bookchaowalit.com/sitemap.xml");
    expect(sitemap()[0].url).toBe("https://sports.bookchaowalit.com/");
    expect(await nextConfig.redirects!()).toContainEqual({ source: "/more-projects", destination: "https://bookchaowalit.com/", permanent: true });
  });
});
