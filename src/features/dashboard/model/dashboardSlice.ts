import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  DashboardState,
  Breakpoint,
  LayoutItem,
  Layouts,
} from './types.ts';
import { DEFAULT_LAYOUTS } from '@/features/dashboard/config/layout.config';
import { DEFAULT_WIDGETS } from '@/features/dashboard/config/widgets.config';
import { WidgetType } from '@/widgets/registry/widgetTypes';

const initialState: DashboardState = {
  widgets: DEFAULT_WIDGETS,
  layouts: DEFAULT_LAYOUTS,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setLayouts: (state, action: PayloadAction<Layouts>) => {
      const incoming = action.payload;

      (Object.keys(state.layouts) as Breakpoint[]).forEach((bp) => {
        state.layouts[bp] = incoming[bp] ? [...incoming[bp]] : [];
      });
    },

    addWidget: (
      state,
      action: PayloadAction<{ id: WidgetType; item: LayoutItem }>,
    ) => {
      const { id, item } = action.payload;

      if (!state.widgets.includes(id)) {
        state.widgets.push(id);

        (Object.keys(state.layouts) as Breakpoint[]).forEach((bp) => {
          state.layouts[bp] = [...(state.layouts[bp] ?? []), item];
        });
      }
    },

    removeWidget: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      state.widgets = state.widgets.filter((w) => w !== id);

      (Object.keys(state.layouts) as Breakpoint[]).forEach((bp) => {
        state.layouts[bp] = state.layouts[bp]?.filter((l) => l.i !== id) ?? [];
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
