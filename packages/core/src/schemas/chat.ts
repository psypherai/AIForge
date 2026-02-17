/**
 * Zod schemas for chat types — runtime validation + TypeScript inference.
 * Used by both frontend (form validation) and edge API routes.
 */
import { z } from 'zod';

export const chatMessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string().min(1, 'Message cannot be empty'),
});

export const chatRequestSchema = z.object({
  messages: z.array(chatMessageSchema).min(1, 'At least one message is required'),
  model: z.string().default('gpt-4o'),
  stream: z.boolean().default(false),
  temperature: z.number().min(0).max(2).default(0.7),
  max_tokens: z.number().min(1).max(128000).default(4096),
});

export const chatResponseSchema = z.object({
  content: z.string(),
  model: z.string(),
  usage: z
    .object({
      prompt_tokens: z.number(),
      completion_tokens: z.number(),
      total_tokens: z.number(),
    })
    .nullable()
    .optional(),
});

export type ChatMessageSchema = z.infer<typeof chatMessageSchema>;
export type ChatRequestSchema = z.infer<typeof chatRequestSchema>;
export type ChatResponseSchema = z.infer<typeof chatResponseSchema>;
