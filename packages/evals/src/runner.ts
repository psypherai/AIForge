/**
 * Eval runner — batch-execute evaluations against an AI agent.
 */
import type { EvalDataset, EvalCase } from './dataset';
import type { Scorer, ScoreResult } from './scorers';

export interface EvalConfig {
  dataset: EvalDataset;
  agent: (input: string) => Promise<string>;
  scorers: Scorer[];
  concurrency?: number;
  onProgress?: (completed: number, total: number) => void;
}

export interface EvalResult {
  caseId: string;
  input: string;
  output: string;
  expectedOutput?: string;
  scores: ScoreResult[];
  averageScore: number;
  durationMs: number;
}

/**
 * Run evaluations against an AI agent.
 */
export async function runEval(config: EvalConfig): Promise<{
  results: EvalResult[];
  summary: {
    totalCases: number;
    averageScore: number;
    scoresByMetric: Record<string, number>;
    durationMs: number;
  };
}> {
  const { dataset, agent, scorers, concurrency = 3, onProgress } = config;
  const results: EvalResult[] = [];
  const startTime = Date.now();

  // Process cases with concurrency limit
  const queue = [...dataset.cases];
  let completed = 0;

  const processCase = async (evalCase: EvalCase): Promise<EvalResult> => {
    const caseStart = Date.now();
    const output = await agent(evalCase.input);

    const scores = await Promise.all(
      scorers.map((scorer) =>
        scorer(evalCase.input, output, evalCase.expectedOutput, evalCase.context),
      ),
    );

    const averageScore = scores.reduce((sum, s) => sum + s.score, 0) / scores.length;
    completed++;
    onProgress?.(completed, dataset.cases.length);

    return {
      caseId: evalCase.id,
      input: evalCase.input,
      output,
      expectedOutput: evalCase.expectedOutput,
      scores,
      averageScore,
      durationMs: Date.now() - caseStart,
    };
  };

  // Simple concurrency pool
  const pool: Promise<void>[] = [];
  for (const evalCase of queue) {
    const task = processCase(evalCase).then((result) => {
      results.push(result);
    });
    pool.push(task);

    if (pool.length >= concurrency) {
      await Promise.race(pool);
      pool.splice(
        pool.findIndex((p) => p === undefined),
        1,
      );
    }
  }
  await Promise.all(pool);

  // Calculate summary
  const averageScore = results.reduce((sum, r) => sum + r.averageScore, 0) / results.length;

  const scoresByMetric: Record<string, number> = {};
  for (const scorer of scorers) {
    const metricResults = results.flatMap((r) => r.scores.filter((s) => s.name === scorer.name));
    if (metricResults.length > 0) {
      const metricName = metricResults[0]?.name ?? 'unknown';
      scoresByMetric[metricName] = metricResults.reduce((sum, s) => sum + s.score, 0) / metricResults.length;
    }
  }

  return {
    results,
    summary: {
      totalCases: results.length,
      averageScore,
      scoresByMetric,
      durationMs: Date.now() - startTime,
    },
  };
}
