import { describe, expect, it } from "vitest";
import { extractFrontmatterTitle, renderLegacyMarkdown } from "../src/lib/legacy-renderer";

describe("legacy renderer", () => {
  it("removes frontmatter and extracts the title", () => {
    const source = `---\ntitle: Book of Mormon\n---\n\n## DNA`;

    expect(extractFrontmatterTitle(source)).toBe("Book of Mormon");
    expect(renderLegacyMarkdown(source)).not.toContain("title: Book of Mormon");
    expect(renderLegacyMarkdown(source)).toContain("<h2>DNA</h2>");
  });

  it("renders quote components with references", () => {
    const html = renderLegacyMarkdown(`<QuoteWithReference
  quote="A [linked claim](https://example.com)"
  attribution="A Person"
  source="A Source"
  link="https://source.example"
/>`);

    expect(html).toContain('class="quote-with-reference"');
    expect(html).toContain('<a href="https://example.com">linked claim</a>');
    expect(html).toContain('href="https://source.example"');
  });

  it("renders media and update components", () => {
    const html = renderLegacyMarkdown(`<ImageWithCaption src="/images/example.jpg" below="A [caption](https://example.com)" />

<UpdateBox content="A [source](https://example.com)" />`);

    expect(html).toContain('<figure class="image-with-caption">');
    expect(html).toContain('src="/images/example.jpg"');
    expect(html).toContain('<div class="update-box">');
  });

  it("renders scripture and dedication components", () => {
    const html = renderLegacyMarkdown(`<DedicationPage line1="Line one" line2="Line two" />

<ScriptureQuote reference="ISAIAH 9:1" quote="A **bold** passage" />`);

    expect(html).toContain('class="dedication-page"');
    expect(html).toContain("Line one");
    expect(html).toContain('class="scripture-quote"');
    expect(html).toContain("<strong>bold</strong>");
  });

  it("supports VuePress markdown-it-attrs heading classes", () => {
    const html = renderLegacyMarkdown('#### A HEADING {."spaced-title text-red"}');

    expect(html).toContain('<h4 class="spaced-title text-red">A HEADING</h4>');
  });
});
