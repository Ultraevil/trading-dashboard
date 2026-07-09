import type { RootState } from '@/app/store';

export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.auth.accessToken);

export const selectAuthEmail = (state: RootState) => state.auth.email;

export const selectAuthAccessToken = (state: RootState) =>
  state.auth.accessToken;
