/**
 * LangSmith integration — LangChain's observability platform.
 *
 * Provides tracing for LangChain/LangGraph runs.
 * Complements Langfuse — use both or pick one.
 */
import { Client } from 'langsmith';

export interface LangSmithConfig {
  apiKey?: string;
  project?: string;
  endpoint?: string;
}

/**
 * Create a LangSmith client instance.
 */
export function createLangSmithClient(config?: LangSmithConfig): Client {
  return new Client({
    apiKey: config?.apiKey ?? process.env.LANGSMITH_API_KEY,
    apiUrl: config?.endpoint ?? 'https://api.smith.langchain.com',
  });
}

/**
 * Enable LangSmith tracing via environment variables.
 * Call this at app startup to enable automatic tracing.
 */
export function enableLangSmithTracing(config?: LangSmithConfig): void {
  if (typeof process !== 'undefined') {
    process.env.LANGCHAIN_TRACING_V2 = 'true';
    if (config?.apiKey) process.env.LANGCHAIN_API_KEY = config.apiKey;
    if (config?.project) process.env.LANGCHAIN_PROJECT = config.project;
    if (config?.endpoint) process.env.LANGCHAIN_ENDPOINT = config.endpoint;
  }
}
