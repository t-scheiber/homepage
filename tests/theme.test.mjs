import assert from "node:assert/strict";
import test from "node:test";
import { JSDOM } from "jsdom";
import { applicationModule } from "./component-harness.mjs";

const { themeInitScript } = await applicationModule("lib/theme-init.ts");

function page({ systemDark = false, saved, storageBlocked = false } = {}) {
  const dom = new JSDOM(
    '<!doctype html><html><head><meta name="theme-color"></head><body></body></html>',
    {
      url: "https://fixture.invalid/",
      runScripts: "outside-only",
    },
  );
  dom.window.matchMedia = () => ({ matches: systemDark });
  if (saved) dom.window.localStorage.setItem("portfolio-theme", saved);
  if (storageBlocked)
    Object.defineProperty(dom.window, "localStorage", {
      get() {
        throw new Error("Storage unavailable");
      },
    });
  dom.window.eval(themeInitScript);
  return dom;
}

test("the first paint follows the system unless a saved theme overrides it", () => {
  for (const [options, expected] of [
    [{ systemDark: false }, "light"],
    [{ systemDark: true }, "dark"],
    [{ systemDark: true, saved: "light" }, "light"],
    [{ systemDark: false, saved: "dark" }, "dark"],
    [{ systemDark: true, saved: "invalid" }, "dark"],
  ]) {
    const dom = page(options);
    assert.equal(dom.window.document.documentElement.dataset.theme, expected);
    assert.equal(
      dom.window.document.querySelector('meta[name="theme-color"]').content,
      expected === "dark" ? "#14232e" : "#edf2ed",
    );
    dom.window.close();
  }
});

test("blocked storage still produces a usable system theme", () => {
  const dom = page({ systemDark: false, storageBlocked: true });
  assert.equal(dom.window.document.documentElement.dataset.theme, "light");
  assert.equal(
    dom.window.document.documentElement.dataset.themePreference,
    "system",
  );
  dom.window.close();
});
