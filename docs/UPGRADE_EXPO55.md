# Upgrading to Expo SDK 55 + NativeWind v5

This guide covers upgrading AIForge from Expo SDK 54 + NativeWind v4 to Expo SDK 55 + NativeWind v5.

> **Status**: The template ships with Expo SDK 54 + NativeWind v4 for maximum stability. Follow this guide when Expo SDK 55 reaches stable release.

## Prerequisites

- Ensure all tests pass before upgrading
- Create a new branch: `git checkout -b feat/expo-55-upgrade`

## Step 1: Upgrade Expo SDK

```bash
cd apps/mobile
npx expo install expo@~55 --fix
```

This will automatically upgrade all Expo packages to compatible versions.

## Step 2: Upgrade React Native

```bash
npx expo install react-native@latest
```

## Step 3: Upgrade NativeWind to v5

```bash
# Remove NativeWind v4
pnpm remove nativewind tailwindcss --filter @aiforge/mobile

# Install NativeWind v5 + Tailwind CSS v4
pnpm add nativewind@^5.0.0 --filter @aiforge/mobile
pnpm add -D tailwindcss@^4.0.0 --filter @aiforge/mobile
```

## Step 4: Update Configuration

### `tailwind.config.js` → `tailwind.config.ts`

NativeWind v5 uses Tailwind CSS v4's new config format:

```ts
// apps/mobile/tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        background: 'var(--color-background)',
      },
    },
  },
} satisfies Config;
```

### `babel.config.js`

NativeWind v5 may change its Babel plugin. Check the [NativeWind v5 migration guide](https://www.nativewind.dev/v5/migration).

### `metro.config.js`

Update the Metro config to use NativeWind v5's new plugin:

```js
const { withNativeWind } = require('nativewind/metro');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, {
  input: './global.css',
  // NativeWind v5 options
  cssInterop: true,
});
```

## Step 5: Update CSS

NativeWind v5 with Tailwind v4 uses the new `@import` syntax:

```css
/* apps/mobile/global.css */
@import "tailwindcss";

@theme {
  --color-primary: #7c3aed;
  --color-background: #09090b;
  --color-foreground: #fafafa;
}
```

## Step 6: Test

```bash
# Clear all caches
cd apps/mobile
rm -rf node_modules .expo
pnpm install
pnpm dev
```

Test on:
- [ ] iOS Simulator
- [ ] Android Emulator
- [ ] Web (Metro web)

## Troubleshooting

### Styles not applying on web
Add `important: true` to your Tailwind config to override React Native Web's atomic CSS.

### Metro bundler errors
Clear the cache: `expo start --clear`

### NativeWind v5 not found
Ensure your `babel.config.js` includes the NativeWind preset.
