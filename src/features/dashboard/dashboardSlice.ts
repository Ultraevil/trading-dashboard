import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Breakpoint, DashboardState, Layouts } from './dashboard.types';
import { DEFAULT_LAYOUTS, DEFAULT_NEW_ITEM_SIZE } from './dashboard.config';
import { addWidget, removeWidget } from '@/features/widgets/widgetsSlice';

const initialState: DashboardState = {
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

    // used to hydrate from localStorage on app start
    setState: (_, action: PayloadAction<DashboardState>) => action.payload,
  },

  // Grid layout reacts to the widget list owned by `features/widgets`,
  // rather than owning that list itself — keeps "which widgets exist"
  // and "where they sit on the grid" as two separate concerns.
  extraReducers: (builder) => {
    builder.addCase(addWidget, (state, action) => {
      const id = action.payload;

      (Object.keys(state.layouts) as Breakpoint[]).forEach((bp) => {
        const existing = state.layouts[bp] ?? [];
        if (existing.some((item) => item.i === id)) return;

        state.layouts[bp] = [
          ...existing,
          { i: id, x: 0, y: 0, ...DEFAULT_NEW_ITEM_SIZE },
        ];
      });
    });

    builder.addCase(removeWidget, (state, action) => {
      const id = action.payload;

      (Object.keys(state.layouts) as Breakpoint[]).forEach((bp) => {
        state.layouts[bp] = (state.layouts[bp] ?? []).filter(
          (item) => item.i !== id,
        );
      });
    });
  },
});

export const { setLayouts, setState } = dashboardSlice.actions;

export default dashboardSlice.reducer;
