/**
 * AIForge MCP Server — Expose your app's capabilities to any MCP-compatible AI client.
 *
 * This creates a Model Context Protocol server that lets AI models (Claude, Cursor, etc.)
 * interact with your Supabase database, RAG pipeline, and custom business logic.
 *
 * Usage:
 *   npx tsx packages/mcp/src/server.ts
 *
 * Or integrate into your FastAPI backend as an SSE endpoint.
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

export interface MCPServerConfig {
  name?: string;
  version?: string;
  supabaseUrl?: string;
  supabaseKey?: string;
}

export function createMCPServer(config: MCPServerConfig = {}) {
  const {
    name = 'aiforge-mcp-server',
    version = '1.0.0',
    supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY,
  } = config;

  const server = new McpServer({ name, version });

  // ── Tool: Query Database ──────────────────────────────────────────
  server.tool(
    'query_database',
    'Execute a read-only SQL query against the Supabase Postgres database',
    {
      query: z.string().describe('SQL SELECT query to execute'),
      params: z.array(z.string()).optional().describe('Query parameters'),
    },
    async ({ query, params }) => {
      if (!supabaseUrl || !supabaseKey) {
        return { content: [{ type: 'text', text: 'Error: Supabase credentials not configured' }] };
      }

      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(supabaseUrl, supabaseKey);

      // Only allow SELECT queries for safety
      const normalized = query.trim().toUpperCase();
      if (!normalized.startsWith('SELECT')) {
        return { content: [{ type: 'text', text: 'Error: Only SELECT queries are allowed via MCP' }] };
      }

      const { data, error } = await supabase.rpc('execute_sql', { query, params: params || [] });

      if (error) {
        return { content: [{ type: 'text', text: `Query error: ${error.message}` }] };
      }

      return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
    }
  );

  // ── Tool: Semantic Search (RAG) ───────────────────────────────────
  server.tool(
    'semantic_search',
    'Search documents using vector similarity (RAG with pgvector)',
    {
      query: z.string().describe('Natural language search query'),
      topK: z.number().default(5).describe('Number of results to return'),
      table: z.string().default('documents').describe('Table name with embeddings'),
    },
    async ({ query, topK, table }) => {
      if (!supabaseUrl || !supabaseKey) {
        return { content: [{ type: 'text', text: 'Error: Supabase credentials not configured' }] };
      }

      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { data, error } = await supabase.rpc('match_documents', {
        query_text: query,
        match_count: topK,
        table_name: table,
      });

      if (error) {
        return { content: [{ type: 'text', text: `Search error: ${error.message}` }] };
      }

      const formatted = (data || [])
        .map((doc: { content: string; similarity: number; metadata: unknown }, i: number) =>
          `[${i + 1}] (score: ${doc.similarity.toFixed(3)})\n${doc.content}\nMetadata: ${JSON.stringify(doc.metadata)}`
        )
        .join('\n\n');

      return { content: [{ type: 'text', text: formatted || 'No results found' }] };
    }
  );

  // ── Tool: Store Document ──────────────────────────────────────────
  server.tool(
    'store_document',
    'Store a document with auto-generated embeddings for later retrieval',
    {
      content: z.string().describe('Document content to store'),
      metadata: z.record(z.string()).optional().describe('Key-value metadata'),
    },
    async ({ content, metadata }) => {
      if (!supabaseUrl || !supabaseKey) {
        return { content: [{ type: 'text', text: 'Error: Supabase credentials not configured' }] };
      }

      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { data, error } = await supabase
        .from('documents')
        .insert({ content, metadata: metadata || {} })
        .select('id')
        .single();

      if (error) {
        return { content: [{ type: 'text', text: `Store error: ${error.message}` }] };
      }

      return { content: [{ type: 'text', text: `Document stored with ID: ${data.id}` }] };
    }
  );

  // ── Tool: List Tables ─────────────────────────────────────────────
  server.tool(
    'list_tables',
    'List all tables in the public schema',
    {},
    async () => {
      if (!supabaseUrl || !supabaseKey) {
        return { content: [{ type: 'text', text: 'Error: Supabase credentials not configured' }] };
      }

      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { data, error } = await supabase.rpc('get_tables');

      if (error) {
        return { content: [{ type: 'text', text: `Error: ${error.message}` }] };
      }

      return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
    }
  );

  // ── Resource: App Configuration ───────────────────────────────────
  server.resource('app-config', 'aiforge://config', async (uri) => ({
    contents: [
      {
        uri: uri.href,
        mimeType: 'application/json',
        text: JSON.stringify(
          {
            name: 'AIForge',
            version: '1.0.0',
            stack: {
              web: 'Next.js 16',
              mobile: 'Expo SDK 54',
              backend: 'FastAPI + LangGraph',
              database: 'Supabase + pgvector',
              ai: 'Vercel AI SDK v6',
            },
          },
          null,
          2
        ),
      },
    ],
  }));

  return server;
}

// ── Standalone server (run with: npx tsx packages/mcp/src/server.ts) ──
async function main() {
  const server = createMCPServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('AIForge MCP server running on stdio');
}

// Run if executed directly
const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  main().catch(console.error);
}
