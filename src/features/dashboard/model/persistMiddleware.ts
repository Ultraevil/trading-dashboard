import type { Middleware } from '@reduxjs/toolkit';
import { saveState } from './persist';

export const persistDashboardMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);

    const state = store.getState();

    saveState(state.dashboard);

    return result;
  };
