/**
 * Eval dataset types and helpers.
 */

export interface EvalCase {
  id: string;
  input: string;
  expectedOutput?: string;
  context?: string[];
  metadata?: Record<string, unknown>;
  tags?: string[];
}

export interface EvalDataset {
  name: string;
  description?: string;
  cases: EvalCase[];
}

/** Create a typed eval dataset. */
export function createDataset(name: string, cases: EvalCase[]): EvalDataset {
  return { name, cases };
}

/** Example eval dataset for testing. */
export const EXAMPLE_DATASET: EvalDataset = {
  name: 'basic-qa',
  description: 'Basic question-answering evaluation set',
  cases: [
    {
      id: 'qa-1',
      input: 'What is AIForge?',
      expectedOutput: 'AIForge is an AI-native monorepo template by Psypher AI.',
      tags: ['factual'],
    },
    {
      id: 'qa-2',
      input: 'What technologies does AIForge use?',
      expectedOutput: 'AIForge uses Next.js, React Native, FastAPI, LangGraph, and Supabase.',
      tags: ['factual'],
    },
    {
      id: 'qa-3',
      input: 'Explain quantum computing in simple terms.',
      tags: ['creative', 'explanation'],
    },
  ],
};
