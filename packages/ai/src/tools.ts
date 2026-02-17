/**
 * AI Tool Definitions — shared tool schemas for Vercel AI SDK + LangGraph.
 *
 * These tool definitions work with both:
 * - Vercel AI SDK v4 `tool()` in Next.js API routes
 * - LangGraph tool nodes in the Python backend
 *
 * The schemas are defined in Zod and can be converted to JSON Schema
 * for cross-language compatibility.
 *
 * @example
 * ```ts
 * import { openai } from '@ai-sdk/openai';
 * import { generateText } from 'ai';
 * import { createToolSet } from '@aiforge/ai/tools';
 *
 * const tools = createToolSet(['search', 'calculator', 'datetime']);
 * const { text } = await generateText({
 *   model: openai('gpt-4o'),
 *   tools,
 *   prompt: 'What is 42 * 7?',
 * });
 * ```
 */
import { z } from 'zod';
import { tool } from 'ai';

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: z.ZodSchema;
  execute: (args: unknown) => Promise<unknown>;
}

/** Web search tool — searches the internet for current information. */
const searchTool = tool({
  description: 'Search the web for current information on a topic.',
  parameters: z.object({
    query: z.string().describe('The search query'),
    maxResults: z.number().min(1).max(10).default(5).describe('Maximum results to return'),
  }),
  execute: async ({ query, maxResults }) => {
    // Integrate with your preferred search API (Tavily, Serper, etc.)
    return {
      results: [
        {
          title: `Search result for: ${query}`,
          snippet: 'Integrate a search API (Tavily, Serper, Brave) to enable live web search.',
          url: 'https://docs.tavily.com',
        },
      ],
      query,
      maxResults,
    };
  },
});

/** Calculator tool — performs mathematical calculations. */
const calculatorTool = tool({
  description: 'Perform mathematical calculations. Supports basic arithmetic and common functions.',
  parameters: z.object({
    expression: z.string().describe('Mathematical expression to evaluate (e.g., "42 * 7")'),
  }),
  execute: async ({ expression }) => {
    try {
      // Safe math evaluation (replace with mathjs for production)
      const sanitized = expression.replace(/[^0-9+\-*/().%\s]/g, '');
      const result = new Function(`return ${sanitized}`)();
      return { expression, result: Number(result), error: null };
    } catch {
      return { expression, result: null, error: 'Invalid expression' };
    }
  },
});

/** DateTime tool — gets current date/time information. */
const datetimeTool = tool({
  description: 'Get the current date and time, or perform date calculations.',
  parameters: z.object({
    timezone: z.string().default('UTC').describe('IANA timezone (e.g., "America/New_York")'),
    format: z.enum(['iso', 'human', 'unix']).default('human').describe('Output format'),
  }),
  execute: async ({ timezone, format }) => {
    const now = new Date();
    const formatted = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      dateStyle: 'full',
      timeStyle: 'long',
    }).format(now);

    switch (format) {
      case 'iso':
        return { datetime: now.toISOString(), timezone };
      case 'unix':
        return { datetime: Math.floor(now.getTime() / 1000), timezone };
      default:
        return { datetime: formatted, timezone };
    }
  },
});

/** Knowledge base search tool — queries Supabase pgvector. */
const knowledgeBaseTool = tool({
  description: 'Search the knowledge base for relevant documents and information.',
  parameters: z.object({
    query: z.string().describe('The search query for the knowledge base'),
    collection: z.string().default('documents').describe('Which collection to search'),
    topK: z.number().min(1).max(20).default(5).describe('Number of results'),
  }),
  execute: async ({ query, collection, topK }) => {
    // This integrates with the RAG helpers — see rag-helpers.ts
    return {
      message: `Knowledge base search for "${query}" in "${collection}" (top ${topK}) — connect to Supabase pgvector to enable.`,
      results: [],
    };
  },
});

/** All available tools mapped by name. */
const ALL_TOOLS = {
  search: searchTool,
  calculator: calculatorTool,
  datetime: datetimeTool,
  knowledge_base: knowledgeBaseTool,
} as const;

type ToolName = keyof typeof ALL_TOOLS;

/**
 * Create a tool set from a list of tool names.
 * Returns an object compatible with Vercel AI SDK's tools parameter.
 */
export function createToolSet(toolNames: ToolName[]): Record<string, typeof searchTool> {
  const tools: Record<string, typeof searchTool> = {};
  for (const name of toolNames) {
    if (ALL_TOOLS[name]) {
      tools[name] = ALL_TOOLS[name];
    }
  }
  return tools;
}

export const TOOL_DEFINITIONS = ALL_TOOLS;
