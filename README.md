# AIForge Starter Pack by Psypher AI

> **The #1 AI-native monorepo template for 2026+**
> Ship web, mobile, and AI products at maximum velocity with 90%+ code sharing.

---

## Why AIForge?

AIForge is the **canonical monorepo blueprint** for every AI product you build in 2026 and beyond. It combines the best-of-the-best technologies into a single, cohesive, production-ready template with **88-94% code sharing** across web, mobile, and backend.

### What Makes This Different

| Feature | AIForge | Typical Template |
|---------|---------|-----------------|
| Code Sharing | **90%+** (screens, UI, AI, types, prompts) | 30-50% |
| Styling DX | **Pure Tailwind everywhere** (NativeWind v5) | Mixed systems, learning curves |
| AI Layer | **Full stack** (Vercel AI SDK + LangGraph + RAG) | Basic chat only |
| Backend | **FastAPI + LangGraph + pgvector** in monorepo | Separate repo or none |
| Observability | **Langfuse + LangSmith** out of the box | None |
| Evals | **Built-in agent evaluation suite** | None |
| Type Safety | **End-to-end** (Zod + OpenAPI + Pydantic) | Partial |

---

## Tech Stack (February 2026 — Best-of-the-Best)

| Layer | Technology | Version |
|-------|-----------|---------|
| **Monorepo** | Turborepo (Rust core + remote cache) | v2.8.x |
| **Package Manager** | pnpm workspaces | v10 |
| **Web** | Next.js App Router + React Compiler + Turbopack | 16.1.6 + React 19.2 |
| **Mobile** | Expo SDK + React Native + Solito | 55 + 0.83 + v5 |
| **Styling** | NativeWind (Tailwind CSS v4 everywhere) + shadcn/ui | v5 + v4 |
| **AI (TypeScript)** | Vercel AI SDK + LangGraph.js + Zod schemas | v4 |
| **AI (Python)** | FastAPI + LangGraph + LangChain | Latest |
| **RAG** | Supabase pgvector + OpenAI embeddings | text-embedding-3-small |
| **API Client** | @hey-api/openapi-ts + TanStack Query v5 | Auto-generated |
| **Auth/DB/Vector** | Supabase (auth + Postgres + pgvector + realtime) | v2 |
| **Observability** | Langfuse (open-source) + LangSmith | Latest |
| **Tooling** | Biome + ESLint flat + Husky + Vitest + Playwright | Latest |

---

## Folder Structure

