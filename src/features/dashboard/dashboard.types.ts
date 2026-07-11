export type Breakpoint = 'lg' | 'md' | 'sm';

export interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export type Layouts = Partial<Record<Breakpoint, LayoutItem[]>>;

export interface DashboardState {
  layouts: Layouts;
}
