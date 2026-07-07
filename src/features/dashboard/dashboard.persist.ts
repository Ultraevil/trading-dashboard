import type { Layouts } from './dashboard.types';
import { DASHBOARD_STORAGE_KEY } from './dashboard.config';

export const loadDashboardLayouts = (): Layouts | undefined => {
  try {
    const raw = localStorage.getItem(DASHBOARD_STORAGE_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
};

export const saveDashboardLayouts = (layouts: Layouts) => {
  try {
    localStorage.setItem(DASHBOARD_STORAGE_KEY, JSON.stringify(layouts));
  } catch (e) {
    console.error('Failed to persist dashboard layouts', e);
  }
};
