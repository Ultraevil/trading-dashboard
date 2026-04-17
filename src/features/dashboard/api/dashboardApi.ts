import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlBaseQuery } from '@/services/graphql/baseGraphql';

import type {
  GetDashboardResponse,
  SaveDashboardInput,
} from './types';
import { Layouts } from '@/features/dashboard/model/types';

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: graphqlBaseQuery({
    baseUrl: import.meta.env.VITE_GRAPHQL_URL,
  }),

  endpoints: (builder) => ({
    getDashboard: builder.query<Layouts, void>({
      query: () => ({
        body: JSON.stringify({
          query: `
            query GetDashboard {
              getDashboard
            }  
          `,
        }),
      }),

      transformResponse: (res: GetDashboardResponse) => res.getDashboard,
    }),

    saveDashboard: builder.mutation<void, SaveDashboardInput>({
      query: (input) => ({
        body: JSON.stringify({
          query: `
            mutation SaveDashboard($layouts: JSON!) {
              saveDashboard(layouts: $layouts)
            }
          `,
          variables: input,
        }),
      }),
    }),
  }),
});

export const { useGetDashboardQuery, useSaveDashboardMutation } = dashboardApi;
