import { Pressable, Text } from 'react-native';
import { useColorScheme } from 'nativewind';

export function ThemeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();

  const cycleTheme = () => {
    if (colorScheme === 'dark') setColorScheme('light');
    else setColorScheme('dark');
  };

  return (
    <Pressable
      onPress={cycleTheme}
      className="h-9 w-9 items-center justify-center rounded-lg border border-border bg-card active:opacity-70"
      accessibilityLabel={`Current theme: ${colorScheme}. Tap to switch.`}
    >
      <Text className="text-base">
        {colorScheme === 'dark' ? '☀️' : '🌙'}
      </Text>
    </Pressable>
  );
}
