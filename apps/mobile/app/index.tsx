import { View, Text, Pressable, ScrollView } from 'react-native';
import { Link } from 'solito/link';
import { SafeAreaView } from 'react-native-safe-area-context';

const FEATURES = [
  { icon: '⚡', title: 'Web + Mobile', desc: 'Next.js 16 + Expo SDK 54 with 90%+ shared code' },
  { icon: '🧠', title: 'AI-Native', desc: 'Vercel AI SDK v6, LangGraph, RAG, streaming' },
  { icon: '🔗', title: 'MCP Server', desc: 'Model Context Protocol for any AI model' },
  { icon: '🤖', title: 'Multi-Agent', desc: 'Supervisor, Pipeline, Parallel, Debate patterns' },
  { icon: '🚀', title: 'Production', desc: 'FastAPI, Supabase, Langfuse, Docker, CI/CD' },
  { icon: '📡', title: 'Realtime AI', desc: 'Collaborative sessions with live presence' },
];

const STATS = [
  { value: '90%+', label: 'Shared' },
  { value: '16+', label: 'Packages' },
  { value: '<2m', label: 'Setup' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Nav */}
        <View className="flex-row items-center justify-between border-b border-border/50 px-5 py-4">
          <View className="flex-row items-center gap-3">
            <View className="h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Text className="text-sm font-bold text-primary-foreground">AI</Text>
            </View>
            <Text className="text-sm font-semibold text-foreground">AIForge</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="h-2 w-2 rounded-full bg-green-400" />
            <Text className="text-xs text-muted-foreground">Ready</Text>
          </View>
        </View>

        {/* Hero */}
        <View className="items-center gap-5 px-6 pt-12">
          <View className="flex-row items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <View className="h-1.5 w-1.5 rounded-full bg-primary" />
            <Text className="text-xs font-medium text-primary">Built by Psypher AI</Text>
          </View>

          <Text className="text-center text-4xl font-bold tracking-tight text-foreground">
            Build AI Products{'\n'}
            <Text className="text-primary">10x Faster</Text>
          </Text>

          <Text className="max-w-sm text-center text-base leading-relaxed text-muted-foreground">
            The ultimate monorepo for 2026. One codebase, all platforms, production AI from day one.
          </Text>

          <View className="flex-row gap-3 pt-2">
            <Link href="/chat">
              <Pressable className="flex-row items-center gap-2 rounded-xl bg-primary px-6 py-3.5 shadow-lg active:opacity-80">
                <Text className="text-sm font-semibold text-primary-foreground">Try AI Chat</Text>
                <Text className="text-sm text-primary-foreground">→</Text>
              </Pressable>
            </Link>
          </View>
        </View>

        {/* Stats */}
        <View className="mx-6 mt-10 flex-row rounded-2xl border border-border bg-card">
          {STATS.map((stat, i) => (
            <View
              key={stat.label}
              className={`flex-1 items-center py-5 ${i < STATS.length - 1 ? 'border-r border-border' : ''}`}
            >
              <Text className="text-2xl font-bold text-foreground">{stat.value}</Text>
              <Text className="mt-0.5 text-xs text-muted-foreground">{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Terminal */}
        <View className="mx-6 mt-6 overflow-hidden rounded-2xl border border-border bg-card">
          <View className="flex-row items-center gap-2 border-b border-border px-4 py-3">
            <View className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <View className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <View className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            <Text className="ml-2 text-xs text-muted-foreground">Terminal</Text>
          </View>
          <View className="gap-1 p-5">
            <Text className="font-mono text-xs text-muted-foreground">$ git clone .../AIForge.git</Text>
            <Text className="font-mono text-xs text-muted-foreground">$ pnpm install && pnpm dev</Text>
            <Text className="mt-2 font-mono text-xs text-green-400">✓ Web     → :3000</Text>
            <Text className="font-mono text-xs text-green-400">✓ Mobile  → :8081</Text>
            <Text className="font-mono text-xs text-green-400">✓ Backend → :8000</Text>
            <Text className="mt-2 font-mono text-xs text-primary">Ready in 1.2s ⚡</Text>
          </View>
        </View>

        {/* Features */}
        <View className="px-6 pt-10">
          <Text className="mb-1 text-xl font-bold text-foreground">Everything You Need</Text>
          <Text className="mb-6 text-sm text-muted-foreground">Production-grade AI, out of the box.</Text>
          <View className="gap-3">
            {FEATURES.map((f) => (
              <View key={f.title} className="flex-row gap-4 rounded-2xl border border-border bg-card p-4">
                <Text className="text-2xl">{f.icon}</Text>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-foreground">{f.title}</Text>
                  <Text className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{f.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View className="mt-10 items-center border-t border-border/50 px-6 pt-6">
          <Text className="text-xs text-muted-foreground">
            Built by Psypher AI · MIT License · 2026
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
