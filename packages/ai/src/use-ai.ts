/**
 * useAI — Universal React hooks for AI interactions.
 *
 * Works on both Next.js (web) and Expo (mobile) via Vercel AI SDK v4.
 * Provides typed hooks for chat, RAG, and structured outputs.
 *
 * @example
 * ```tsx
 * import { useAI } from '@aiforge/ai/use-ai';
 *
 * function ChatScreen() {
 *   const { messages, send, isLoading } = useAI({ model: 'gpt-4o' });
 *   return (
 *     <View>
 *       {messages.map(m => <Text key={m.id}>{m.content}</Text>)}
 *       <Button onPress={() => send('Hello!')} disabled={isLoading} />
 *     </View>
 *   );
 * }
 * ```
 */
'use client';

import { useChat, useCompletion } from '@ai-sdk/react';
import { useCallback, useState } from 'react';
import type { ChatMessage } from '@aiforge/core/types/chat';

interface UseAIOptions {
  /** API endpoint for chat completions */
  api?: string;
  /** Model identifier */
  model?: string;
  /** System prompt key or custom string */
  systemPrompt?: string;
  /** Callback when response completes */
  onFinish?: (message: string) => void;
  /** Callback on error */
  onError?: (error: Error) => void;
}

/**
 * Universal AI chat hook — wraps Vercel AI SDK's useChat with AIForge defaults.
 */
export function useAI(options: UseAIOptions = {}) {
  const { api = '/api/chat', model = 'gpt-4o', systemPrompt, onFinish, onError } = options;

  const chat = useChat({
    api,
    body: { model },
    initialMessages: systemPrompt
      ? [{ id: 'system', role: 'system' as const, content: systemPrompt }]
      : [],
    onFinish: onFinish ? (message) => onFinish(message.content) : undefined,
    onError,
  });

  const send = useCallback(
    (content: string) => {
      chat.append({ role: 'user', content });
    },
    [chat],
  );

  return {
    messages: chat.messages,
    send,
    input: chat.input,
    setInput: chat.setInput,
    handleSubmit: chat.handleSubmit,
    handleInputChange: chat.handleInputChange,
    isLoading: chat.isLoading,
    error: chat.error,
    stop: chat.stop,
    reload: chat.reload,
  };
}

/**
 * RAG hook — sends queries to the backend RAG endpoint.
 */
export function useRAG(options: { endpoint?: string; collection?: string; topK?: number } = {}) {
  const { endpoint = '/api/v1/rag', collection = 'documents', topK = 5 } = options;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<{
    content: string;
    sources: Array<{ content: string; metadata: Record<string, unknown> }>;
  } | null>(null);

  const query = useCallback(
    async (queryText: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? process.env.EXPO_PUBLIC_BACKEND_URL ?? 'http://localhost:8000';
        const res = await fetch(`${backendUrl}${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: queryText, collection, top_k: topK }),
        });

        if (!res.ok) throw new Error(`RAG query failed: ${res.status}`);
        const data = await res.json();
        setResult(data);
        return data;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [endpoint, collection, topK],
  );

  return { query, result, isLoading, error };
}

/**
 * Structured output hook — generates typed objects from AI.
 */
export function useStructuredOutput<T>(options: { api?: string; model?: string } = {}) {
  const { api = '/api/ai/structured', model = 'gpt-4o' } = options;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<T | null>(null);

  const generate = useCallback(
    async (prompt: string, schema: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(api, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, schema, model }),
        });

        if (!res.ok) throw new Error(`Structured output failed: ${res.status}`);
        const data = await res.json();
        setResult(data.object as T);
        return data.object as T;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [api, model],
  );

  return { generate, result, isLoading, error };
}
