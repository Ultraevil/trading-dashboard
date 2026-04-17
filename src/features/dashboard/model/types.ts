import type { WidgetType } from '@/widgets/registry/widgetTypes';


export type Breakpoint = 'lg' | 'md' | 'sm';

export type LayoutItem = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type Layouts = Partial<Record<Breakpoint, LayoutItem[]>>;

export interface DashboardState {
  widgets: WidgetType[];
  layouts: Layouts;
}


export type LayoutsPayload = Record<Breakpoint, LayoutItem[]>;


