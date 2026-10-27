import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import { createHash } from "node:crypto";

test("existing documents and public assets match the reviewed content manifest", () => {
  const assets = JSON.parse(fs.readFileSync("tests/public-assets.json"));
  assert.equal(assets.length, 73);
  assert.equal(
    assets.filter((asset) => asset.path.endsWith(".pdf")).length,
    10,
  );
  for (const asset of assets) {
    assert.match(asset.path, /^public\/[A-Za-z0-9_./-]+$/);
    const original = fs.readFileSync(asset.path);
    // Git may check out text assets with CRLF on Windows. Compare their canonical
    // LF content, while keeping every PDF, raster image and other binary exact.
    const isText =
      /\.(svg|txt|xml|js|json|webmanifest)$/.test(asset.path) ||
      asset.path === "public/_headers";
    const bytes = isText
      ? Buffer.from(original.toString("utf8").replaceAll("\r\n", "\n"))
      : original;
    assert.equal(
      bytes.length,
      asset.bytes,
      `${asset.path}: content byte count`,
    );
    assert.equal(
      createHash("sha256").update(bytes).digest("hex"),
      asset.sha256,
      `${asset.path}: SHA-256`,
    );
    assert.equal(
      createHash("sha1")
        .update(`blob ${bytes.length}\0`)
        .update(bytes)
        .digest("hex"),
      asset.gitBlob,
      `${asset.path}: Git blob`,
    );
  }
});
