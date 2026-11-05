import assert from "node:assert/strict";
import test from "node:test";
import { applicationModule, render, act } from "./component-harness.mjs";
const { default: HomeTrace } = await applicationModule(
  "components/HomeTrace.tsx",
);

const status = (view) =>
  view.container.querySelector('[role="status"]').textContent;
const button = (view, text) =>
  [...view.container.querySelectorAll("button")].find(
    (node) => node.textContent.trim() === text,
  );
const submit = (view) =>
  act(async () => {
    view.container
      .querySelector("form")
      .dispatchEvent(
        new view.window.Event("submit", { bubbles: true, cancelable: true }),
      );
  });

test("home trace blocks an incomplete address and never buys a second label", async (t) => {
  const view = await render(t, HomeTrace);
  await submit(view);
  assert.match(status(view), /Shipment blocked.*No label was requested/);
  assert.equal(
    view.container.querySelector("input").getAttribute("aria-invalid"),
    "true",
  );
  await view.click(button(view, "Use a valid sample"));
  await submit(view);
  assert.match(status(view), /Address accepted/);
  await view.click(button(view, "Prepare sample label"));
  assert.match(status(view), /Further labels are locked/);
  assert.equal(view.container.querySelector("input").disabled, true);
  await view.click(button(view, "Simulate an unclear carrier response"));
  assert.match(status(view), /Reconcile first/);
  await view.click(button(view, "Reconcile"));
  assert.match(status(view), /No second label was created/);
  const link = view.container.querySelector('a[href="/workprojects#equipment"]');
  assert.ok(link, "the widget links to the full demo");
});
