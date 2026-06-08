# CES Letter

[![Netlify Status](https://api.netlify.com/api/v1/badges/50a75ee3-4bc9-4f17-85ba-5f7ae2624a38/deploy-status)](https://app.netlify.com/sites/cesletter/deploys)

CES Letter is one Latter-day Saint's honest quest to get official answers from the LDS Church on its troubling origins, history and practices. Jeremy Runnells was offered an opportunity to discuss his own doubts with a director of the Church Educational System (CES) and was assured that his doubts could be resolved. After reading Jeremy's letter, the director promised him a response.

No response ever came.

## Development

Install dependencies:

```bash
npm install
```

Run the local Astro site:

```bash
npm run dev
```

Run tests:

```bash
npm run test
```

Build the static reader, retrieval index, and Pagefind search index:

```bash
npm run build
```

## AI Chat

The chat UI posts to `/.netlify/functions/chat`. The function always retrieves local citations from the generated book index first.

Set these environment variables in Netlify to enable generated answers:

```bash
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-4o-mini
```

If `OPENAI_API_KEY` is not set, the function returns the strongest cited excerpts without generating an AI response.
