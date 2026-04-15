import type { RootState } from '@/app/store/store.ts';

export const selectLayouts = (state: RootState) => state.dashboard.layouts;

export const selectWidgets = (state: RootState) => state.dashboard.widgets;
