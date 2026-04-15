import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * Base API for all RTK Query endpoints
 * - shared baseUrl
 * - auth headers
 * - error handling foundation
 */
export const baseApi = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,

    prepareHeaders: (headers) => {
      // TODO implement auth here
      // const token = (getState() as RootState)?.auth?.token;

      // if (token) {
      //   headers.set('authorization', `Bearer ${token}`);
      // }

      headers.set('content-type', 'application/json');

      return headers;
    },
  }),

  tagTypes: ['User', 'Market', 'Widget', 'Dashboard'],

  endpoints: () => ({}),
});
