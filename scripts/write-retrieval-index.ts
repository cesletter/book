import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { buildRetrievalIndex } from "../src/lib/retrieval";

const index = buildRetrievalIndex();
const targets = [
  "public/retrieval-index.json",
  "netlify/functions/retrieval-index.json",
];

for (const target of targets) {
  const path = resolve(process.cwd(), target);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(index)}\n`);
}

console.log(`Wrote ${index.chunks.length} retrieval chunks and ${index.references.length} references.`);
