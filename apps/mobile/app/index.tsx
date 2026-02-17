import { View, Text, Pressable } from 'react-native';
import { Link } from 'solito/link';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-6 bg-background p-6">
      <View className="items-center gap-3">
        <View className="rounded-2xl bg-primary/10 px-4 py-1.5">
          <Text className="text-sm font-medium text-primary">Psypher AI</Text>
        </View>
        <Text className="text-4xl font-bold tracking-tight text-foreground">
          AIForge
        </Text>
        <Text className="text-center text-base text-muted-foreground">
          The #1 AI-native monorepo for 2026+
        </Text>
      </View>

      <Link href="/chat">
        <Pressable className="rounded-xl bg-primary px-6 py-3 active:opacity-80">
          <Text className="text-sm font-semibold text-primary-foreground">Try AI Chat</Text>
        </Pressable>
      </Link>
    </View>
  );
}
