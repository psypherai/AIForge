/**
 * Native Text primitive — renders <Text> on React Native with NativeWind.
 */
import { forwardRef } from 'react';
import { Text, type TextProps } from 'react-native';

interface UniversalTextProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';
}

const variantClasses: Record<string, string> = {
  h1: 'text-4xl font-bold tracking-tight text-foreground',
  h2: 'text-2xl font-semibold tracking-tight text-foreground',
  h3: 'text-xl font-semibold text-foreground',
  body: 'text-base text-foreground',
  caption: 'text-sm text-muted-foreground',
  label: 'text-sm font-medium text-foreground',
};

const UniversalText = forwardRef<Text, UniversalTextProps>(
  ({ className, variant = 'body', ...props }, ref) => {
    const baseClass = variantClasses[variant] || '';
    const combinedClass = className ? `${baseClass} ${className}` : baseClass;
    return <Text ref={ref} className={combinedClass} {...props} />;
  },
);
UniversalText.displayName = 'UniversalText';

export { UniversalText };
export type { UniversalTextProps };
