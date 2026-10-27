import assert from "node:assert/strict";
import test from "node:test";
import { applicationModule, render, act } from "./component-harness.mjs";
const { default: Showcase } = await applicationModule(
  "components/WorkShowcase.tsx",
);
const button = (view, text) =>
  [...view.container.querySelectorAll("button")].find(
    (node) => node.textContent.trim() === text,
  );
const click = (view, text) => {
  const node = button(view, text);
  assert.ok(node, text);
  assert.equal(node.disabled, false, text + " must be enabled");
  return view.click(node);
};
const select = async (view, selector, value) =>
  act(async () => {
    const field = view.container.querySelector(selector);
    field.value = value;
    field.dispatchEvent(new view.window.Event("change", { bubbles: true }));
  });
const demo = async (t, name) => {
  const view = await render(t, Showcase);
  await select(view, ".work-mobile-selector select", name);
  return view;
};
const status = (view) =>
  [...view.container.querySelectorAll('[role="status"]')]
    .map((node) => node.textContent)
    .join(" ");

test("equipment blocks invalid addresses and reconciles an uncertain label without allowing duplicates", async (t) => {
  const view = await demo(t, "equipment");
  assert.equal(button(view, "Prepare demo label").disabled, true);
  await click(view, "Check address");
  assert.match(status(view), /Shipment blocked/);
  assert.equal(
    view.container
      .querySelector("#equipment-postcode")
      .getAttribute("aria-invalid"),
    "true",
  );
  await click(view, "Use valid sample");
  await click(view, "Check address");
  await view.click(view.container.querySelector('input[type="checkbox"]'));
  await click(view, "Prepare demo label");
  assert.match(status(view), /outcome unknown/);
  assert.equal(button(view, "Prepare demo label").disabled, true);
  await click(view, "Reconcile sample response");
  assert.match(status(view), /no second label/);
  await click(view, "Reset demo");
  assert.equal(view.container.querySelector("#equipment-postcode").value, "10");
  await click(view, "Use valid sample");
  await click(view, "Check address");
  await click(view, "Prepare demo label");
  assert.match(status(view), /avoid duplicates/);
  assert.equal(button(view, "Prepare demo label").disabled, true);
});

test("support drafts require review and exclude reopened sources from new drafts", async (t) => {
  const view = await demo(t, "support");
  await click(view, "Generate sample draft");
  assert.match(
    view.container.querySelector("textarea").value,
    /similar resolved case/,
  );
  assert.equal(button(view, "Accept reviewed draft").disabled, true);
  await view.click(view.container.querySelector('input[type="checkbox"]'));
  await click(view, "Accept reviewed draft");
  assert.match(status(view), /Nothing has been sent/);
  await select(view, "#support-source", "reopened");
  assert.equal(view.container.querySelector("textarea"), null);
  await click(view, "Generate sample draft");
  assert.doesNotMatch(
    view.container.querySelector("textarea").value,
    /similar resolved case/,
  );
  assert.match(
    view.container.querySelector("textarea").value,
    /could you tell us/,
  );
  assert.equal(button(view, "Accept reviewed draft").disabled, true);
});

test("lifecycle reports partial failure and preserves future-starter preparation", async (t) => {
  const view = await demo(t, "lifecycle");
  await click(view, "Run sample workflow");
  assert.match(status(view), /Partially completed/);
  await click(view, "Retry with service available");
  assert.match(status(view), /All sample steps confirmed/);
  await select(view, "#lifecycle-event", "future");
  await click(view, "Run sample workflow");
  assert.match(status(view), /Preparation preserved/);
  assert.equal(view.container.querySelectorAll(".demo-run-list li").length, 3);
});

test("scheduling prevents a conflict and invalidates a prepared event when the time changes", async (t) => {
  const view = await demo(t, "scheduler");
  assert.equal(button(view, "Prepare sample event").disabled, true);
  assert.equal(
    view.container.querySelectorAll('table th[scope="col"]').length,
    4,
  );
  assert.equal(
    view.container.querySelectorAll('table th[scope="row"]').length,
    2,
  );
  assert.match(
    view.container.querySelector("table caption").textContent,
    /availability/,
  );
  await view.click(view.container.querySelector('input[value="Cedar"]'));
  await click(view, "Prepare sample event");
  assert.match(status(view), /10:00 in Cedar/);
  await view.click(view.container.querySelector('input[value="09:00"]'));
  assert.match(status(view), /occupied/);
  assert.equal(button(view, "Prepare sample event").disabled, true);
});

