import { Pressable, Text } from 'react-native';
import { colorScheme as nwColorScheme, useColorScheme } from 'nativewind';

export function ThemeToggle() {
  const { colorScheme } = useColorScheme();

  return (
    <Pressable
      onPress={() => nwColorScheme.toggle()}
      className="h-9 w-9 items-center justify-center rounded-lg border border-border bg-card active:opacity-70"
      accessibilityLabel={`Current theme: ${colorScheme}. Tap to switch.`}
    >
      <Text className="text-base">
        {colorScheme === 'dark' ? '☀️' : '🌙'}
      </Text>
    </Pressable>
  );
}
