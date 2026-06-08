# CES Letter Modernization Design

## Context

The current `read.cesletter.org` source is a VuePress 0.14 static book. Chapter content lives in `docs/**/README.md`, shared UI lives in `docs/.vuepress/components`, images live in `docs/.vuepress/public/images`, and Netlify publishes `docs/.vuepress/dist`.

The rebuild should preserve the book as the primary experience while adding an AI assistant that answers reader questions from the book and its referenced sources.

## Goals

- Rebuild the reader experience on a current, maintainable stack.
- Preserve chapter order, public URLs, image assets, source links, and SEO metadata.
- Support local full-text search without requiring a backend.
- Add an AI chatbot that gives cited answers grounded in the book and references.
- Make content ingestion repeatable so future book edits update both the site and chatbot index.

## Non-Goals

- Do not rewrite the book text as part of the technical migration.
- Do not build user accounts, saved conversations, payments, or admin moderation in the first release.
- Do not let the chatbot answer as an unconstrained general-purpose religion or history assistant.
- Do not replace source references with model-generated summaries.

## Recommended Stack

- Astro for the static site shell and routing.
- MDX for chapter content that needs custom components.
- TypeScript for application, ingestion, and chatbot code.
- Pagefind for static full-text search.
- Netlify or Cloudflare Pages for hosting.
- Serverless functions for chatbot requests.
- A vector store for retrieval, selected during implementation planning.

Astro is the default recommendation because the project is mostly long-form static content. It keeps the reading experience fast and deployable as static assets while still supporting MDX components and targeted serverless functionality for chat.

## Content Model

Chapters should move from VuePress `README.md` files into a typed content collection. Each chapter record should include:

- `slug`
- `title`
- `order`
- `description`
- `canonicalPath`
- `ogImage`
- `body`

The old VuePress custom components should become MDX components with matching semantics:

- `TitlePage`
- `DedicationPage`
- `QuoteWithReference`
- `ScriptureQuote`
- `ImageWithCaption`
- `UpdateBox`
- `BeforeAfterComparison`
- `SideBySideComparisonTable`
- `ComparisonTitle`
- `ComparisonChecks`
- `IndentedQuote`
- `RedTitleBar`

The migration should preserve existing visual intent while simplifying component APIs only where a mechanical conversion can keep the rendered output equivalent.

## Reader Experience

The first release should include:

- Chapter sidebar matching the current order.
- Previous and next chapter navigation.
- Responsive typography for long reading sessions.
- Preserved images and captions.
- Static search.
- Stable canonical URLs and redirects from existing paths.
- SEO metadata equivalent to the current VuePress autometa output.

The interface should prioritize readability over a marketing homepage. The book remains the first screen.

## Chatbot Experience

The chatbot should be available as a reader aid, not as the main site experience. It should:

- Answer questions using retrieved book passages and indexed references.
- Show citations with chapter, section, quote or passage, and source URL when available.
- Prefer short direct answers followed by supporting references.
- Say when the indexed material does not support a confident answer.
- Avoid unsupported theological, medical, legal, or personal advice.
- Avoid inventing source details or claiming a source says something when retrieval did not find it.

The chatbot prompt should explicitly restrict answers to retrieved context and require citation-backed claims.

## Retrieval Data

Build two retrieval corpora:

1. Book chunks
   - Chapter slug
   - Section heading
   - Paragraph or component text
   - Local URL anchor
   - Plain text

2. Reference records
   - Source label from the book
   - Outbound URL
   - Chapter and section where it appears
   - Nearby quote or surrounding paragraph
   - Retrieval text

The ingestion pipeline should be deterministic and run in CI or as a build-adjacent script. It should report counts for chapters, chunks, references, broken source URLs, and unparseable component blocks.

## Chat Architecture Options

### Option A: Managed Retrieval

Use a managed vector service such as OpenAI File Search.

- Lowest infrastructure burden.
- Fastest path to a working chatbot.
- Less control over chunking internals, retrieval analytics, and long-term portability.

### Option B: Owned Retrieval

Use Supabase Postgres with pgvector or a similar owned vector database.

- Better control over chunk metadata, ranking, evaluation, and audit logs.
- Better fit if chatbot quality and analytics become product-critical.
- More setup and operational responsibility.

### Option C: Hybrid

Start with managed retrieval, keep the ingestion output provider-neutral, and move to owned retrieval if quality, analytics, or cost require it.

- Best first implementation path.
- Keeps early scope small while preserving future flexibility.
- Requires discipline around an internal retrieval interface.

The recommended path is Option C.

## Evaluation

Before public launch, create an evaluation set of 30 to 50 real reader questions. Each case should define:

- User question
- Expected chapter or source references
- Minimum acceptable answer
- Examples of unacceptable unsupported claims

The evaluation should test:

- Citation accuracy
- Refusal when context is missing
- Multi-chapter questions
- Source-link questions
- Sensitive or emotionally loaded wording
- Questions that try to pull the assistant outside the indexed material

## Migration Phases

1. Inventory
   - Catalog routes, chapter order, assets, custom component usage, links, and metadata.

2. Static Rebuild
   - Create the Astro project structure.
   - Convert Markdown to MDX.
   - Port custom components.
   - Match existing routes and visual behavior.

3. Search
   - Add Pagefind after the static build.
   - Verify chapter and section search quality.

4. Ingestion
   - Parse chapters into normalized book chunks and reference records.
   - Produce a provider-neutral JSONL or database-ready output.

5. Chatbot
   - Add a serverless chat endpoint.
   - Add a compact chat UI.
   - Stream answers with citations.

6. Evaluation and Release
   - Run the evaluation set.
   - Verify redirects, SEO metadata, image rendering, and source-link health.
   - Deploy behind a preview URL before switching production traffic.

## Open Decisions

- Hosting target: keep Netlify or move to Cloudflare Pages.
- Vector provider: managed first or Supabase first.
- Whether source URLs should be crawled and indexed, or only indexed from the book's existing source labels and surrounding context.
- Whether the chat UI should appear globally, chapter-scoped, or both.
- Whether the first release should preserve the current visual design closely or introduce a refreshed reader design.

## Success Criteria

- The rebuilt site renders all chapters, custom content blocks, and images.
- Existing chapter URLs continue to work.
- Static search finds relevant sections across the full book.
- The chatbot answers from indexed material and displays citations.
- The chatbot refuses or qualifies answers when support is missing.
- Build, typecheck, ingestion, and chatbot evaluation run locally and in CI.
