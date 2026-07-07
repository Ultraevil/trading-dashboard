import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from '@/services/api/baseApi';

import authReducer from '@/features/auth/authSlice';
import dashboardReducer, {
  setState as setDashboardState,
} from '@/features/dashboard/dashboardSlice';
import widgetsReducer, {
  setActiveWidgets,
} from '@/features/widgets/widgetsSlice';
import marketReducer from '@/features/market/marketSlice';
import uiReducer from '@/features/ui/uiSlice';
import themeReducer from '@/features/theme/themeSlice';

import { loadDashboardLayouts } from '@/features/dashboard/dashboard.persist';
import { persistDashboardMiddleware } from '@/features/dashboard/dashboard.persistMiddleware';
import { loadActiveWidgets } from '@/features/widgets/widgets.persist';
import { persistWidgetsMiddleware } from '@/features/widgets/widgets.persistMiddleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    widgets: widgetsReducer,
    market: marketReducer,
    ui: uiReducer,
    theme: themeReducer,

    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApi.middleware)
      .concat(persistDashboardMiddleware)
      .concat(persistWidgetsMiddleware),
});

// Hydrate the two persisted slices from localStorage on startup. Each slice
// owns its own storage key, so they can be persisted/restored independently.
const persistedLayouts = loadDashboardLayouts();
if (persistedLayouts) {
  store.dispatch(setDashboardState({ layouts: persistedLayouts }));
}

const persistedWidgets = loadActiveWidgets();
if (persistedWidgets) {
  store.dispatch(setActiveWidgets(persistedWidgets));
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