test("guest access separates pending, approved and rejected states", async (t) => {
  const view = await demo(t, "access");
  await click(view, "Submit sample request");
  assert.match(status(view), /has not granted any access/);
  await click(view, "Simulate rejection");
  assert.match(status(view), /remains ungranted/);
  assert.equal(button(view, "Submit sample request").disabled, true);
  await click(view, "Reset demo");
  await click(view, "Submit sample request");
  await click(view, "Simulate approval");
  assert.match(status(view), /No real permissions changed/);
});

test("revoking a connection disables dependent work and clears the previous result", async (t) => {
  const view = await demo(t, "connections");
  assert.equal(button(view, "Run sample sync").disabled, true);
  await click(view, "Connect sample workspace");
  await click(view, "Run sample sync");
  assert.equal(
    view.container.querySelectorAll(".demo-document-list li").length,
    3,
  );
  await click(view, "Revoke sample connection");
  assert.equal(view.container.querySelector(".demo-document-list"), null);
  assert.equal(button(view, "Run sample sync").disabled, true);
  assert.match(status(view), /revoked/);
});

test("training explains wrong answers and gates advancement on correct answers", async (t) => {
  const view = await demo(t, "training");
  const answer = async (text) =>
    view.click(
      [...view.container.querySelectorAll(".demo-answer-options label")]
        .find((node) => node.textContent.trim() === text)
        .querySelector("input"),
    );
  await answer("git clone");
  await click(view, "Check answer");
  assert.match(status(view), /does not solve/);
  assert.equal(button(view, "Next step"), undefined);
  await answer("git status");
  await click(view, "Check answer");
  await click(view, "Next step");
  await answer("git switch -c feature/course-update");
  await click(view, "Check answer");
  await click(view, "Next step");
  await answer("A description of the change and what you checked");
  await click(view, "Check answer");
  await click(view, "Finish exercise");
  assert.match(status(view), /does not record a course completion/);
  await click(view, "Try the exercise again");
  assert.equal(button(view, "Check answer").disabled, true);
});

test("deployment requires passing checks and a separate approval", async (t) => {
  const view = await demo(t, "platform");
  assert.equal(button(view, "Deploy the sample").disabled, true);
  await click(view, "Run sample checks");
  assert.match(status(view), /Deployment held/);
  await view.click(view.container.querySelector('input[type="checkbox"]'));
  await click(view, "Run sample checks");
  assert.equal(button(view, "Deploy the sample").disabled, true);
  await view.click(
    view.container.querySelectorAll('input[type="checkbox"]')[1],
  );
  await click(view, "Deploy the sample");
  assert.match(status(view), /No repository or hosting service was changed/);
});

test("project selection updates the URL, responds to hash navigation and resets local demo state", async (t) => {
  const view = await demo(t, "support");
  assert.equal(view.window.location.hash, "#support");
  await click(view, "Generate sample draft");
  const originalDraft = view.container.querySelector("textarea").value;
  await act(async () => {
    view.window.history.replaceState(null, "", "#more-work");
    view.window.dispatchEvent(new view.window.Event("hashchange"));
  });
  assert.equal(
    view.container.querySelector("textarea").value,
    originalDraft,
    "section navigation preserves the draft",
  );
  assert.equal(
    view.container.querySelector(".work-mobile-selector select").value,
    "support",
  );
  await act(async () => {
    view.window.history.replaceState(null, "", "#equipment");
    view.window.dispatchEvent(new view.window.Event("hashchange"));
  });
  assert.ok(view.container.querySelector("#equipment-postcode"));
  await select(view, ".work-mobile-selector select", "support");
  assert.equal(view.container.querySelector("textarea"), null);
  assert.equal(
    view.container.querySelectorAll(
      '.work-selector-list button[aria-pressed="true"]',
    ).length,
    1,
  );
});
