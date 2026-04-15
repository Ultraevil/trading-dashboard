import type { DashboardState } from './types';
import { DASHBOARD_STORAGE_KEY } from '@/features/dashboard/model/constants';

export const loadState = (): DashboardState | undefined => {
  try {
    const raw = localStorage.getItem(DASHBOARD_STORAGE_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
};

export const saveState = (state: DashboardState) => {
  try {
    localStorage.setItem(DASHBOARD_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save dashboard state', e);
  }
};
