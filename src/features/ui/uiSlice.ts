import { createSlice, nanoid } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

export type ToastVariant = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
}

export interface UiState {
  isSidebarCollapsed: boolean;
  toasts: Toast[];
}

const initialState: UiState = {
  isSidebarCollapsed: false,
  toasts: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
    },

    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },

    addToast: {
      reducer: (state, action: PayloadAction<Toast>) => {
        state.toasts.push(action.payload);
      },
      prepare: (message: string, variant: ToastVariant = 'info') => ({
        payload: { id: nanoid(), message, variant },
      }),
    },

    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const { toggleSidebar, setSidebarCollapsed, addToast, removeToast } =
  uiSlice.actions;

export const selectIsSidebarCollapsed = (state: RootState) =>
  state.ui.isSidebarCollapsed;

export const selectToasts = (state: RootState) => state.ui.toasts;

export default uiSlice.reducer;
