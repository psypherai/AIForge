/**
 * LangGraph.js Abstractions — reusable graph builders for TypeScript agents.
 *
 * Provides factory functions to create common LangGraph patterns:
 * - Chat agent with tool calling
 * - RAG pipeline
 * - Custom graph builder
 *
 * @example
 * ```ts
 * import { createChatGraph } from '@aiforge/ai/langgraph';
 *
 * const graph = createChatGraph({
 *   model: 'gpt-4o',
 *   tools: [searchTool, calculatorTool],
 *   systemPrompt: 'You are a helpful assistant.',
 * });
 *
 * const result = await graph.invoke({ messages: [{ role: 'user', content: 'Hello!' }] });
 * ```
 */
import { ChatOpenAI } from '@langchain/openai';
import { AIMessage, BaseMessage, HumanMessage, SystemMessage } from '@langchain/core/messages';
import { StateGraph, END } from '@langchain/langgraph';
import type { StructuredTool } from '@langchain/core/tools';

export interface GraphConfig {
  model?: string;
  temperature?: number;
  apiKey?: string;
  tools?: StructuredTool[];
  systemPrompt?: string;
  maxIterations?: number;
}

interface ChatState {
  messages: BaseMessage[];
}

/**
 * Create a chat agent graph with tool calling support.
 */
export function createChatGraph(config: GraphConfig = {}) {
  const {
    model = 'gpt-4o',
    temperature = 0.7,
    apiKey,
    tools = [],
    systemPrompt,
    maxIterations = 10,
  } = config;

  const llm = new ChatOpenAI({
    model,
    temperature,
    apiKey: apiKey ?? process.env.OPENAI_API_KEY,
  });

  const boundLLM = tools.length > 0 ? llm.bindTools(tools) : llm;

  const callModel = async (state: ChatState) => {
    const messages = systemPrompt
      ? [new SystemMessage(systemPrompt), ...state.messages]
      : state.messages;

    const response = await boundLLM.invoke(messages);
    return { messages: [...state.messages, response] };
  };

  const shouldContinue = (state: ChatState): string => {
    const lastMessage = state.messages[state.messages.length - 1];
    if (lastMessage instanceof AIMessage && lastMessage.tool_calls?.length) {
      return 'tools';
    }
    return END;
  };

  const graph = new StateGraph<ChatState>({
    channels: {
      messages: { default: () => [] },
    },
  })
    .addNode('agent', callModel)
    .addEdge('__start__', 'agent')
    .addConditionalEdges('agent', shouldContinue);

  if (tools.length > 0) {
    const executeTools = async (state: ChatState) => {
      const lastMessage = state.messages[state.messages.length - 1] as AIMessage;
      const toolResults: BaseMessage[] = [];

      for (const toolCall of lastMessage.tool_calls ?? []) {
        const tool = tools.find((t) => t.name === toolCall.name);
        if (tool) {
          const result = await tool.invoke(toolCall.args);
          toolResults.push(
            new HumanMessage({
              content: JSON.stringify(result),
              name: toolCall.name,
            }),
          );
        }
      }

      return { messages: [...state.messages, ...toolResults] };
    };

    graph.addNode('tools', executeTools).addEdge('tools', 'agent');
  }

  return graph.compile();
}

/**
 * Create a RAG pipeline graph: embed -> retrieve -> generate.
 */
export function createRAGGraph(config: GraphConfig & { retrieveFn?: (query: string) => Promise<string[]> } = {}) {
  const { model = 'gpt-4o', temperature = 0.3, apiKey, systemPrompt, retrieveFn } = config;

  interface RAGState {
    query: string;
    context: string[];
    messages: BaseMessage[];
  }

  const retrieve = async (state: RAGState) => {
    const context = retrieveFn
      ? await retrieveFn(state.query)
      : ['No retrieval function configured. Connect to Supabase pgvector.'];
    return { ...state, context };
  };

  const generate = async (state: RAGState) => {
    const llm = new ChatOpenAI({
      model,
      temperature,
      apiKey: apiKey ?? process.env.OPENAI_API_KEY,
    });

    const contextStr = state.context.join('\n\n---\n\n');
    const prompt = `${systemPrompt ?? 'Answer based on the context provided.'}\n\nContext:\n${contextStr}`;

    const response = await llm.invoke([
      new SystemMessage(prompt),
      new HumanMessage(state.query),
    ]);

    return { messages: [response] };
  };

  const graph = new StateGraph<RAGState>({
    channels: {
      query: { default: () => '' },
      context: { default: () => [] },
      messages: { default: () => [] },
    },
  })
    .addNode('retrieve', retrieve)
    .addNode('generate', generate)
    .addEdge('__start__', 'retrieve')
    .addEdge('retrieve', 'generate')
    .addEdge('generate', END);

  return graph.compile();
}
