import { View, Text, Pressable } from 'react-native';
import { Link } from 'solito/link';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeToggle } from '../components/theme-toggle';
import { Logo } from '../components/logo';

const HIGHLIGHTS = [
  { icon: '⚡', label: 'Web + Mobile' },
  { icon: '🧠', label: 'AI-Native' },
  { icon: '🔗', label: 'MCP' },
  { icon: '🤖', label: 'Multi-Agent' },
  { icon: '🚀', label: 'Production' },
  { icon: '📡', label: 'Realtime' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Nav */}
      <View className="flex-row items-center justify-between border-b border-border/50 px-5 py-4">
        <View className="flex-row items-center gap-3">
          <Logo size={32} />
          <Text className="text-sm font-semibold text-foreground">AIForge</Text>
        </View>
        <View className="flex-row items-center gap-3">
          <View className="flex-row items-center gap-2">
            <View className="h-2 w-2 rounded-full bg-green-400" />
            <Text className="text-xs text-muted-foreground">Ready</Text>
          </View>
          <ThemeToggle />
        </View>
      </View>

      {/* Content — centered, no scroll */}
      <View className="flex-1 items-center justify-center px-6">
        {/* Badge */}
        <View className="mb-5 flex-row items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
          <View className="h-1.5 w-1.5 rounded-full bg-primary" />
          <Text className="text-xs font-medium text-primary">Built by Psypher AI</Text>
        </View>

        {/* Title */}
        <Text className="text-center text-4xl font-bold tracking-tight text-foreground">
          Build AI Products{'\n'}
          <Text className="text-primary">10x Faster</Text>
        </Text>

        {/* Subtitle */}
        <Text className="mt-4 max-w-xs text-center text-base leading-relaxed text-muted-foreground">
          One codebase, all platforms, production AI from day one.
        </Text>

        {/* CTA */}
        <View className="mt-8 flex-row gap-3">
          <Link href="/chat">
            <Pressable className="flex-row items-center gap-2 rounded-xl bg-primary px-7 py-4 shadow-lg active:opacity-80">
              <Text className="text-sm font-semibold text-primary-foreground">Try AI Chat</Text>
              <Text className="text-sm text-primary-foreground">→</Text>
            </Pressable>
          </Link>
        </View>

        {/* Stats row */}
        <View className="mt-10 w-full flex-row rounded-2xl border border-border bg-card">
          <View className="flex-1 items-center border-r border-border py-4">
            <Text className="text-xl font-bold text-foreground">90%+</Text>
            <Text className="text-xs text-muted-foreground">Shared</Text>
          </View>
          <View className="flex-1 items-center border-r border-border py-4">
            <Text className="text-xl font-bold text-foreground">16+</Text>
            <Text className="text-xs text-muted-foreground">Packages</Text>
          </View>
          <View className="flex-1 items-center py-4">
            <Text className="text-xl font-bold text-foreground">&lt;2m</Text>
            <Text className="text-xs text-muted-foreground">Setup</Text>
          </View>
        </View>

        {/* Feature chips */}
        <View className="mt-6 flex-row flex-wrap justify-center gap-2">
          {HIGHLIGHTS.map((h) => (
            <View key={h.label} className="flex-row items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2">
              <Text className="text-sm">{h.icon}</Text>
              <Text className="text-xs font-medium text-muted-foreground">{h.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Footer */}
      <View className="items-center border-t border-border/50 px-6 py-4">
        <Text className="text-xs text-muted-foreground">
          Psypher AI · MIT · 2026
        </Text>
      </View>
    </SafeAreaView>
  );
}
