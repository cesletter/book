import MarkdownIt from "markdown-it";

type Attributes = Record<string, string>;

const markdown = new MarkdownIt({
  breaks: true,
  html: true,
  linkify: false,
});

const componentNames = [
  "BeforeAfterComparison",
  "ComparisonChecks",
  "ComparisonTitle",
  "DedicationPage",
  "ImageWithCaption",
  "IndentedQuote",
  "QuoteWithReference",
  "RedTitleBar",
  "ScriptureQuote",
  "SideBySideComparisonTable",
  "TitlePage",
  "UpdateBox",
];

/** Extracts the VuePress frontmatter title from a chapter source string. */
export function extractFrontmatterTitle(source: string): string | undefined {
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---/);
  const title = frontmatter?.[1].match(/^title:\s*(.+)$/m)?.[1].trim();
  return title?.replace(/^["']|["']$/g, "");
}

/** Converts legacy VuePress Markdown into trusted HTML for the Astro reader. */
export function renderLegacyMarkdown(source: string): string {
  const withoutFrontmatter = stripFrontmatter(source);
  const withBlockClasses = transformBlockClasses(withoutFrontmatter);
  const withComponents = transformComponents(withBlockClasses);
  return markdown.render(withComponents);
}

/** Converts trusted legacy Markdown into plain text for retrieval indexing. */
export function legacyMarkdownToText(source: string): string {
  return renderLegacyMarkdown(source)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripFrontmatter(source: string): string {
  return source.replace(/^---\n[\s\S]*?\n---\n?/, "");
}

function transformBlockClasses(source: string): string {
  return source
    .replace(/^(#{1,6})\s+(.+?)\s+\{\.\"?([^"}]+)\"?\}\s*$/gm, (_match, hashes: string, label: string, className: string) => {
      const level = hashes.length;
      return `\n<h${level} class="${escapeHtml(className)}">${markdown.renderInline(label.trim())}</h${level}>\n`;
    })
    .replace(/^([^#<\n].+?)\s+\{\.\"?([^"}]+)\"?\}\s*$/gm, (_match, label: string, className: string) => {
      return `\n<p class="${escapeHtml(className)}">${markdown.renderInline(label.trim())}</p>\n`;
    });
}

function transformComponents(source: string): string {
  let output = source;

  for (const name of componentNames) {
    output = output.replace(new RegExp(`<${name}\\s*([\\s\\S]*?)\\/>`, "g"), (_match, rawAttributes: string) =>
      renderComponent(name, parseAttributes(rawAttributes)),
    );
  }

  return output;
}

function parseAttributes(raw: string): Attributes {
  const attributes: Attributes = {};
  const pattern = /([\w-]+)="([\s\S]*?)"/g;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(raw)) !== null) {
    attributes[match[1]] = match[2].trim();
  }

  return attributes;
}

function renderComponent(name: string, attributes: Attributes): string {
  switch (name) {
    case "BeforeAfterComparison":
      return `<div class="before-after-comparison"><q>${inline(attributes.before)}</q><em>to</em><q>${inline(attributes.after)}</q></div>`;
    case "ComparisonChecks":
      return `<tr class="comparison-checks"><td>&#10004;${extra(attributes.leftText)}</td><td>&#10004;${extra(attributes.rightText)}</td></tr>`;
    case "ComparisonTitle":
      return `<tr class="title"><td colspan="2">${escapeHtml(attributes.label ?? "")}</td></tr>`;
    case "DedicationPage":
      return `<section class="dedication-page"><p>${escapeHtml(attributes.line1 ?? "")}<br>${escapeHtml(attributes.line2 ?? "")}</p></section>`;
    case "ImageWithCaption":
      return renderImageWithCaption(attributes);
    case "IndentedQuote":
      return renderIndentedQuote(attributes);
    case "QuoteWithReference":
      return renderQuoteWithReference(attributes);
    case "RedTitleBar":
      return `<section class="red-title-bar"><div class="title">${escapeHtml(attributes.title ?? "")}</div>${attributes.subtitle ? `<div class="subtitle">${escapeHtml(attributes.subtitle)}</div>` : ""}</section>`;
    case "ScriptureQuote":
      return renderScriptureQuote(attributes);
    case "SideBySideComparisonTable":
      return renderSideBySideComparisonTable(attributes);
    case "TitlePage":
      return `<section class="title-page"><h1>${escapeHtml(attributes.title ?? "")}</h1><h3>${escapeHtml(attributes.subtitle ?? "")}</h3><div class="author">${escapeHtml(attributes.author ?? "")}</div><div class="dates">${escapeHtml(attributes.dates ?? "")}</div></section>`;
    case "UpdateBox":
      return `<div class="update-box"><strong>UPDATE:</strong> ${inline(attributes.content)}</div>`;
    default:
      return "";
  }
}

function renderImageWithCaption(attributes: Attributes): string {
  return `<figure class="image-with-caption">
${attributes.title ? `<figcaption class="title">${escapeHtml(attributes.title)}</figcaption>` : ""}
${attributes.above ? `<div class="above">${inline(attributes.above)}</div>` : ""}
<img src="${escapeHtml(attributes.src ?? "")}" alt="${escapeHtml(attributes.title ?? attributes.bottomTitle ?? "")}">
${attributes.bottomTitle ? `<figcaption class="title">${escapeHtml(attributes.bottomTitle)}</figcaption>` : ""}
${attributes.below ? `<figcaption class="below">${inline(attributes.below)}</figcaption>` : ""}
</figure>`;
}

function renderIndentedQuote(attributes: Attributes): string {
  const reference = attributes.reference
    ? linkOrText(attributes.reference, attributes.referenceLink, "reference")
    : "";
  const speaker = attributes.speaker ? `<strong class="speaker-name">${escapeHtml(attributes.speaker)}:</strong>` : "";
  const className = attributes.className ? ` ${escapeHtml(attributes.className)}` : "";
  const footer = attributes.attribution || attributes.source
    ? `<footer>&mdash; ${escapeHtml(attributes.attribution ?? "")}${attributes.attribution && attributes.source ? ", " : ""}${linkOrText(attributes.source, attributes.link, "italic")}</footer>`
    : "";

  return `<div class="indented-quote">
${reference}
${attributes.aboveQuote ? `<div class="above-quote">${inline(attributes.aboveQuote)}</div>` : ""}
${speaker}<q class="${className.trim()}">${inline(attributes.quote)}</q>
${attributes.belowQuote ? `<div class="below-quote">${inline(attributes.belowQuote)}</div>` : ""}
${footer}
</div>`;
}

function renderQuoteWithReference(attributes: Attributes): string {
  const source = linkOrText(attributes.source, attributes.link, "italic");
  const source2 = linkOrText(attributes.source2, attributes.link2, "italic");
  const footerParts = [
    attributes.attribution ? escapeHtml(attributes.attribution) : "",
    source,
    source2,
  ].filter(Boolean);

  return `<blockquote class="quote-with-reference"><p>${inline(attributes.quote)}</p>${footerParts.length ? `<footer>&mdash; ${footerParts.join(", ")}</footer>` : ""}</blockquote>`;
}

function renderScriptureQuote(attributes: Attributes): string {
  return `<div class="scripture-quote">
${linkOrText(attributes.reference, attributes.link, "reference")}
${attributes.description ? `<div class="description">${escapeHtml(attributes.description)}</div>` : ""}
<div class="scripture">${inline(attributes.quote)}</div>
</div>`;
}

function renderSideBySideComparisonTable(attributes: Attributes): string {
  const leftItems = (attributes.leftItems ?? "").split("|");
  const rightItems = (attributes.rightItems ?? "").split("|");
  const rows = leftItems
    .map((left, index) => `<tr><td>${escapeHtml(left.trim())}</td><td>${escapeHtml((rightItems[index] ?? "").trim())}</td></tr>`)
    .join("");

  return `<section class="side-by-side-comparison-table"><table><thead><tr><th>${escapeHtml(attributes.leftTitle ?? "")}</th><th>${escapeHtml(attributes.rightTitle ?? "")}</th></tr></thead><tbody>${rows}</tbody></table></section>`;
}

function linkOrText(label: string | undefined, href: string | undefined, className: string): string {
  if (!label) {
    return "";
  }

  if (!href) {
    return `<span class="${className}">${escapeHtml(label)}</span>`;
  }

  return `<a class="${className}" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`;
}

function extra(value: string | undefined): string {
  return value ? `<div class="extra">${inline(value)}</div>` : "";
}

function inline(value: string | undefined): string {
  return value ? markdown.renderInline(value).replace(/\n/g, "<br>") : "";
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
