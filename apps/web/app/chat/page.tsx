'use client';

import { useChat } from '@ai-sdk/react';
import Link from 'next/link';

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  return (
    <main className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border/50 bg-background/80 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground transition-transform hover:scale-105">
            AI
          </Link>
          <div>
            <h1 className="text-sm font-semibold">AIForge Chat</h1>
            <p className="text-xs text-muted-foreground">LangGraph + Vercel AI SDK</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${isLoading ? 'animate-pulse bg-yellow-400' : 'bg-green-400'}`} />
          <span className="text-xs text-muted-foreground">{isLoading ? 'Thinking...' : 'Ready'}</span>
        </div>
      </header>

      {/* Messages */}
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-8">
        {messages.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-2xl">
              🧠
            </div>
            <div>
              <h2 className="text-lg font-semibold">What can I help you with?</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Ask me anything — I'm powered by LangGraph agents with tool calling.
              </p>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                'Explain the AIForge architecture',
                'How does the RAG pipeline work?',
                'Write a multi-agent workflow',
                'Set up Supabase pgvector',
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                      window.HTMLInputElement.prototype, 'value'
                    )?.set;
                    const inputEl = document.querySelector('input[placeholder]') as HTMLInputElement;
                    if (inputEl && nativeInputValueSetter) {
                      nativeInputValueSetter.call(inputEl, suggestion);
                      inputEl.dispatchEvent(new Event('input', { bubbles: true }));
                    }
                  }}
                  className="rounded-xl border border-border bg-card p-4 text-left text-sm transition-all hover:border-primary/30 hover:bg-accent"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[80%] gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                message.role === 'user' 
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {message.role === 'user' ? 'You' : 'AI'}
              </div>
              <div
                className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border bg-card text-foreground'
                }`}
              >
                {message.content}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold text-muted-foreground">
                AI
              </div>
              <div className="flex items-center gap-1 rounded-2xl border border-border bg-card px-4 py-3">
                <div className="h-2 w-2 animate-bounce rounded-full bg-primary/60 [animation-delay:-0.3s]" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-primary/60 [animation-delay:-0.15s]" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-primary/60" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="sticky bottom-0 border-t border-border/50 bg-background/80 backdrop-blur-md">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-3xl gap-3 px-6 py-4"
        >
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask anything..."
            className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:shadow-none"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </form>
      </div>
    </main>
  );
}