```
.
├── apps/
│   ├── web/                    # Next.js 16.1.6 + Turbopack + shadcn/ui
│   │   ├── app/                # App Router (layout, pages, API routes)
│   │   │   ├── layout.tsx      # Root layout with providers
│   │   │   ├── page.tsx        # Landing page
│   │   │   ├── chat/page.tsx   # AI chat interface
│   │   │   └── api/
│   │   │       ├── chat/route.ts    # Vercel AI SDK streaming endpoint
│   │   │       └── health/route.ts  # Health check
│   │   ├── components/         # Web-specific components
│   │   └── lib/                # Supabase clients (server + browser)
│   │
│   ├── mobile/                 # Expo SDK 55 + Solito v5 + NativeWind v5
│   │   ├── app/                # Expo Router file-based routing
│   │   │   ├── _layout.tsx     # Root layout
│   │   │   ├── index.tsx       # Home screen
│   │   │   └── chat.tsx        # Chat screen
│   │   ├── metro.config.js     # Monorepo + NativeWind config
│   │   └── app.json            # Expo configuration
│   │
│   └── backend/                # Python FastAPI + LangGraph
│       ├── app/
│       │   ├── main.py         # FastAPI app (/health, /docs, /redoc)
│       │   ├── agents/
│       │   │   ├── chat_agent.py   # LangGraph chat agent + tools
│       │   │   └── rag_agent.py    # RAG agent with pgvector
│       │   ├── routers/
│       │   │   └── chat.py     # /api/v1/chat + /rag + /stream
│       │   ├── models/
│       │   │   └── chat.py     # Pydantic request/response models
│       │   ├── services/
│       │   │   └── vector_store.py  # Supabase pgvector operations
│       │   └── core/
│       │       ├── config.py   # Settings from environment
│       │       ├── supabase.py # Supabase client
│       │       └── observability.py # Langfuse + LangSmith
│       ├── tests/
│       ├── pyproject.toml      # uv project config
│       └── Dockerfile
│
├── packages/
│   ├── ui/                     # shadcn/ui + Tailwind RN primitives
│   │   ├── src/
│   │   │   ├── components/     # Button, Card, Input, Badge, etc.
│   │   │   ├── primitives/     # UniversalText/View/Pressable (.native.tsx)
│   │   │   └── hooks/          # useMediaQuery, etc.
│   │   └── stories/            # Storybook 8 stories
│   │
│   ├── core/                   # Types, utils, Zod schemas, constants
│   │   └── src/
│   │       ├── types/          # ChatMessage, User, API types
│   │       ├── schemas/        # Zod validation schemas
│   │       ├── constants/      # AI models, tokens, collections
│   │       └── utils/          # Helpers, ID generation
│   │
│   ├── ai/                     # AI layer (THE CROWN JEWEL)
│   │   └── src/
│   │       ├── prompts.ts      # Prompt factory + templates
│   │       ├── schemas.ts      # Structured output Zod schemas
│   │       ├── tools.ts        # Tool definitions for AI SDK
│   │       ├── use-ai.ts       # Universal React hooks (useAI, useRAG)
│   │       ├── rag-helpers.ts  # Supabase pgvector RAG utilities
│   │       └── langgraph.ts    # LangGraph.js graph builders
│   │
│   ├── api-client/             # Type-safe backend client
│   │   └── src/
│   │       ├── index.ts        # @hey-api/client-fetch wrapper
│   │       └── hooks.ts        # TanStack Query hooks
│   │
│   ├── config/                 # Shared configurations
│   │   └── src/
│   │       ├── tailwind.css    # Tailwind v4 theme (shared web + native)
│   │       └── tsconfig.*.json # TypeScript configs
│   │
│   ├── observability/          # Langfuse + LangSmith wrappers
│   ├── db/                     # Supabase types + pgvector setup SQL
│   ├── evals/                  # Agent evaluation suite
│   └── eslint-config/          # ESLint flat config (fallback)
│
├── turbo.json                  # Turborepo config (incl. Python tasks)
├── pnpm-workspace.yaml         # Workspace definition
├── package.json                # Root scripts + dev dependencies
├── tsconfig.json               # Base TypeScript config
├── biome.json                  # Primary linter + formatter
├── .env.example                # Environment variable template
├── docker-compose.yml          # Local Supabase + Langfuse + Backend
├── .github/workflows/ci.yml   # CI: TS + Python + E2E + Docker
└── README.md                   # This file
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 22
- **pnpm** >= 10 (`npm install -g pnpm`)
- **Python** >= 3.12
- **uv** (Python package manager: `curl -LsSf https://astral.sh/uv/install.sh | sh`)
- **Docker** (for local Supabase + Langfuse)

### One-Command Setup

```bash
# 1. Clone and install
git clone https://github.com/psypher-ai/aiforge.git
cd aiforge
pnpm install

# 2. Set up Python backend
cd apps/backend && uv sync && cd ../..

# 3. Configure environment
cp .env.example .env
# Edit .env with your API keys

# 4. Start local services (Supabase + Langfuse)
docker compose up -d

# 5. Run everything concurrently
pnpm dev
```

This starts:
- **Web** at `http://localhost:3000` (Next.js + Turbopack)
- **Mobile** via Expo DevTools
- **Backend** at `http://localhost:8000` (FastAPI + auto-reload)
- **API Docs** at `http://localhost:8000/docs` (Swagger UI)
- **Supabase Studio** at `http://localhost:54323`
- **Langfuse** at `http://localhost:3100`

### Individual Commands

```bash
pnpm dev:web        # Next.js only
pnpm dev:mobile     # Expo only
pnpm dev:backend    # FastAPI only
pnpm build          # Build all
pnpm test           # Run all tests
pnpm typecheck      # TypeScript check
pnpm check          # Biome lint + format
pnpm api:generate   # Regenerate API client from OpenAPI
```

---

## AI Quick-Start Guide

### 1. Chat with Streaming (Web)

The web app includes a ready-to-use chat interface at `/chat` powered by Vercel AI SDK v4:

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

### 2. Use the AI Hook (Web + Mobile)

```tsx
import { useAI } from '@aiforge/ai/use-ai';

function ChatScreen() {
  const { messages, send, isLoading } = useAI({
    model: 'gpt-4o',
    systemPrompt: 'You are a helpful assistant.',
  });

  return (
    <View>
      {messages.map(m => <Text key={m.id}>{m.content}</Text>)}
      <Button onPress={() => send('Hello!')} disabled={isLoading}>Send</Button>
    </View>
  );
}
```

### 3. Structured Outputs with Zod

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
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { createToolSet } from '@aiforge/ai/tools';

const { text } = await generateText({
  model: openai('gpt-4o'),
  tools: createToolSet(['search', 'calculator', 'datetime']),
  prompt: 'What time is it in Tokyo?',
  maxSteps: 5,
});
```

### 5. RAG with Supabase pgvector

```typescript
import { searchSimilar, upsertDocuments } from '@aiforge/ai/rag-helpers';
import { createSupabaseAdmin } from '@aiforge/db';

