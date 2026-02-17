/**
 * Prompt Factory — centralized prompt management for the entire monorepo.
 *
 * All system prompts, persona definitions, and prompt templates live here.
 * Shared between Next.js API routes, Python backend (via convention), and mobile.
 */

/** Pre-built system prompts for common use cases. */
export const SYSTEM_PROMPTS = {
  assistant: `You are a helpful AI assistant built with AIForge by Psypher AI.
You provide clear, accurate, and concise responses.
When you're unsure, you say so honestly.
You can use tools when available to provide better answers.`,

  coder: `You are an expert software engineer built with AIForge by Psypher AI.
You write clean, well-documented code with proper error handling.
You follow best practices for the language and framework in question.
When suggesting code changes, explain your reasoning.`,

  analyst: `You are a data analyst AI built with AIForge by Psypher AI.
You excel at interpreting data, finding patterns, and providing actionable insights.
Present findings in a clear, structured format with supporting evidence.`,

  creative: `You are a creative writing assistant built with AIForge by Psypher AI.
You help with brainstorming, writing, and editing creative content.
You adapt your tone and style to match the user's needs.`,

  rag: `You are a knowledge-base assistant built with AIForge by Psypher AI.
Answer questions based ONLY on the provided context.
If the context doesn't contain the answer, say "I don't have enough information to answer that."
Always cite which parts of the context you used.`,
} as const;

export type SystemPromptKey = keyof typeof SYSTEM_PROMPTS;

/**
 * Create a customized prompt from a template with variable substitution.
 *
 * @example
 * ```ts
 * const prompt = createPrompt(
 *   'You are a {role} specializing in {domain}. Help the user with {task}.',
 *   { role: 'engineer', domain: 'React', task: 'debugging' }
 * );
 * ```
 */
export function createPrompt(template: string, variables: Record<string, string>): string {
  return Object.entries(variables).reduce(
    (result, [key, value]) => result.replace(new RegExp(`\\{${key}\\}`, 'g'), value),
    template,
  );
}

/**
 * Build a RAG-enhanced prompt with retrieved context injected.
 *
 * @param query - User's question
 * @param context - Retrieved documents/chunks
 * @param systemPrompt - Base system prompt (defaults to RAG prompt)
 */
export function buildRAGPrompt(
  query: string,
  context: Array<{ content: string; source?: string; similarity?: number }>,
  systemPrompt: string = SYSTEM_PROMPTS.rag,
): { system: string; user: string } {
  const formattedContext = context
    .map((doc, i) => {
      const source = doc.source ? ` (source: ${doc.source})` : '';
      const score = doc.similarity ? ` [relevance: ${(doc.similarity * 100).toFixed(1)}%]` : '';
      return `[${i + 1}]${source}${score}\n${doc.content}`;
    })
    .join('\n\n---\n\n');

  return {
    system: `${systemPrompt}\n\n## Retrieved Context\n\n${formattedContext}`,
    user: query,
  };
}

/**
 * Compose multiple prompt segments into a single system prompt.
 * Useful for building complex multi-capability agent prompts.
 */
export function composePrompt(...segments: string[]): string {
  return segments.filter(Boolean).join('\n\n');
}
