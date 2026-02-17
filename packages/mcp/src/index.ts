// ── MCP Server ────────────────────────────────────────────────────────
export { createMCPServer, type MCPServerConfig } from './server';

// ── MCP Tools (expose app capabilities to AI models) ─────────────────
export {
  databaseQueryTool,
  ragSearchTool,
  documentStoreTool,
  createCustomTool,
  type MCPToolDefinition,
} from './mcp-tools';

// ── MCP Client (connect to external MCP servers) ─────────────────────
export { createMCPClient, discoverTools, type MCPClientConfig } from './client';
