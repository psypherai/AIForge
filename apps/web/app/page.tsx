import Link from 'next/link';

const FEATURES = [
  {
    icon: '⚡',
    title: 'Web + Mobile',
    desc: 'Next.js 16 + Expo SDK 54 with Solito universal navigation and 90%+ shared code.',
    tags: ['React 19', 'NativeWind', 'Turbopack'],
  },
  {
    icon: '🧠',
    title: 'AI-Native',
    desc: 'Vercel AI SDK v6, LangGraph agents, RAG with pgvector, structured outputs, and streaming.',
    tags: ['GPT-4o', 'Tool Calling', 'Embeddings'],
  },
  {
    icon: '🔗',
    title: 'MCP + A2A',
    desc: 'Model Context Protocol server & client. Expose your app to any AI model.',
    tags: ['MCP Server', 'MCP Client', 'Agent Cards'],
  },
  {
    icon: '🤖',
    title: 'Multi-Agent',
    desc: 'Four orchestration patterns: Supervisor, Pipeline, Parallel Fan-Out, and Debate.',
    tags: ['LangGraph', 'Python', 'TypeScript'],
  },
  {
    icon: '🚀',
    title: 'Production Ready',
    desc: 'FastAPI backend, Supabase auth + pgvector, Langfuse observability, Docker Compose.',
    tags: ['CI/CD', 'Edge Functions', 'Scalar Docs'],
  },
  {
    icon: '📡',
    title: 'Realtime AI',
    desc: 'Collaborative AI sessions with live presence, broadcast streaming, and shared state.',
    tags: ['Supabase Realtime', 'PWA', 'Offline'],
  },
];

const STATS = [
  { value: '90%+', label: 'Code Sharing' },
  { value: '16+', label: 'Packages' },
  { value: '30+', label: 'Roadmap Items' },
  { value: '<2min', label: 'Setup Time' },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Ambient gradient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/3 blur-3xl" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between border-b border-border/50 px-6 py-4 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            AI
          </div>
          <span className="text-sm font-semibold tracking-tight">AIForge</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/chat" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Chat
          </Link>
          <a href="https://psypher.ai" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Psypher AI
          </a>
          <a
            href="https://github.com/psypherai/AIForge"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition-all hover:bg-accent"
          >
            GitHub
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pb-16 pt-24 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Built by Psypher AI
        </div>

        <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
          Build AI Products{' '}
          <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            10x Faster
          </span>
        </h1>

        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          The ultimate monorepo starter for 2026. Next.js + Expo + FastAPI + LangGraph + Supabase — 
          one codebase, all platforms, production-grade AI from day one.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/chat"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="relative">Try AI Chat</span>
            <span className="relative">→</span>
          </Link>
          <a
            href="https://github.com/psypherai/AIForge"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/50 px-8 py-4 text-sm font-semibold backdrop-blur-sm transition-all hover:bg-card"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            Star on GitHub
          </a>
        </div>

        {/* Terminal preview */}
        <div className="mt-16 w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs text-muted-foreground">Terminal</span>
          </div>
          <div className="p-6 font-mono text-sm leading-relaxed">
            <p className="text-muted-foreground">$ git clone https://github.com/psypherai/AIForge.git</p>
            <p className="text-muted-foreground">$ cd AIForge && pnpm install</p>
            <p className="text-muted-foreground">$ pnpm dev</p>
            <p className="mt-3 text-green-400">✓ Web        → localhost:3000</p>
            <p className="text-green-400">✓ Mobile     → localhost:8081</p>
            <p className="text-green-400">✓ Backend    → localhost:8000</p>
            <p className="text-green-400">✓ API Docs   → localhost:8000/docs</p>
            <p className="mt-3 text-primary">Ready in 1.2s ⚡</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 border-y border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-border/50 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-6 py-8 text-center">
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-24">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything You Need</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Production-grade AI infrastructure, ready out of the box.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 text-3xl">{feature.icon}</div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{feature.desc}</p>
              <div className="flex flex-wrap gap-2">
                {feature.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 border-t border-border/50">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Start Building Today
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Clone, install, ship. It takes less than 2 minutes.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <code className="rounded-xl border border-border bg-card px-6 py-3 font-mono text-sm">
              npx create-aiforge my-app
            </code>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-8 text-center text-sm text-muted-foreground">
        <p>
          Built by{' '}
          <a href="https://psypher.ai" className="text-primary hover:underline">
            Psypher AI
          </a>{' '}
          · MIT License · 2026
        </p>
      </footer>
    </main>
  );
}
