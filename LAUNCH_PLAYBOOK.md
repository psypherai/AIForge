# AIForge Launch Playbook — GitHub Stars Growth Strategy

> This is your step-by-step guide to promoting AIForge and growing the repo to 1,000+ stars.

---

## Phase 1: Pre-Launch Prep (Do This First)

### GitHub Repo Polish
- [x] Professional README with badges, comparison table, Star CTA
- [x] Issue templates (bug report, feature request)
- [x] PR template
- [x] CONTRIBUTING.md
- [ ] Add GitHub Topics to repo: `ai`, `monorepo`, `nextjs`, `react-native`, `expo`, `fastapi`, `langgraph`, `supabase`, `tailwindcss`, `turborepo`, `rag`, `starter-template`, `typescript`, `python`, `vercel-ai-sdk`
- [ ] Write a compelling 1-sentence repo description: "The #1 AI-native monorepo template — Next.js + Expo + FastAPI + LangGraph + Supabase with 90% code sharing"
- [ ] Add a social preview image (1280x640px) — dark theme, "AIForge" title, tech logos grid
- [ ] Enable GitHub Discussions
- [ ] Create a `v1.0.0` GitHub Release with changelog
- [ ] Record a 2-minute demo GIF/video showing `pnpm dev` → all 3 apps running

### Content Assets to Prepare
- [ ] 30-second screen recording: clone → install → `pnpm dev` → 3 apps running
- [ ] Architecture diagram (use Excalidraw or Mermaid)
- [ ] Screenshot: Next.js web app (styled landing page)
- [ ] Screenshot: Expo mobile app (styled)
- [ ] Screenshot: FastAPI Swagger docs
- [ ] Screenshot: Chat interface in action

---

## Phase 2: Launch Day Posts

### 1. Hacker News (news.ycombinator.com)

**When:** Tuesday or Wednesday, 9-10 AM EST (peak HN traffic)

**Title (pick one):**
- "Show HN: AIForge – Open-source AI monorepo: Next.js + Expo + FastAPI + LangGraph with 90% code sharing"
- "Show HN: I built the monorepo template I wish existed for AI products in 2026"

**Post body:**
```
Hey HN,

I built AIForge because every AI project I started in 2025 had the same problem: 
web repo, mobile repo, backend repo, copy-pasting types, no shared AI logic.

AIForge is a single monorepo that gives you:
- Next.js 16 web app (React 19 + Turbopack)
- Expo mobile app (React Native + NativeWind = Tailwind everywhere)
- FastAPI + LangGraph backend (Python)
- Shared AI layer (Vercel AI SDK, RAG with pgvector, tool calling, structured outputs)
- Supabase for auth/DB/vector, Langfuse for observability
- 90%+ code sharing across all platforms

One `pnpm dev` command starts everything.

The Python backend runs LangGraph agents with Langfuse tracing. The TS frontend 
uses Vercel AI SDK with streaming. RAG is built on Supabase pgvector. Types flow 
end-to-end via Zod → OpenAPI → Pydantic.

MIT licensed. Would love feedback on the architecture choices.

GitHub: https://github.com/psypherai/AIForge
```

### 2. Reddit

**Subreddits (post over 3-4 days, NOT all at once):**

| Subreddit | Day | Angle |
|-----------|-----|-------|
| r/reactjs | Day 1 | "I built an AI monorepo template with Next.js 16 + React 19 + Turbopack" |
| r/reactnative | Day 1 | "Open-source monorepo: Share 90% of code between Next.js and Expo with NativeWind" |
| r/Python | Day 2 | "FastAPI + LangGraph + Supabase pgvector: Production-grade AI backend template" |
| r/MachineLearning | Day 2 | "Open-source full-stack AI template with RAG, agent evals, and Langfuse observability" |
| r/ExperiencedDevs | Day 3 | "Architecture decisions for a production AI monorepo in 2026" |
| r/webdev | Day 3 | "Monorepo template: Next.js + Expo + FastAPI with Turborepo, 90% code sharing" |
| r/SideProject | Day 4 | "I built AIForge — the AI monorepo I wished existed when starting every new project" |
| r/opensource | Day 4 | "AIForge: Open-source AI-native monorepo template (Next.js + Expo + FastAPI + LangGraph)" |

