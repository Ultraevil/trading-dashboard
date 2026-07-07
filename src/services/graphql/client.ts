import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { refreshTokenRequest } from '@/services/auth/refreshToken';
import { setAccessToken, logout } from '@/features/auth/authSlice';

type GraphQLError = {
  message: string;
  extensions?: {
    code?: string;
  };
};

type GraphQLResponse<T> = {
  data?: T;
  errors?: GraphQLError[];
};

/**
 * A minimal GraphQL-over-fetch base query for RTK Query.
 *
 * This project talks to its GraphQL endpoint using plain `fetch`
 * rather than a full Apollo Client, since RTK Query already gives us
 * caching/invalidation and we only need a thin transport. It also
 * transparently refreshes the access token on a 401 / UNAUTHENTICATED
 * response and retries the original request once.
 */
export const graphqlBaseQuery =
  ({ baseUrl }: { baseUrl: string }): BaseQueryFn =>
  async ({ body }, { dispatch }) => {
    const token = localStorage.getItem('accessToken');

    const makeRequest = async (accessToken?: string) => {
      return fetch(baseUrl, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {}),
        },
        body: body as string,
      });
    };

    let response = await makeRequest(token ?? undefined);
    let data: GraphQLResponse<unknown> = await response.json();

    const isUnauthorized =
      response.status === 401 ||
      data.errors?.some((e) => e.extensions?.code === 'UNAUTHENTICATED');

    if (isUnauthorized) {
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        dispatch(logout());
        return { error: { status: 401, data: 'Unauthorized' } };
      }

      const refreshData = await refreshTokenRequest(baseUrl, refreshToken);

      if (refreshData) {
        const { accessToken, refreshToken: newRefreshToken } = refreshData;

        dispatch(setAccessToken(accessToken));
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        response = await makeRequest(accessToken);
        data = await response.json();
      } else {
        dispatch(logout());
        return { error: { status: 401, data: 'Unauthorized' } };
      }
    }

    return { data };
  };
