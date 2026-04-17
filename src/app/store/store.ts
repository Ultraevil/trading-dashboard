import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/services/api/baseApi';
import dashboardReducer, {
  setState,
} from '@/features/dashboard/model/dashboardSlice';
import { persistDashboardMiddleware } from '@/features/dashboard/model/persistMiddleware';
import { loadState } from '@/features/dashboard/model/persist';
import { authApi } from '@/features/auth/api/authApi';
import authReducer from '@/features/auth/model/authSlice';

const preloaded = loadState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,

    // API slices
    [baseApi.reducerPath]: baseApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApi.middleware)
      .concat(authApi.middleware)
      .concat(persistDashboardMiddleware),
});

if (preloaded) {
  store.dispatch(setState(preloaded));
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
