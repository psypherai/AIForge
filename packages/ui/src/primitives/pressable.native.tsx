/**
 * Native Pressable — renders <Pressable> on React Native with NativeWind.
 */
import { forwardRef } from 'react';
import { Pressable, type PressableProps } from 'react-native';

const UniversalPressable = forwardRef<typeof Pressable, PressableProps>(
  ({ className, ...props }, ref) => {
    return <Pressable ref={ref as any} className={`active:opacity-80 ${className ?? ''}`} {...props} />;
  },
);
UniversalPressable.displayName = 'UniversalPressable';

export { UniversalPressable };
