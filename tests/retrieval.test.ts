import { describe, expect, it } from "vitest";
import { chapters, getChapterBySlug, getNextChapter, getPreviousChapter } from "../src/content/chapters";
import { buildRetrievalIndex, searchRetrievalIndex } from "../src/lib/retrieval";

describe("chapter metadata", () => {
  it("keeps the current book order for core chapters", () => {
    const slugs = chapters.map((chapter) => chapter.slug);

    expect(slugs.indexOf("bom")).toBeLessThan(slugs.indexOf("boa"));
    expect(slugs.indexOf("boa")).toBeLessThan(slugs.indexOf("epilogue"));
  });

  it("looks up chapters and adjacent navigation", () => {
    expect(getChapterBySlug("bom")?.title).toBe("Book of Mormon");
    expect(getPreviousChapter("bom")?.slug).toBe("introduction");
    expect(getNextChapter("bom")?.slug).toBe("bom-translation");
  });
});

describe("retrieval index", () => {
  it("builds chunks and reference records from the real chapters", () => {
    const index = buildRetrievalIndex();

    expect(index.chunks.length).toBeGreaterThan(30);
    expect(index.references.some((reference) => reference.href.includes("cesletter.org/boa"))).toBe(true);
  });

  it("returns cited chapter results for relevant queries", () => {
    const index = buildRetrievalIndex();
    const results = searchRetrievalIndex(index, "Book of Abraham papyrus", 3);
    const naturalResults = searchRetrievalIndex(index, "What does the book say about the Book of Abraham papyrus?", 3);

    expect(results[0]?.slug).toBe("boa");
    expect(naturalResults[0]?.slug).toBe("boa");
    expect(results[0]?.title).toBe("Book of Abraham");
    expect(results[0]?.path.startsWith("/boa/")).toBe(true);
    expect(results[0]?.excerpt.length).toBeGreaterThan(40);
  });
});