**Example Reddit post (r/reactjs):**
```
Title: I built an open-source AI monorepo template with Next.js 16, Expo, and FastAPI — 90% code sharing

I've been building AI products for the last year and kept rebuilding the same 
scaffolding. So I made AIForge — a production-ready monorepo that combines:

- Next.js 16 (App Router, React 19, Turbopack, shadcn/ui)
- Expo SDK 54 (React Native + NativeWind = Tailwind everywhere)
- FastAPI + LangGraph (Python backend with agentic loops)
- Vercel AI SDK (streaming, tool calling, structured outputs)
- Supabase (auth, Postgres, pgvector for RAG)
- Langfuse (open-source AI observability)
- Turborepo + pnpm (fast builds, remote cache)

The killer feature: screens, UI components, AI logic, types, and prompts are 
all shared across web and mobile. The Python backend shares types via OpenAPI → 
auto-generated TypeScript client.

Everything runs with one command: `pnpm dev`

GitHub: https://github.com/psypherai/AIForge
MIT licensed. Feedback welcome!
```

### 3. Twitter/X

**Thread (post as a thread, not a single tweet):**

```
Tweet 1:
I just open-sourced AIForge — the AI monorepo template I wish existed.

Next.js 16 + Expo + FastAPI + LangGraph + Supabase

One `pnpm dev`. Three apps. 90% shared code.

Here's what's inside 🧵

Tweet 2:
The problem: Every AI project = same scaffolding.

- Web app (Next.js)
- Mobile app (Expo)  
- Backend (FastAPI)
- Copy-paste types everywhere
- No shared AI logic

AIForge solves all of this in one monorepo.

Tweet 3:
The stack:

Web: Next.js 16 + React 19 + Turbopack
Mobile: Expo + NativeWind (Tailwind everywhere)
Backend: FastAPI + LangGraph + Uvicorn
AI: Vercel AI SDK + pgvector RAG
DB: Supabase (auth + Postgres + realtime)
Observability: Langfuse
Build: Turborepo + pnpm

Tweet 4:
What makes it different:

✅ 90% code sharing (screens, UI, AI, types)
✅ Pure Tailwind DX on web AND mobile
✅ Full RAG pipeline with Supabase pgvector
✅ Agent evals built-in
✅ End-to-end type safety (Zod ↔ Pydantic ↔ OpenAPI)
✅ One command to run everything

Tweet 5:
The AI layer is the crown jewel:

- Prompt factory with templates
- Structured outputs with Zod schemas
- Tool calling (search, calculator, etc.)
- RAG helpers with pgvector
- Universal React hooks (works on web + mobile)
- LangGraph.js abstractions

Tweet 6:
The Python backend runs production-grade LangGraph agents:

- StateGraph with tool calling
- Langfuse + LangSmith tracing
- Supabase pgvector for RAG
- Pydantic v2 request/response models
- FastAPI with auto-generated Swagger docs

Tweet 7:
MIT licensed. Free forever.

⭐ https://github.com/psypherai/AIForge

If you're building AI products in 2026, this saves you weeks of setup.

Star it, fork it, ship faster.
```

### 4. Dev.to / Hashnode / Medium

**Title:** "I Built the AI Monorepo Template I Wish Existed — Here's the Architecture"

**Outline:**
1. The problem (rebuilding scaffolding for every AI project)
2. The solution (AIForge architecture overview)
3. Deep dive: How 90% code sharing works (Solito, NativeWind, shared packages)
4. Deep dive: The AI layer (prompts, tools, RAG, hooks)
5. Deep dive: Python backend (FastAPI + LangGraph + Langfuse)
6. Type safety end-to-end (Zod → OpenAPI → Pydantic)
7. Running it locally (demo + screenshots)
8. What's next (roadmap)
9. CTA: Star the repo

