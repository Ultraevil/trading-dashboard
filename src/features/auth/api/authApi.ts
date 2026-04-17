import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlBaseQuery } from '@/services/graphql/baseGraphql';
import type { LoginResponse, LoginCredentials } from '../model/types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: graphqlBaseQuery({
    baseUrl: import.meta.env.VITE_GRAPHQL_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<
      { accessToken: string },
      { email: string; password: string }
    >({
      query: (credentials: LoginCredentials) => ({
        body: JSON.stringify({
          query: `
            mutation Login($input: LoginInput!) {
              login(input: $input) {
                accessToken
              }
            }
          `,
          variables: {
            input: credentials,
          },
        }),
      }),
      transformResponse: (res: { data: LoginResponse }) => res.data.login,
    }),
  }),
});

export const { useLoginMutation } = authApi;
