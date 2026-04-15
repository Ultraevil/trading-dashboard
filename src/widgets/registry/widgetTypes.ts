import type { ComponentType } from 'react';
import type { DEFAULT_WIDGETS } from '@/features/dashboard/config/widgets.config.ts';

export type WidgetType = (typeof DEFAULT_WIDGETS)[number];

export interface WidgetConfig {
  type: WidgetType;
  title: string;
  component: ComponentType<object>;
}
