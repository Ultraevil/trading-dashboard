import type { Middleware } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import { saveActiveWidgets } from './widgets.persist';

/** Saves the active widget list to localStorage after every dispatched action. */
export const persistWidgetsMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);

    const state = store.getState() as RootState;
    saveActiveWidgets(state.widgets.active);

    return result;
  };
