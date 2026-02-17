/**
 * AI Structured Output Schemas — Zod schemas for structured LLM outputs.
 *
 * These schemas are used with Vercel AI SDK's `generateObject()` and
 * `streamObject()` for type-safe, validated AI responses.
 *
 * @example
 * ```ts
 * import { openai } from '@ai-sdk/openai';
 * import { generateObject } from 'ai';
 * import { extractionSchema } from '@aiforge/ai/schemas';
 *
 * const { object } = await generateObject({
 *   model: openai('gpt-4o'),
 *   schema: extractionSchema,
 *   prompt: 'Extract entities from: "Apple announced the iPhone 17 in Cupertino"',
 * });
 * ```
 */
import { z } from 'zod';

/** Generic structured output with reasoning and confidence. */
export const structuredOutputSchema = z.object({
  answer: z.string().describe('The main answer or response'),
  reasoning: z.string().describe('Step-by-step reasoning that led to the answer'),
  confidence: z
    .number()
    .min(0)
    .max(1)
    .describe('Confidence score from 0 to 1'),
  sources: z
    .array(z.string())
    .optional()
    .describe('Sources or references used'),
});

export type StructuredOutput = z.infer<typeof structuredOutputSchema>;

/** Entity extraction schema for NER-style tasks. */
export const extractionSchema = z.object({
  entities: z.array(
    z.object({
      text: z.string().describe('The extracted entity text'),
      type: z
        .enum(['person', 'organization', 'location', 'date', 'product', 'event', 'other'])
        .describe('Entity type'),
      context: z.string().optional().describe('Surrounding context for disambiguation'),
    }),
  ),
  summary: z.string().describe('Brief summary of extracted information'),
});

export type ExtractionResult = z.infer<typeof extractionSchema>;

/** Text classification schema. */
export const classificationSchema = z.object({
  label: z.string().describe('Predicted class label'),
  confidence: z.number().min(0).max(1).describe('Classification confidence'),
  reasoning: z.string().describe('Why this label was chosen'),
  alternativeLabels: z
    .array(
      z.object({
        label: z.string(),
        confidence: z.number(),
      }),
    )
    .optional()
    .describe('Alternative classifications with lower confidence'),
});

export type ClassificationResult = z.infer<typeof classificationSchema>;

/** Sentiment analysis schema. */
export const sentimentSchema = z.object({
  sentiment: z.enum(['positive', 'negative', 'neutral', 'mixed']),
  score: z.number().min(-1).max(1).describe('Sentiment score: -1 (negative) to 1 (positive)'),
  aspects: z
    .array(
      z.object({
        aspect: z.string(),
        sentiment: z.enum(['positive', 'negative', 'neutral']),
        score: z.number().min(-1).max(1),
      }),
    )
    .optional()
    .describe('Aspect-level sentiment breakdown'),
});

export type SentimentResult = z.infer<typeof sentimentSchema>;

/** Code generation schema for structured code outputs. */
export const codeGenerationSchema = z.object({
  code: z.string().describe('Generated code'),
  language: z.string().describe('Programming language'),
  explanation: z.string().describe('Explanation of the code'),
  dependencies: z.array(z.string()).optional().describe('Required packages/imports'),
  tests: z.string().optional().describe('Test code for the generated code'),
});

export type CodeGenerationResult = z.infer<typeof codeGenerationSchema>;
