import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const word = "unavailable";

function assertValidWord(text) {
  const chars = [...text].length;
  if (chars < 1 || chars > 24 || text.trim() === "" || /\s/.test(text)) {
    throw new Error(`entry fails the gate: ${chars} chars`);
  }
}

function writeEntryAtomically(outputDir, text) {
  mkdirSync(outputDir, { recursive: true });
  const tmp = join(outputDir, ".entry.txt.tmp");
  writeFileSync(tmp, text, "utf8");
  renameSync(tmp, join(outputDir, "entry.txt"));
}

assertValidWord(word);
writeEntryAtomically(process.env.MAKEFUN_OUTPUT_DIR || "/output", word);
