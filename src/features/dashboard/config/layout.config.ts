import type { Layouts } from '@/features/dashboard/model/types';
import {
  WIDGET_CHART,
  WIDGET_PRICE,
  WIDGET_STATS,
} from '@/features/dashboard/config/widgets.config';

export const DEFAULT_LAYOUTS: Layouts = {
  lg: [
    { i: WIDGET_PRICE, x: 0, y: 0, w: 1, h: 1 },
    { i: WIDGET_CHART, x: 1, y: 0, w: 1, h: 1 },
    { i: WIDGET_STATS, x: 2, y: 0, w: 1, h: 1 },
  ],
  md: [
    { i: WIDGET_PRICE, x: 0, y: 0, w: 1, h: 1 },
    { i: WIDGET_CHART, x: 1, y: 0, w: 1, h: 1 },
    { i: WIDGET_STATS, x: 2, y: 0, w: 1, h: 1 },
  ],
  sm: [
    { i: WIDGET_PRICE, x: 0, y: 0, w: 1, h: 1 },
    { i: WIDGET_CHART, x: 1, y: 0, w: 1, h: 1 },
    { i: WIDGET_STATS, x: 2, y: 0, w: 1, h: 1 },
  ],
};
