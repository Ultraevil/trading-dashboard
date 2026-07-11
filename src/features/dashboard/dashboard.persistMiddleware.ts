import type { Middleware } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import { saveDashboardLayouts } from './dashboard.persist';

/**
 * Saves the grid layout to localStorage, but only when it actually
 * changed. Persisting unconditionally on every dispatched action would
 * mean a synchronous localStorage write on every single websocket price
 * tick (market/setPrice), since that action also flows through this
 * middleware — Immer gives dashboardSlice's state the same object
 * reference back when its reducer didn't match the action, so this check
 * is a cheap and reliable way to detect a real layout change.
 */
export const persistDashboardMiddleware: Middleware =
  (store) => (next) => (action) => {
    const prevLayouts = (store.getState() as RootState).dashboard.layouts;
    const result = next(action);
    const nextLayouts = (store.getState() as RootState).dashboard.layouts;

    if (nextLayouts !== prevLayouts) {
      saveDashboardLayouts(nextLayouts);
    }

    return result;
  };
