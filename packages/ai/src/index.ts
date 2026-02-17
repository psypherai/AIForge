// ── Prompt Factory ─────────────────────────────────────────────────────
export { SYSTEM_PROMPTS, createPrompt, buildRAGPrompt } from './prompts';

// ── Schemas (Zod + Structured Outputs) ─────────────────────────────────
export {
  structuredOutputSchema,
  extractionSchema,
  classificationSchema,
  type StructuredOutput,
  type ExtractionResult,
  type ClassificationResult,
} from './schemas';

// ── Tool Definitions ───────────────────────────────────────────────────
export { TOOL_DEFINITIONS, createToolSet, type ToolDefinition } from './tools';

// ── React Hooks (useAI) ────────────────────────────────────────────────
export { useAI, useRAG, useStructuredOutput } from './use-ai';

// ── RAG Helpers (Supabase pgvector) ────────────────────────────────────
export {
  embedText,
  embedTexts,
  searchSimilar,
  upsertDocuments,
  type RAGDocument,
} from './rag-helpers';

// ── LangGraph.js Abstractions ──────────────────────────────────────────
export { createChatGraph, createRAGGraph, type GraphConfig } from './langgraph';