### 5. LinkedIn

```
I just open-sourced AIForge — a production-ready monorepo template for 
AI products.

The problem I kept facing: Every new AI project meant setting up the same 
web app, mobile app, backend, auth, database, AI integrations, and 
observability from scratch. Weeks of scaffolding before writing a single 
line of product code.

AIForge combines:
→ Next.js 16 (web)
→ Expo (mobile)
→ FastAPI + LangGraph (backend)
→ Supabase (auth, database, vector search)
→ Vercel AI SDK (streaming, tools, RAG)
→ Langfuse (AI observability)

...into a single monorepo with 90% code sharing.

One command starts everything: pnpm dev

MIT licensed. Built for the AI builder community.

GitHub: https://github.com/psypherai/AIForge

#opensource #ai #webdevelopment #reactjs #python #startup
```

---

## Phase 3: Community Building (Week 2-4)

### YouTube / Loom
- [ ] "Build an AI app in 10 minutes with AIForge" (short demo)
- [ ] "AIForge architecture deep dive" (longer technical walkthrough)
- [ ] "How I share 90% of code between Next.js and Expo" (focused tutorial)

### Engage with Related Communities
- [ ] Comment on related GitHub repos (Vercel AI SDK, LangGraph, Expo, shadcn/ui) where relevant
- [ ] Answer questions on Stack Overflow about monorepo setups, tagging AIForge when helpful
- [ ] Share in Discord communities: Vercel, Supabase, Expo, LangChain, Turborepo

### Cross-Posting Platforms
- [ ] [daily.dev](https://daily.dev) — Submit article
- [ ] [lobste.rs](https://lobste.rs) — Submit with relevant tags
- [ ] [Indie Hackers](https://indiehackers.com) — Share as a tool/resource
- [ ] [Product Hunt](https://producthunt.com) — Launch as a dev tool (prepare 5 screenshots + tagline)

---

## Phase 4: Sustained Growth (Month 2+)

### Content Calendar
| Week | Platform | Content |
|------|----------|---------|
| 1 | HN + Reddit + Twitter | Launch posts (Phase 2) |
| 2 | Dev.to + YouTube | Architecture article + demo video |
| 3 | Twitter | "Building in public" updates, new features |
| 4 | Reddit + HN | Technical deep dive (RAG, LangGraph, or NativeWind) |
| Monthly | All | Release notes for new versions |

### SEO / Discoverability
- Write articles targeting: "ai monorepo template 2026", "next.js expo monorepo", "fastapi langgraph template", "react native ai app template"
- GitHub Topics drive organic discovery — keep them updated
- Link to AIForge from any personal blog, portfolio, or social bio

### Engagement Tactics
- Respond to every issue and PR within 24 hours
- Thank every contributor publicly
- Create "good first issue" labels for newcomers
- Run periodic "What feature do you want next?" polls in Discussions

---

## Key Metrics to Track

| Metric | Tool | Target (3 months) |
|--------|------|-------------------|
| GitHub Stars | GitHub | 500+ |
| Forks | GitHub | 50+ |
| npm/weekly downloads | npm (if published) | N/A (template repo) |
| HN upvotes | HN | 100+ on Show HN |
| Reddit upvotes | Reddit | 200+ across posts |
| Twitter impressions | Twitter Analytics | 50K+ on thread |
| Unique clones | GitHub Insights | 500+/week |

---

## Quick Wins (Do Today)

1. ⭐ Add GitHub Topics to the repo (Settings → Topics)
2. ⭐ Upload a social preview image (Settings → Social preview)
3. ⭐ Enable GitHub Discussions (Settings → Features → Discussions)
4. ⭐ Create a `v1.0.0` Release on GitHub with a changelog
5. ⭐ Post the HN Show HN submission
6. ⭐ Post the Twitter thread
7. ⭐ Post on r/reactjs and r/reactnative

---

*Good luck with the launch! Consistency beats virality — keep sharing, keep building.*
