import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/layout/MainLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { AnalyticsPage } from '@/pages/AnalyticsPage';
import { AlertsPage } from '@/pages/AlertsPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { PATHS } from './paths';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={PATHS.dashboard} element={<DashboardPage />} />
        <Route path={PATHS.analytics} element={<AnalyticsPage />} />
        <Route path={PATHS.alerts} element={<AlertsPage />} />
        <Route path={PATHS.settings} element={<SettingsPage />} />
      </Route>
    </Routes>
  );
};
