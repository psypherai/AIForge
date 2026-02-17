/**
 * Langfuse integration — open-source LLM observability.
 *
 * Provides tracing, cost tracking, and evaluation for AI interactions.
 * Works from both TypeScript (Next.js) and is mirrored in Python backend.
 *
 * @example
 * ```ts
 * import { createLangfuseClient, traceGeneration } from '@aiforge/observability/langfuse';
 *
 * const langfuse = createLangfuseClient();
 * await traceGeneration(langfuse, {
 *   name: 'chat-completion',
 *   model: 'gpt-4o',
 *   input: messages,
 *   output: response,
 * });
 * ```
 */
import { Langfuse } from 'langfuse';

export interface TraceOptions {
  name: string;
  model: string;
  input: unknown;
  output: unknown;
  metadata?: Record<string, unknown>;
  userId?: string;
  sessionId?: string;
  tags?: string[];
}

/**
 * Create a Langfuse client instance.
 */
export function createLangfuseClient(options?: {
  publicKey?: string;
  secretKey?: string;
  baseUrl?: string;
}): Langfuse {
  return new Langfuse({
    publicKey: options?.publicKey ?? process.env.LANGFUSE_PUBLIC_KEY ?? '',
    secretKey: options?.secretKey ?? process.env.LANGFUSE_SECRET_KEY ?? '',
    baseUrl: options?.baseUrl ?? process.env.LANGFUSE_HOST ?? 'http://localhost:3100',
  });
}

/**
 * Trace an AI generation event in Langfuse.
 */
export async function traceGeneration(langfuse: Langfuse, options: TraceOptions): Promise<void> {
  const trace = langfuse.trace({
    name: options.name,
    userId: options.userId,
    sessionId: options.sessionId,
    metadata: options.metadata,
    tags: options.tags,
  });

  trace.generation({
    name: options.name,
    model: options.model,
    input: options.input,
    output: options.output,
    metadata: options.metadata,
  });

  await langfuse.flushAsync();
}
