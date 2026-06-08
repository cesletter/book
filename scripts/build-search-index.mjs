import { existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

const dist = resolve(process.cwd(), "dist");

if (!existsSync(dist)) {
  throw new Error("Cannot build Pagefind index because dist/ does not exist.");
}

execFileSync("npx", ["pagefind", "--site", "dist"], { stdio: "inherit" });
