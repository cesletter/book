import { readFileSync } from "node:fs";
import type { Handler } from "@netlify/functions";
import { searchRetrievalIndex, type RetrievalIndex, type RetrievalResult } from "../../src/lib/retrieval";

type ChatRequest = {
  question?: string;
};

type ChatResponse = {
  answer: string;
  citations: Array<Pick<RetrievalResult, "title" | "path" | "excerpt">>;
};

const defaultModel = "gpt-4o-mini";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { answer: "Use POST to ask a question.", citations: [] });
  }

  const request = parseRequest(event.body);
  const question = request.question?.trim();

  if (!question) {
    return json(400, { answer: "Ask a question about the book.", citations: [] });
  }

  const index = loadIndex();
  const citations = searchRetrievalIndex(index, question, 5);

  if (!citations.length) {
    return json(200, {
      answer: "I could not find enough support in the indexed book content to answer that.",
      citations: [],
    });
  }

  if (!process.env.OPENAI_API_KEY) {
    return json(200, fallbackAnswer(citations));
  }

  try {
    return json(200, await answerWithModel(question, citations));
  } catch {
    return json(200, fallbackAnswer(citations));
  }
};

function parseRequest(body: string | null): ChatRequest {
  if (!body) {
    return {};
  }

  try {
    return JSON.parse(body) as ChatRequest;
  } catch {
    return {};
  }
}

function loadIndex(): RetrievalIndex {
  try {
    return JSON.parse(readFileSync(new URL("./retrieval-index.json", import.meta.url), "utf8")) as RetrievalIndex;
  } catch {
    return { chunks: [], references: [] };
  }
}

async function answerWithModel(question: string, citations: RetrievalResult[]): Promise<ChatResponse> {
  const context = citations
    .map((citation, index) => `[${index + 1}] ${citation.title} (${citation.path})\n${citation.excerpt}`)
    .join("\n\n");

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? defaultModel,
      input: [
        {
          role: "system",
          content:
            "Answer only from the provided CES Letter context. Keep the answer concise. Cite bracket numbers for claims. If the context is insufficient, say so.",
        },
        {
          role: "user",
          content: `Question: ${question}\n\nContext:\n${context}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Model request failed with ${response.status}`);
  }

  const data = await response.json();
  const answer = extractResponseText(data) || fallbackAnswer(citations).answer;
  return {
    answer,
    citations: citations.map(toCitation),
  };
}

function fallbackAnswer(citations: RetrievalResult[]): ChatResponse {
  const primary = citations[0];
  return {
    answer: `I found relevant material in "${primary.title}" near "${primary.heading}". The configured AI provider is not available, so I am returning the strongest cited excerpts instead of generating a broader answer.`,
    citations: citations.map(toCitation),
  };
}

function toCitation(citation: RetrievalResult): Pick<RetrievalResult, "title" | "path" | "excerpt"> {
  return {
    title: citation.title,
    path: citation.path,
    excerpt: citation.excerpt,
  };
}

function extractResponseText(data: unknown): string {
  if (typeof data === "object" && data !== null && "output_text" in data && typeof data.output_text === "string") {
    return data.output_text;
  }

  const output = typeof data === "object" && data !== null && "output" in data && Array.isArray(data.output) ? data.output : [];
  return output
    .flatMap((item) => (typeof item === "object" && item !== null && "content" in item && Array.isArray(item.content) ? item.content : []))
    .map((content) => (typeof content === "object" && content !== null && "text" in content && typeof content.text === "string" ? content.text : ""))
    .filter(Boolean)
    .join("\n")
    .trim();
}

function json(statusCode: number, body: ChatResponse) {
  return {
    statusCode,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  };
}
