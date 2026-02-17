/**
 * React Query hooks — auto-generated style hooks for the FastAPI backend.
 *
 * @example
 * ```tsx
 * import { useChatMutation, useHealthQuery } from '@aiforge/api-client/hooks';
 *
 * function App() {
 *   const health = useHealthQuery();
 *   const chat = useChatMutation();
 *
 *   return (
 *     <div>
 *       <p>Backend: {health.data?.status}</p>
 *       <button onClick={() => chat.mutate({
 *         messages: [{ role: 'user', content: 'Hello!' }]
 *       })}>
 *         Send
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
'use client';

import { useMutation, useQuery, type UseMutationOptions, type UseQueryOptions } from '@tanstack/react-query';
import { apiClient, type ChatRequest, type ChatResponse, type RAGRequest, type RAGResponse } from './index';

/** Query key factory for consistent cache management. */
export const queryKeys = {
  health: ['health'] as const,
  chat: ['chat'] as const,
  rag: (query: string) => ['rag', query] as const,
};

/** Health check query hook. */
export function useHealthQuery(
  options?: Partial<UseQueryOptions<{ status: string; service: string; version: string }>>,
) {
  return useQuery({
    queryKey: queryKeys.health,
    queryFn: async () => {
      const { data } = await apiClient.health();
      return data!;
    },
    refetchInterval: 30000,
    ...options,
  });
}

/** Chat mutation hook. */
export function useChatMutation(options?: Partial<UseMutationOptions<ChatResponse, Error, ChatRequest>>) {
  return useMutation({
    mutationFn: async (request: ChatRequest) => {
      const { data } = await apiClient.chat(request);
      return data!;
    },
    ...options,
  });
}

/** RAG query mutation hook. */
export function useRAGMutation(options?: Partial<UseMutationOptions<RAGResponse, Error, RAGRequest>>) {
  return useMutation({
    mutationFn: async (request: RAGRequest) => {
      const { data } = await apiClient.rag(request);
      return data!;
    },
    ...options,
  });
}
