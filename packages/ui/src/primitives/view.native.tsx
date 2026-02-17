/**
 * Native View primitive — renders <View> on React Native with NativeWind.
 */
import { forwardRef } from 'react';
import { View, type ViewProps } from 'react-native';

const UniversalView = forwardRef<View, ViewProps>(({ className, ...props }, ref) => {
  return <View ref={ref} className={className} {...props} />;
});
UniversalView.displayName = 'UniversalView';

export { UniversalView };
