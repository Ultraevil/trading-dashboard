import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/services/api/baseApi';
import authReducer from '@/features/auth/authSlice';
import dashboardReducer from '@/features/dashboard/dashboardSlice';
import widgetsReducer from '@/features/widgets/widgetsSlice';
import marketReducer from '@/features/market/marketSlice';
import uiReducer from '@/features/ui/uiSlice';
import themeReducer from '@/features/theme/themeSlice';
import type { RootState } from '@/app/store';

export const createTestStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
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
      getDefaultMiddleware().concat(baseApi.middleware),
    preloadedState: preloadedState as RootState | undefined,
  });

export type TestStore = ReturnType<typeof createTestStore>;
