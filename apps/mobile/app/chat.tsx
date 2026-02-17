import { View, Text, TextInput, Pressable, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

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
        { id: (Date.now() + 1).toString(), role: 'assistant', content: 'Failed to get response.' },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, messages]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="border-b border-border p-4">
          <Text className="text-xl font-bold text-foreground">AIForge Chat</Text>
          <Text className="text-sm text-muted-foreground">Powered by LangGraph</Text>
        </View>

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          className="flex-1 px-4"
          contentContainerStyle={{ paddingVertical: 16, gap: 12 }}
          renderItem={({ item }) => (
            <View className={`flex-row ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <View
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  item.role === 'user' ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <Text
                  className={`text-sm ${
                    item.role === 'user' ? 'text-primary-foreground' : 'text-foreground'
                  }`}
                >
                  {item.content}
                </Text>
              </View>
            </View>
          )}
        />

        <View className="flex-row gap-2 border-t border-border p-4">
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Ask anything..."
            placeholderTextColor="#71717a"
            className="flex-1 rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground"
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
          <Pressable
            onPress={sendMessage}
            disabled={loading}
            className="rounded-xl bg-primary px-6 py-3 active:opacity-80 disabled:opacity-50"
          >
            <Text className="text-sm font-semibold text-primary-foreground">Send</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
