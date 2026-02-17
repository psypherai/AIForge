import { View, Text, TextInput, Pressable, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useCallback, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'solito/link';
import { ThemeToggle } from '../components/theme-toggle';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  'Explain the AIForge architecture',
  'How does RAG with pgvector work?',
  'Write a multi-agent workflow',
  'Help me set up Supabase auth',
];

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = useCallback(async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);

    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL ?? 'http://localhost:8000'}/api/v1/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg].map(({ role, content }) => ({ role, content })) }),
      });

      const data = await res.json();
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content ?? 'No response',
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'assistant', content: 'Failed to connect. Is the backend running?' },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [input, messages]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between border-b border-border/50 px-5 py-4">
          <View className="flex-row items-center gap-3">
            <Link href="/">
              <Pressable className="h-8 w-8 items-center justify-center rounded-lg bg-primary active:opacity-80">
                <Text className="text-sm font-bold text-primary-foreground">AI</Text>
              </Pressable>
            </Link>
            <View>
              <Text className="text-sm font-semibold text-foreground">AIForge Chat</Text>
              <Text className="text-xs text-muted-foreground">LangGraph + Vercel AI SDK</Text>
            </View>
          </View>
          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center gap-2">
              <View className={`h-2 w-2 rounded-full ${loading ? 'bg-yellow-400' : 'bg-green-400'}`} />
              <Text className="text-xs text-muted-foreground">{loading ? 'Thinking...' : 'Ready'}</Text>
            </View>
            <ThemeToggle />
          </View>
        </View>

        {/* Messages */}
        {messages.length === 0 ? (
          <View className="flex-1 items-center justify-center gap-4 px-6">
            <View className="h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Text className="text-2xl">🧠</Text>
            </View>
            <Text className="text-lg font-semibold text-foreground">What can I help with?</Text>
            <Text className="text-center text-sm text-muted-foreground">
              Ask anything — powered by LangGraph agents.
            </Text>
            <View className="mt-2 w-full gap-2">
              {SUGGESTIONS.map((s) => (
                <Pressable
                  key={s}
                  onPress={() => sendMessage(s)}
                  className="rounded-xl border border-border bg-card px-4 py-3 active:bg-accent"
                >
                  <Text className="text-sm text-foreground">{s}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            className="flex-1 px-5"
            contentContainerStyle={{ paddingVertical: 16, gap: 16 }}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            renderItem={({ item }) => (
              <View className={`flex-row ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <View className={`flex-row gap-3 max-w-[85%] ${item.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <View className={`h-8 w-8 items-center justify-center rounded-lg ${
                    item.role === 'user' ? 'bg-primary' : 'bg-muted'
                  }`}>
                    <Text className={`text-xs font-bold ${
                      item.role === 'user' ? 'text-primary-foreground' : 'text-muted-foreground'
                    }`}>
                      {item.role === 'user' ? 'You' : 'AI'}
                    </Text>
                  </View>
                  <View className={`flex-shrink rounded-2xl px-4 py-3 ${
                    item.role === 'user'
                      ? 'bg-primary'
                      : 'border border-border bg-card'
                  }`}>
                    <Text className={`text-sm leading-relaxed ${
                      item.role === 'user' ? 'text-primary-foreground' : 'text-foreground'
                    }`}>
                      {item.content}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            ListFooterComponent={
              loading ? (
                <View className="flex-row justify-start">
                  <View className="flex-row gap-3">
                    <View className="h-8 w-8 items-center justify-center rounded-lg bg-muted">
                      <Text className="text-xs font-bold text-muted-foreground">AI</Text>
                    </View>
                    <View className="flex-row items-center gap-1.5 rounded-2xl border border-border bg-card px-4 py-3">
                      <View className="h-2 w-2 rounded-full bg-primary/60" />
                      <View className="h-2 w-2 rounded-full bg-primary/40" />
                      <View className="h-2 w-2 rounded-full bg-primary/20" />
                    </View>
                  </View>
                </View>
              ) : null
            }
          />
        )}

        {/* Input */}
        <View className="flex-row gap-3 border-t border-border/50 px-5 py-4">
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Ask anything..."
            placeholderTextColor="#71717a"
            className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground"
            onSubmitEditing={() => sendMessage()}
            returnKeyType="send"
            editable={!loading}
          />
          <Pressable
            onPress={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="items-center justify-center rounded-xl bg-primary px-5 py-3 shadow-lg active:opacity-80 disabled:opacity-50"
          >
            <Text className="text-sm font-semibold text-primary-foreground">↑</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
