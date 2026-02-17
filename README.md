<div align="center">

<img src="https://img.shields.io/badge/Psypher_AI-AIForge-7c3aed?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0wIDE4Yy00LjQxIDAtOC0zLjU5LTgtOHMzLjU5LTggOC04IDggMy41OSA4IDgtMy41OSA4LTggOHoiLz48L3N2Zz4=&logoColor=white" alt="AIForge" />

# AIForge Starter Pack

### The #1 AI-native monorepo template for 2026+

Ship web, mobile, and AI products at maximum velocity with **90%+ code sharing**.

[![GitHub stars](https://img.shields.io/github/stars/psypherai/AIForge?style=social)](https://github.com/psypherai/AIForge/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/psypherai/AIForge?style=social)](https://github.com/psypherai/AIForge/network/members)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/psypherai/AIForge/pulls)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react)](https://react.dev)
[![Expo](https://img.shields.io/badge/Expo_SDK-54-000020?logo=expo)](https://expo.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi)](https://fastapi.tiangolo.com)
[![Turborepo](https://img.shields.io/badge/Turborepo-2.8-EF4444?logo=turborepo)](https://turbo.build)
[![Supabase](https://img.shields.io/badge/Supabase-pgvector-3ECF8E?logo=supabase)](https://supabase.com)
[![pnpm](https://img.shields.io/badge/pnpm-10-F69220?logo=pnpm)](https://pnpm.io)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-everywhere-06B6D4?logo=tailwindcss)](https://tailwindcss.com)

[Getting Started](#-getting-started) · [AI Quick-Start](#-ai-quick-start-guide) · [Why AIForge](#-why-aiforge) · [Deploy](#-deployment) · [Contributing](CONTRIBUTING.md) · [Psypher AI](https://psypher.ai)

---

**Love this project? Give it a :star: to help others discover it!**

</div>

## What is AIForge?

AIForge is the **canonical monorepo blueprint** for every AI product you build in 2026 and beyond. One `pnpm dev` command spins up a Next.js web app, an Expo mobile app, and a FastAPI + LangGraph backend — all sharing 90%+ of their code.

```bash
# Clone → Install → Run (under 2 minutes)
git clone https://github.com/psypherai/AIForge.git && cd AIForge
pnpm install && cp .env.example .env
pnpm dev
```

> **Web** on `localhost:3000` · **Mobile** on `localhost:8081` · **API** on `localhost:8000` · **Docs** on `localhost:8000/docs`

---

## Why AIForge?

<table>
<tr>
<th>Feature</th>
<th>AIForge</th>
<th>create-t3-app</th>
<th>create-expo-app</th>
<th>Typical Template</th>
</tr>
<tr>
<td><strong>Code Sharing</strong></td>
<td>90%+ (screens, UI, AI, types)</td>
<td>Web only</td>
<td>Mobile only</td>
<td>30-50%</td>
</tr>
<tr>
<td><strong>Platforms</strong></td>
<td>Web + Mobile + Backend</td>
<td>Web</td>
<td>Mobile</td>
<td>Usually 1</td>
</tr>
<tr>
<td><strong>Styling DX</strong></td>
<td>Pure Tailwind everywhere (NativeWind)</td>
<td>Tailwind (web only)</td>
<td>StyleSheet</td>
<td>Mixed systems</td>
</tr>
<tr>
<td><strong>AI Layer</strong></td>
<td>Full stack (Vercel AI SDK + LangGraph + RAG)</td>
<td>None</td>
<td>None</td>
<td>Basic chat only</td>
</tr>
<tr>
<td><strong>Backend</strong></td>
<td>FastAPI + LangGraph + pgvector in monorepo</td>
<td>tRPC (TS only)</td>
<td>None</td>
<td>Separate repo</td>
</tr>
<tr>
<td><strong>Observability</strong></td>
<td>Langfuse + LangSmith out of the box</td>
<td>None</td>
<td>None</td>
<td>None</td>
</tr>
<tr>
<td><strong>Agent Evals</strong></td>
<td>Built-in evaluation suite</td>
<td>None</td>
<td>None</td>
<td>None</td>
</tr>
<tr>
<td><strong>MCP</strong></td>
<td>Server + Client (Model Context Protocol)</td>
<td>None</td>
<td>None</td>
<td>None</td>
</tr>
<tr>
<td><strong>Multi-Agent</strong></td>
<td>4 patterns (Supervisor, Pipeline, Parallel, Debate)</td>
<td>None</td>
<td>None</td>
<td>None</td>
</tr>
<tr>
<td><strong>Realtime AI</strong></td>
<td>Collaborative AI with live presence</td>
<td>None</td>
<td>None</td>
<td>None</td>
</tr>
<tr>
<td><strong>PWA</strong></td>
<td>Installable + offline support</td>
<td>Manual</td>
<td>N/A</td>
<td>None</td>
</tr>
<tr>
<td><strong>Edge Functions</strong></td>
<td>Supabase Edge (Deno)</td>
<td>None</td>
<td>None</td>
<td>None</td>
</tr>
<tr>
<td><strong>Type Safety</strong></td>
<td>End-to-end (Zod + OpenAPI + Pydantic)</td>
<td>tRPC</td>
<td>Partial</td>
<td>Partial</td>
</tr>
</table>

---

## Tech Stack (February 2026 — Best-of-the-Best)

| Layer | Technology | Why |
|-------|-----------|-----|
| **Monorepo** | Turborepo v2.8 (Rust core) | Remote cache, sub-second builds |
| **Package Manager** | pnpm v10 workspaces | Fast, strict, disk-efficient |
| **Web** | Next.js 16 + React 19.2 + Turbopack | RSC, streaming, React Compiler |
| **Mobile** | Expo SDK 54 + React Native + Solito | Universal navigation, OTA updates |
| **Styling** | NativeWind + Tailwind CSS + shadcn/ui | One styling system everywhere |
| **AI (TypeScript)** | Vercel AI SDK + LangGraph.js + Zod | Streaming, tools, structured outputs |
| **AI (Python)** | FastAPI + LangGraph + LangChain | Production agentic loops |
| **Multi-Agent** | Supervisor, Pipeline, Parallel, Debate | 4 orchestration patterns out of the box |
| **MCP** | @modelcontextprotocol/sdk | Expose app capabilities to any AI model |
| **RAG** | Supabase pgvector + OpenAI embeddings | Vector search in your database |
| **Realtime AI** | Supabase Realtime + AI streaming | Collaborative AI with live presence |
| **Edge Functions** | Supabase Edge (Deno) | Serverless AI at the edge |
| **API Client** | @hey-api/openapi-ts + TanStack Query v5 | Auto-generated, type-safe |
| **Auth/DB** | Supabase (auth + Postgres + realtime) | All-in-one BaaS |
| **Observability** | Langfuse + LangSmith | Trace every AI call, open-source |
| **PWA** | Service Worker + Web Manifest | Installable web app with offline support |
| **CLI** | create-aiforge | `npx create-aiforge my-app` scaffolding |
| **Tooling** | Biome + Vitest + Playwright | 100x faster linting, full testing |

---

## Architecture

```
.
├── apps/
│   ├── web/                 # Next.js 16 + Turbopack + shadcn/ui + PWA
│   ├── mobile/              # Expo SDK 54 + Solito + NativeWind
│   └── backend/             # Python FastAPI + LangGraph + uv
│
├── packages/
│   ├── ui/                  # Shared UI (shadcn + Tailwind RN primitives)
│   ├── core/                # Types, Zod schemas, utils, constants
│   ├── ai/                  # Prompt factory, tools, RAG, multi-agent, realtime
│   ├── mcp/                 # MCP server + client (Model Context Protocol)
│   ├── api-client/          # Generated OpenAPI client + React Query hooks
│   ├── config/              # Shared Tailwind, TypeScript configs
│   ├── observability/       # Langfuse + LangSmith wrappers
│   ├── db/                  # Supabase types + pgvector helpers
│   ├── evals/               # Agent evaluation suite
│   ├── create-aiforge/      # CLI scaffolding tool (npx create-aiforge)
│   └── eslint-config/       # ESLint flat config (fallback)
│
├── supabase/
│   └── functions/           # Edge Functions (ai-chat, embed, webhook)
│
├── docs/                    # Upgrade guides and documentation
├── turbo.json               # Turborepo config (incl. Python tasks)
├── docker-compose.yml       # Local Supabase + Langfuse + Backend
└── .github/workflows/       # CI: TS + Python + E2E + Docker
```

---

## Getting Started

### Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Node.js | >= 22 | [nodejs.org](https://nodejs.org) |
| pnpm | >= 10 | `npm install -g pnpm` |
| Python | >= 3.12 | [python.org](https://python.org) |
| uv | Latest | `curl -LsSf https://astral.sh/uv/install.sh \| sh` |
| Docker | Latest | [docker.com](https://docker.com) |

### Quick Start

```bash
# 1. Clone and install
git clone https://github.com/psypherai/AIForge.git
cd AIForge
pnpm install

# 2. Set up Python backend
cd apps/backend && uv sync && cd ../..

# 3. Configure environment
cp .env.example .env
# Edit .env with your API keys (OPENAI_API_KEY, SUPABASE_URL, etc.)

# 4. Start local services (optional — for Supabase + Langfuse)
docker compose up -d

# 5. Run everything concurrently
pnpm dev
```

That's it. Three apps running simultaneously:

| Service | URL | Stack |
|---------|-----|-------|
| **Web** | [localhost:3000](http://localhost:3000) | Next.js + Turbopack |
| **Mobile Web** | [localhost:8081](http://localhost:8081) | Expo + NativeWind |
| **Backend API** | [localhost:8000](http://localhost:8000) | FastAPI + Uvicorn |
| **API Docs** | [localhost:8000/docs](http://localhost:8000/docs) | Scalar API Reference |
| **Supabase Studio** | [localhost:54323](http://localhost:54323) | Postgres + pgvector |
| **Langfuse** | [localhost:3100](http://localhost:3100) | AI Observability |

### Commands

```bash
pnpm dev              # Start all (web + mobile + backend)
pnpm dev:web          # Next.js only
pnpm dev:mobile       # Expo only
pnpm dev:backend      # FastAPI only
pnpm build            # Build all packages
pnpm test             # Run all tests (Vitest)
pnpm typecheck        # TypeScript check
pnpm check            # Biome lint + format
pnpm api:generate     # Regenerate API client from OpenAPI spec
```

---

## AI Quick-Start Guide

### 1. Streaming Chat (Web)

The `/chat` page is pre-built with Vercel AI SDK:

```typescript
// apps/web/app/api/chat/route.ts — already set up!
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { SYSTEM_PROMPTS } from '@aiforge/ai/prompts';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: openai('gpt-4o'),
    system: SYSTEM_PROMPTS.assistant,
    messages,
  });
  return result.toDataStreamResponse();
}
```

### 2. Universal AI Hook (Web + Mobile)

```tsx
import { useAI } from '@aiforge/ai/use-ai';

function ChatScreen() {
  const { messages, send, isLoading } = useAI({
    model: 'gpt-4o',
    systemPrompt: 'You are a helpful assistant.',
  });

  return (
    <View className="flex-1 p-4">
      {messages.map(m => <Text key={m.id}>{m.content}</Text>)}
      <Button onPress={() => send('Hello!')} disabled={isLoading}>Send</Button>
    </View>
  );
}
```

### 3. Structured Outputs

```typescript
import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { extractionSchema } from '@aiforge/ai/schemas';

const { object } = await generateObject({
  model: openai('gpt-4o'),
  schema: extractionSchema,
  prompt: 'Extract entities: "Tim Cook announced iPhone 17 in Cupertino"',
});
// object.entities → [{ text: 'Tim Cook', type: 'person' }, ...]
```

### 4. Tool Calling

```typescript
import { createToolSet } from '@aiforge/ai/tools';
import { generateText } from 'ai';

const { text } = await generateText({
  model: openai('gpt-4o'),
  tools: createToolSet(['search', 'calculator', 'datetime']),
  prompt: 'What time is it in Tokyo?',
  maxSteps: 5,
});
```

### 5. RAG with pgvector

```typescript
import { searchSimilar, upsertDocuments } from '@aiforge/ai/rag-helpers';

// Index documents
await upsertDocuments(supabase, [
  { content: 'AIForge is the best monorepo.', metadata: { source: 'docs' } },
]);

// Semantic search
const results = await searchSimilar(supabase, 'best monorepo', { topK: 5 });
```

### 6. LangGraph Agent (Python)

```bash
curl -X POST http://localhost:8000/api/v1/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hello!"}]}'
```

### 7. Agent Evaluations

```typescript
import { runEval, scorers, EXAMPLE_DATASET } from '@aiforge/evals';

const results = await runEval({
  dataset: EXAMPLE_DATASET,
  agent: myAgent,
  scorers: [scorers.relevance, scorers.coherence, scorers.safety],
});
console.log(`Average score: ${results.summary.averageScore}`);
```

---

## Deployment

### Web (Vercel)

```bash
vercel --cwd apps/web
```

### Mobile (Expo EAS)

```bash
cd apps/mobile && eas build --platform all && eas submit --platform all
```

### Backend (Fly.io / Render / Railway)

```bash
cd apps/backend && fly launch && fly deploy
```

### Full Stack (Docker Compose)

```bash
docker compose up -d
```

---

## Roadmap

- [x] Monorepo with Turborepo + pnpm
- [x] Next.js 16 web app with shadcn/ui
- [x] Expo mobile app with NativeWind
- [x] FastAPI + LangGraph backend
- [x] Supabase pgvector RAG
- [x] Langfuse observability
- [x] Agent evaluation suite
- [x] Docker Compose for local dev
- [x] GitHub Actions CI
- [x] MCP (Model Context Protocol) server + client
- [x] Multi-agent orchestration (Supervisor, Pipeline, Parallel, Debate)
- [x] Supabase Edge Functions (ai-chat, embed, webhook)
- [x] Real-time collaborative AI (Supabase Realtime)
- [x] PWA support (installable web app + offline)
- [x] CLI scaffolding tool (`npx create-aiforge`)
- [x] Expo SDK 55 + NativeWind v5 upgrade guide
- [x] Scalar API Reference (replaced Swagger UI)

### Coming Next

**High Priority — Differentiators**

- [ ] A2A Protocol (Google Agent-to-Agent) — agent-to-agent communication alongside MCP
- [ ] Voice AI — `useVoiceChat` hook with OpenAI Realtime API / Deepgram STT+TTS
- [ ] AI Guardrails — content filtering, PII detection, prompt injection protection
- [ ] Human-in-the-Loop — AI actions requiring user approval before execution
- [ ] AI Payments (x402) — agents that can pay for tools and services

**Medium Priority — Production Essentials**

- [ ] AI Background Agents — long-running async tasks with notifications
- [ ] Multi-provider LLM Router — auto-route between OpenAI / Anthropic / Gemini / local models
- [ ] Fine-tuning Pipeline — scripts to fine-tune on your app's data
- [ ] Prompt Playground — built-in UI to test and iterate prompts
- [ ] E2E AI Testing — automated LLM output validation beyond unit tests

**Ecosystem Integrations**

- [ ] Cloudflare Workers AI — alternative edge deployment
- [ ] Expo Push Notifications + AI — push triggered by AI agents
- [ ] Stripe Integration — SaaS billing with AI usage metering
- [ ] Admin Dashboard — analytics for AI usage, costs, latency

---

## Contributing

We love contributions! Check out our [Contributing Guide](CONTRIBUTING.md) for details on how to get started.

Whether it's a bug fix, new feature, documentation improvement, or even a typo fix — every contribution is valued.

---

## Community

- [GitHub Discussions](https://github.com/psypherai/AIForge/discussions) — Ask questions, share ideas
- [GitHub Issues](https://github.com/psypherai/AIForge/issues) — Report bugs, request features
- Star the repo to stay updated with releases

---

## Star History

<a href="https://star-history.com/#psypherai/AIForge&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=psypherai/AIForge&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=psypherai/AIForge&type=Date" />
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=psypherai/AIForge&type=Date" />
  </picture>
</a>

---

## License

MIT — [Psypher AI](https://psypher.ai) 2026

---

<div align="center">

**Built with purpose by [Psypher AI](https://psypher.ai)**

If AIForge helped you ship faster, consider giving it a :star:

[Report Bug](https://github.com/psypherai/AIForge/issues/new?template=bug_report.md) · [Request Feature](https://github.com/psypherai/AIForge/issues/new?template=feature_request.md)

</div>
