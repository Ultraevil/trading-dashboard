import type { ComponentType } from 'react';
import { PriceWidget } from './components/PriceWidget/PriceWidget';
import { ChartWidget } from './components/ChartWidget/ChartWidget';
import { StatsWidget } from './components/StatsWidget/StatsWidget';

export const WIDGET_PRICE = 'price' as const;
export const WIDGET_CHART = 'chart' as const;
export const WIDGET_STATS = 'stats' as const;

export const ALL_WIDGET_TYPES = [WIDGET_PRICE, WIDGET_CHART, WIDGET_STATS] as const;

export type WidgetType = (typeof ALL_WIDGET_TYPES)[number];

export interface WidgetConfig {
  type: WidgetType;
  titleKey: string;
  component: ComponentType<object>;
}

/**
 * Maps a widget type to the component that renders it and the metadata
 * the dashboard shell needs (translation key for the title shown in the
 * widget header, sidebar "add widget" list, etc). Adding a new widget type
 * only requires a new entry here plus the component itself under
 * `features/widgets/components` (and a translation for `titleKey` in each
 * locale file).
 */
export const widgetRegistry: Record<WidgetType, WidgetConfig> = {
  price: {
    type: 'price',
    titleKey: 'widgets.price.title',
    component: PriceWidget,
  },
  chart: {
    type: 'chart',
    titleKey: 'widgets.chart.title',
    component: ChartWidget,
  },
  stats: {
    type: 'stats',
    titleKey: 'widgets.stats.title',
    component: StatsWidget,
  },
};
