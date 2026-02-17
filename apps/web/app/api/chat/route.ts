import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { SYSTEM_PROMPTS } from '@aiforge/ai/prompts';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    system: SYSTEM_PROMPTS.assistant,
    messages,
    maxTokens: 4096,
    temperature: 0.7,
  });

  return result.toDataStreamResponse();
}
