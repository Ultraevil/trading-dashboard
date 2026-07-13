import { baseApi } from './baseApi';
import { runGraphQL } from '@/services/graphql/client';
import { GET_ALERTS } from '@/services/graphql/queries/getAlerts';
import { CREATE_ALERT } from '@/services/graphql/mutations/createAlert';
import { UPDATE_ALERT } from '@/services/graphql/mutations/updateAlert';
import { DELETE_ALERT } from '@/services/graphql/mutations/deleteAlert';
import { TOGGLE_ALERT } from '@/services/graphql/mutations/toggleAlert';
import type {
  Alert,
  CreateAlertInput,
  UpdateAlertInput,
} from '@/features/alerts/alert.types';

export const alertsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAlerts: builder.query<Alert[], void>({
      queryFn: (_arg, api, extraOptions, baseQuery) =>
        runGraphQL<{ alerts: Alert[] }, Alert[]>(
          baseQuery,
          api,
          extraOptions,
          GET_ALERTS,
          undefined,
          (data) => data.alerts,
        ),
      providesTags: ['Alert'],
    }),

    createAlert: builder.mutation<Alert, CreateAlertInput>({
      queryFn: (input, api, extraOptions, baseQuery) =>
        runGraphQL<{ createAlert: Alert }, Alert>(
          baseQuery,
          api,
          extraOptions,
          CREATE_ALERT,
          { input },
          (data) => data.createAlert,
        ),
      invalidatesTags: ['Alert'],
    }),

    updateAlert: builder.mutation<Alert, UpdateAlertInput>({
      queryFn: (input, api, extraOptions, baseQuery) =>
        runGraphQL<{ updateAlert: Alert }, Alert>(
          baseQuery,
          api,
          extraOptions,
          UPDATE_ALERT,
          { input },
          (data) => data.updateAlert,
        ),
      invalidatesTags: ['Alert'],
    }),

    deleteAlert: builder.mutation<boolean, string>({
      queryFn: (id, api, extraOptions, baseQuery) =>
        runGraphQL<{ deleteAlert: boolean }, boolean>(
          baseQuery,
          api,
          extraOptions,
          DELETE_ALERT,
          { id },
          (data) => data.deleteAlert,
        ),
      invalidatesTags: ['Alert'],
      // Optimistic: remove the row immediately rather than waiting for the
      // round trip, since a delete has no other visual feedback to lean
      // on. Rolled back if the mutation actually fails (e.g. someone else
      // already deleted it - "Alert not found").
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          alertsApi.util.updateQueryData('getAlerts', undefined, (draft) => {
            const index = draft.findIndex((alert) => alert.id === id);
            if (index !== -1) draft.splice(index, 1);
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    toggleAlert: builder.mutation<Alert, string>({
      queryFn: (id, api, extraOptions, baseQuery) =>
        runGraphQL<{ toggleAlert: Alert }, Alert>(
          baseQuery,
          api,
          extraOptions,
          TOGGLE_ALERT,
          { id },
          (data) => data.toggleAlert,
        ),
      invalidatesTags: ['Alert'],
      // Optimistic: flip `enabled` immediately so the toggle feels instant;
      // the follow-up invalidation (from invalidatesTags) reconciles with
      // the server's actual state once it responds, and this patch is
      // rolled back if the mutation rejects.
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          alertsApi.util.updateQueryData('getAlerts', undefined, (draft) => {
            const alert = draft.find((item) => item.id === id);
            if (alert) alert.enabled = !alert.enabled;
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetAlertsQuery,
  useCreateAlertMutation,
  useUpdateAlertMutation,
  useDeleteAlertMutation,
  useToggleAlertMutation,
} = alertsApi;
