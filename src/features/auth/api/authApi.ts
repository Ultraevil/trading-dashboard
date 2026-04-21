import type { LoginResponse, LoginCredentials } from '../model/types';
import { setTokens } from '@/features/auth/model/authSlice';
import { baseApi } from '@/services/api/baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { accessToken: string; refreshToken: string },
      { email: string; password: string }
    >({
      query: (credentials: LoginCredentials) => ({
        body: JSON.stringify({
          query: `
            mutation Login($input: LoginInput!) {
              login(input: $input) {
                accessToken
                refreshToken
              }
            }
          `,
          variables: {
            input: credentials,
          },
        }),
      }),
      transformResponse: (res: { data: LoginResponse }) => res.data.login,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        dispatch(setTokens(data));
        localStorage.setItem('refreshToken', data.refreshToken);
      },
    }),

    refresh: builder.mutation<
      { accessToken: string; refreshToken: string },
      { refreshToken: string }
    >({
      query: (input) => ({
        body: JSON.stringify({
          query: `
            mutation Refresh($refreshToken: String!) {
              refresh(refreshToken: $refreshToken) {
                accessToken
                refreshToken
              }
            }
          `,
          variables: input,
        }),
      }),
    }),

    logout: builder.mutation<boolean, { refreshToken: string }>({
      query: (input) => ({
        body: JSON.stringify({
          query: `
            mutation Logout($refreshToken: String!) {
              logout(refreshToken: $refreshToken)
            }
          `,
          variables: input,
        }),
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshMutation,
  useLogoutMutation,
} = authApi;
