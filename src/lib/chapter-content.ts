import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Chapter } from "../content/chapters";
import { extractFrontmatterTitle, renderLegacyMarkdown } from "./legacy-renderer";

export type RenderedChapter = Chapter & {
  html: string;
  pageTitle: string;
  description: string;
  ogImage: string;
};

const defaultDescription =
  "CES Letter is one Latter-day Saint's honest quest to get official answers from the LDS Church on its troubling origins, history, and practices.";

/** Loads and renders a chapter from the legacy Markdown source files. */
export function loadRenderedChapter(chapter: Chapter): RenderedChapter {
  const source = readFileSync(resolve(process.cwd(), chapter.sourcePath), "utf8");
  const pageTitle = extractFrontmatterTitle(source) ?? chapter.title;

  return {
    ...chapter,
    html: renderLegacyMarkdown(source),
    pageTitle,
    description: defaultDescription,
    ogImage: "https://read.cesletter.org/images/clf-og.png",
  };
}
