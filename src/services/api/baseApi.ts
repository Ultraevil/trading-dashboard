import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlBaseQuery } from '@/services/graphql/client';
import { env } from '@/config/env';

export const baseApi = createApi({
  reducerPath: 'api',

  baseQuery: graphqlBaseQuery({
    baseUrl: env.graphqlUrl,
  }),

  tagTypes: ['User', 'Dashboard'],

  endpoints: () => ({}),
});
