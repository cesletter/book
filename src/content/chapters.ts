export type Chapter = {
  slug: string;
  title: string;
  sourcePath: string;
  path: string;
};

export const chapters: Chapter[] = [
  { slug: "", title: "Title Page", sourcePath: "docs/README.md", path: "/" },
  { slug: "preface", title: "Preface", sourcePath: "docs/preface/README.md", path: "/preface/" },
  { slug: "dedication", title: "Dedication", sourcePath: "docs/dedication/README.md", path: "/dedication/" },
  { slug: "introduction", title: "Introduction", sourcePath: "docs/introduction/README.md", path: "/introduction/" },
  { slug: "bom", title: "Book of Mormon", sourcePath: "docs/bom/README.md", path: "/bom/" },
  { slug: "bom-translation", title: "Book of Mormon Translation", sourcePath: "docs/bom-translation/README.md", path: "/bom-translation/" },
  { slug: "first-vision", title: "First Vision", sourcePath: "docs/first-vision/README.md", path: "/first-vision/" },
  { slug: "boa", title: "Book of Abraham", sourcePath: "docs/boa/README.md", path: "/boa/" },
  { slug: "polygamy", title: "Polygamy | Polyandry", sourcePath: "docs/polygamy/README.md", path: "/polygamy/" },
  { slug: "prophets", title: "Prophets", sourcePath: "docs/prophets/README.md", path: "/prophets/" },
  { slug: "kinderhook", title: "Kinderhook Plates & Translator Claims", sourcePath: "docs/kinderhook/README.md", path: "/kinderhook/" },
  { slug: "testimony", title: "Testimony & Spiritual Witness", sourcePath: "docs/testimony/README.md", path: "/testimony/" },
  { slug: "priesthood", title: "Priesthood Restoration", sourcePath: "docs/priesthood/README.md", path: "/priesthood/" },
  { slug: "witnesses", title: "Witnesses", sourcePath: "docs/witnesses/README.md", path: "/witnesses/" },
  { slug: "temples", title: "Temples & Freemasonry", sourcePath: "docs/temples/README.md", path: "/temples/" },
  { slug: "science", title: "Science", sourcePath: "docs/science/README.md", path: "/science/" },
  { slug: "other", title: "Other", sourcePath: "docs/other/README.md", path: "/other/" },
  { slug: "conclusion", title: "Conclusion", sourcePath: "docs/conclusion/README.md", path: "/conclusion/" },
  { slug: "epilogue", title: "Epilogue", sourcePath: "docs/epilogue/README.md", path: "/epilogue/" },
];

/** Returns the configured chapter for a URL slug. */
export function getChapterBySlug(slug: string): Chapter | undefined {
  return chapters.find((chapter) => chapter.slug === slug);
}

/** Returns the chapter before the supplied slug in book order. */
export function getPreviousChapter(slug: string): Chapter | undefined {
  const index = chapters.findIndex((chapter) => chapter.slug === slug);
  return index > 0 ? chapters[index - 1] : undefined;
}

/** Returns the chapter after the supplied slug in book order. */
export function getNextChapter(slug: string): Chapter | undefined {
  const index = chapters.findIndex((chapter) => chapter.slug === slug);
  return index >= 0 && index < chapters.length - 1 ? chapters[index + 1] : undefined;
}
