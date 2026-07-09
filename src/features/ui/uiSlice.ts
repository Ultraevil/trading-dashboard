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

const MOBILE_QUERY = '(max-width: 600px)';

/**
 * On desktop `isSidebarCollapsed` toggles between a full sidebar and a
 * compact icon rail; on mobile the same flag toggles an off-canvas drawer
 * (see Sidebar.styles.ts). Defaulting it to "collapsed" on narrow
 * viewports means the drawer starts closed instead of covering the whole
 * screen on first load.
 */
const getInitialSidebarCollapsed = (): boolean => {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia(MOBILE_QUERY).matches;
};

const initialState: UiState = {
  isSidebarCollapsed: getInitialSidebarCollapsed(),
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
