import type { Layouts, LayoutItem } from './dashboard.types';
import {
  WIDGET_PRICE,
  WIDGET_CHART,
  WIDGET_STATS,
} from '@/features/widgets/widgets.registry';

export const DASHBOARD_STORAGE_KEY = 'dashboard_layouts_v2';

export const DEFAULT_LAYOUTS: Layouts = {
  lg: [
    { i: WIDGET_PRICE, x: 0, y: 0, w: 1, h: 1 },
    { i: WIDGET_CHART, x: 1, y: 0, w: 1, h: 1 },
    { i: WIDGET_STATS, x: 2, y: 0, w: 1, h: 1 },
  ],
  md: [
    { i: WIDGET_PRICE, x: 0, y: 0, w: 1, h: 1 },
    { i: WIDGET_CHART, x: 1, y: 0, w: 1, h: 1 },
    { i: WIDGET_STATS, x: 0, y: 1, w: 1, h: 1 },
  ],
  sm: [
    { i: WIDGET_PRICE, x: 0, y: 0, w: 1, h: 1 },
    { i: WIDGET_CHART, x: 0, y: 1, w: 1, h: 1 },
    { i: WIDGET_STATS, x: 0, y: 2, w: 1, h: 1 },
  ],
};

/** Default grid size given to a widget added from the sidebar. */
export const DEFAULT_NEW_ITEM_SIZE: Pick<LayoutItem, 'w' | 'h'> = {
  w: 1,
  h: 1,
};