const supabase = createSupabaseAdmin();

// Index documents
await upsertDocuments(supabase, [
  { content: 'AIForge is the best monorepo.', metadata: { source: 'docs' } },
]);

// Search
const results = await searchSimilar(supabase, 'best monorepo', { topK: 5 });
```

### 6. LangGraph Agent (Python Backend)

The FastAPI backend includes a production-grade LangGraph agent at `POST /api/v1/chat`:

```python
# Already built! Uses:
# - LangGraph StateGraph with tool calling
# - Langfuse + LangSmith observability
# - Supabase pgvector for RAG
# - Pydantic v2 request/response models

curl -X POST http://localhost:8000/api/v1/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hello!"}]}'
```

### 7. Run Agent Evaluations

```typescript
import { runEval, scorers, EXAMPLE_DATASET } from '@aiforge/evals';

const results = await runEval({
  dataset: EXAMPLE_DATASET,
  agent: async (input) => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [{ role: 'user', content: input }] }),
    });
    return (await res.json()).content;
  },
  scorers: [scorers.relevance, scorers.coherence, scorers.safety],
});

console.log(`Average score: ${results.summary.averageScore}`);
```

---

## Database Setup (Supabase pgvector)

1. Start local Supabase: `docker compose up -d`
2. Open Supabase Studio: `http://localhost:54323`
3. Run the setup SQL from `packages/db/src/pgvector.ts` in the SQL editor
4. Generate TypeScript types: `pnpm --filter @aiforge/db db:generate`

---

## Deployment

### Web (Vercel)

```bash
# Connect your repo to Vercel, set root directory to apps/web
# Or use the CLI:
vercel --cwd apps/web
```

Environment variables needed:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY`
- `BACKEND_URL`

### Mobile (Expo EAS)

```bash
cd apps/mobile
eas build --platform all
eas submit --platform all
```

### Backend (Fly.io / Render / Railway)

```bash
# Fly.io
cd apps/backend
fly launch
fly deploy

# Or use the Dockerfile directly:
docker build -t aiforge-backend .
docker run -p 8000:8000 --env-file .env aiforge-backend
```

### Backend (Docker Compose - Production)

```bash
docker compose -f docker-compose.yml up -d backend
```

---

## Pros & Cons

### Pros

- **90%+ code sharing** — screens, UI, AI logic, types, prompts shared across web + mobile
- **Pure Tailwind DX** — NativeWind v5 means one styling system everywhere, zero extra learning
- **Full-stack AI** — Vercel AI SDK (frontend) + LangGraph (backend) + RAG (pgvector) = complete
- **Type-safe end-to-end** — Zod (TS) ↔ Pydantic (Python) ↔ OpenAPI ↔ Generated client
- **Production observability** — Langfuse + LangSmith for tracing every AI call
- **Agent evals built-in** — Test your AI before shipping with automated evaluation suite
- **One command to develop** — `pnpm dev` starts web + mobile + backend concurrently
- **Turborepo remote cache** — CI runs in seconds, not minutes
- **Future-proof** — MCP support, React Compiler, Turbopack, agentic-first architecture

### Cons

- **Large initial footprint** — More packages than a simple project needs (prune what you don't use)
- **Supabase lock-in** — Auth/DB/Vector all on Supabase (Clerk auth is supported as alternative)
- **Python + TypeScript** — Two runtimes to manage (uv makes Python painless though)
- **Requires API keys** — AI features need OpenAI/Anthropic keys to function
- **Learning curve for LangGraph** — Powerful but takes time to master the graph paradigm

---

## Why This Is the #1 AI Monorepo in February 2026

1. **React 19.2 + React Compiler** — Automatic memoization, zero manual optimization
2. **Next.js 16.1.6 + Turbopack** — Sub-second HMR, RSC streaming, MCP support
3. **Expo SDK 55 + NativeWind v5** — True Tailwind CSS v4 on native, no compromises
4. **Vercel AI SDK v4** — The gold standard for AI in React (streaming, tools, structured outputs)
5. **LangGraph** — Production-grade agentic loops in both TypeScript and Python
6. **Supabase pgvector** — RAG without leaving your database
7. **Turborepo v2.8** — Rust-powered build system with remote cache and agentic features
8. **Biome** — 100x faster than ESLint + Prettier combined
9. **Agent Evals** — Test-driven AI development built into the monorepo
10. **Langfuse** — Open-source observability you own, not rent

---

## License

MIT - Psypher AI 2026

---

<div align="center">
  <strong>Built with purpose by Psypher AI</strong>
  <br />
  <em>The future of AI development starts here.</em>
</div>
