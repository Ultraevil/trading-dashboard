import type { ReactNode } from 'react';

export interface WidgetContainerProps {
  title: string;
  children: ReactNode;
  onRemove?: () => void;
  onRefresh?: () => void;
}
