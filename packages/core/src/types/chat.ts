/**
 * Chat types — shared between web, mobile, and backend.
 * These match the FastAPI Pydantic models in apps/backend/app/models/chat.py.
 */

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
  model?: string;
  stream?: boolean;
  temperature?: number;
  max_tokens?: number;
}

export interface ChatResponse {
  content: string;
  model: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface RAGRequest {
  query: string;
  collection?: string;
  top_k?: number;
  model?: string;
}

export interface RAGResponse {
  content: string;
  sources: Array<{
    content: string;
    metadata: Record<string, unknown>;
  }>;
}
