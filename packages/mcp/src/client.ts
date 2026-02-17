/**
 * MCP Client — Connect your AIForge app to external MCP servers.
 *
 * This lets your AI features use tools from any MCP-compatible server
 * (e.g., filesystem, GitHub, Slack, databases, custom business logic).
 *
 * @example
 * const client = await createMCPClient({
 *   serverCommand: 'npx',
 *   serverArgs: ['-y', '@modelcontextprotocol/server-filesystem', '/path/to/dir'],
 * });
 *
 * const tools = await discoverTools(client);
 * // Use tools with Vercel AI SDK or LangGraph
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

export interface MCPClientConfig {
  serverCommand: string;
  serverArgs?: string[];
  serverEnv?: Record<string, string>;
  clientName?: string;
  clientVersion?: string;
}

/**
 * Create an MCP client that connects to an external MCP server via stdio.
 */
export async function createMCPClient(config: MCPClientConfig): Promise<Client> {
  const {
    serverCommand,
    serverArgs = [],
    serverEnv = {},
    clientName = 'aiforge-client',
    clientVersion = '1.0.0',
  } = config;

  const client = new Client({ name: clientName, version: clientVersion });

  const transport = new StdioClientTransport({
    command: serverCommand,
    args: serverArgs,
    env: { ...process.env, ...serverEnv } as Record<string, string>,
  });

  await client.connect(transport);
  return client;
}

/**
 * Discover all available tools from a connected MCP server.
 * Returns tool definitions that can be adapted for Vercel AI SDK or LangGraph.
 */
export async function discoverTools(client: Client) {
  const { tools } = await client.listTools();

  return tools.map((tool) => ({
    name: tool.name,
    description: tool.description || '',
    inputSchema: tool.inputSchema,
    call: async (args: Record<string, unknown>) => {
      const result = await client.callTool({ name: tool.name, arguments: args });
      return result;
    },
  }));
}
