import { Fragment } from 'react';
import type { ReactNode } from 'react';
import { useAlertNotifications } from '@/features/alerts/useAlertNotifications';

/**
 * Mounts the global price-alert notification listener for the lifetime of
 * the app, so a triggered alert shows a toast no matter which page the
 * user is on. Kept as its own provider (rather than folded into
 * MarketProvider) since it's a separate concern: MarketProvider owns the
 * socket connection itself, this just listens on it.
 */
export const AlertNotificationsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  useAlertNotifications();

  return <Fragment>{children}</Fragment>;
};
