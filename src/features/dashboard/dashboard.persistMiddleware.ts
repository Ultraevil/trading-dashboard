import type { Middleware } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import { saveDashboardLayouts } from './dashboard.persist';

/** Saves the grid layout to localStorage after every dispatched action. */
export const persistDashboardMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);

    const state = store.getState() as RootState;
    saveDashboardLayouts(state.dashboard.layouts);

    return result;
  };
