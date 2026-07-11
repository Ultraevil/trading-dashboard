import { baseApi } from './baseApi';
import { LOGIN } from '@/services/graphql/mutations/login';
import { REFRESH } from '@/services/graphql/mutations/refresh';
import { LOGOUT } from '@/services/graphql/mutations/logout';
import type {
  LoginResponse,
  LoginCredentials,
} from '@/features/auth/auth.types';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { accessToken: string; refreshToken: string },
      LoginCredentials
    >({
      query: (credentials) => ({
        body: JSON.stringify({
          query: LOGIN,
          variables: { input: credentials },
        }),
      }),
      transformResponse: (res: { data: LoginResponse }) => res.data.login,
      invalidatesTags: ['User'],
    }),

    refresh: builder.mutation<
      { accessToken: string; refreshToken: string },
      { refreshToken: string }
    >({
      query: (input) => ({
        body: JSON.stringify({
          query: REFRESH,
          variables: input,
        }),
      }),
    }),

    logout: builder.mutation<boolean, { refreshToken: string }>({
      query: (input) => ({
        body: JSON.stringify({
          query: LOGOUT,
          variables: input,
        }),
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshMutation, useLogoutMutation } =
  userApi;
