/**
 * Agent Evaluation Suite — automated testing for AI agents.
 *
 * Provides:
 * - Eval runner for batch testing prompts
 * - Scoring functions (relevance, faithfulness, coherence)
 * - Dataset management for eval sets
 * - Integration with Langfuse for eval tracking
 *
 * @example
 * ```ts
 * import { runEval, scorers } from '@aiforge/evals';
 *
 * const results = await runEval({
 *   dataset: myTestCases,
 *   agent: chatAgent,
 *   scorers: [scorers.relevance, scorers.faithfulness],
 * });
 * ```
 */

export { runEval, type EvalConfig, type EvalResult } from './runner';
export { scorers, type Scorer, type ScoreResult } from './scorers';
export { type EvalDataset, type EvalCase } from './dataset';
