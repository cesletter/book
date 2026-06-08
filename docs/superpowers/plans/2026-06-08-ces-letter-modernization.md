# CES Letter Modernization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the old VuePress book as a modern Astro site with static search, deterministic retrieval data, and a citation-grounded AI chatbot endpoint.

**Architecture:** Astro owns routing, layout, assets, and static rendering. The existing `docs/**/README.md` files remain the source of truth and are rendered through a tested legacy-content converter that supports VuePress-style components and `markdown-it-attrs`. Retrieval indexing uses the same chapter metadata so chatbot citations point back to rendered pages.

**Tech Stack:** Astro, TypeScript, Markdown-it, Pagefind, Vitest, Netlify Functions, OpenAI-compatible Responses API via `fetch`.

---

## File Structure

- Create `astro.config.mjs`: Astro integration and static build configuration.
- Create `tsconfig.json`: strict TypeScript settings.
- Modify `package.json`: modern scripts and dependencies.
- Modify `netlify.toml`: Astro build output and function settings.
- Create `src/content/chapters.ts`: chapter order and source path metadata.
- Create `src/lib/legacy-renderer.ts`: convert VuePress Markdown/component syntax to HTML.
- Create `src/lib/retrieval.ts`: build and search local retrieval chunks.
- Create `src/pages/index.astro`: render title page.
- Create `src/pages/[...slug].astro`: render chapter routes.
- Create `src/layouts/BookLayout.astro`: shared reader layout, search shell, and chat shell.
- Create `src/styles/global.css`: migrated reader styles and component styles.
- Create `src/components/ChatWidget.astro`: minimal client-side chat UI.
- Create `netlify/functions/chat.ts`: serverless chatbot endpoint.
- Create `scripts/build-search-index.mjs`: run Pagefind after Astro build.
- Create `scripts/write-retrieval-index.ts`: materialize retrieval JSON for deployment.
- Create `tests/legacy-renderer.test.ts`: component rendering coverage.
- Create `tests/retrieval.test.ts`: retrieval and citation coverage.

## Tasks

### Task 1: Modern Package Baseline

**Files:**
- Modify: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Modify: `netlify.toml`

- [ ] Add scripts: `dev`, `build`, `preview`, `test`, `typecheck`, `index:retrieval`, and `postbuild`.
- [ ] Add dependencies for Astro, Markdown-it, Pagefind, Vitest, TypeScript, and Netlify function types.
- [ ] Configure Netlify to run `npm run build` and publish `dist`.
- [ ] Run `npm install`.
- [ ] Run `npm run test` and confirm the test runner starts before tests exist.

### Task 2: Chapter Metadata

**Files:**
- Create: `src/content/chapters.ts`
- Test: `tests/retrieval.test.ts`

- [ ] Write a failing test that verifies the chapter list includes `bom`, `boa`, and `epilogue` in the expected order.
- [ ] Implement `chapters`, `getChapterBySlug`, `getPreviousChapter`, and `getNextChapter`.
- [ ] Run `npm run test -- tests/retrieval.test.ts`.

### Task 3: Legacy Renderer

**Files:**
- Create: `src/lib/legacy-renderer.ts`
- Test: `tests/legacy-renderer.test.ts`

- [ ] Write failing tests for frontmatter removal, `QuoteWithReference`, `ImageWithCaption`, `UpdateBox`, `ScriptureQuote`, `DedicationPage`, and `markdown-it-attrs` headings.
- [ ] Implement component transforms with escaped attributes and inline Markdown rendering.
- [ ] Render remaining Markdown through Markdown-it with HTML enabled.
- [ ] Run `npm run test -- tests/legacy-renderer.test.ts`.

### Task 4: Astro Reader

**Files:**
- Create: `src/layouts/BookLayout.astro`
- Create: `src/pages/index.astro`
- Create: `src/pages/[...slug].astro`
- Create: `src/styles/global.css`

- [ ] Render every chapter from `docs/**/README.md`.
- [ ] Preserve current chapter URLs such as `/bom/` and `/first-vision/`.
- [ ] Add previous and next navigation.
- [ ] Add SEO title, description, canonical URL, and Open Graph image.
- [ ] Run `npm run build`.

### Task 5: Retrieval Index

**Files:**
- Create: `src/lib/retrieval.ts`
- Create: `scripts/write-retrieval-index.ts`
- Test: `tests/retrieval.test.ts`

- [ ] Write failing tests that search for "Book of Abraham" and return a cited chapter result.
- [ ] Extract plain text chunks from rendered chapter content.
- [ ] Extract reference links with chapter and section context.
- [ ] Write `dist/retrieval-index.json` during build.
- [ ] Run `npm run test -- tests/retrieval.test.ts`.

### Task 6: Search and Chat

**Files:**
- Create: `scripts/build-search-index.mjs`
- Create: `src/components/ChatWidget.astro`
- Create: `netlify/functions/chat.ts`
- Modify: `src/layouts/BookLayout.astro`

- [ ] Run Pagefind after Astro build.
- [ ] Add a compact global search input powered by Pagefind.
- [ ] Add a compact chat widget that posts to `/.netlify/functions/chat`.
- [ ] Implement the function so it retrieves local citations first, then calls the configured AI provider only when `OPENAI_API_KEY` is present.
- [ ] Return a citation-backed fallback answer when no API key is configured.
- [ ] Run `npm run build`.

### Task 7: Release Prep

**Files:**
- Modify: `README.md`
- Verify: generated `dist`

- [ ] Document local development, build, retrieval index, and chat environment variables.
- [ ] Run `npm run test`.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run build`.
- [ ] Commit the implementation.
- [ ] Push `codex/ces-letter-modernization`.
- [ ] Open a draft pull request.

## Self-Review

- Spec coverage: static rebuild, search, chatbot, retrieval data, evaluation hooks, and deployment are covered.
- Scope boundary: external source crawling, accounts, saved chats, and admin moderation remain out of first release.
- Implementation choice: the plan keeps Astro but uses a legacy renderer because the current content is not directly valid MDX.
