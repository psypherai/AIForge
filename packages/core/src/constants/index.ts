/**
 * Shared constants for the AIForge monorepo.
 */

export const APP_NAME = 'AIForge' as const;

export const AI_MODELS = {
  'gpt-4o': { provider: 'openai', name: 'GPT-4o', maxTokens: 128000 },
  'gpt-4o-mini': { provider: 'openai', name: 'GPT-4o Mini', maxTokens: 128000 },
  'claude-4-sonnet': { provider: 'anthropic', name: 'Claude 4 Sonnet', maxTokens: 200000 },
  'claude-4-haiku': { provider: 'anthropic', name: 'Claude 4 Haiku', maxTokens: 200000 },
} as const;

export type AIModelId = keyof typeof AI_MODELS;

export const DEFAULT_MODEL: AIModelId = 'gpt-4o';

export const MAX_TOKENS = {
  chat: 4096,
  rag: 8192,
  summary: 2048,
} as const;

export const EMBEDDING_MODELS = {
  'text-embedding-3-small': { dimensions: 1536, provider: 'openai' },
  'text-embedding-3-large': { dimensions: 3072, provider: 'openai' },
} as const;

export const VECTOR_COLLECTIONS = {
  documents: 'documents',
  conversations: 'conversations',
  knowledge: 'knowledge',
} as const;
