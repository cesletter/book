module.exports = {
  title: "CES Letter",
  description:
    "CES Letter is one Latter-Day Saint's honest quest to get official answers from the LDS Church on its troubling origins, history, and practices. Jeremy Runnells was offered an opportunity to discuss his own doubts with a director of the Church Educational System (CES) and was assured that his doubts could be resolved. After reading Jeremy's letter, the director promised him a response. No response ever came.",
  themeConfig: {
    nav: [
      { text: "Home", link: "https://cesletter.org/" },
      {
        text: "Debunking",
        link: "https://cesletter.org/debunking-fairmormon/"
      },
      {
        text: "Donate",
        link: "https://cesletter.org/debunking-fairmormon/#donate"
      }
    ],
    sidebar: [
      ["/", "Title Page"],
      "/dedication/",
      "/introduction/",
      "/bom/",
      "/bom-translation/",
      "/first-vision/",
      "/boa/",
      "/polygamy/",
      "/prophets/",
      "/kinderhook/",
      "/testimony/",
      "/priesthood/",
      "/witnesses/",
      "/temples/",
      "/science/",
      "/other/",
      "/conclusion/",
      "/sources/",
      "/epilogue/"
    ],
    repo: "cesletter/book",
    repoLabel: "Contribute!",
    editLinks: true
  },
  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    "/": {
      lang: "en-US", // this will be set as the lang attribute on <html>
      title: "CES Letter",
      description:
        "CES Letter is one Latter-Day Saint's honest quest to get official answers from the LDS Church on its troubling origins, history, and practices. Jeremy Runnells was offered an opportunity to discuss his own doubts with a director of the Church Educational System (CES) and was assured that his doubts could be resolved. After reading Jeremy's letter, the director promised him a response. No response ever came."
    }
  }
};
