import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlBaseQuery } from '@/services/graphql/baseGraphql';

export const baseApi = createApi({
  reducerPath: 'api',

  baseQuery: graphqlBaseQuery({
    baseUrl: import.meta.env.VITE_GRAPHQL_URL,
  }),

  tagTypes: ['User', 'Market', 'Widget', 'Dashboard'],

  endpoints: () => ({}),
});