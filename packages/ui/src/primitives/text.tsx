/**
 * Universal Text component — renders <span> on web, <Text> on native.
 * Uses .native.tsx convention for platform splitting via Solito/Metro.
 */
import { forwardRef } from 'react';
import { cn } from '../utils';

interface UniversalTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';
}

const variantClasses: Record<string, string> = {
  h1: 'text-4xl font-bold tracking-tight',
  h2: 'text-2xl font-semibold tracking-tight',
  h3: 'text-xl font-semibold',
  body: 'text-base',
  caption: 'text-sm text-muted-foreground',
  label: 'text-sm font-medium',
};

const UniversalText = forwardRef<HTMLSpanElement, UniversalTextProps>(
  ({ className, variant = 'body', ...props }, ref) => {
    return <span ref={ref} className={cn(variantClasses[variant], className)} {...props} />;
  },
);
UniversalText.displayName = 'UniversalText';

export { UniversalText };
export type { UniversalTextProps };
