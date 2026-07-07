import type { ComponentType } from 'react';
import { PriceWidget } from '@/widgets/PriceWidget/PriceWidget';
import { ChartWidget } from '@/widgets/ChartWidget/ChartWidget';
import { StatsWidget } from '@/widgets/StatsWidget/StatsWidget';

export const WIDGET_PRICE = 'price' as const;
export const WIDGET_CHART = 'chart' as const;
export const WIDGET_STATS = 'stats' as const;

export const ALL_WIDGET_TYPES = [WIDGET_PRICE, WIDGET_CHART, WIDGET_STATS] as const;

export type WidgetType = (typeof ALL_WIDGET_TYPES)[number];

export interface WidgetConfig {
  type: WidgetType;
  title: string;
  component: ComponentType<object>;
}

/**
 * Maps a widget type to the component that renders it and the metadata
 * the dashboard shell needs (title shown in the widget header, sidebar
 * "add widget" list, etc). Adding a new widget type only requires a new
 * entry here plus the component itself under `src/widgets`.
 */
export const widgetRegistry: Record<WidgetType, WidgetConfig> = {
  price: {
    type: 'price',
    title: 'Brent Price',
    component: PriceWidget,
  },
  chart: {
    type: 'chart',
    title: 'BTC Chart',
    component: ChartWidget,
  },
  stats: {
    type: 'stats',
    title: 'BTC Stats',
    component: StatsWidget,
  },
};
