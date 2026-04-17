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
      const token = localStorage.getItem('token');

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ['User', 'Market', 'Widget', 'Dashboard'],

  endpoints: () => ({}),
});
