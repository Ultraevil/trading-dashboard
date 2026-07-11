import type { Middleware } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import { saveActiveWidgets } from './widgets.persist';

/**
 * Saves the active widget list to localStorage, but only when it actually
 * changed (see the identical reasoning in dashboard.persistMiddleware.ts —
 * this middleware also sees every market/setPrice tick, which shouldn't
 * trigger a write).
 */
export const persistWidgetsMiddleware: Middleware =
  (store) => (next) => (action) => {
    const prevActive = (store.getState() as RootState).widgets.active;
    const result = next(action);
    const nextActive = (store.getState() as RootState).widgets.active;

    if (nextActive !== prevActive) {
      saveActiveWidgets(nextActive);
    }

    return result;
  };
