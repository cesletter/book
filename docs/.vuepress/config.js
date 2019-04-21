const autometa_options = {
  site: {
    name: "CES Letter",
    twitter: "cesletter"
  },
  author: {
    name: "Jeremy Runnels"
  },
  canonical_base: "https://read.cesletter.org"
};

module.exports = {
  title: "CES Letter",
  description:
    "CES Letter is one Latter-Day Saint's honest quest to get official answers from the LDS Church on its troubling origins, history, and practices. Jeremy Runnells was offered an opportunity to discuss his own doubts with a director of the Church Educational System (CES) and was assured that his doubts could be resolved. After reading Jeremy's letter, the director promised him a response. No response ever came.",
  ga: "UA-44595227-2",
  themeConfig: {
    domain: "https://read.cesletter.org",
    nav: [{ text: "Home", link: "https://cesletter.org/" }],
    sidebarDepth: 2,
    sidebar: [
      ["/", "Title Page"],
      ["/preface/", "Preface"],
      ["/dedication/", "Dedication"],
      ["/introduction/", "Introduction"],
      ["/bom/", "Book of Mormon"],
      ["/bom-translation/", "Book of Mormon Translation"],
      ["/first-vision/", "First Vision"],
      ["/boa/", "Book of Abraham"],
      ["/polygamy/", "Polygamy | Polyandry"],
      ["/prophets/", "Prophets"],
      ["/kinderhook/", "Kinderhook Plates & Translator Claims"],
      ["/testimony/", "Testimony & Spiritual Witness"],
      ["/priesthood/", "Priesthood Restoration"],
      ["/witnesses/", "Witnesses"],
      ["/temples/", "Temples & Freemasonry"],
      ["/science/", "Science"],
      ["/other/", "Other"],
      ["/conclusion/", "Conclusion"],
      ["/epilogue/", "Epilogue"]
    ],
    repo: "cesletter/book",
    docsRepo: "cesletter/book",
    repoLabel: "GitHub",
    editLinks: false,
    editLinkText: "Help us improve this page!",
    author: "Jeremy Runnels"
  },
  plugins: [["autometa", autometa_options]],
  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    "/": {
      lang: "en-US", // this will be set as the lang attribute on <html>
      title: "CES Letter",
      description:
        "CES Letter is one Latter-Day Saint's honest quest to get official answers from the LDS Church on its troubling origins, history, and practices. Jeremy Runnells was offered an opportunity to discuss his own doubts with a director of the Church Educational System (CES) and was assured that his doubts could be resolved. After reading Jeremy's letter, the director promised him a response. No response ever came."
    }
  },
  serviceWorker: true,
  markdown: {
    config: md => {
      md.use(require("markdown-it-attrs"));
    }
  }
};
