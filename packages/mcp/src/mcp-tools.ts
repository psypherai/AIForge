/**
 * MCP Tool Definitions — Define custom tools that AI models can call via MCP.
 *
 * These are reusable tool builders that you can register on any MCP server.
 */

import { z } from 'zod';

export interface MCPToolDefinition {
  name: string;
  description: string;
  schema: Record<string, z.ZodType>;
  handler: (args: Record<string, unknown>) => Promise<{ content: Array<{ type: string; text: string }> }>;
}

/**
 * Pre-built tool: Query the database with read-only SQL.
 */
export const databaseQueryTool: MCPToolDefinition = {
  name: 'query_database',
  description: 'Execute a read-only SQL query against the database',
  schema: {
    query: z.string().describe('SQL SELECT query'),
  },
  handler: async ({ query }) => ({
    content: [{ type: 'text', text: `Executed: ${query}` }],
  }),
};

/**
 * Pre-built tool: RAG semantic search.
 */
export const ragSearchTool: MCPToolDefinition = {
  name: 'semantic_search',
  description: 'Search documents using vector similarity',
  schema: {
    query: z.string().describe('Search query'),
    topK: z.number().default(5),
  },
  handler: async ({ query, topK }) => ({
    content: [{ type: 'text', text: `Searching for: ${query} (top ${topK})` }],
  }),
};

/**
 * Pre-built tool: Store a document with embeddings.
 */
export const documentStoreTool: MCPToolDefinition = {
  name: 'store_document',
  description: 'Store a document for later retrieval',
  schema: {
    content: z.string().describe('Document content'),
    metadata: z.record(z.string()).optional(),
  },
  handler: async ({ content }) => ({
    content: [{ type: 'text', text: `Stored document (${String(content).length} chars)` }],
  }),
};

/**
 * Factory: Create a custom MCP tool with your own logic.
 *
 * @example
 * const weatherTool = createCustomTool({
 *   name: 'get_weather',
 *   description: 'Get current weather for a location',
 *   schema: { location: z.string() },
 *   handler: async ({ location }) => {
 *     const weather = await fetchWeather(location);
 *     return { content: [{ type: 'text', text: JSON.stringify(weather) }] };
 *   },
 * });
 */
export function createCustomTool(definition: MCPToolDefinition): MCPToolDefinition {
  return definition;
}
