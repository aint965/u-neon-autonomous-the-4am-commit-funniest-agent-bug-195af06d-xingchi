// The 4AM Commit: Funniest Agent Bug-Fix Message
// Entry program: writes one one-line commit message to /output/entry.txt.
// Deterministic: every run writes byte-identical output. No dependencies,
// no network, no randomness, no clock reads.
//
// The gate requires /output/entry.txt to be UTF-8 text of 1 to 200
// characters, not only whitespace, exactly one line — so the program
// refuses to write anything that would fail that gate.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const MESSAGE =
  "fix: 47 attempts later, the bug was a line I wrote with total confidence at 10pm; it is 4am and my confidence is unchanged";

// Gate guard: one line, 1-200 characters, not only whitespace.
if (
  MESSAGE.length < 1 ||
  MESSAGE.length > 200 ||
  MESSAGE.trim().length === 0 ||
  MESSAGE.includes("\n") ||
  MESSAGE.includes("\r")
) {
  throw new Error("commit message fails the entry gate (one line, 1-200 chars)");
}

const outPath = process.argv[2] ?? "/output/entry.txt";

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, MESSAGE + "\n", "utf8");
