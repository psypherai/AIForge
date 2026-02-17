/**
 * Multi-Agent Orchestration Patterns — TypeScript (LangGraph.js)
 *
 * Production patterns for orchestrating multiple AI agents:
 * 1. Supervisor: A boss agent delegates to specialist workers
 * 2. Pipeline: Sequential chain of agents, each refining the output
 * 3. Parallel Fan-Out: Multiple agents process in parallel, results merged
 * 4. Debate: Two agents argue perspectives, a judge synthesizes
 *
 * @example
 * ```ts
 * import { createSupervisorGraph } from '@aiforge/ai/multi-agent';
 *
 * const graph = createSupervisorGraph({
 *   workers: [researchAgent, writerAgent, reviewerAgent],
 *   supervisorPrompt: 'Coordinate the team to produce a report.',
 * });
 *
 * const result = await graph.invoke({ task: 'Write a market analysis' });
 * ```
 */

import { ChatOpenAI } from '@langchain/openai';
import { AIMessage, BaseMessage, HumanMessage, SystemMessage } from '@langchain/core/messages';
import { StateGraph, END } from '@langchain/langgraph';

// ── Types ───────────────────────────────────────────────────────────

export interface AgentWorker {
  name: string;
  description: string;
  systemPrompt: string;
  model?: string;
  temperature?: number;
}

export interface SupervisorConfig {
  workers: AgentWorker[];
  supervisorPrompt?: string;
  model?: string;
  maxRounds?: number;
}

export interface PipelineConfig {
  stages: AgentWorker[];
  model?: string;
}

export interface ParallelConfig {
  agents: AgentWorker[];
  mergePrompt?: string;
  model?: string;
}

export interface DebateConfig {
  agentA: AgentWorker;
  agentB: AgentWorker;
  judge: AgentWorker;
  rounds?: number;
  model?: string;
}

// ── Pattern 1: Supervisor ───────────────────────────────────────────

/**
 * Supervisor Pattern — A boss agent delegates tasks to specialist workers.
 *
 * The supervisor analyzes the task, picks the right worker, reviews output,
 * and can re-delegate until satisfied.
 */
export function createSupervisorGraph(config: SupervisorConfig) {
  const {
    workers,
    supervisorPrompt = 'You are a supervisor. Delegate tasks to the right worker and synthesize their outputs.',
    model = 'gpt-4o',
    maxRounds = 5,
  } = config;

  interface SupervisorState {
    task: string;
    messages: BaseMessage[];
    currentWorker: string;
    round: number;
  }

  const workerNames = workers.map((w) => w.name);
  const workerList = workers.map((w) => `- ${w.name}: ${w.description}`).join('\n');

  const supervisor = async (state: SupervisorState) => {
    const llm = new ChatOpenAI({ model, temperature: 0.3 });
    const response = await llm.invoke([
      new SystemMessage(
        `${supervisorPrompt}\n\nAvailable workers:\n${workerList}\n\n` +
          `Respond with EXACTLY one of: ${workerNames.join(', ')} OR "FINISH" if done.`
      ),
      ...state.messages,
      new HumanMessage(`Task: ${state.task}\nRound: ${state.round}/${maxRounds}`),
    ]);

    const nextWorker = response.content.toString().trim();
    return { ...state, currentWorker: nextWorker, messages: [...state.messages, response] };
  };

  const createWorkerNode = (worker: AgentWorker) => async (state: SupervisorState) => {
    const llm = new ChatOpenAI({ model: worker.model || model, temperature: worker.temperature || 0.7 });
    const response = await llm.invoke([
      new SystemMessage(worker.systemPrompt),
      ...state.messages,
    ]);
    return { ...state, messages: [...state.messages, response], round: state.round + 1 };
  };

  const route = (state: SupervisorState): string => {
    if (state.round >= maxRounds) return END;
    const worker = state.currentWorker.toUpperCase();
    if (worker === 'FINISH' || worker.includes('FINISH')) return END;
    const found = workers.find((w) => state.currentWorker.toLowerCase().includes(w.name.toLowerCase()));
    return found ? found.name : END;
  };

  const graph = new StateGraph<SupervisorState>({
    channels: {
      task: { default: () => '' },
      messages: { default: () => [] },
      currentWorker: { default: () => '' },
      round: { default: () => 0 },
    },
  });

  graph.addNode('supervisor', supervisor);
  for (const worker of workers) {
    graph.addNode(worker.name, createWorkerNode(worker));
    graph.addEdge(worker.name, 'supervisor');
  }
  graph.addEdge('__start__', 'supervisor');
  graph.addConditionalEdges('supervisor', route);

  return graph.compile();
}

// ── Pattern 2: Pipeline ─────────────────────────────────────────────

/**
 * Pipeline Pattern — Sequential chain of agents, each refining the output.
 *
 * Great for: research -> draft -> edit -> review workflows.
 */
