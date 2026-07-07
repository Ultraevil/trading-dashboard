import { baseApi } from './baseApi';
import { GET_DASHBOARD } from '@/services/graphql/queries/getDashboard';
import { SAVE_DASHBOARD } from '@/services/graphql/mutations/saveDashboard';
import type { Layouts } from '@/features/dashboard/dashboard.types';

type GetDashboardResponse = {
  getDashboard: Layouts;
};

type SaveDashboardInput = {
  layouts: Layouts;
};

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query<Layouts, void>({
      query: () => ({
        body: JSON.stringify({ query: GET_DASHBOARD }),
      }),
      transformResponse: (res: { data: GetDashboardResponse }) =>
        res.data.getDashboard,
      providesTags: ['Dashboard'],
    }),

    saveDashboard: builder.mutation<void, SaveDashboardInput>({
      query: (input) => ({
        body: JSON.stringify({
          query: SAVE_DASHBOARD,
          variables: input,
        }),
      }),
      invalidatesTags: ['Dashboard'],
    }),
  }),
});

export const { useGetDashboardQuery, useSaveDashboardMutation } = dashboardApi;
