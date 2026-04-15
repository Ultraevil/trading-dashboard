import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { WidgetType } from '@/widgets/registry/widgetTypes';
import type {
  DashboardState,
  Breakpoint,
  LayoutItem,
  LayoutsPayload,
} from './types.ts';
import { DEFAULT_LAYOUTS } from '@/features/dashboard/config/layout.config';
import { DEFAULT_WIDGETS } from '@/features/dashboard/config/widgets.config';

const initialState: DashboardState = {
  widgets: DEFAULT_WIDGETS,
  layouts: DEFAULT_LAYOUTS,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addWidget: (state, action: PayloadAction<WidgetType>) => {
      if (!state.widgets.includes(action.payload)) {
        const id = action.payload;

        state.widgets.push(id);
        const index = state.widgets.length;

        const newItem: LayoutItem = {
          i: id,
          x: (index * 3) % 12,
          y: Math.floor((index * 3) / 12) * 2,
          w: 3,
          h: 2,
        };

        (Object.keys(state.layouts) as Breakpoint[]).forEach((bp) => {
          state.layouts[bp].push(newItem);
        });
      }
    },

    removeWidget: (state, action: PayloadAction<WidgetType>) => {
      const id = action.payload;

      state.widgets = state.widgets.filter((w) => w !== id);

      (Object.keys(state.layouts) as Breakpoint[]).forEach((bp) => {
        state.layouts[bp] = state.layouts[bp].filter((l) => l.i !== id);
      });
    },

    setLayouts: (state, action: PayloadAction<LayoutsPayload>) => {
      const incoming = action.payload;

      (Object.keys(state.layouts) as Breakpoint[]).forEach((bp) => {
        state.layouts[bp] = incoming[bp] ?? [];
      });
    },

    setState: (_, action: PayloadAction<DashboardState>) => {
      return action.payload;
    },
  },
});

export const { addWidget, removeWidget, setLayouts, setState } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
