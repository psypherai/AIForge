import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="rounded-2xl bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          Psypher AI
        </div>
        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
          AIForge{' '}
          <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Starter Pack
          </span>
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          The #1 AI-native monorepo template for 2026+. Ship web, mobile, and AI products at
          maximum velocity with 90%+ code sharing.
        </p>
      </div>

      <div className="flex gap-4">
        <Link
          href="/chat"
          className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90"
        >
          Try AI Chat
        </Link>
        <a
          href="https://github.com/psypher-ai/aiforge"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-border px-6 py-3 text-sm font-semibold shadow-sm transition-all hover:bg-accent"
        >
          GitHub
        </a>
      </div>

      <div className="mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
        {[
          {
            title: 'Web + Mobile',
            desc: 'Next.js 16 + Expo SDK 55 with Solito universal navigation.',
          },
          {
            title: 'AI-Native',
            desc: 'Vercel AI SDK v4, LangGraph, RAG with pgvector, streaming.',
          },
          {
            title: 'Production Ready',
            desc: 'FastAPI backend, Supabase, Langfuse observability, CI/CD.',
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
          >
            <h3 className="mb-2 text-lg font-semibold">{card.title}</h3>
            <p className="text-sm text-muted-foreground">{card.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
