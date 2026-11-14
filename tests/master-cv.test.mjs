import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

test("website CV matches its master export", () => {
  const metadata = JSON.parse(readFileSync(new URL("../lib/professional-profile.json", import.meta.url), "utf8"));
  const pdf = readFileSync(new URL("../public/files/pdf/ScheiberThomasCV.pdf", import.meta.url));
  assert.equal(createHash("sha256").update(pdf).digest("hex"), metadata.pdfSha256);
  assert.equal(metadata.source, "career-workspace/services/cv");
  for (const privateField of ["phone", "notice", "writing_rules", "work_authorization", "side_job_availability"]) {
    assert.equal(Object.hasOwn(metadata.profile, privateField), false);
  }
});
