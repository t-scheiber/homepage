import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdir, writeFile } from "node:fs/promises";
import { setTimeout as delay } from "node:timers/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

assert.ok(process.env.PLAYWRIGHT_MODULE, "PLAYWRIGHT_MODULE is required");
const { chromium } = await import(
  pathToFileURL(process.env.PLAYWRIGHT_MODULE).href
);
const baseURL = process.env.VERIFY_URL || "http://127.0.0.1:4332";
const evidence = process.env.HILL_EVIDENCE_DIR;
if (evidence) await mkdir(evidence, { recursive: true });
const results = [];
let server, closed, browser;
try {
  if (!process.env.VERIFY_URL) {
    server = spawn(
      process.execPath,
      [
        "node_modules/next/dist/bin/next",
        "start",
        "--hostname",
        "127.0.0.1",
        "--port",
        "4332",
      ],
      { stdio: "ignore" },
    );
    closed = once(server, "close");
    let ready = false;
    for (let attempt = 0; attempt < 100; attempt++) {
      if (server.exitCode !== null) throw Error("Verification server exited");
      try {
        ready = (await fetch(baseURL)).ok;
      } catch {
        /* Server is starting. */
      }
      if (ready) break;
      await delay(100);
    }
    assert.ok(ready, "verification server is ready");
  }
  browser = await chromium.launch({ headless: true });
  for (const [width, height, theme] of [
    [390, 844, "light"],
    [390, 844, "dark"],
    [1440, 900, "light"],
    [1440, 900, "dark"],
  ]) {
    const context = await browser.newContext({
      viewport: { width, height },
      colorScheme: theme,
      reducedMotion: "reduce",
    });
    try {
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      const settle = () =>
        page.evaluate(
          () =>
            new Promise((resolve) =>
              requestAnimationFrame(() => requestAnimationFrame(resolve)),
            ),
        );
      // Reach controls with Tab, then activate them with the keyboard. No click,
      // programmatic focus, selectOption or direct state mutation is used.
      async function tabTo(locator) {
        assert.equal(await locator.count(), 1, "unique keyboard target");
        assert.ok(await locator.isVisible(), "keyboard target is visible");
        assert.ok(await locator.isEnabled(), "keyboard target is enabled");
        for (let count = 0; count < 100; count++) {
          if (await locator.evaluate((node) => node === document.activeElement))
            return;
          await page.keyboard.press("Tab");
        }
        throw Error("Tab could not reach " + (await locator.textContent()));
      }
      async function key(locator, key = "Enter") {
        if ((await locator.getAttribute("type")) === "radio") {
          const name = await locator.getAttribute("name");
          const group = page.locator(`input[type="radio"][name="${name}"]`);
          const checked = page.locator(
            `input[type="radio"][name="${name}"]:checked`,
          );
          await tabTo((await checked.count()) ? checked : group.first());
          for (let step = 0; step < (await group.count()); step++) {
            if (
              await locator.evaluate((node) => node === document.activeElement)
            )
              break;
            await page.keyboard.press("ArrowRight");
          }
          assert.ok(
            await locator.evaluate((node) => node === document.activeElement),
            "radio reached with arrow keys",
          );
        } else await tabTo(locator);
        await page.keyboard.press(key);
        await settle();
        assert.ok(
          await page.evaluate(
            () =>
              document.activeElement !== document.body &&
              !document.activeElement.disabled,
          ),
          "focus survives each action",
        );
      }
      const button = (name) => page.getByRole("button", { name, exact: true });
      const status = async (text) => {
        await page.waitForFunction(
          (needle) =>
            document
              .querySelector(".work-demo-frame [role=status]")
              ?.textContent.includes(needle),
          text,
        );
        await settle();
        assert.ok(
          await page
            .locator(".demo-status")
            .allTextContents()
            .then((items) => items.some((item) => item.includes(text))),
          "visible status matches announcement",
        );
      };
      async function snapshot(name) {
        assert.ok(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          "state fits viewport",
        );
        if (evidence)
          await page.locator(".work-demo-frame").screenshot({
            path: path.join(evidence, `keyboard-${name}-${width}-${theme}.png`),
          });
      }
      await page.goto(baseURL + "/workprojects", { waitUntil: "networkidle" });
      const ids = [
        "equipment",
        "platform",
        "support",
        "lifecycle",
        "scheduler",
        "access",
        "connections",
        "training",
      ];
      if (width <= 900) {
        const picker = page.getByRole("combobox", {
          name: "Project",
          exact: true,
        });
        await tabTo(picker);
        for (const id of ids.slice(1)) {
          await page.keyboard.press("ArrowDown");
          await settle();
          assert.ok(
            await picker.evaluate((node) => node === document.activeElement),
            "continuous arrow navigation retains picker focus",
          );
          assert.equal(await picker.inputValue(), id);
        }
        await page.keyboard.press("Home");
        await settle();
        assert.equal(await picker.inputValue(), "equipment");
        assert.ok(
          await picker.evaluate((node) => node === document.activeElement),
        );
      }
      for (const [index, id] of ids.entries()) {
        if (width > 900) {
          await key(page.locator(".work-selector-list button").nth(index));
        } else {
          const picker = page.getByRole("combobox", {
            name: "Project",
            exact: true,
          });
          await key(picker, index === 0 ? "Home" : "ArrowDown");
          assert.ok(
            await picker.evaluate((node) => node === document.activeElement),
            "picker focus stays while the demo updates",
          );
        }
        await page.waitForFunction(
          ({ expected, desktop }) =>
            location.hash === "#" + expected &&
            (desktop
              ? document.activeElement?.id === "selected-project-title"
              : document.activeElement ===
                document.querySelector(".work-mobile-selector select")),
          { expected: id, desktop: width > 900 },
        );
        const frame = page.locator(".work-demo-frame");
        if (id === "equipment") {
          await key(button("Check address"));
          await status("Shipment blocked");
          await key(button("Use valid sample"));
          await key(button("Check address"));
          await key(
            page.getByRole("checkbox", {
              name: "Simulate an uncertain carrier response",
            }),
            "Space",
          );
          await key(button("Prepare demo label"));
          await status("Carrier outcome unknown");
          assert.ok(await button("Prepare demo label").isDisabled());
          await key(button("Reconcile sample response"));
          await status("no second label");
        } else if (id === "platform") {
          await key(button("Run sample checks"));
          await status("Deployment held");
          assert.ok(await button("Deploy the sample").isDisabled());
          await key(
            page.getByRole("checkbox", {
              name: "Include a failing link check",
            }),
            "Space",
          );
          await key(button("Run sample checks"));
          await status("Checks passed");
          assert.ok(await button("Deploy the sample").isDisabled());
          await key(
            page.getByRole("checkbox", {
              name: "Approve the sample change after checks pass",
            }),
            "Space",
          );
          await key(button("Deploy the sample"));
          await status("No repository or hosting service was changed");
        } else if (id === "support") {
          await key(button("Generate sample draft"));
          assert.ok(await button("Accept reviewed draft").isDisabled());
          await key(
            page.getByRole("checkbox", {
              name: "I have reviewed this sample reply",
            }),
            "Space",
          );
          await key(button("Accept reviewed draft"));
          await status("Nothing has been sent");
          await key(page.locator("#support-source"), "ArrowDown");
          await key(button("Generate sample draft"));
          assert.doesNotMatch(
            await page
              .getByRole("textbox", { name: "Editable reply draft" })
              .inputValue(),
            /similar resolved case/,
          );
          assert.ok(await button("Accept reviewed draft").isDisabled());
        } else if (id === "lifecycle") {
          await key(button("Run sample workflow"));
          await status("Partially completed");
          await key(button("Retry with service available"));
          await status("All sample steps confirmed");
          await key(
            page.getByRole("combobox", { name: "Example event" }),
            "End",
          );
          await key(button("Run sample workflow"));
          await status("Preparation preserved");
        } else if (id === "scheduler") {
          assert.ok(await button("Prepare sample event").isDisabled());
          await key(page.getByRole("radio", { name: /Cedar/ }), "Space");
          await key(button("Prepare sample event"));
          await status("10:00 in Cedar");
          await key(
            page.getByRole("radio", { name: "09:00", exact: true }),
            "Space",
          );
          await status("occupied");
          assert.ok(await button("Prepare sample event").isDisabled());
        } else if (id === "access") {
          await key(button("Submit sample request"));
          await status("Pending approval");
          assert.ok(
            await button("Simulate approval").evaluate(
              (node) => node === document.activeElement,
            ),
            "disabled submit hands focus to approval",
          );
          await key(button("Simulate rejection"));
          await status("remains ungranted");
          await key(button("Reset demo"));
          await key(button("Submit sample request"));
          await key(button("Simulate approval"));
          await status("No real permissions changed");
          assert.ok(
            await frame
              .locator(".demo-status")
              .evaluate((node) => node === document.activeElement),
            "completed approval focuses the result",
          );
          await page.keyboard.press("Enter");
          await settle();
          await status("No real permissions changed");
        } else if (id === "connections") {
          assert.ok(await button("Run sample sync").isDisabled());
          await key(button("Connect sample workspace"));
          await key(button("Run sample sync"));
          assert.equal(
            await frame.locator(".demo-document-list li").count(),
            3,
          );
          await key(button("Revoke sample connection"));
          await status("revoked");
          assert.ok(await button("Run sample sync").isDisabled());
          assert.equal(await frame.locator(".demo-document-list").count(), 0);
        } else {
          await key(
            page.getByRole("radio", { name: "git clone", exact: true }),
            "Space",
          );
          await key(button("Check answer"));
          await status("does not solve");
          await key(
            page.getByRole("radio", { name: "git status", exact: true }),
            "Space",
          );
          await key(button("Check answer"));
          await key(button("Next step"));
          await key(
            page.getByRole("radio", {
              name: "git switch -c feature/course-update",
              exact: true,
            }),
            "Space",
          );
          await key(button("Check answer"));
          await key(button("Next step"));
          await key(
            page.getByRole("radio", {
              name: "A description of the change and what you checked",
              exact: true,
            }),
            "Space",
          );
          await key(button("Check answer"));
          await key(button("Finish exercise"));
          await status("does not record a course completion");
          await key(button("Try the exercise again"));
          assert.ok(await button("Check answer").isDisabled());
        }
        await snapshot(id);
        await key(button("Reset demo"));
        if (id === "equipment")
          assert.equal(
            await page.locator("#equipment-postcode").inputValue(),
            "10",
          );
        if (id === "platform")
          assert.ok(await button("Deploy the sample").isDisabled());
        if (id === "support")
          assert.equal(await page.locator("textarea").count(), 0);
        if (id === "lifecycle")
          assert.equal(
            await page.locator("#lifecycle-event").inputValue(),
            "returning",
          );
        if (id === "scheduler")
          assert.ok(await button("Prepare sample event").isDisabled());
        if (id === "access")
          assert.ok(await button("Submit sample request").isEnabled());
        if (id === "connections")
          assert.ok(await button("Run sample sync").isDisabled());
        if (id === "training")
          assert.ok(await button("Check answer").isDisabled());
        results.push({
          width,
          height,
          theme,
          demo: id,
          keyboardOnly: true,
          headingFocus: width > 900,
          pickerFocusPreserved: width <= 900,
          stateFlow: "PASS",
          reset: "PASS",
        });
        console.log(
          `PASS ${width} ${theme} ${id}: keyboard selection, state flow, focus and reset`,
        );
      }
      assert.deepEqual(errors, [], "no browser runtime errors");
    } finally {
      await context.close();
    }
  }
  if (evidence)
    await writeFile(
      path.join(evidence, "keyboard-report.json"),
      JSON.stringify(
        { recordedAt: new Date().toISOString(), results },
        null,
        2,
      ),
    );
} finally {
  await browser?.close();
  if (server) {
    server.kill();
    const timer = setTimeout(() => server.kill("SIGKILL"), 3000);
    try {
      await closed;
    } finally {
      clearTimeout(timer);
    }
  }
}
