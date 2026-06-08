import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { chapters } from "../content/chapters";
import { legacyMarkdownToText } from "./legacy-renderer";

export type RetrievalChunk = {
  id: string;
  slug: string;
  title: string;
  path: string;
  heading: string;
  text: string;
};

export type ReferenceRecord = {
  slug: string;
  title: string;
  path: string;
  heading: string;
  label: string;
  href: string;
};

export type RetrievalIndex = {
  chunks: RetrievalChunk[];
  references: ReferenceRecord[];
};

export type RetrievalResult = RetrievalChunk & {
  score: number;
  excerpt: string;
};

const stopWords = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "in",
  "is",
  "it",
  "of",
  "on",
  "or",
  "the",
  "to",
  "was",
  "what",
  "with",
]);

/** Builds a retrieval index from the configured legacy chapter sources. */
export function buildRetrievalIndex(): RetrievalIndex {
  return chapters.reduce<RetrievalIndex>(
    (index, chapter) => {
      const source = readFileSync(resolve(process.cwd(), chapter.sourcePath), "utf8");
      const sections = splitSections(source);

      for (const [sectionIndex, section] of sections.entries()) {
        const text = legacyMarkdownToText(section.body);
        if (text.length > 80) {
          index.chunks.push({
            id: `${chapter.slug || "index"}-${sectionIndex}`,
            slug: chapter.slug,
            title: chapter.title,
            path: section.headingId ? `${chapter.path}#${section.headingId}` : chapter.path,
            heading: section.heading,
            text,
          });
        }

        index.references.push(
          ...extractReferences(section.body).map((reference) => ({
            ...reference,
            slug: chapter.slug,
            title: chapter.title,
            path: section.headingId ? `${chapter.path}#${section.headingId}` : chapter.path,
            heading: section.heading,
          })),
        );
      }

      return index;
    },
    { chunks: [], references: [] },
  );
}

/** Searches retrieval chunks with deterministic token overlap scoring. */
export function searchRetrievalIndex(index: RetrievalIndex, query: string, limit = 5): RetrievalResult[] {
  const queryTokens = tokenize(query);
  if (!queryTokens.length) {
    return [];
  }

  return index.chunks
    .map((chunk) => {
      const titleTokens = tokenize(chunk.title);
      const headingTokens = tokenize(chunk.heading);
      const textTokens = tokenize(chunk.text);
      const score = queryTokens.reduce(
        (total, token) =>
          total +
          titleTokens.filter((value) => value === token).length * 10 +
          headingTokens.filter((value) => value === token).length * 4 +
          textTokens.filter((value) => value === token).length,
        0,
      );
      const normalizedQuery = query.toLowerCase();
      return {
        ...chunk,
        score: score + (normalizedQuery.includes(chunk.title.toLowerCase()) ? 30 : 0),
        excerpt: excerptFor(chunk.text, queryTokens),
      };
    })
    .filter((result) => result.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit);
}

function splitSections(source: string): Array<{ heading: string; headingId: string; body: string }> {
  const withoutFrontmatter = source.replace(/^---\n[\s\S]*?\n---\n?/, "");
  const lines = withoutFrontmatter.split("\n");
  const sections: Array<{ heading: string; headingId: string; body: string[] }> = [
    { heading: "Overview", headingId: "", body: [] },
  ];

  for (const line of lines) {
    const heading = line.match(/^#{2,3}\s+(.+?)(?:\s+\{[^}]+\})?\s*$/);
    if (heading) {
      const label = heading[1].replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim();
      sections.push({ heading: label, headingId: slugify(label), body: [line] });
    } else {
      sections[sections.length - 1].body.push(line);
    }
  }

  return sections.map((section) => ({
    heading: section.heading,
    headingId: section.headingId,
    body: section.body.join("\n"),
  }));
}

function extractReferences(source: string): Array<{ label: string; href: string }> {
  const references: Array<{ label: string; href: string }> = [];
  const markdownLink = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  const htmlLink = /<a\s+[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/g;
  const componentLink = /(?:source|reference|label)=["']([^"']+)["'][\s\S]{0,240}?link=["'](https?:\/\/[^"']+)["']/g;

  collect(markdownLink, source, references, 1, 2);
  collect(htmlLink, source, references, 2, 1);
  collect(componentLink, source, references, 1, 2);

  return references;
}

function collect(pattern: RegExp, source: string, references: Array<{ label: string; href: string }>, labelIndex: number, hrefIndex: number): void {
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(source)) !== null) {
    references.push({
      label: stripTags(match[labelIndex]).trim(),
      href: match[hrefIndex].trim(),
    });
  }
}

function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 1 && !stopWords.has(token));
}

function excerptFor(text: string, tokens: string): string;
function excerptFor(text: string, tokens: string[]): string;
function excerptFor(text: string, tokens: string | string[]): string {
  const queryTokens = Array.isArray(tokens) ? tokens : tokenize(tokens);
  const lower = text.toLowerCase();
  const firstMatch = queryTokens.map((token) => lower.indexOf(token)).filter((index) => index >= 0).sort((a, b) => a - b)[0] ?? 0;
  const start = Math.max(0, firstMatch - 120);
  const excerpt = text.slice(start, start + 320).trim();
  return `${start > 0 ? "..." : ""}${excerpt}${start + 320 < text.length ? "..." : ""}`;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function stripTags(value: string): string {
  return value.replace(/<[^>]+>/g, "").replace(/\s+/g, " ");
}
