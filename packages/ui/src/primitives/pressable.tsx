/**
 * Universal Pressable — renders <button> on web.
 */
import { forwardRef } from 'react';
import { cn } from '../utils';

const UniversalPressable = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn('cursor-pointer transition-opacity active:opacity-80', className)}
        {...props}
      />
    );
  },
);
UniversalPressable.displayName = 'UniversalPressable';

export { UniversalPressable };
