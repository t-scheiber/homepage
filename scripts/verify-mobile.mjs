import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { setTimeout as delay } from "node:timers/promises";
import { pathToFileURL } from "node:url";

// CI installs this isolated runtime; the homepage does not ship a browser dependency.
assert.ok(
  process.env.PLAYWRIGHT_MODULE,
  "PLAYWRIGHT_MODULE points to the verification runtime",
);
const { chromium } = await import(
  pathToFileURL(process.env.PLAYWRIGHT_MODULE).href
);
const baseURL = process.env.VERIFY_URL || "http://127.0.0.1:4329";
let server, closed;
if (!process.env.VERIFY_URL) {
  server = spawn(
    process.execPath,
    [
      "node_modules/next/dist/bin/next",
      "start",
      "--hostname",
      "127.0.0.1",
      "--port",
      "4329",
    ],
    { stdio: "inherit" },
  );
  closed = once(server, "close");
}
const browser = await chromium.launch({ headless: true });
try {
  const deadline = Date.now() + Number(process.env.DEPLOYMENT_WAIT_MS || 30000);
  while (true) {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
    });
    try {
      await page.goto(baseURL, { waitUntil: "networkidle", timeout: 20000 });
      await page
        .getByRole("button", { name: "View CV", exact: true })
        .click({ timeout: 5000 });
      await page
        .locator(".pdf-page canvas")
        .first()
        .waitFor({ state: "visible", timeout: 15000 });
      console.log("The new PDF viewer is available at " + baseURL);
      break;
    } catch (error) {
      if (Date.now() >= deadline) throw error;
      console.log("Waiting for the new site to become available...");
      await delay(5000);
    } finally {
      await page.close();
    }
  }

  for (const [width, height, colorScheme] of [
    [320, 568, "light"],
    [390, 844, "dark"],
    [430, 932, "light"],
    [844, 390, "dark"],
    [1440, 900, "dark"],
    [1440, 900, "light"],
  ]) {
    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: 2,
      isMobile: width < 900,
      hasTouch: width < 900,
      colorScheme,
      reducedMotion: "reduce",
    });
    try {
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(baseURL, { waitUntil: "networkidle" });
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        "homepage fits the viewport",
      );
      const opener = page.getByRole("button", { name: "View CV", exact: true });
      await opener.click();
      const dialog = page.getByRole("dialog");
      await dialog.waitFor({ state: "visible" });
      await page.waitForFunction(
        () =>
          document.querySelectorAll(".pdf-text-layer").length === 2 &&
          [...document.querySelectorAll(".pdf-text-layer")].every(
            (layer) => layer.textContent.length > 20,
          ),
      );
      assert.equal(
        await dialog.locator("canvas").count(),
        2,
        "both CV pages render",
      );
      const savedScroll = await page.evaluate(
        () => -parseFloat(document.body.style.top) || 0,
      );
      const bounds = await dialog.boundingBox();
      assert.ok(
        bounds.x >= 0 &&
          bounds.x + bounds.width <= width + 1 &&
          bounds.y + bounds.height <= height + 1,
        "viewer fits the screen",
      );
      const content = dialog.getByRole("region", {
        name: "PDF document pages",
      });
      const pageWidth = await dialog
        .locator(".pdf-page")
        .first()
        .evaluate((element) => element.getBoundingClientRect().width);
      assert.ok(
        pageWidth <= (await content.evaluate((element) => element.clientWidth)),
        "document fits the content width",
      );
      for (const label of [
        "Close PDF viewer",
        "Zoom in",
        "Zoom out",
        "Fit PDF to screen width",
      ]) {
        const control = dialog.getByRole("button", {
          name: label,
          exact: true,
        });
        const box = await control.boundingBox();
        assert.ok(
          box.width >= 44 && box.height >= 44,
          "touch control has a 44px target: " + label,
        );
      }
      const painted = await dialog
        .locator("canvas")
        .first()
        .evaluate((canvas) => {
          const pixels = canvas
            .getContext("2d")
            .getImageData(0, 0, canvas.width, canvas.height).data;
          let ink = 0;
          for (let index = 0; index < pixels.length; index += 4)
            if (
              pixels[index] < 220 ||
              pixels[index + 1] < 220 ||
              pixels[index + 2] < 220
            )
              ink++;
          return ink;
        });
      assert.ok(
        painted > 100,
        "the document canvas contains visible text and graphics",
      );
      await dialog
        .getByRole("button", { name: "Zoom in", exact: true })
        .click();
      await page.waitForFunction(
        (initial) =>
          document.querySelector(".pdf-page").getBoundingClientRect().width >
          initial,
        pageWidth,
      );
      await dialog
        .getByRole("button", { name: "Fit PDF to screen width", exact: true })
        .click();
      await page.waitForFunction(
        (initial) =>
          Math.abs(
            document.querySelector(".pdf-page").getBoundingClientRect().width -
              initial,
          ) < 1,
        pageWidth,
      );
      if (width === 390) {
        await page.setViewportSize({ width: 844, height: 390 });
        await page.waitForFunction(
          () =>
            document.querySelector(".pdf-page").getBoundingClientRect().width >
            700,
        );
        await page.setViewportSize({ width, height });
        await page.waitForFunction(
          (initial) =>
            Math.abs(
              document.querySelector(".pdf-page").getBoundingClientRect()
                .width - initial,
            ) < 1,
          pageWidth,
        );
      }
      await content.evaluate((element) => {
        element.scrollTop = element.scrollHeight;
      });
      assert.ok(
        await content.evaluate((element) => element.scrollTop > 0),
        "all pages can be reached by scrolling",
      );
      assert.equal(
        await dialog.locator("a[download]").getAttribute("href"),
        "/files/pdf/ScheiberThomasCV.pdf",
      );
      await dialog
        .getByRole("button", { name: "Close PDF viewer", exact: true })
        .click();
      assert.equal(await page.getByRole("dialog").count(), 0);
      assert.ok(
        Math.abs((await page.evaluate(() => window.scrollY)) - savedScroll) <=
          1,
        "closing restores the homepage position",
      );
      assert.equal(
        await opener.evaluate((element) => element === document.activeElement),
        true,
        "closing restores focus",
      );
      assert.deepEqual(errors, [], "no browser runtime errors");
      console.log(
        `PASS ${width}x${height} ${colorScheme}: pages, zoom, scrolling, touch controls and close`,
      );
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
  if (server) {
    server.kill("SIGTERM");
    const timer = setTimeout(() => server.kill("SIGKILL"), 3000);
    try {
      await closed;
    } finally {
      clearTimeout(timer);
    }
  }
}
