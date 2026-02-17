/**
 * API Client — type-safe client generated from FastAPI's OpenAPI spec.
 *
 * Usage:
 * 1. Start the backend: pnpm dev:backend
 * 2. Generate client: pnpm api:generate
 * 3. Import and use: import { apiClient } from '@aiforge/api-client';
 */
import { createClient } from '@hey-api/client-fetch';
import type { ChatRequest, ChatResponse, RAGRequest, RAGResponse } from '@aiforge/core/types/chat';

const BACKEND_URL =
  typeof window !== 'undefined'
    ? (process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000')
    : (process.env.BACKEND_URL ?? 'http://localhost:8000');

/** Configured @hey-api/client-fetch instance. */
export const client = createClient({
  baseUrl: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Type-safe API methods wrapping the FastAPI backend.
 * These serve as manual wrappers until you generate the full client.
 */
export const apiClient = {
  /** Health check */
  health: () =>
    client.get<{ status: string; service: string; version: string }>({
      url: '/health',
    }),

  /** Chat completion */
  chat: (request: ChatRequest) =>
    client.post<ChatResponse>({
      url: '/api/v1/chat',
      body: request as unknown as Record<string, unknown>,
    }),

  /** Streaming chat */
  chatStream: (request: ChatRequest) =>
    fetch(`${BACKEND_URL}/api/v1/chat/stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    }),

  /** RAG query */
  rag: (request: RAGRequest) =>
    client.post<RAGResponse>({
      url: '/api/v1/rag',
      body: request as unknown as Record<string, unknown>,
    }),
};

export type { ChatRequest, ChatResponse, RAGRequest, RAGResponse };
