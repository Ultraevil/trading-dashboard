import type { WidgetType } from '@/widgets/registry/widgetTypes';


export type Breakpoint = 'lg' | 'md' | 'sm';

export type LayoutItem = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type Layouts = Record<Breakpoint, LayoutItem[]>;

export interface DashboardState {
  widgets: readonly WidgetType[];
  layouts: Layouts;
}


export type LayoutsPayload = Record<Breakpoint, LayoutItem[]>;


