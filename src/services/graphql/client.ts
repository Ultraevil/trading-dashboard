import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { refreshTokenRequest } from '@/services/auth/refreshToken';
import { setAccessToken, logout } from '@/features/auth/authSlice';

export type GraphQLError = {
  message: string;
  extensions?: {
    code?: string;
  };
};

export type GraphQLResponse<T> = {
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

/**
 * Runs a GraphQL request through the given `baseQuery` (so auth/refresh
 * still works exactly as it does for every other endpoint) and, unlike a
 * plain `query` + `transformResponse` endpoint, also turns a GraphQL-level
 * business error (e.g. validation, "not found") into a proper RTK Query
 * error instead of letting `res.data` be `null` and blowing up on
 * `res.data.someField`.
 *
 * `graphqlBaseQuery` above already handles the UNAUTHENTICATED/401 case;
 * this is for everything else a resolver can reject with. Use it from an
 * endpoint's `queryFn` when the caller needs to show the server's error
 * message (e.g. in a form) rather than treat every response as a success.
 */
export const runGraphQL = async <TData, TResult>(
  baseQuery: BaseQueryFn,
  baseQueryApi: Parameters<BaseQueryFn>[1],
  extraOptions: Parameters<BaseQueryFn>[2],
  query: string,
  variables: unknown,
  pick: (data: TData) => TResult,
) => {
  const result = await baseQuery(
    { body: JSON.stringify(variables ? { query, variables } : { query }) },
    baseQueryApi,
    extraOptions,
  );

  if (result.error) return { error: result.error };

  const envelope = result.data as GraphQLResponse<TData>;

  if (envelope.errors?.length) {
    return {
      error: { status: 'CUSTOM_ERROR', data: envelope.errors[0].message },
    };
  }

  return { data: pick(envelope.data as TData) };
};

/**
 * Pulls the human-readable message back out of an error produced by
 * `runGraphQL` above (the `{ status: 'CUSTOM_ERROR', data: string }` shape),
 * for components that want to show it directly - e.g. as a form error or a
 * toast - rather than a generic "something went wrong".
 */
export const getGraphQLErrorMessage = (error: unknown): string | undefined => {
  if (
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    typeof (error as { data?: unknown }).data === 'string'
  ) {
    return (error as { data: string }).data;
  }

  return undefined;
};
