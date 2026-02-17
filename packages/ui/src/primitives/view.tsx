/**
 * Universal View component — renders <div> on web.
 */
import { forwardRef } from 'react';
import { cn } from '../utils';

const UniversalView = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn(className)} {...props} />;
  },
);
UniversalView.displayName = 'UniversalView';

export { UniversalView };
