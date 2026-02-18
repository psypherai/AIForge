import { View, Text } from 'react-native';

export function Logo({ size = 32 }: { size?: number }) {
  const fontSize = Math.round(size * 0.35);
  const borderRadius = Math.round(size * 0.22);

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7c3aed',
      }}
    >
      <Text
        style={{
          fontSize,
          fontWeight: '900',
          color: '#ffffff',
          letterSpacing: -0.5,
        }}
      >
        ⚡
      </Text>
    </View>
  );
}
