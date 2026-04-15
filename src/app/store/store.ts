import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/services/api/baseApi';
import dashboardReducer, {
  setState,
} from '@/features/dashboard/model/dashboardSlice';
import { persistDashboardMiddleware } from '@/features/dashboard/model/persistMiddleware';
import { loadState } from '@/features/dashboard/model/persist';

const preloaded = loadState();

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    dashboard: dashboardReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApi.middleware)
      .concat(persistDashboardMiddleware),
});

if (preloaded) {
  store.dispatch(setState(preloaded));
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
