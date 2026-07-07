import type { RootState } from '@/app/store';

export const selectLayouts = (state: RootState) => state.dashboard.layouts;
