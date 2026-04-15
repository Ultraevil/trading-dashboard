import { PriceWidget } from '@/widgets/price/ui/PriceWidget';

import type { WidgetConfig, WidgetType } from './widgetTypes';

export const widgetRegistry: Record<WidgetType, WidgetConfig> = {
  price: {
    type: 'price',
    title: 'Brent Price',
    component: PriceWidget,
  },

  chart: {
    type: 'chart',
    title: 'Chart',
    component: PriceWidget,
  },

  stats: {
    type: 'stats',
    title: 'Stats',
    component: PriceWidget,
  },
};
