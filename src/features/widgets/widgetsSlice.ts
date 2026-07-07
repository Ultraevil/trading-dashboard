import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import { ALL_WIDGET_TYPES, type WidgetType } from './widgets.registry';

export interface WidgetsState {
  active: WidgetType[];
}

const initialState: WidgetsState = {
  // by default every known widget type is shown on the dashboard
  active: [...ALL_WIDGET_TYPES],
};

const widgetsSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    addWidget: (state, action: PayloadAction<WidgetType>) => {
      if (!state.active.includes(action.payload)) {
        state.active.push(action.payload);
      }
    },

    removeWidget: (state, action: PayloadAction<WidgetType>) => {
      state.active = state.active.filter((w) => w !== action.payload);
    },

    // used to hydrate from localStorage on app start
    setActiveWidgets: (state, action: PayloadAction<WidgetType[]>) => {
      state.active = action.payload;
    },
  },
});

export const { addWidget, removeWidget, setActiveWidgets } =
  widgetsSlice.actions;

export const selectActiveWidgets = (state: RootState) => state.widgets.active;

export default widgetsSlice.reducer;
