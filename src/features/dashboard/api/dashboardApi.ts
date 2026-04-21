import { baseApi } from '@/services/api/baseApi';
import type { GetDashboardResponse, SaveDashboardInput } from './types';
import type { Layouts } from '@/features/dashboard/model/types';

export const dashboardApi = baseApi.injectEndpoints({
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
      transformResponse: (res: { data: GetDashboardResponse }) =>
        res.data.getDashboard,
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