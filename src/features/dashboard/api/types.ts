import { Layouts } from '@/features/dashboard/model/types';

export type GetDashboardResponse = {
  getDashboard: Layouts;
};

export type SaveDashboardInput = {
  layouts: Layouts;
};