export function createPipelineGraph(config: PipelineConfig) {
  const { stages, model = 'gpt-4o' } = config;

  interface PipelineState {
    input: string;
    messages: BaseMessage[];
    currentStage: number;
  }

  const graph = new StateGraph<PipelineState>({
    channels: {
      input: { default: () => '' },
      messages: { default: () => [] },
      currentStage: { default: () => 0 },
    },
  });

  for (let i = 0; i < stages.length; i++) {
    const stage = stages[i];
    graph.addNode(stage.name, async (state: PipelineState) => {
      const llm = new ChatOpenAI({ model: stage.model || model, temperature: stage.temperature || 0.7 });
      const response = await llm.invoke([
        new SystemMessage(stage.systemPrompt),
        ...state.messages,
        new HumanMessage(i === 0 ? state.input : 'Continue refining based on the previous output.'),
      ]);
      return { messages: [...state.messages, response], currentStage: i + 1 };
    });

    if (i === 0) {
      graph.addEdge('__start__', stage.name);
    } else {
      graph.addEdge(stages[i - 1].name, stage.name);
    }
  }

  graph.addEdge(stages[stages.length - 1].name, END);
  return graph.compile();
}

// ── Pattern 3: Parallel Fan-Out ─────────────────────────────────────

/**
 * Parallel Pattern — Multiple agents process simultaneously, results merged.
 *
 * Great for: getting multiple perspectives, parallel research, A/B generation.
 */
export function createParallelGraph(config: ParallelConfig) {
  const {
    agents,
    mergePrompt = 'Synthesize the following agent outputs into a single, comprehensive response.',
    model = 'gpt-4o',
  } = config;

  interface ParallelState {
    input: string;
    agentOutputs: Record<string, string>;
    messages: BaseMessage[];
  }

  const graph = new StateGraph<ParallelState>({
    channels: {
      input: { default: () => '' },
      agentOutputs: { default: () => ({}) },
      messages: { default: () => [] },
    },
  });

  // Fan-out: each agent processes independently
  for (const agent of agents) {
    graph.addNode(agent.name, async (state: ParallelState) => {
      const llm = new ChatOpenAI({ model: agent.model || model, temperature: agent.temperature || 0.7 });
      const response = await llm.invoke([
        new SystemMessage(agent.systemPrompt),
        new HumanMessage(state.input),
      ]);
      return {
        agentOutputs: { ...state.agentOutputs, [agent.name]: response.content.toString() },
      };
    });
    graph.addEdge('__start__', agent.name);
  }

  // Merge: synthesize all outputs
  graph.addNode('merge', async (state: ParallelState) => {
    const llm = new ChatOpenAI({ model, temperature: 0.3 });
    const outputs = Object.entries(state.agentOutputs)
      .map(([name, output]) => `### ${name}:\n${output}`)
      .join('\n\n');

    const response = await llm.invoke([
      new SystemMessage(mergePrompt),
      new HumanMessage(outputs),
    ]);

    return { messages: [response] };
  });

  for (const agent of agents) {
    graph.addEdge(agent.name, 'merge');
  }
  graph.addEdge('merge', END);

  return graph.compile();
}

// ── Pattern 4: Debate ───────────────────────────────────────────────

/**
 * Debate Pattern — Two agents argue, a judge synthesizes the best answer.
 *
 * Great for: fact-checking, adversarial validation, balanced analysis.
 */
export function createDebateGraph(config: DebateConfig) {
  const { agentA, agentB, judge, rounds = 2, model = 'gpt-4o' } = config;

  interface DebateState {
    topic: string;
    messages: BaseMessage[];
    round: number;
  }

  const graph = new StateGraph<DebateState>({
    channels: {
      topic: { default: () => '' },
      messages: { default: () => [] },
      round: { default: () => 0 },
    },
  });

  graph.addNode('agentA', async (state: DebateState) => {
    const llm = new ChatOpenAI({ model: agentA.model || model, temperature: 0.8 });
    const response = await llm.invoke([
      new SystemMessage(`${agentA.systemPrompt}\nPresent your argument. Round ${state.round + 1}/${rounds}.`),
      ...state.messages,
      new HumanMessage(state.topic),
    ]);
    return { messages: [...state.messages, new AIMessage(`[${agentA.name}]: ${response.content}`)], round: state.round + 1 };
  });

  graph.addNode('agentB', async (state: DebateState) => {
    const llm = new ChatOpenAI({ model: agentB.model || model, temperature: 0.8 });
    const response = await llm.invoke([
      new SystemMessage(`${agentB.systemPrompt}\nCounter the previous argument. Round ${state.round}/${rounds}.`),
      ...state.messages,
      new HumanMessage(state.topic),
    ]);
    return { messages: [...state.messages, new AIMessage(`[${agentB.name}]: ${response.content}`)] };
  });

  graph.addNode('judge', async (state: DebateState) => {
    const llm = new ChatOpenAI({ model: judge.model || model, temperature: 0.3 });
    const response = await llm.invoke([
      new SystemMessage(judge.systemPrompt),
      ...state.messages,
      new HumanMessage('Synthesize the best answer from both perspectives.'),
    ]);
    return { messages: [...state.messages, response] };
  });

  const shouldContinue = (state: DebateState): string => {
    return state.round < rounds ? 'agentA' : 'judge';
  };

  graph.addEdge('__start__', 'agentA');
  graph.addEdge('agentA', 'agentB');
  graph.addConditionalEdges('agentB', shouldContinue);
  graph.addEdge('judge', END);

  return graph.compile();
}
